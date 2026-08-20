package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"github.com/username/pesatrack/internal/models"
	"github.com/username/pesatrack/internal/services"
)


func CreateCategory(c *gin.Context) {


	var category models.Category


	if err := c.ShouldBindJSON(&category); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}



	result, err := services.CreateCategory(
		category.BusinessID,
		category,
	)



	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}



	c.JSON(http.StatusCreated, gin.H{

		"message":"Category created successfully",

		"category":result,

	})

}





func GetCategories(c *gin.Context) {


	businessID := c.Query("business_id")


	if businessID == "" {

		c.JSON(http.StatusBadRequest, gin.H{
			"error":"business_id is required",
		})

		return
	}



	id, err := uuid.Parse(businessID)


	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error":"invalid business id",
		})

		return
	}



	categories, err := services.GetBusinessCategories(id)



	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error":err.Error(),
		})

		return
	}



	c.JSON(http.StatusOK, gin.H{

		"categories":categories,

	})

}
