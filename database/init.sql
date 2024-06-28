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
CREATE TABLE hospitalizations (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,  -- Relación con pacientes
    admission_date TIMESTAMP NOT NULL,                                       -- Fecha de ingreso
    estimated_days INT,                                                      -- Días estimados a hospitalizar
    patient_type VARCHAR(50),                                                -- Tipo de paciente (Infeccioso, No Infeccioso, Post Quirúrgico)
    hospitalization_type VARCHAR(50),                                        -- Tipo de hospitalización (Cuidados Intensivos, Normal)
    prognosis TEXT,                                                          -- Pronóstico
    belongings TEXT,                                    a                     -- Pertenencias
    observations TEXT,                                                       -- Observaciones
    diet TEXT,                                                               -- Dieta del paciente
    charge_service BOOLEAN,                                                  -- ¿Incluir cobro del servicio?
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,                          -- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,                     -- Fecha de última actualización
    is_hospitalized BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE hospedaje (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE;
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
