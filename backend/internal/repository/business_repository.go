package repository

import (
	"context"

	"github.com/google/uuid"

	"github.com/username/pesatrack/internal/database"
	"github.com/username/pesatrack/internal/models"
)

func CreateBusiness(business *models.Business) error {

	query := `
		INSERT INTO businesses
		(
			id,
			user_id,
			business_name,
			business_type,
			phone_number,
			email,
			address,
			currency
		)
		VALUES
		(
			$1,$2,$3,$4,$5,$6,$7,$8
		)
		RETURNING created_at, updated_at
	`

	err := database.DB.QueryRow(
		context.Background(),
		query,

		business.ID,
		business.UserID,
		business.BusinessName,
		business.BusinessType,
		business.PhoneNumber,
		business.Email,
		business.Address,
		business.Currency,

	).Scan(
		&business.CreatedAt,
		&business.UpdatedAt,
	)

	return err
}

func GetBusinessesByUser(
	userID uuid.UUID,
) ([]models.Business, error) {

	query := `
		SELECT
			id,
			user_id,
			business_name,
			business_type,
			phone_number,
			email,
			address,
			currency,
			created_at,
			updated_at

		FROM businesses

		WHERE user_id=$1
	`

	rows, err := database.DB.Query(
		context.Background(),
		query,
		userID,
	)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	businesses := make([]models.Business, 0)

	for rows.Next() {

		var business models.Business

		err := rows.Scan(
			&business.ID,
			&business.UserID,
			&business.BusinessName,
			&business.BusinessType,
			&business.PhoneNumber,
			&business.Email,
			&business.Address,
			&business.Currency,
			&business.CreatedAt,
			&business.UpdatedAt,
		)

		if err != nil {
			return nil, err
		}

		businesses = append(
			businesses,
			business,
		)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return businesses, nil
}

func GetBusinessByIDAndUser(
	businessID uuid.UUID,
	userID uuid.UUID,
) (*models.Business, error) {

	var business models.Business

	err := database.DB.QueryRow(
		context.Background(),

		`
		SELECT
			id,
			user_id,
			business_name,
			business_type,
			phone_number,
			email,
			address,
			currency,
			created_at,
			updated_at

		FROM businesses

		WHERE id=$1
		AND user_id=$2
		`,

		businessID,
		userID,

	).Scan(
		&business.ID,
		&business.UserID,
		&business.BusinessName,
		&business.BusinessType,
		&business.PhoneNumber,
		&business.Email,
		&business.Address,
		&business.Currency,
		&business.CreatedAt,
		&business.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &business, nil
}
