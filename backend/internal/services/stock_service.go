package services

import (
	"context"
	"fmt"
	"time"

	"github.com/google/uuid"

	"github.com/username/pesatrack/internal/database"
	"github.com/username/pesatrack/internal/models"
	"github.com/username/pesatrack/internal/repository"
)

func CreateStockMovement(
	movement models.StockMovement,
) error {

	if movement.Quantity <= 0 {
		return fmt.Errorf("quantity must be greater than zero")
	}

	if movement.MovementType != "IN" &&
		movement.MovementType != "OUT" {
		return fmt.Errorf("movement_type must be IN or OUT")
	}

	ctx := context.Background()

	tx, err := database.DB.Begin(ctx)

	if err != nil {
		return err
	}

	defer tx.Rollback(ctx)

	movement.ID = uuid.New()
	movement.CreatedAt = time.Now()

	/*
		STOCK IN
	*/

	if movement.MovementType == "IN" {

		_, err = repository.UpdateProductQuantityTx(
			ctx,
			tx,
			movement.ProductID,
			movement.Quantity,
		)

		if err != nil {
			return err
		}

		err = repository.CreateStockMovementTx(
			ctx,
			tx,
			movement,
		)

		if err != nil {
			return err
		}

		return tx.Commit(ctx)
	}

	/*
		STOCK OUT
	*/

	product, err := repository.GetProductByIDTx(
		ctx,
		tx,
		movement.ProductID,
	)

	if err != nil {
		return err
	}

	if product.Quantity < movement.Quantity {
		return fmt.Errorf("insufficient stock")
	}

	/*
		Reduce stock atomically.
	*/

	_, err = repository.UpdateProductQuantityTx(
		ctx,
		tx,
		movement.ProductID,
		-movement.Quantity,
	)

	if err != nil {
		return err
	}

	/*
		Save stock movement.
	*/

	err = repository.CreateStockMovementTx(
		ctx,
		tx,
		movement,
	)

	if err != nil {
		return err
	}

	/*
		Find automatic Sales category.
	*/

	salesCategory, err := repository.GetCategoryByNameTx(
		ctx,
		tx,
		product.BusinessID,
		"Sales",
	)

	if err != nil {
		return fmt.Errorf("sales category not found: %w", err)
	}

	/*
		Create automatic income transaction.
	*/

	transaction := models.Transaction{
		ID:              uuid.New(),
		BusinessID:      product.BusinessID,
		CategoryID:      &salesCategory.ID,
		Title:           "Sold " + product.Name,
		Description:     fmt.Sprintf("Customer bought %d units of %s", movement.Quantity, product.Name),
		Amount:          product.SellingPrice * float64(movement.Quantity),
		TransactionType: "INCOME",
		PaymentMethod:   "CASH",
		TransactionDate: time.Now(),
		CreatedAt:       time.Now(),
	}

	err = repository.CreateTransactionTx(
		ctx,
		tx,
		&transaction,
	)

	if err != nil {
		return err
	}

	/*
		Everything succeeded.
	*/

	return tx.Commit(ctx)
}

func GetStockMovements(
	productID uuid.UUID,
) ([]models.StockMovement, error) {

	return repository.GetStockMovements(productID)
}
