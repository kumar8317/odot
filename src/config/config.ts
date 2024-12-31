import dotenv from 'dotenv';
dotenv.config();

export const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret-key-for-development',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/task-manager',
  PORT: process.env.PORT || 5000,
};

export const { JWT_SECRET, JWT_EXPIRES_IN } = config;