package services

import (
	"github.com/google/uuid"

	"github.com/username/pesatrack/internal/repository"
)



func GetDashboard(
	businessID uuid.UUID,
) (*repository.DashboardData, error) {


	dashboard, err := repository.GetDashboardData(
		businessID,
	)


	if err != nil {
		return nil, err
	}



	return dashboard, nil

}
