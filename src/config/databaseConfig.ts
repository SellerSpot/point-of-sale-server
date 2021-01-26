import { NextFunction, RequestHandler, Request, Response } from 'express';
import mongoose from 'mongoose';
import { logger } from 'utilities/logger';
import { CONFIG } from './config';
import * as models from '../models';
import { DB_NAMES } from '@sellerspot/database-models';

export const configureDB = (): void => {
    global.dbConnection = mongoose.createConnection(CONFIG.GET_DATABASE_CONNECTION_URL(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
    });
    global.dbConnection.on('error', (error) =>
        logger.mongoose(`Error Connecting to ${DB_NAMES.BASE_DB}, ${error.message}`),
    );
    global.dbConnection.once('open', () => logger.mongoose(`Connected to ${DB_NAMES.BASE_DB}`));
    global.currentDb = global.dbConnection.useDb(DB_NAMES.BASE_DB);
    if (models.handshake === true) logger.mongoose(`Loaded All Monogoose Models`);
};

export const setCurrentDB: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    req.tenantId = DB_NAMES.BASE_DB;
    if (CONFIG.ENV === 'development') {
        global.currentDb = global.dbConnection.useDb(req.tenantId);
        logger.mongoose(`Connected to ${req.tenantId}`);
    } else {
        logger.mongoose(`Connected to ${req.tenantId}`);
    }
    next();
};
