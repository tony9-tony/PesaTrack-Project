package services

import (
	"errors"

	"github.com/google/uuid"

	"github.com/username/pesatrack/internal/models"
	"github.com/username/pesatrack/internal/repository"
)



func CreateCategory(
	businessID uuid.UUID,
	category models.Category,
) (*models.Category,error) {


	if category.Name == "" {
		return nil, errors.New("category name is required")
	}



	category.ID = uuid.New()


	category.BusinessID = businessID



	err := repository.CreateCategory(
		&category,
	)



	if err != nil {
		return nil,err
	}



	return &category,nil

}




func GetBusinessCategories(
	businessID uuid.UUID,
) ([]models.Category,error) {


	return repository.GetCategories(
		businessID,
	)

}
