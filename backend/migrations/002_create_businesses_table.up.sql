CREATE TABLE businesses (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    business_name VARCHAR(150) NOT NULL,

    business_type VARCHAR(100),

    phone_number VARCHAR(20),

    email VARCHAR(150),

    address TEXT,

    currency VARCHAR(10) DEFAULT 'TZS',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT fk_business_user
    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

