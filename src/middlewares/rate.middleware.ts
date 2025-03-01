import { envConf } from "../configs/env.config";
import rateLimit from "express-rate-limit";

export const rateLimiterMiddleware = rateLimit({
  max: envConf.rateLimitMaxReq,
  legacyHeaders: true,
  message: "Too many requests, please try again after 30 seconds!",
  standardHeaders: true,
  windowMs: envConf.rateLimitWinMs * 1000 * 30,
});
