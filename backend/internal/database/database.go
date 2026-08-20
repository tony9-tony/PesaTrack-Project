package database

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

var DB *pgxpool.Pool


func Connect() error {


	err := godotenv.Load()

	if err != nil {

		fmt.Println("Warning: .env file not loaded")

	}


	connString := os.Getenv("DATABASE_URL")


	if connString == "" {

		return fmt.Errorf("DATABASE_URL is empty")

	}



	DB, err = pgxpool.New(
		context.Background(),
		connString,
	)


	if err != nil {

		return err

	}



	err = DB.Ping(
		context.Background(),
	)


	if err != nil {

		return err

	}



	fmt.Println("Database connected successfully")


	return nil
}
