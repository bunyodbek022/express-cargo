import { ApiError } from '../errors/apiError.js'
import logger from '../utils/logger.js'

// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, req, res, next) {
  // Agar bu biz yaratgan ApiError bo‘lsa:
  if (err instanceof ApiError) {
    // Log yozish (xavfsizlik uchun request haqida qisqacha ma’lumot ham)
    if (err.statusCode >= 500) {
      logger.error(
        `SERVER ERROR ${err.statusCode}: ${err.message} | URL: ${req.originalUrl} | Method: ${req.method}`
      )
    } else {
      logger.warn(
        `CLIENT ERROR ${err.statusCode}: ${err.message} | URL: ${req.originalUrl} | Method: ${req.method}`
      )
    }

    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    })
  }

  // Agar bu ApiError bo‘lmasa (masalan, runtime error)
  logger.error(
    `UNEXPECTED ERROR: ${err.message} | Stack: ${err.stack || 'no stack'}`
  )

  return res.status(500).json({
    success: false,
    message: 'Serverda kutilmagan xatolik yuz berdi!',
  })
}
