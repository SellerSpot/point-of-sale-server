import dotenv from 'dotenv';
import path from 'path';

export const getEnvironmentVariables = (isProduction = false): { [key: string]: string } => {
    const environmentVariables: { [key: string]: string } = {};
    try {
        const envConfig = isProduction
            ? dotenv.config()
            : dotenv.config({
                  path: path.resolve('./.env.development'),
              });
        if (envConfig.error) throw new Error(`Env file config error ${envConfig.error.message}`);
        if (envConfig.parsed) {
            // overriedes the machince's envirionment variables if any specified in .env file
            for (const k in envConfig.parsed) {
                environmentVariables[`process.env.${k}`] = JSON.stringify(envConfig.parsed[k]);
            }
        }
    } catch (error) {
        console.error(error);
    }
    return environmentVariables;
};
