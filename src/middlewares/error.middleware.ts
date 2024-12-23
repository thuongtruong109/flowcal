import { logger } from "@/configs/log.config";
import type { HttpException } from "@/helpers/exception.helper";
import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";

const ErrorHandler: ErrorRequestHandler = (
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
      stack: err.stack || "No stack defined",
    });
  } catch (error) {
    next(error);
  }
};

export default ErrorHandler;
