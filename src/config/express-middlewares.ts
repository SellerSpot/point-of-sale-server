import express from 'express';
import morgan from 'morgan';
import { CONFIG } from '.';

export const applyExpressMiddlewares = (app: express.Application): void => {
    app.use(morgan(CONFIG.ENV === 'development' ? 'dev' : 'short'));
};
