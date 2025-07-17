import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

type SchemaSet = {
  body?: ZodType<any>;
  query?: ZodType<any>;
  params?: ZodType<any>;
  headers?: ZodType<any>;
};

export const validate = (schemas: SchemaSet) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) req.body = schemas.body.parse(req.body);
      if (schemas.query) req.query = schemas.query.parse(req.query);
      if (schemas.params) req.params = schemas.params.parse(req.params);
      if (schemas.headers) req.headers = schemas.headers.parse(req.headers);
      next();
    } catch (err: any) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: err.errors?.map((e: any) => ({
          path: e.path.join('.'),
          message: e.message,
        })) ?? [err.message],
      });
    }
  };
};
