import { createLogger, format, transports } from 'winston'
import rTracer from 'cls-rtracer'

const rTracerFormat = format((info) => {
  const rid = rTracer.id()
  info.message = rid ? `[request-id: ${rid}]: ${info.message}` : info.message
  return info
})

const logger = createLogger({
  level: 'silly',
  format: format.combine(rTracerFormat(), format.simple()),
  transports: [
    new transports.Console({
      level: 'silly',
      handleExceptions: true,
      format: format.combine(format.colorize(), format.simple())
    })
  ]
})

export default logger
