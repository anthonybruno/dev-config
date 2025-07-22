import winston from 'winston';

/**
 * Creates a logger instance with standard log levels.
 *
 * @param serviceName - Name of the service or module using the logger.
 * @returns A Winston logger instance.
 */
export function createLogger({
  serviceName,
}: {
  serviceName: string;
}): winston.Logger {
  const isProd = process.env.NODE_ENV === 'production';
  const logLevel = process.env.LOG_LEVEL ?? 'info';

  return winston.createLogger({
    level: logLevel,
    levels: winston.config.npm.levels,
    defaultMeta: { service: serviceName },
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      isProd
        ? winston.format.json()
        : winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
    ),
    transports: [new winston.transports.Console()],
  });
}
