import * as express from 'express';
import * as httpStatus from 'http-status';
import { APIError } from '../../utils/error';
import { ValidationError } from 'joi';

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
export function handler(err: APIError, req: express.Request, res: express.Response, next: express.NextFunction) {
  const response = {
    code: err.status,
    errors: err.errors,
    message: err.message || httpStatus['500_MESSAGE'],
    name: err.name,
    stack: err.stack,
  };

  // if (env !== 'development') {
  //   delete response.stack;
  // }

  res.status(err.status);
  res.json(response);
}

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
export function converterError(err: ValidationError | any, req: express.Request, res: express.Response, next: express.NextFunction) {
  let convertedError: any = err;

  if (err.isJoi) {
    convertedError = new APIError({
      errors: err.details,
      message: err.message,
      stack: err.stack,
      status: httpStatus.BAD_REQUEST,
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      stack: err.stack,
      status: err.status,
    });
  }
  return handler(convertedError, req, res, next);
}

/**
 * Catch 404 and forward to error handler
 * @public
 */
export function notFound(req: express.Request, res: express.Response, next: express.NextFunction) {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res, next);
}
