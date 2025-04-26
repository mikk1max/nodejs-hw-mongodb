import createHttpError from 'http-errors';
import { findSession, findUser } from '../services/auth.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return next(createHttpError(401, 'Please provide Authorization header'));
  }

  const [bearer, accessToken] = authHeader.split(' ');

  if (bearer !== 'Bearer') {
    return next(createHttpError(401, 'Header must have type Bearer'));
  }

  const session = await findSession({ accessToken });
  if (!session) {
    return next(createHttpError(401, 'Session is not found'));
  }

  if (session.accessTokenValidUntil < Date.now()) {
    return next(createHttpError(401, 'Access token has been expired'));
  }

  const user = await findUser({ _id: session.userId });
  if (!user) {
    return next(createHttpError(401, 'User is not found'));
  }

  req.user = user;

  next();
};
