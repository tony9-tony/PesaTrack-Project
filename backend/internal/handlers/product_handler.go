package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"github.com/username/pesatrack/internal/models"
	"github.com/username/pesatrack/internal/services"
)

func CreateProduct(c *gin.Context) {

	var product models.Product

	err := c.ShouldBindJSON(&product)

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	businessIDValue, exists := c.Get("business_id")

	if !exists {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "business id is required",
		})

		return
	}

	businessID, ok := businessIDValue.(uuid.UUID)

	if !ok {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "invalid business id",
		})

		return
	}

	product.BusinessID = businessID

	result, err := services.CreateProduct(product)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusCreated, gin.H{

		"message": "Product created successfully",

		"product": result,

	})
}

func GetProducts(c *gin.Context) {

	businessIDValue, exists := c.Get("business_id")

	if !exists {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "business id is required",
		})

		return
	}

	businessID, ok := businessIDValue.(uuid.UUID)

	if !ok {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "invalid business id",
		})

		return
	}

	products, err := services.GetProducts(businessID)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{

		"products": products,

	})
}

func GetLowStockProducts(c *gin.Context) {

	businessIDValue, exists := c.Get("business_id")

	if !exists {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "business id is required",
		})

		return
	}

	businessID, ok := businessIDValue.(uuid.UUID)

	if !ok {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "invalid business id",
		})

		return
	}

	products, err := services.GetLowStockProducts(businessID)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{

		"low_stock_products": products,

	})
}
