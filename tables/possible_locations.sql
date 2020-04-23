CREATE TABLE possible_locations(
    id SERIAL PRIMARY KEY,
    address VARCHAR(255) NOT NULL CHECK(address != ''),
    lat_lng NOT NULL,
    name VARCHAR(255),
    market_type VARCHAR(255),
    mate_var VARCHAR(255),
    desc VARCHAR,
    approved BOOLEAN DEFAULT false,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);