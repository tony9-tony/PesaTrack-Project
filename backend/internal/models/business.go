package models

import (
	"time"

	"github.com/google/uuid"
)

type Business struct {

	ID uuid.UUID `json:"id"`

	UserID uuid.UUID `json:"user_id"`

	BusinessName string `json:"business_name"`

	BusinessType string `json:"business_type"`

	PhoneNumber string `json:"phone_number"`

	Email string `json:"email"`

	Address string `json:"address"`

	Currency string `json:"currency"`

	CreatedAt time.Time `json:"created_at"`

	UpdatedAt time.Time `json:"updated_at"`
}
