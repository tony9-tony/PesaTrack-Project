package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"github.com/username/pesatrack/internal/services"
)

func RequireBusinessOwnership() gin.HandlerFunc {

	return func(c *gin.Context) {

		userIDValue, exists := c.Get("user_id")

		if !exists {

			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "user authentication required",
			})

			c.Abort()
			return
		}

		userIDString, ok := userIDValue.(string)

		if !ok {

			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "invalid user id",
			})

			c.Abort()
			return
		}

		userID, err := uuid.Parse(userIDString)

		if err != nil {

			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "invalid user id",
			})

			c.Abort()
			return
		}

		businessIDString := c.Query("business_id")

		if businessIDString == "" {

			c.JSON(http.StatusBadRequest, gin.H{
				"error": "business_id is required",
			})

			c.Abort()
			return
		}

		businessID, err := uuid.Parse(businessIDString)

		if err != nil {

			c.JSON(http.StatusBadRequest, gin.H{
				"error": "invalid business id",
			})

			c.Abort()
			return
		}

		business, err := services.GetBusinessByIDAndUser(
			businessID,
			userID,
		)

		if err != nil {

			c.JSON(http.StatusForbidden, gin.H{
				"error": "you do not have access to this business",
			})

			c.Abort()
			return
		}

		c.Set("business_id", business.ID)

		c.Next()
	}
}
