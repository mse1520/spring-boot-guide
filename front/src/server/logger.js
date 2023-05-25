import winston, { format, transports } from 'winston';
import 'winston-daily-rotate-file';

export const createLogger = isDev => {
  const commonFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.printf(({ level, message, timestamp }) => {
      const _timestamp = isDev
        ? format.colorize({ colors: { time: 'gray' } }).colorize('time', timestamp)
        : timestamp;
      return `${_timestamp} ${level} ${message}`;
    })
  );

  const logger = winston.createLogger({ format: commonFormat });

  logger.add(new transports.Console({
    level: 'debug',
    format: format.combine(
      format.colorize(),
      commonFormat
    )
  }));

  if (!isDev)
    logger.add(new transports.DailyRotateFile({
      level: 'info',
      dirname: 'log',
      filename: 'app.%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '7d'
    }));

  const stream = {
    write: message => logger.info(message.replace('\n', ''))
  };

  return { logger, stream };
};