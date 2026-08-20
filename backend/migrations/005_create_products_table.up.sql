CREATE TABLE products (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    business_id UUID NOT NULL,

    name VARCHAR(150) NOT NULL,

    description TEXT,

    quantity INTEGER NOT NULL DEFAULT 0,

    buying_price DECIMAL(12,2) NOT NULL DEFAULT 0,

    selling_price DECIMAL(12,2) NOT NULL DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT fk_product_business

    FOREIGN KEY(business_id)

    REFERENCES businesses(id)

    ON DELETE CASCADE
);
