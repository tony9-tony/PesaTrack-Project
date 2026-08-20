package repository

import (
	"context"

	"github.com/google/uuid"

	"github.com/username/pesatrack/internal/database"
)



type DashboardData struct {

	TotalSales float64 `json:"total_sales"`

	TotalExpenses float64 `json:"total_expenses"`

	Profit float64 `json:"profit"`

	ProductsCount int `json:"products_count"`

	StockValue float64 `json:"stock_value"`

}




func GetDashboardData(
	businessID uuid.UUID,
) (*DashboardData,error) {


	var dashboard DashboardData



	// Total Sales

	err := database.DB.QueryRow(
		context.Background(),

		`
		SELECT COALESCE(SUM(amount),0)
		FROM transactions
		WHERE business_id=$1
		AND transaction_type='INCOME'
		`,

		businessID,

	).Scan(
		&dashboard.TotalSales,
	)


	if err != nil {
		return nil,err
	}





	// Total Expenses

	err = database.DB.QueryRow(
		context.Background(),

		`
		SELECT COALESCE(SUM(amount),0)
		FROM transactions
		WHERE business_id=$1
		AND transaction_type='EXPENSE'
		`,

		businessID,

	).Scan(
		&dashboard.TotalExpenses,
	)



	if err != nil {
		return nil,err
	}





	// Profit

	dashboard.Profit =
		dashboard.TotalSales -
		dashboard.TotalExpenses





	// Products count

	err = database.DB.QueryRow(
		context.Background(),

		`
		SELECT COUNT(*)
		FROM products
		WHERE business_id=$1
		`,

		businessID,

	).Scan(
		&dashboard.ProductsCount,
	)



	if err != nil {
		return nil,err
	}






	// Stock value

	err = database.DB.QueryRow(
		context.Background(),

		`
		SELECT COALESCE(
			SUM(quantity * buying_price),
			0
		)

		FROM products

		WHERE business_id=$1
		`,

		businessID,

	).Scan(
		&dashboard.StockValue,
	)



	if err != nil {
		return nil,err
	}





	return &dashboard,nil

}
