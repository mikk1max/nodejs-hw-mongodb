import pino from 'pino-http';

export const logger = pino({
  quietReqLogger: true,
  transport: {
    target: 'pino-pretty',
    options: {
      destination: 1,
      all: true,
      translateTime: true,
    },
  },
});
