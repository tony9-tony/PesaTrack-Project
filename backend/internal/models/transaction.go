package models

import (
	"time"

	"github.com/google/uuid"
)

type Transaction struct {

	ID uuid.UUID `json:"id" gorm:"type:uuid;primaryKey"`

	BusinessID uuid.UUID `json:"business_id" gorm:"type:uuid;not null"`

	CategoryID *uuid.UUID `json:"category_id" gorm:"type:uuid"`

	Title string `json:"title" gorm:"not null"`

	Description string `json:"description"`

	Amount float64 `json:"amount" gorm:"not null"`

	TransactionType string `json:"transaction_type" gorm:"not null"`

	PaymentMethod string `json:"payment_method"`

	TransactionDate time.Time `json:"transaction_date"`

	CreatedAt time.Time `json:"created_at"`
}
