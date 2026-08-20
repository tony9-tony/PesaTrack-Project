package services

import (
	"errors"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"

	"github.com/username/pesatrack/internal/models"
	"github.com/username/pesatrack/internal/repository"
)

type RegisterRequest struct {
	FullName    string
	Email       string
	PhoneNumber string
	Password    string
}


func RegisterUser(req RegisterRequest) (*models.User, error) {

	// check if email already exists
	existingUser, _ := repository.GetUserByEmail(req.Email)

	if existingUser != nil {
		return nil, errors.New("email already exists")
	}


	// hash password
	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(req.Password),
		bcrypt.DefaultCost,
	)

	if err != nil {
		return nil, err
	}


	user := &models.User{
		ID:           uuid.New(),
		FullName:     req.FullName,
		Email:        req.Email,
		PhoneNumber:  req.PhoneNumber,
		PasswordHash: string(hashedPassword),
		Role:         "business_owner",
		IsVerified:   false,
		IsActive:     true,
	}


	err = repository.CreateUser(user)

	if err != nil {
		return nil, err
	}


	return user, nil
}
func LoginUser(email string, password string) (*models.User, string, error) {

	user, err := repository.GetUserByEmail(email)

	if err != nil {
		return nil, "", errors.New("invalid email or password")
	}


	err = bcrypt.CompareHashAndPassword(
		[]byte(user.PasswordHash),
		[]byte(password),
	)


	if err != nil {
		return nil, "", errors.New("invalid email or password")
	}


	token, err := GenerateToken(
		user.ID.String(),
		user.Email,
	)


	if err != nil {
		return nil, "", err
	}


	return user, token, nil
}
