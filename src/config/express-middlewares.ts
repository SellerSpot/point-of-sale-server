import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { CONFIG } from '.';

export const applyExpressMiddlewares = (app: express.Application): void => {
    app.use(express.json());
    app.use(cors());
    app.use(morgan(CONFIG.ENV === 'development' ? 'dev' : 'short'));
};
