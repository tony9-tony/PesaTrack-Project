CREATE TABLE stock_movements (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    product_id UUID NOT NULL,

    movement_type VARCHAR(20) NOT NULL,

    quantity INTEGER NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT fk_stock_product

    FOREIGN KEY(product_id)

    REFERENCES products(id)

    ON DELETE CASCADE
);
