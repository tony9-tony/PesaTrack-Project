package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/username/pesatrack/internal/services"
)


type RegisterInput struct {
	FullName    string `json:"full_name" binding:"required"`
	Email       string `json:"email" binding:"required,email"`
	PhoneNumber string `json:"phone_number"`
	Password    string `json:"password" binding:"required,min=6"`
}


func Register(c *gin.Context) {

	var input RegisterInput


	if err := c.ShouldBindJSON(&input); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}


	user, err := services.RegisterUser(
		services.RegisterRequest{
			FullName: input.FullName,
			Email: input.Email,
			PhoneNumber: input.PhoneNumber,
			Password: input.Password,
		},
	)


	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}


	c.JSON(http.StatusCreated, gin.H{
		"message": "User created successfully",
		"user": user,
	})
}
func Login(c *gin.Context) {

	var input struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required"`
	}


	if err := c.ShouldBindJSON(&input); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}


	user, token, err := services.LoginUser(
		input.Email,
		input.Password,
	)


	if err != nil {

		c.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})

		return
	}


	c.JSON(http.StatusOK, gin.H{

		"message": "Login successful",

		"token": token,

		"user": user,
	})
}
