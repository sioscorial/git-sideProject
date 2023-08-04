import { Request, Response, NextFunction } from 'express';

export const catchAsync = (func: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((error: Error) => next(error));
  };
};

export const globalErrorHandler = (err: { stack: any, statusCode?: number, message: string }, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({ message: err.message});
};
