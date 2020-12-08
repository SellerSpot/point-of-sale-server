import { responseStatusCodes } from '../utils';

export interface IResponse {
    status: boolean;
    statusCode: keyof typeof responseStatusCodes;
    data?: unknown;
}
