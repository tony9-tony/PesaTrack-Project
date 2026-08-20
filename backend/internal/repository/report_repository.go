package repository

import (
	"context"

	"github.com/google/uuid"

	"github.com/username/pesatrack/internal/database"
)



type ReportData struct {

	TotalSales float64 `json:"total_sales"`

	TotalExpenses float64 `json:"total_expenses"`

	Profit float64 `json:"profit"`

	TransactionsCount int `json:"transactions_count"`

	ProductsCount int `json:"products_count"`

	StockValue float64 `json:"stock_value"`

}




func GetReportData(
	businessID uuid.UUID,
) (*ReportData,error) {


	var report ReportData



	// Sales

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
		&report.TotalSales,
	)


	if err != nil {
		return nil,err
	}




	// Expenses

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
		&report.TotalExpenses,
	)


	if err != nil {
		return nil,err
	}





	report.Profit =
		report.TotalSales -
		report.TotalExpenses





	// Transactions count

	err = database.DB.QueryRow(
		context.Background(),

		`
		SELECT COUNT(*)
		FROM transactions
		WHERE business_id=$1
		`,

		businessID,

	).Scan(
		&report.TransactionsCount,
	)


	if err != nil {
		return nil,err
	}





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
		&report.ProductsCount,
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
		&report.StockValue,
	)



	if err != nil {
		return nil,err
	}




	return &report,nil

}
