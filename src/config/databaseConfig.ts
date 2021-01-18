import { NextFunction, RequestHandler, Request, Response } from 'express';
import mongoose from 'mongoose';
import { logger } from 'utilities/logger';
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
        logger('mongoose', `Error Connecting to ${CONFIG.BASE_DB_NAME}, ${error.message}`),
    );
    global.dbConnection.once('open', () =>
        logger('mongoose', `Connected to ${CONFIG.BASE_DB_NAME}`),
    );
    global.currentDb = global.dbConnection.useDb(CONFIG.BASE_DB_NAME);
    if (models.handshake === true) logger('mongoose', `Loaded All Monogoose Models`);
};

export const setCurrentDB: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    req.tenantId = CONFIG.BASE_DB_NAME;
    if (CONFIG.ENV === 'development') {
        global.currentDb = global.dbConnection.useDb(req.tenantId);
        logger('mongoose', `Connected to ${req.tenantId}`);
    } else {
        logger('mongoose', `Connected to ${req.tenantId}`);
    }
    next();
};
