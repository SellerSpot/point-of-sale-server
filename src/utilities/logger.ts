import chalk from 'chalk';

type TLoggerTypes = 'common' | 'error' | 'warning' | 'express' | 'socketio' | 'mongoose' | 'debug';

const loggerBase = (message: string): void => {
    console.log(message);
};

export const logger: { [k in TLoggerTypes]: (...messages: unknown[]) => void } = {
    common: (...messages: unknown[]) =>
        loggerBase(
            `${chalk.blue.bold(`common:`)} ${chalk.white(
                messages.map((message) => JSON.stringify(message)).join(' '),
            )}`,
        ),
    error: (...messages: unknown[]) =>
        loggerBase(
            `${chalk.red.bold(`error:`)} ${chalk.white(
                messages.map((message) => JSON.stringify(message)).join(' '),
            )}`,
        ),
    express: (...messages: unknown[]) =>
        loggerBase(
            `${chalk.green.bold(`express:`)} ${chalk.white(
                messages.map((message) => JSON.stringify(message)).join(' '),
            )}`,
        ),
    mongoose: (...messages: unknown[]) =>
        loggerBase(
            `${chalk.yellow.bold(`mongoose:`)} ${chalk.white(
                messages.map((message) => JSON.stringify(message)).join(' '),
            )}`,
        ),
    socketio: (...messages: unknown[]) =>
        loggerBase(
            `${chalk.magenta.bold(`socketio:`)} ${chalk.white(
                messages.map((message) => JSON.stringify(message)).join(' '),
            )}`,
        ),
    warning: (...messages: unknown[]) =>
        loggerBase(
            `${chalk.bgYellow.black.bold(`warning:`)} ${chalk.white(
                messages.map((message) => JSON.stringify(message)).join(' '),
            )}`,
        ),
    debug: (...messages: unknown[]) =>
        loggerBase(
            `${chalk.bgBlue.white.bold(`debug:`)} ${chalk.white(
                messages.map((message) => JSON.stringify(message)).join(' '),
            )}`,
        ),
};
