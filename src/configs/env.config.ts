import dotenv from "dotenv";
dotenv.config();

export const envConf = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.APP_PORT ? Number.parseInt(process.env.APP_PORT) : 3000,
  appUrl: process.env.APP_URL || "http://localhost:3000",
  corsOrigin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",")
    : "*",
  rateLimitMaxReq: process.env.RATE_LIMIT_MAX_REQUESTS
    ? Number.parseInt(process.env.RATE_LIMIT_MAX_REQUESTS)
    : 500,
  rateLimitWinMs: process.env.RATE_LIMIT_WINDOW_MS
    ? Number.parseInt(process.env.RATE_LIMIT_WINDOW_MS)
    : 1,

  dbName: process.env.DB_NAME || "boardly",
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/boardly",

  secretKey: process.env.SECRET_KEY || "secret-key",
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "access-token-secret",
  accessTokenKey: process.env.ACCESS || "access-token",
  accessTokenLife: process.env.ACCESS_TOKEN_LIFE || "1h",
  refreshTokenKey: process.env.REFRESH_TOKEN_KEY || "refresh-token",
  refreshTokenLife: process.env.REFRESH_TOKEN_LIFE || "7d",

  emailUsername: process.env.EMAIL_USERNAME,
  emailPassword: process.env.EMAIL_PASSWORD,

  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
};
