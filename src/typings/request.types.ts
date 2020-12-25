export interface IResponse {
    status: boolean;
    statusCode: number;
    data?: unknown;
    error?: {
        fieldName: string;
        message: string;
    }[];
}
