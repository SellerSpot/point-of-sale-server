import { DB_NAMES } from '@sellerspot/database-models';

export const CONFIG = {
    ENV: process.env.ENV,
    PORT: JSON.parse(process.env.PORT),
    DATABASE_SERVER_URL: process.env.DATABASE_SERVER_URL,
    DATABASE_SERVER_QUERY: process.env.DATABASE_SERVER_QUERY,
    GET_DATABASE_CONNECTION_URL: (): string =>
        CONFIG.DATABASE_SERVER_URL + DB_NAMES.BASE_DB + CONFIG.DATABASE_SERVER_QUERY,
    APP_SECRET: process.env.APP_SECRET,
    CLIENT_BASE_DOMAIN_FOR_APPS: process.env.CLIENT_BASE_DOMAIN_FOR_APPS,
};

export * from './databaseConfig';
export * from './expressMiddlewares';
