import { MakeResponse } from "../typings/customs";
import { Response } from "express";

export const makeResponse = <T = Record<string, any>>(
    status: boolean,
    message: string,
    data?: T,
    statusCode?: number
): MakeResponse<T> => {
    return {
        status,
        message,
        data,
        statusCode,
    };
};

export const successResponse = (
    res: Response,
    message: string,
    data?: Record<string, any>,
    statusCode: number = 200
): Response => {
    return res.status(statusCode).json({
        status: true,
        message,
        data,
    });
};

export const errorResponse = (
    res: Response,
    message: string,
    statusCode: number = 400
): Response => {
    return res.status(statusCode).json({
        status: false,
        error: `${message}!`,
    });
};
