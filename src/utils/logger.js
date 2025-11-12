import winston from 'winston'

const { combine, timestamp, printf, colorize } = winston.format

// Log formatini aniqlaymiz
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`
})

// Logger yaratamiz
const logger = winston.createLogger({
  level: 'info', // minimal log darajasi
  format: combine(
    colorize(), // konsolda rangli chiqish uchun
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new winston.transports.Console(), // konsolga chiqarish
  ],
})

export default logger
