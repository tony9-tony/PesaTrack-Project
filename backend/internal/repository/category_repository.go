package repository

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"

	"github.com/username/pesatrack/internal/database"
	"github.com/username/pesatrack/internal/models"
)

func CreateCategory(
	category *models.Category,
) error {

	_, err := database.DB.Exec(
		context.Background(),
		`
		INSERT INTO categories
		(
			id,
			business_id,
			name,
			type,
			created_at
		)
		VALUES
		($1,$2,$3,$4,$5)
		`,
		category.ID,
		category.BusinessID,
		category.Name,
		category.Type,
		category.CreatedAt,
	)

	return err
}

func GetCategories(
	businessID uuid.UUID,
) ([]models.Category, error) {

	rows, err := database.DB.Query(
		context.Background(),
		`
		SELECT
			id,
			business_id,
			name,
			type,
			created_at
		FROM categories
		WHERE business_id=$1
		`,
		businessID,
	)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	categories := make([]models.Category, 0)

	for rows.Next() {

		var category models.Category

		err := rows.Scan(
			&category.ID,
			&category.BusinessID,
			&category.Name,
			&category.Type,
			&category.CreatedAt,
		)

		if err != nil {
			return nil, err
		}

		categories = append(categories, category)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return categories, nil
}

func GetCategoryByName(
	businessID uuid.UUID,
	name string,
) (*models.Category, error) {

	var category models.Category

	err := database.DB.QueryRow(
		context.Background(),
		`
		SELECT
			id,
			business_id,
			name,
			type,
			created_at
		FROM categories
		WHERE business_id=$1
		AND name=$2
		`,
		businessID,
		name,
	).Scan(
		&category.ID,
		&category.BusinessID,
		&category.Name,
		&category.Type,
		&category.CreatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &category, nil
}

func GetCategoryByNameTx(
	ctx context.Context,
	tx pgx.Tx,
	businessID uuid.UUID,
	name string,
) (*models.Category, error) {

	var category models.Category

	err := tx.QueryRow(
		ctx,
		`
		SELECT
			id,
			business_id,
			name,
			type,
			created_at
		FROM categories
		WHERE business_id=$1
		AND name=$2
		`,
		businessID,
		name,
	).Scan(
		&category.ID,
		&category.BusinessID,
		&category.Name,
		&category.Type,
		&category.CreatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &category, nil
}
