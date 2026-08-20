package services

import (
	"github.com/google/uuid"

	"github.com/username/pesatrack/internal/models"
	"github.com/username/pesatrack/internal/repository"
)

func CreateProduct(
	product models.Product,
) (*models.Product, error) {

	product.ID = uuid.New()

	err := repository.CreateProduct(
		&product,
	)

	if err != nil {
		return nil, err
	}

	return &product, nil
}

func GetProducts(
	businessID uuid.UUID,
) ([]models.Product, error) {

	return repository.GetProductsByBusiness(
		businessID,
	)
}

func GetLowStockProducts(
	businessID uuid.UUID,
) ([]models.Product, error) {

	return repository.GetLowStockProducts(
		businessID,
	)
}
