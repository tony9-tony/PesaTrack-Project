package repository

import (
	"context"

	"github.com/username/pesatrack/internal/database"
	"github.com/username/pesatrack/internal/models"
)

func CreateUser(user *models.User) error {

	query := `
	INSERT INTO users 
	(
		id,
		full_name,
		email,
		phone_number,
		password_hash,
		role,
		is_verified,
		is_active
	)
	VALUES
	(
		$1,$2,$3,$4,$5,$6,$7,$8
	)
	`

	_, err := database.DB.Exec(
		context.Background(),
		query,
		user.ID,
		user.FullName,
		user.Email,
		user.PhoneNumber,
		user.PasswordHash,
		user.Role,
		user.IsVerified,
		user.IsActive,
	)

	return err
}


func GetUserByEmail(email string) (*models.User, error) {

	query := `
	SELECT
		id,
		full_name,
		email,
		phone_number,
		password_hash,
		role,
		is_verified,
		is_active,
		created_at,
		updated_at
	FROM users
	WHERE email=$1
	`

	user := &models.User{}

	err := database.DB.QueryRow(
		context.Background(),
		query,
		email,
	).Scan(
		&user.ID,
		&user.FullName,
		&user.Email,
		&user.PhoneNumber,
		&user.PasswordHash,
		&user.Role,
		&user.IsVerified,
		&user.IsActive,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return user, nil
}
