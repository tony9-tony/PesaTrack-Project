package services

import (
	"github.com/google/uuid"

	"github.com/username/pesatrack/internal/repository"
)


func GetBusinessReport(
	businessID uuid.UUID,
) (*repository.ReportData,error) {


	report, err := repository.GetReportData(
		businessID,
	)


	if err != nil {
		return nil,err
	}



	return report,nil

}
