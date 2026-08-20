package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"github.com/username/pesatrack/internal/services"
)



func GetDashboard(c *gin.Context) {


	businessIDString := c.Query("business_id")



	businessID, err := uuid.Parse(
		businessIDString,
	)



	if err != nil {

		c.JSON(
			http.StatusBadRequest,
			gin.H{
				"error":"invalid business id",
			},
		)

		return
	}





	dashboard, err := services.GetDashboard(
		businessID,
	)



	if err != nil {

		c.JSON(
			http.StatusInternalServerError,
			gin.H{
				"error":err.Error(),
			},
		)

		return
	}





	c.JSON(
		http.StatusOK,
		dashboard,
	)

}
