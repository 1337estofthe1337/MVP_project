DROP TABLE IF EXISTS info;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS users;

CREATE TYPE category_enum AS ENUM(
    'location/maps',
    'characters',
    'equipment',
    'lore',
    'online',
    'multiplayer',
    'easter-eggs',
    'achievements',
    'video-guides',
    'website-guides',
    'other'
);

CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    website_title VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS games(
    id SERIAL PRIMARY KEY,
    gametitle VARCHAR(255) NOT NULL,
    userid INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS info(
    id SERIAL PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    category category_enum,
    gameid INTEGER REFERENCES games(id) ON DELETE CASCADE
);
