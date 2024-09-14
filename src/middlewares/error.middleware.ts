import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
dotenv.config();

import { HttpException } from "../helpers/exception.helper";
import { logger } from "../configs/log.config";

const ErrorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errStatus = err.status || 500;
    const errMsg = err.message || "Something wen wrong";
    logger.error(
      `StatusCode:: ${errStatus} - Message:: ${errMsg} - URL:: ${req.originalUrl} - Method:: ${req.method} - IPAddress:: ${req.ip}`
    );
    res.status(500).json({
      success: false,
      status: errStatus,
      message: errMsg,
      stack: process.env.NODE_ENV === "development" ? err.stack : {},
    });
  } catch (error) {
    next(error);
  }
};

export default ErrorHandler;
