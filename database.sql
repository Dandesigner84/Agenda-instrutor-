
-- Habilitar extensão geoespacial para busca por proximidade
CREATE EXTENSION IF NOT EXISTS postgis;

-- Tabelas de Autenticação e Perfis (Multi-tenant)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    consent_given BOOLEAN DEFAULT FALSE,
    consent_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE instructors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    experience_years INT DEFAULT 0,
    base_price DECIMAL(10, 2) NOT NULL,
    categories TEXT[] NOT NULL,
    base_address TEXT,
    location GEOGRAPHY(POINT, 4326), -- Indexação GIST
    rating_avg DECIMAL(3, 2) DEFAULT 0,
    is_approved BOOLEAN DEFAULT FALSE
);

CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    instructor_id UUID UNIQUE REFERENCES instructors(id) ON DELETE CASCADE,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    transmission VARCHAR(20) NOT NULL,
    plate_masked VARCHAR(10) NOT NULL
);

CREATE TABLE availability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    instructor_id UUID REFERENCES instructors(id) ON DELETE CASCADE,
    weekday INT NOT NULL, -- 0-6
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    UNIQUE(instructor_id, weekday, start_time)
);

CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    instructor_id UUID REFERENCES instructors(id),
    student_id UUID REFERENCES users(id),
    start_datetime TIMESTAMP NOT NULL,
    end_datetime TIMESTAMP NOT NULL,
    pickup_address TEXT NOT NULL,
    pickup_location GEOGRAPHY(POINT, 4326),
    distance_km DECIMAL(10, 2),
    base_price_snapshot DECIMAL(10, 2),
    distance_fee DECIMAL(10, 2),
    total_price DECIMAL(10, 2),
    status VARCHAR(20) DEFAULT 'SCHEDULED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices de Performance
CREATE INDEX idx_instructors_geo ON instructors USING GIST (location);
CREATE INDEX idx_lessons_datetime ON lessons(start_datetime);
CREATE INDEX idx_instructors_price ON instructors(base_price);
