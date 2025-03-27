import pino from 'pino-http';

export const logger = pino({
  quietReqLogger: true, // turn off the default logging output
  transport: {
    target: 'pino-pretty',
    options: {
      destination: 1,
      all: true,
      translateTime: true,
    },
  },
});
