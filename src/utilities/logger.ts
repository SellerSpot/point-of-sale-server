import chalk from 'chalk';

type TLoggerTypes = 'common' | 'error' | 'warning' | 'express' | 'socketio' | 'mongoose';

export const logger = (type: TLoggerTypes, message: unknown): void => {
    let messageToPrint = '';
    switch (type) {
        case 'common':
            messageToPrint = `${chalk.blue.bold(`${type.toUpperCase()}:`)} ${chalk.white(
                JSON.stringify(message),
            )}`;
            break;
        case 'error':
            messageToPrint = `${chalk.red.bold(`${type.toUpperCase()}:`)} ${chalk.white(
                JSON.stringify(message),
            )}`;
            break;
        case 'express':
            messageToPrint = `${chalk.green.bold(`${type.toUpperCase()}:`)} ${chalk.white(
                JSON.stringify(message),
            )}`;
            break;
        case 'mongoose':
            messageToPrint = `${chalk.yellow.bold(`${type.toUpperCase()}:`)} ${chalk.white(
                JSON.stringify(message),
            )}`;
            break;
        case 'socketio':
            messageToPrint = `${chalk.magenta.bold(`${type.toUpperCase()}:`)} ${chalk.white(
                JSON.stringify(message),
            )}`;
            break;
        case 'warning':
            messageToPrint = `${chalk.bgYellow.black.bold(
                ` ${type.toUpperCase()}: `,
            )} ${chalk.white(JSON.stringify(message))}`;
            break;
    }
    console.log(messageToPrint);
};
