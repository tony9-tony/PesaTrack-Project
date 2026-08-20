CREATE TABLE transactions (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    business_id UUID NOT NULL,

    category_id UUID,

    title VARCHAR(150) NOT NULL,

    description TEXT,

    amount DECIMAL(12,2) NOT NULL,

    transaction_type VARCHAR(20) NOT NULL,

    payment_method VARCHAR(50),

    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT fk_transaction_business
    FOREIGN KEY(business_id)
    REFERENCES businesses(id)
    ON DELETE CASCADE,


    CONSTRAINT fk_transaction_category
    FOREIGN KEY(category_id)
    REFERENCES categories(id)
    ON DELETE SET NULL
);
