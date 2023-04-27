import { Error as MongooseError } from 'mongoose';
import { errorsMiddleware } from './errors.middlewares';
import { Response, Request } from 'express';
import { HTTPError } from '../errors/errors';

describe('Given the errorsMiddleware', () => {
  const resp = {
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;
  const req = {} as unknown as Request;

  describe('When there is a Mongoose Cast Error', () => {
    test('Then the status error should be 400', () => {
      const castError = new MongooseError.CastError(
        '400',
        'Bad formatted data in the request',
        'Cast error'
      );
      errorsMiddleware(castError, req, resp);
      expect(resp.status).toHaveBeenCalledWith(400);
    });
  });
  describe('When there is a Mongoose Validation Error', () => {
    test('Then the status error should be 406', () => {
      const validationError = new MongooseError.ValidationError();
      errorsMiddleware(validationError, req, resp);
      expect(resp.status).toHaveBeenCalledWith(406);
    });
  });

  describe('When there is a HTTP Error', () => {
    test('Then the status error should be, for example, 401', () => {
      const error = new HTTPError(401, 'Unauthorized', 'HTTP Error');
      errorsMiddleware(error, req, resp);
      expect(resp.status).toHaveBeenCalledWith(401);
    });
  });
  describe('When there is another error', () => {
    test('Then the status error should be 500', () => {
      const error = new Error('');
      errorsMiddleware(error, req, resp);
      expect(resp.status).toBeCalledWith(500);
    });
  });
});
