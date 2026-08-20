CREATE TABLE categories (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    business_id UUID NOT NULL,

    name VARCHAR(100) NOT NULL,

    type VARCHAR(20) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT fk_category_business
    FOREIGN KEY(business_id)
    REFERENCES businesses(id)
    ON DELETE CASCADE
);
