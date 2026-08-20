package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"github.com/username/pesatrack/internal/models"
	"github.com/username/pesatrack/internal/services"
)


func CreateTransaction(c *gin.Context) {


	var transaction models.Transaction


	err := c.ShouldBindJSON(&transaction)

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid request data",
		})

		return
	}



	userIDValue, exists := c.Get("user_id")


	if !exists {

		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "user not found",
		})

		return
	}



	userIDString, ok := userIDValue.(string)


	if !ok {

		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "invalid user id",
		})

		return
	}



	userID, err := uuid.Parse(userIDString)


	if err != nil {

		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "invalid user uuid",
		})

		return
	}



	result, err := services.CreateTransaction(
		userID,
		transaction,
	)


	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}



	c.JSON(http.StatusCreated, gin.H{

		"message": "Transaction created successfully",

		"transaction": result,

	})

}




func GetTransactions(c *gin.Context) {


	businessID := c.Query("business_id")


	if businessID == "" {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "business_id is required",
		})

		return
	}



	businessUUID, err := uuid.Parse(businessID)


	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid business id",
		})

		return
	}



	transactions, err := services.GetBusinessTransactions(
		businessUUID,
	)


	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}



	c.JSON(http.StatusOK, gin.H{

		"transactions": transactions,

	})

}
