// feature specifig config can have separtate configfile in this directory and export * should be made here for that paritucular config
export * from './database-config';
export * from './express-middlewares';

// global config should be under here
interface IConfig {
    ENV: 'development' | 'production';
    PORT: number;
    DATABASE_SERVER_URL: string;
    BASE_DB_NAME: string;
    GET_DATABASE_CONNECTION_URL: () => string;
}
export const CONFIG: IConfig = {
    ENV: 'development',
    PORT: 8000,
    DATABASE_SERVER_URL: 'mongodb://127.0.0.1:27017/',
    BASE_DB_NAME: 'pos-base',
    GET_DATABASE_CONNECTION_URL: (): string => CONFIG.DATABASE_SERVER_URL + CONFIG.BASE_DB_NAME,
};
