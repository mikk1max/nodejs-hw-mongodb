import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const error = createHttpError(
      400,
      `Validation failed: ${err.details
        .map((detail) => detail.message)
        .join('; ')}`,
      { errors: err.details },
    );
    next(error);
  }
};
