
import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';
import { ResponseData } from '../types/params';

export const successResponse = (response: Response, success: ResponseData): Response => {
    let { data, message, statusCode } = success; 
    
    if (!message) message = "Success!"
    return response.status(statusCode || StatusCodes.OK).json({
        message,
        data
    });
}

export const errorResponse = (response: Response, error: ResponseData): Response => {
    let { statusCode, message } = error;

    if (!statusCode) statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    if (!message || message == "") message = "Something went wrong!";

    return response.status(statusCode).json({
        message
    })
}