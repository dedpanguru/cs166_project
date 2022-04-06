package auth

import (
	"encoding/json"
	"io"
	"net/http"
	"os"
	"strings"
	"token-server/database"

	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
)

var Resource = http.HandlerFunc(ResourceHandler) // requires custom middleware, so make a handler function from it
var err error                                    // single error object, err will be constantly reassigned and returned if not empty

// ResourceHandler - Verifies user credentials before transferring a resource file back from the assets folder
func ResourceHandler(res http.ResponseWriter, req *http.Request) {
	// verify user
	// decode json data
	var input map[string]string
	if err = json.NewDecoder(req.Body).Decode(&input); err != nil { // inform client of any error in decoding
		http.Error(res, err.Error(), http.StatusUnprocessableEntity)
		return
	}
	// verify input token
	token := strings.Split(req.Header.Get("Authorization"), " ")[1]
	err = ValidateJWT([]byte(token))
	if err != nil {
		http.Error(res, "Invalid token", http.StatusUnauthorized)
		return
	}
	// user should exist already so check for their existence in the database
	result, err := database.Retrieve(input["username"])
	if result == nil {
		http.Error(res, "User not known", http.StatusUnauthorized)
		return
	} else if err != nil {
		// if there was an error, let the client know
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}

	// validate input password and stored password
	if err = bcrypt.CompareHashAndPassword(result.Password, []byte(input["password"])); err != nil {
		// invalid password case, return 401 Unauthorized
		http.Error(res, "Invalid credentials", http.StatusUnauthorized)
		return
	}
	// verify token in database == token in input
	if result.Token == nil {
		// user was logged out
		http.Error(res, "User is logged out", http.StatusForbidden)
		return
	}

	// validate the token in db
	if string(result.Token) != token {
		//token in database != input token
		http.Error(res, "Invalid token", http.StatusUnauthorized)
		return
	} else {
		// validate token in database
		err = ValidateJWT(result.Token)
		if err != nil {
			//token in database is invalid
			http.Error(res, err.Error(), http.StatusUnauthorized)
			return
		}
	}

	// credentials are valid now, now check if requested resource exists
	requestedFile := mux.Vars(req)["resource"]
	if _, err = os.Stat("./assets/" + requestedFile); err == nil {
		// resource exists
		res.WriteHeader(http.StatusAccepted)
		//determine content type of resource
		contentType, err := GetContentType(requestedFile)
		// default content-type will be application/octet-stream
		// it works, but it isn't accurate
		if err != nil {
			contentType = "application/octet-stream"
		}
		res.Header().Set("Content-Disposition", "attachment; filename=\""+requestedFile+"\"")
		res.Header().Set("Content-Type", contentType)
		//send file contents
		file, err := os.Open("./assets/" + requestedFile)
		if err != nil {
			file.Close()
			http.Error(res, err.Error(), http.StatusInternalServerError)
			return
		}
		defer file.Close()
		io.Copy(res, file)
	} else {
		// resource doesn't exist, respond with 404
		res.WriteHeader(http.StatusNotFound)
	}
}

// LogoutHandler - deletes user's token from the database, effectively logging them out
func LogoutHandler(res http.ResponseWriter, req *http.Request) {
	// delete only the token from the database

	// first verify that they are logged in

	//decode json data
	var input map[string]string
	if err := json.NewDecoder(req.Body).Decode(&input); err != nil { // inform client of any error in decoding
		http.Error(res, err.Error(), http.StatusUnprocessableEntity)
		return
	}

	// user should exist already so check for their existence in the database
	result, err := database.Retrieve(input["username"])
	if result == nil {
		http.Error(res, "Username not found", http.StatusUnauthorized)
		return
	} else if err != nil {
		// if there was an error, let the client know
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}

	// validate input password and stored password
	if err = bcrypt.CompareHashAndPassword(result.Password, []byte(input["password"])); err != nil {
		// invalid password case, return 401 Unauthorized
		http.Error(res, "Invalid password", http.StatusUnauthorized)
		return
	}
	// check if token is already deleted
	if result.Token == nil {
		// if it is, no action is needed, so just respond with success
		res.WriteHeader(http.StatusAccepted)
		return
	}
	// delete token
	if err = database.Delete(result); err != nil {
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}
	res.WriteHeader(http.StatusAccepted) // nothing to send back on success
}

