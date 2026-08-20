package services

import (
	"errors"
	"strings"

	"github.com/google/uuid"

	"github.com/username/pesatrack/internal/models"
	"github.com/username/pesatrack/internal/repository"
)

func CreateBusiness(
	userID uuid.UUID,
	business models.Business,
) (*models.Business, error) {

	if business.BusinessName == "" {
		return nil, errors.New("business name is required")
	}

	if business.Currency == "" {
		business.Currency = "TZS"
	}

	business.ID = uuid.New()

	business.UserID = userID

	err := repository.CreateBusiness(&business)

	if err != nil {
		return nil, err
	}

	// Create default categories automatically
	err = CreateDefaultCategories(business.ID)

	if err != nil {
		return nil, err
	}

	return &business, nil
}

func GetUserBusinesses(
	userID uuid.UUID,
) ([]models.Business, error) {

	return repository.GetBusinessesByUser(userID)
}

func GetBusinessByIDAndUser(
	businessID uuid.UUID,
	userID uuid.UUID,
) (*models.Business, error) {

	return repository.GetBusinessByIDAndUser(
		businessID,
		userID,
	)
}

func CreateDefaultCategories(
	businessID uuid.UUID,
) error {

	defaultCategories := []struct {
		Name string
		Type string
	}{
		{"Sales", "INCOME"},
		{"Other Income", "INCOME"},
		{"Stock", "EXPENSE"},
		{"Transport", "EXPENSE"},
		{"Marketing", "EXPENSE"},
		{"Rent", "EXPENSE"},
	}

	for _, item := range defaultCategories {

		category := models.Category{
			ID:         uuid.New(),
			BusinessID: businessID,
			Name:       item.Name,
			Type:       strings.ToUpper(item.Type),
		}

		err := repository.CreateCategory(&category)

		if err != nil {
			return err
		}
	}

	return nil
}
