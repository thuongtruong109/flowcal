import { envConf } from "@/configs/env.config";
import rateLimit from "express-rate-limit";

export const rateLimiterMiddleware = rateLimit({
  max: envConf.RATE_LIMIT_MAX_REQUESTS,
  legacyHeaders: true,
  message: "Too many requests, please try again after 60 seconds!",
  standardHeaders: true,
  windowMs: envConf.RATE_LIMIT_WINDOW_MS * 60 * 1000,
});
