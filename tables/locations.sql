CREATE TABLE locations(
    id SERIAL PRIMARY KEY,
    address VARCHAR(255) NOT NULL CHECK(address != ''),
    lat VARCHAR(255) NOT NULL,
    lng VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    market_type VARCHAR(255),
    mate_var VARCHAR(255),
    descr VARCHAR(255),
    approved BOOLEAN DEFAULT false,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);