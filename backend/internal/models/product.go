package models

import (
	"time"

	"github.com/google/uuid"
)


type Product struct {


	ID uuid.UUID `json:"id"`


	BusinessID uuid.UUID `json:"business_id"`


	Name string `json:"name"`


	Description string `json:"description"`


	Quantity int `json:"quantity"`


	BuyingPrice float64 `json:"buying_price"`


	SellingPrice float64 `json:"selling_price"`


	CreatedAt time.Time `json:"created_at"`


	UpdatedAt time.Time `json:"updated_at"`

}
