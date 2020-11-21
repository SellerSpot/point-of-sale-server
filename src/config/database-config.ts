import { NextFunction, RequestHandler, Request, Response } from 'express';
import mongoose from 'mongoose';
import { CONFIG } from '.';
import * as models from '../models';

export const configureDB = (): void => {
    global.dbConnection = mongoose.createConnection(CONFIG.GET_DATABASE_CONNECTION_URL(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
    });
    global.dbConnection.on('error', (error) =>
        console.info('database: Error Connecting to', CONFIG.BASE_DB_NAME, error.message),
    );
    global.dbConnection.once('open', () => console.info('database: Connected to', CONFIG.BASE_DB_NAME));
    global.currentDb = global.dbConnection.useDb(CONFIG.BASE_DB_NAME);
    console.info('database: Loaded All Monogoose Models', models.handshake);
};

export const setCurrentDB: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    req.tenantId = CONFIG.BASE_DB_NAME;
    if (CONFIG.ENV === 'development') {
        global.currentDb = global.dbConnection.useDb(req.tenantId);
        console.info('database: Connected to', req.tenantId);
    } else {
        console.info('database: Connected to', req.tenantId);
    }
    next();
};
