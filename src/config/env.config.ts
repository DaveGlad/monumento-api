import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// JWT Configuration
export const jwtConfig = {
  privateKey: process.env.JWT_PRIVATE_KEY || '',
  publicKey: process.env.JWT_PUBLIC_KEY || '',
  algorithm: process.env.JWT_ALGORITHM || 'RS256',
  accessTokenExpiry: process.env.JWT_ACCESS_TOKEN_EXPIRY || '30m',
  refreshTokenExpiry: process.env.JWT_REFRESH_TOKEN_EXPIRY || '7d'
};

// Database Configuration
export const dbConfig = {
  name: process.env.DB_NAME || 'monumento',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '8889'),
  dialect: process.env.DB_DIALECT || 'mysql'
};

// Server Configuration
export const serverConfig = {
  port: parseInt(process.env.PORT || '3000'),
  nodeEnv: process.env.NODE_ENV || 'development'
};
