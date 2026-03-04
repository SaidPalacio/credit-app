CREATE TABLE credits (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(150) NOT NULL,
    client_id VARCHAR(20) NOT NULL,
    amount NUMERIC(15,2) NOT NULL,
    interest NUMERIC(5,2) NOT NULL,
    term_months INT NOT NULL,
    commercial_name VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
