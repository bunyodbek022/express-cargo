import logger from '../utils/logger.js'

export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    
    // stack trace saqlash (diagnostika uchun)
    Error.captureStackTrace(this, this.constructor);

    // Xatolik haqida log yozish
    if (statusCode >= 500) {
      logger.error(`SERVER ERROR ${statusCode}: ${message}`);
    } else {
      logger.warn(`CLIENT ERROR ${statusCode}: ${message}`);
    }
  }
}
