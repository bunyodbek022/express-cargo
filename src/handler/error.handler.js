/* eslint-disable no-unused-vars */

import logger from '../utils/logger.js';
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack || err.message);
  const statusCode = err.statusCode || 500;

  logger.error(
    `${req.method} ${req.originalUrl} - ${statusCode} - ${err.message}`,
  );

  if (err.stack) {
    logger.error(err.stack);
  }
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Serverda kutilmagan xato yuz berdi',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};