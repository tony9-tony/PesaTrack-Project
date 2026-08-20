package models

import (
	"time"

	"github.com/google/uuid"
)

type StockMovement struct {

	ID uuid.UUID `json:"id"`

	ProductID uuid.UUID `json:"product_id"`

	MovementType string `json:"movement_type"`

	Quantity int `json:"quantity"`

	CreatedAt time.Time `json:"created_at"`

}
