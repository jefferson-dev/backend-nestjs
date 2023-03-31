import { Request, Response, NextFunction } from 'express';
import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';

type StorageData = { id: string };

const localStorage = new AsyncLocalStorage<StorageData>();

export const TracerMiddleware = async (_req: Request, _res: Response, next: NextFunction) => {
  await localStorage.run({ id: randomUUID() }, async () => next());
};

export const GetTracerId = (): string => {
  return localStorage.getStore().id;
};
