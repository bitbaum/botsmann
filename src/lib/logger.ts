import pino from 'pino';

const level = process.env.LOG_LEVEL || (process.env.NODE_ENV === 'development' ? 'info' : 'silent');

export const logger = pino({ level });

export default logger;