// LoginHandler - validates if a user is logged in or not and logs them in through refreshing their token
// refreshes their token if they have valid username & password and their token has expired
func LoginHandler(res http.ResponseWriter, req *http.Request) {
	// ideally used when a user's token has expired or was deleted and they need to log back in
	// refresh their token if needed

	// decode the JSON body into a User object
	var input map[string]string
	if err = json.NewDecoder(req.Body).Decode(&input); err != nil { // inform client of any error in decoding
		http.Error(res, err.Error(), http.StatusUnprocessableEntity)
		return
	}

	// user should exist already so check for their existence in the database
	result, err := database.Retrieve(input["username"])
	if result == nil {
		// new user logging in
		http.Error(res, "You don't have an account, Request /api/register", http.StatusBadRequest)
		return
	} else if err != nil {
		// if there was an error, let the client know
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}
	// validate input password and stored password
	if err = bcrypt.CompareHashAndPassword(result.Password, []byte(input["password"])); err != nil {
		// invalid password case, return 401 Unauthorized
		http.Error(res, "Invalid password", http.StatusUnauthorized)
		return
	}
	// only refresh if token doesn't exist (i.e. user logged out before) or token expired
	var refreshNeeded bool
	if result.Token == nil {
		// token deleted case
		refreshNeeded = true
	} else {
		// check if token expired
		err := ValidateJWT(result.Token)
		if err != nil {
			if err.Error() == "Token expired" {
				// token expired case
				refreshNeeded = true
			} else {
				http.Error(res, err.Error(), http.StatusInternalServerError)
				return
			}
		}
	}

	if refreshNeeded {
		// refresh token if necessary
		// generate a new token
		token, err := GenerateJWT(input["username"])
		if err != nil {
			// if there was an error, let the client know
			http.Error(res, err.Error(), http.StatusInternalServerError)
			return
		}
		// update the database with the new token
		if err = database.Update(&database.User{
			Username: input["username"],
			Password: []byte(input["password"]),
			Token:    token,
		}); err != nil {
			// if there was an error, let the client know
			http.Error(res, err.Error(), http.StatusInternalServerError)
			return
		}
		// send token back to client
		res.WriteHeader(http.StatusAccepted)
		res.Header().Set("Content-Type", "text/plain")
		res.Write(token)
	} else {
		// username, password, and token were all valid
		http.Error(res, "You are already logged in, why did you request this endpoint?", http.StatusBadRequest)
	}
}

// RegistrationHandler - grants tokens to new users and refreshes tokens for old ones
func RegistrationHandler(res http.ResponseWriter, req *http.Request) {
	// decode JSON request into an object
	var input map[string]string

	// decode the JSON data, inform client of any error
	if err = json.NewDecoder(req.Body).Decode(&input); err != nil {
		http.Error(res, err.Error(), http.StatusUnprocessableEntity)
		return
	}
	// verify that the JSON input is not empty
	if username, password := input["username"], input["password"]; username == "" && password == "" {
		http.Error(res, "Invalid JSON body", http.StatusBadRequest)
		return
	}
	// user shouldn't exist already so check for their existence in the database
	result, err := database.Retrieve(input["username"])
	if result != nil {
		// user already exists case
		http.Error(res, "Wrong endpoint, request /api/login", http.StatusBadRequest)
		return
	} else if err != nil {
		// if there was an error, let the client know
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}

	// Create a new user
	token, err := GenerateJWT(input["username"]) // assign a new JWT token
	if err != nil {
		// if there was an error, let client know
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}
	// hash the password before storing it
	hash, err := bcrypt.GenerateFromPassword([]byte(input["password"]), 14)
	if err != nil {
		// if there was an error, let the client know
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}
	// create an anonymous User object with fields to store (username, hashed password, valid token)
	// store the User object
	if err = database.Create(&database.User{
		Username: input["username"],
		Password: hash,
		Token:    token,
	}); err != nil {
		// inform client of error
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}
	// send token back
	res.WriteHeader(http.StatusCreated)
	res.Header().Set("Content-Type", "text/plain")
	res.Write(token)
}

// GetContentType - helper function that determines the Content-Type header value from a file on your local machine
func GetContentType(filepath string) (string, error) {
	// open the file
	file, err := os.Open(filepath)
	if err != nil {
		return "", err
	}
	buffer := make([]byte, 512)
	_, err = file.Read(buffer)
	file.Close()
	if err != nil {
		return "", err
	}
	return http.DetectContentType(buffer), nil
}
