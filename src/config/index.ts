// feature specifig config can have separtate configfile in this directory and export * should be made here for that paritucular config
export * from './database-config';
export * from './express-middlewares';

export const CONFIG = {
    ENV: 'development', //development | production
    PORT: 8000,
    DATABASE_SERVER_URL: 'mongodb://127.0.0.1:27017/',
    BASE_DB_NAME: 'pos-base',
    GET_DATABASE_CONNECTION_URL: (): string => CONFIG.DATABASE_SERVER_URL + CONFIG.BASE_DB_NAME,
};
