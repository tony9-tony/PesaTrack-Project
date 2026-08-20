package models

import (
	"time"

	"github.com/google/uuid"
)

type Category struct {

	ID uuid.UUID `json:"id"`

	BusinessID uuid.UUID `json:"business_id"`

	Name string `json:"name"`

	Type string `json:"type"`

	CreatedAt time.Time `json:"created_at"`
}
