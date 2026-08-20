package repository

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"

	"github.com/username/pesatrack/internal/database"
	"github.com/username/pesatrack/internal/models"
)

func CreateStockMovement(
	movement models.StockMovement,
) error {

	query := `
		INSERT INTO stock_movements
		(
			id,
			product_id,
			movement_type,
			quantity
		)
		VALUES
		($1,$2,$3,$4)
	`

	_, err := database.DB.Exec(
		context.Background(),
		query,
		movement.ID,
		movement.ProductID,
		movement.MovementType,
		movement.Quantity,
	)

	return err
}

func CreateStockMovementTx(
	ctx context.Context,
	tx pgx.Tx,
	movement models.StockMovement,
) error {

	_, err := tx.Exec(
		ctx,
		`
		INSERT INTO stock_movements
		(
			id,
			product_id,
			movement_type,
			quantity
		)
		VALUES
		($1,$2,$3,$4)
		`,
		movement.ID,
		movement.ProductID,
		movement.MovementType,
		movement.Quantity,
	)

	return err
}

func GetStockMovements(
	productID uuid.UUID,
) ([]models.StockMovement, error) {

	rows, err := database.DB.Query(
		context.Background(),
		`
		SELECT
			id,
			product_id,
			movement_type,
			quantity,
			created_at
		FROM stock_movements
		WHERE product_id=$1
		ORDER BY created_at DESC
		`,
		productID,
	)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	movements := make([]models.StockMovement, 0)

	for rows.Next() {

		var movement models.StockMovement

		err := rows.Scan(
			&movement.ID,
			&movement.ProductID,
			&movement.MovementType,
			&movement.Quantity,
			&movement.CreatedAt,
		)

		if err != nil {
			return nil, err
		}

		movements = append(
			movements,
			movement,
		)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return movements, nil
}
