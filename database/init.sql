CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    lastname VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(id), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL

);

-- Insertar roles predeterminados
INSERT INTO roles (name) VALUES ('ADMIN'), ('VETERINARIO'), ('USER');


CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    breed VARCHAR(255) NOT NULL,
    species VARCHAR(255) NOT NULL,
    weight DECIMAL(5, 2),
    birth_date DATE, -- Nueva columna para la fecha de nacimiento
    color VARCHAR(255),
    size VARCHAR(255),
    reproductive_status VARCHAR(255),
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
