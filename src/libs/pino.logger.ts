import { pino, Logger as PinoInstance, transport } from 'pino';
import { app } from 'electron';

export interface Logger {
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  debug(message: string, ...args: unknown[]): void;
  error(message: string, error: Error, ...args: unknown[]): void;
}

export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const logDirectory = app.getPath('logs');

    const logFilePath = `${logDirectory}/rest.log`;
    console.log(logFilePath);

    const multiTransport = transport({
      target: logFilePath
    });

    this.logger = pino({}, multiTransport);
  }

  debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}
