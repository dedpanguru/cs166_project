package auth

import (
	"net/http"
	"strings"
)

func Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		// validate content-type is json
		contentType := req.Header.Get("Content-Type")
		if contentType == "application/json" {
			next.ServeHTTP(res, req)
		} else {
			http.Error(res, "Invalid header", http.StatusBadRequest)
			return
		}
	})
}

func TokenMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		// check for token presence
		auth := strings.Split(req.Header.Get("Authorization"), " ")
		if auth[0] == "Bearer" && len(auth) == 2 {
			// valid header, pass it off to handler
			next.ServeHTTP(res, req)
		} else {
			http.Error(res, "Invalid Authorization Header", http.StatusBadRequest)
			return
		}
	})
}
