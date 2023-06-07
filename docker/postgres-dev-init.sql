CREATE USER api_user with encrypted password 'api';
CREATE DATABASE api;
GRANT ALL PRIVILEGES ON DATABASE api TO api_user;
