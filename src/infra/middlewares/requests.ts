import { Request, Response, NextFunction } from 'express';

export const loggerResquestMiddleware = async (req: Request, _: Response, next: NextFunction) => {
  console.log(
    `[${new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'medium' })}] ${req.method}: ${req.path}`,
  );

  next();
};
