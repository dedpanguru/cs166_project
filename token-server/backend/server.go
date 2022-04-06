package main

import (
	"log"
	"net/http"
	"os"
	"token-server/auth"

	"github.com/gorilla/mux"
)

func main() {
	// instantiate router
	router := mux.NewRouter()
	// set up routes
	router.HandleFunc("/api/register", auth.RegistrationHandler).Methods("POST")
	router.HandleFunc("/api/login", auth.LoginHandler).Methods("POST")
	router.HandleFunc("/api/logout", auth.LogoutHandler).Methods("POST")
	router.Handle("/api/assets/{resource}", auth.TokenMiddleware(auth.Resource)).Methods("GET")
	router.Use(auth.Middleware)
	// start router
	log.Fatal(http.ListenAndServe(os.Getenv("DOMAIN")+":8080", router))
}
