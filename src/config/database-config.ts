import { NextFunction, RequestHandler, Request, Response } from 'express';
import mongoose from 'mongoose';
import { CONFIG } from '.';

export const configureDB = (): void => {
    global.dbConnection = mongoose.createConnection(CONFIG.GET_DATABASE_CONNECTION_URL(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    global.dbConnection.on('error', (error) =>
        console.log('database: Error Connecting to', CONFIG.BASE_DB_NAME, error.message),
    );
    global.dbConnection.once('open', () => console.log('database: Connected to', CONFIG.BASE_DB_NAME));
    global.currentDb = global.dbConnection.useDb(CONFIG.BASE_DB_NAME);
};

export const setCurrentDB: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    req.tenantId = CONFIG.BASE_DB_NAME;
    if (CONFIG.ENV === 'development') {
        global.currentDb = global.dbConnection.useDb(req.tenantId);
        console.log('database: Connected to', req.tenantId);
    } else {
        console.log('database: Connected to', req.tenantId);
    }
    next();
};
