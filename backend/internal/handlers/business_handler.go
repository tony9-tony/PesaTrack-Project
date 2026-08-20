package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"github.com/username/pesatrack/internal/models"
	"github.com/username/pesatrack/internal/services"
)


func CreateBusiness(c *gin.Context) {


	userIDValue, exists := c.Get("user_id")


	if !exists {

		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "user not found",
		})

		return
	}


	userID, err := uuid.Parse(userIDValue.(string))


	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid user id",
		})

		return
	}



	var business models.Business


	if err := c.ShouldBindJSON(&business); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}



	result, err := services.CreateBusiness(
		userID,
		business,
	)


	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}



	c.JSON(http.StatusCreated, gin.H{

		"message": "Business created successfully",

		"business": result,

	})

}




func GetBusinesses(c *gin.Context) {


	userIDValue, exists := c.Get("user_id")


	if !exists {

		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "user not found",
		})

		return
	}


	userID, err := uuid.Parse(userIDValue.(string))


	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid user id",
		})

		return
	}



	businesses, err := services.GetUserBusinesses(userID)


	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}



	c.JSON(http.StatusOK, gin.H{

		"businesses": businesses,

	})

}
