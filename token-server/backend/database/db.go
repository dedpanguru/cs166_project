package database

import (
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
)

var DB *gorm.DB // singleton database object
var err error

func Connect() error {
	// establish connection to DB
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", os.Getenv("DBHOST"), os.Getenv("DBUSER"), os.Getenv("DBPASS"), os.Getenv("DBNAME"), os.Getenv("DBPORT"))
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	DB.AutoMigrate(&User{})
	return err
}

func Create(user *User) error {
	// create user
	if DB == nil {
		err = Connect() //establish connection
		if err != nil {
			return err
		}
	}
	// run query
	result := DB.Create(&user)
	return result.Error
}

func Retrieve(username string) (*User, error) {
	if DB == nil {
		err = Connect() //establish connection
		if err != nil {
			return nil, err
		}
	}
	// run query
	var user *User // will store result
	if result := DB.Where("username = ?", username).First(&user); result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		} else {
			return nil, result.Error
		}
	}
	return user, nil
}

func Update(user *User) error {
	// update the database new user info
	if DB == nil {
		err = Connect() //establish connection
		if err != nil {
			return err
		}
	}
	// run query
	result := DB.Model(&user).Update("token", user.Token)
	return result.Error
}

func Delete(user *User) error {
	// update the database new user info
	if DB == nil {
		err = Connect() //establish connection
		if err != nil {
			return err
		}
	}
	// run query, deleting a column value == update it as null
	result := DB.Model(&user).Update("token", nil)
	return result.Error
}
