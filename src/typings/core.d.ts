import { connection } from 'mongoose';

declare global {
    namespace NodeJS {
        interface Global {
            dbConnection: typeof connection;
            currentDb: typeof connection;
        }
    }

    namespace Express {
        interface Request {
            tenantId?: string;
        }
    }
}
