import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2';

export interface ResponseData {
    data?: any,
    message?: string,
    statusCode?: number
}

export type DatabaseSchemaResult = RowDataPacket[] | RowDataPacket[][] | ResultSetHeader | OkPacket[] | OkPacket;