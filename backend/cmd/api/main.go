package main

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/username/pesatrack/internal/database"
	"github.com/username/pesatrack/internal/handlers"
	"github.com/username/pesatrack/internal/middleware"
)

func main() {

	// Connect to database
	err := database.Connect()

	if err != nil {
		panic(err)
	}

	// Create Gin router
	router := gin.Default()

	// Public routes
	router.GET("/", func(c *gin.Context) {

		c.JSON(http.StatusOK, gin.H{
			"message": "PesaTrack API is running",
		})

	})

	// Authentication routes
	router.POST(
		"/api/auth/register",
		handlers.Register,
	)

	router.POST(
		"/api/auth/login",
		handlers.Login,
	)

	// Protected routes
	protected := router.Group("/api")

	protected.Use(
		middleware.AuthMiddleware(),
	)

	// Profile
	protected.GET(
		"/profile",
		func(c *gin.Context) {

			userID, exists := c.Get("user_id")

			if !exists {

				c.JSON(http.StatusUnauthorized, gin.H{
					"error": "user id not found",
				})

				return
			}

			c.JSON(http.StatusOK, gin.H{
				"user_id": userID,
			})
		},
	)

	// Business routes
	protected.POST(
		"/businesses",
		handlers.CreateBusiness,
	)

	protected.GET(
		"/businesses",
		handlers.GetBusinesses,
	)

	// Category routes
	protected.POST(
		"/categories",
		handlers.CreateCategory,
	)

	protected.GET(
		"/categories",
		handlers.GetCategories,
	)

	// Transaction routes
	protected.POST(
		"/transactions",
		handlers.CreateTransaction,
	)

	protected.GET(
		"/transactions",
		handlers.GetTransactions,
	)

	// Dashboard
	protected.GET(
		"/dashboard",
		handlers.GetDashboard,
	)

	// Reports
	protected.GET(
		"/reports",
		handlers.GetReport,
	)

	// Product routes
	protected.POST(
		"/products",
		middleware.RequireBusinessOwnership(),
		handlers.CreateProduct,
	)

	protected.GET(
		"/products",
		middleware.RequireBusinessOwnership(),
		handlers.GetProducts,
	)

	protected.GET(
		"/products/low-stock",
		middleware.RequireBusinessOwnership(),
		handlers.GetLowStockProducts,
	)

	// Stock routes
	protected.POST(
		"/stock",
		handlers.CreateStockMovement,
	)

	protected.GET(
		"/stock",
		handlers.GetStockMovements,
	)

	// Start server
	err = router.Run(":8080")

	if err != nil {
		panic(err)
	}
}
