package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"github.com/username/pesatrack/internal/models"
	"github.com/username/pesatrack/internal/services"
)

func CreateStockMovement(c *gin.Context) {

	var movement models.StockMovement

	err := c.ShouldBindJSON(&movement)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = services.CreateStockMovement(movement)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Stock movement created successfully",
	})
}

func GetStockMovements(c *gin.Context) {

	productID := c.Query("product_id")

	if productID == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "product_id is required",
		})
		return
	}

	id, err := uuid.Parse(productID)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid product id",
		})
		return
	}

	movements, err := services.GetStockMovements(id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"movements": movements,
	})
}
