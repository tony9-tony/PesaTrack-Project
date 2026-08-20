package models

type Report struct {

	TotalIncome float64 `json:"total_income"`

	TotalExpenses float64 `json:"total_expenses"`

	Profit float64 `json:"profit"`

	TransactionCount int `json:"transaction_count"`

}
