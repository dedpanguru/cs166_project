package auth

import (
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

var secret = []byte(os.Getenv("SECRET"))

func GenerateJWT(username string) ([]byte, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    username,
		ExpiresAt: time.Now().Add(time.Hour).UTC().Unix(),
	})
	tokenString, err := token.SignedString(secret)
	if err != nil {
		return nil, err
	}
	return []byte(tokenString), nil
}

func ValidateJWT(token []byte) error {
	_, err := jwt.ParseWithClaims(
		string(token),
		&jwt.StandardClaims{},
		func(token *jwt.Token) (any, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				fmt.Println(token.Header["alg"])
				return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
			}
			claims, ok := token.Claims.(*jwt.StandardClaims)
			if !ok {
				token.Valid = false
				return nil, errors.New("jwt claims cannot be converted into Standard Claims")
			}
			if claims.ExpiresAt <= time.Now().Unix() {
				token.Valid = false
				return nil, errors.New("Token expired")
			}
			token.Valid = true
			return secret, nil
		})
	return err
}
