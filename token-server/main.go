package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"token-server/auth"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	// set environment
	if err := godotenv.Load(); err != nil {
		log.Fatal(err)
	}
	// instantiate router
	router := mux.NewRouter()
	// set up routes
	router.HandleFunc("/api/register", auth.RegistrationHandler).Methods("POST")
	router.HandleFunc("/api/login", auth.LoginHandler).Methods("POST")
	router.HandleFunc("/api/logout", auth.LogoutHandler).Methods("POST")
	router.Handle("/api/assets/{resource}", auth.TokenMiddleware(auth.Resource)).Methods("GET")
	router.Use(auth.Middleware)
	// start router
	URL := os.Getenv("DOMAIN") + ":" + os.Getenv("PORT")
	fmt.Println("Server running on:", URL)
	log.Fatal(http.ListenAndServe(URL, router))
}
