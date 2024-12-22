import dotenv from "dotenv";
dotenv.config();

export const envConf = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT ? Number.parseInt(process.env.PORT) : 3000,
  APP_URL: process.env.APP_URL || "http://localhost:3000",
  CORS_ORIGIN: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",")
    : "*",
  RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS
    ? Number.parseInt(process.env.RATE_LIMIT_MAX_REQUESTS)
    : 100,
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS
    ? Number.parseInt(process.env.RATE_LIMIT_WINDOW_MS)
    : 1,

  DB_NAME: process.env.DB_NAME || "boardly",
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/boardly",

  SECRET_KEY: process.env.SECRET_KEY || "secret-key",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "access-token-secret",
  ACCESS_TOKEN_KEY: process.env.ACCESS || "access-token",
  ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE || "1h",
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY || "refresh-token",
  REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE || "1d",

  EMAIL_USERNAME: process.env.EMAIL_USERNAME,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
};
