package auth

import (
	"net/http"
	"strings"
)

func Middleware(next http.Handler) http.Handler {
	// will serve as a mux for different middleware
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		// validate content-type is json
		contentType := req.Header.Get("Content-Type")
		if contentType == "application/json" {
			// analyze request uri
			uri := strings.TrimPrefix(req.RequestURI, "/api/")
			// for /api/assets/:resource and /api/logout, validate the auth header
			if strings.HasPrefix(uri, "assets") || uri == "logout" {
				// check that authorization header follows the format
				auth := strings.Split(req.Header.Get("Authorization"), " ")
				if auth[0] != "Bearer" || len(auth) != 2 { // auth header needs Bearer prefix and the token itself
					http.Error(res, "Invalid Authorization Header", http.StatusBadRequest)
					return
				}
			}
			next.ServeHTTP(res, req)
		} else {
			http.Error(res, "Invalid header", http.StatusBadRequest)
			return
		}
	})
}
