package database

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username string `json:"username" gorm:"primaryKey"`
	Password []byte `json:"password" gorm:",notnull"` // storing hashs only
	Token    []byte `json:",omitempty" gorm:"unique"`
}
