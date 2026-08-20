package repository

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"

	"github.com/username/pesatrack/internal/database"
	"github.com/username/pesatrack/internal/models"
)

func CreateProduct(
	product *models.Product,
) error {

	query := `
		INSERT INTO products
		(
			id,
			business_id,
			name,
			description,
			quantity,
			buying_price,
			selling_price
		)
		VALUES
		($1,$2,$3,$4,$5,$6,$7)
	`

	_, err := database.DB.Exec(
		context.Background(),
		query,
		product.ID,
		product.BusinessID,
		product.Name,
		product.Description,
		product.Quantity,
		product.BuyingPrice,
		product.SellingPrice,
	)

	return err
}

func GetProductsByBusiness(
	businessID uuid.UUID,
) ([]models.Product, error) {

	rows, err := database.DB.Query(
		context.Background(),
		`
		SELECT
			id,
			business_id,
			name,
			description,
			quantity,
			buying_price,
			selling_price,
			created_at,
			updated_at
		FROM products
		WHERE business_id=$1
		`,
		businessID,
	)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	products := make([]models.Product, 0)

	for rows.Next() {

		var product models.Product

		err := rows.Scan(
			&product.ID,
			&product.BusinessID,
			&product.Name,
			&product.Description,
			&product.Quantity,
			&product.BuyingPrice,
			&product.SellingPrice,
			&product.CreatedAt,
			&product.UpdatedAt,
		)

		if err != nil {
			return nil, err
		}

		products = append(products, product)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return products, nil
}

func GetProductByID(
	productID uuid.UUID,
) (*models.Product, error) {

	var product models.Product

	err := database.DB.QueryRow(
		context.Background(),
		`
		SELECT
			id,
			business_id,
			name,
			description,
			quantity,
			buying_price,
			selling_price,
			created_at,
			updated_at
		FROM products
		WHERE id=$1
		`,
		productID,
	).Scan(
		&product.ID,
		&product.BusinessID,
		&product.Name,
		&product.Description,
		&product.Quantity,
		&product.BuyingPrice,
		&product.SellingPrice,
		&product.CreatedAt,
		&product.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &product, nil
}

func UpdateProductQuantity(
	productID uuid.UUID,
	quantity int,
) error {

	_, err := database.DB.Exec(
		context.Background(),
		`
		UPDATE products
		SET quantity = quantity + $1
		WHERE id=$2
		`,
		quantity,
		productID,
	)

	return err
}

/*
Atomic stock update.

For STOCK OUT, PostgreSQL itself checks whether
enough stock exists.

If quantity is not enough, no row is updated.
*/
func UpdateProductQuantityTx(
	ctx context.Context,
	tx pgx.Tx,
	productID uuid.UUID,
	quantity int,
) (*models.Product, error) {

	var product models.Product

	err := tx.QueryRow(
		ctx,
		`
		UPDATE products
		SET quantity = quantity + $1,
			updated_at = NOW()
		WHERE id = $2
		AND quantity + $1 >= 0
		RETURNING
			id,
			business_id,
			name,
			description,
			quantity,
			buying_price,
			selling_price,
			created_at,
			updated_at
		`,
		quantity,
		productID,
	).Scan(
		&product.ID,
		&product.BusinessID,
		&product.Name,
		&product.Description,
		&product.Quantity,
		&product.BuyingPrice,
		&product.SellingPrice,
		&product.CreatedAt,
		&product.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &product, nil
}

func GetProductByIDTx(
	ctx context.Context,
	tx pgx.Tx,
	productID uuid.UUID,
) (*models.Product, error) {

	var product models.Product

	err := tx.QueryRow(
		ctx,
		`
		SELECT
			id,
			business_id,
			name,
			description,
			quantity,
			buying_price,
			selling_price,
			created_at,
			updated_at
		FROM products
		WHERE id=$1
		FOR UPDATE
		`,
		productID,
	).Scan(
		&product.ID,
		&product.BusinessID,
		&product.Name,
		&product.Description,
		&product.Quantity,
		&product.BuyingPrice,
		&product.SellingPrice,
		&product.CreatedAt,
		&product.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &product, nil
}

func GetLowStockProducts(
	businessID uuid.UUID,
) ([]models.Product, error) {

	rows, err := database.DB.Query(
		context.Background(),
		`
		SELECT
			id,
			business_id,
			name,
			description,
			quantity,
			buying_price,
			selling_price,
			created_at,
			updated_at
		FROM products
		WHERE business_id=$1
		AND quantity <= 5
		ORDER BY quantity ASC
		`,
		businessID,
	)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	products := make([]models.Product, 0)

	for rows.Next() {

		var product models.Product

		err := rows.Scan(
			&product.ID,
			&product.BusinessID,
			&product.Name,
			&product.Description,
			&product.Quantity,
			&product.BuyingPrice,
			&product.SellingPrice,
			&product.CreatedAt,
			&product.UpdatedAt,
		)

		if err != nil {
			return nil, err
		}

		products = append(products, product)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return products, nil
}
