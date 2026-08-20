package repository

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"

	"github.com/username/pesatrack/internal/database"
	"github.com/username/pesatrack/internal/models"
)

func CreateTransaction(
	transaction *models.Transaction,
) error {

	_, err := database.DB.Exec(
		context.Background(),
		`
		INSERT INTO transactions
		(
			id,
			business_id,
			category_id,
			title,
			description,
			amount,
			transaction_type,
			payment_method,
			transaction_date,
			created_at
		)
		VALUES
		($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
		`,
		transaction.ID,
		transaction.BusinessID,
		transaction.CategoryID,
		transaction.Title,
		transaction.Description,
		transaction.Amount,
		transaction.TransactionType,
		transaction.PaymentMethod,
		transaction.TransactionDate,
		transaction.CreatedAt,
	)

	return err
}

func CreateTransactionTx(
	ctx context.Context,
	tx pgx.Tx,
	transaction *models.Transaction,
) error {

	_, err := tx.Exec(
		ctx,
		`
		INSERT INTO transactions
		(
			id,
			business_id,
			category_id,
			title,
			description,
			amount,
			transaction_type,
			payment_method,
			transaction_date,
			created_at
		)
		VALUES
		($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
		`,
		transaction.ID,
		transaction.BusinessID,
		transaction.CategoryID,
		transaction.Title,
		transaction.Description,
		transaction.Amount,
		transaction.TransactionType,
		transaction.PaymentMethod,
		transaction.TransactionDate,
		transaction.CreatedAt,
	)

	return err
}

func GetTransactionsByBusiness(
	businessID uuid.UUID,
) ([]models.Transaction, error) {

	transactions := make([]models.Transaction, 0)

	rows, err := database.DB.Query(
		context.Background(),
		`
		SELECT
			id,
			business_id,
			category_id,
			title,
			description,
			amount,
			transaction_type,
			payment_method,
			transaction_date,
			created_at
		FROM transactions
		WHERE business_id=$1
		ORDER BY created_at DESC
		`,
		businessID,
	)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {

		var transaction models.Transaction

		err := rows.Scan(
			&transaction.ID,
			&transaction.BusinessID,
			&transaction.CategoryID,
			&transaction.Title,
			&transaction.Description,
			&transaction.Amount,
			&transaction.TransactionType,
			&transaction.PaymentMethod,
			&transaction.TransactionDate,
			&transaction.CreatedAt,
		)

		if err != nil {
			return nil, err
		}

		transactions = append(
			transactions,
			transaction,
		)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return transactions, nil
}
