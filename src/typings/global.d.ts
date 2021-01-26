import { connection } from 'mongoose';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENV: 'development' | 'production';
            APP_NAME: string;
            APP_VERSION: string;
            PORT: string;
            DATABASE_SERVER_URL: string;
            DATABASE_SERVER_QUERY: string;
            APP_SECRET: string;
            CLIENT_BASE_DOMAIN_FOR_APPS: string;
        }

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

// convert it into a module by adding an empty export statement.
export {};
