// feature specifig config can have separtate configfile in this directory and export * should be made here for that paritucular config
export * from './databaseConfig';
export * from './expressMiddlewares';

export const CONFIG = {
    ENV: process.env.ENV,
    PORT: JSON.parse(process.env.PORT),
    DATABASE_SERVER_URL: process.env.DATABASE_SERVER_URL,
    DATABASE_SERVER_QUERY: process.env.DATABASE_SERVER_QUERY,
    BASE_DB_NAME: process.env.BASE_DB_NAME,
    GET_DATABASE_CONNECTION_URL: (): string =>
        CONFIG.DATABASE_SERVER_URL + CONFIG.BASE_DB_NAME + CONFIG.DATABASE_SERVER_QUERY,
    APP_SECRET: process.env.APP_SECRET,
    CLIENT_BASE_DOMAIN_FOR_APPS: process.env.CLIENT_BASE_DOMAIN_FOR_APPS,
};
