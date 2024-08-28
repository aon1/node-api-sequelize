const winston = require('winston');
const rTracer = require('cls-rtracer');

const { transports } = winston;

const options = {
  level: 'debug',
  console: true,
  file: '',
  http: false,
  https: false,
};

const MESSAGE = Symbol.for('message');
const jsonFormatter = (info) => {
  const requestId = rTracer.id();
  const base = { timestamp: new Date(), requestId };
  const json = Object.assign(base, info);
  info[MESSAGE] = JSON.stringify(json);
  return info;
};

const logger = winston.createLogger({
  level: options.level,
  format: winston.format(jsonFormatter)(),
});

if (options.console) logger.add(new transports.Console());

logger.stream.write = (message) => {
  logger.info(message.trim());
};

module.exports = logger;
