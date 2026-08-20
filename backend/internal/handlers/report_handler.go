package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"github.com/username/pesatrack/internal/services"
)


func GetReport(c *gin.Context) {


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



	report, err := services.GetBusinessReport(
		businessUUID,
	)


	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}



	c.JSON(http.StatusOK, gin.H{

		"report": report,

	})

}
