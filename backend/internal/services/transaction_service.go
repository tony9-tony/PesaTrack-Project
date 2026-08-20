package services

import (
	"errors"
	"time"

	"github.com/google/uuid"

	"github.com/username/pesatrack/internal/models"
	"github.com/username/pesatrack/internal/repository"
)


func CreateTransaction(
	userID uuid.UUID,
	transaction models.Transaction,
) (*models.Transaction, error) {


	if transaction.Title == "" {

		return nil, errors.New("transaction title is required")

	}


	if transaction.Amount <= 0 {

		return nil, errors.New("amount must be greater than zero")

	}


	if transaction.TransactionType == "" {

		return nil, errors.New("transaction type is required")

	}


	transaction.ID = uuid.New()

	transaction.TransactionDate = time.Now()

	transaction.CreatedAt = time.Now()


	err := repository.CreateTransaction(&transaction)

	if err != nil {

		return nil, err

	}


	return &transaction, nil
}



func GetBusinessTransactions(
	businessID uuid.UUID,
) ([]models.Transaction, error) {


	return repository.GetTransactionsByBusiness(businessID)

}
