import { inputFieldNames } from '../utils';

export interface IResponse {
    status: boolean;
    statusCode: number;
    data?: unknown;
    error?: {
        fieldName: inputFieldNames | string;
        message: string;
    }[];
}
