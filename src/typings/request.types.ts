import { inputFieldNames } from '../utils';

export interface IResponse {
    status: boolean;
    statusCode: number;
    data?: unknown | null;
    error?: {
        fieldName: inputFieldNames;
        message: string;
    }[];
}
