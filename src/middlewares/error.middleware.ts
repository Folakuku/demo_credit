import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";
import Joi from "joi";

const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.logErrorToConsole(err);
    if (Joi.isError(err)) {
        res.status(400).json({
            status: false,
            message: err.message,
        });
    } else {
        res.status(500).json({
            status: false,
            message: err.message || "Internal Server Error",
        });
    }
};

export default errorMiddleware;
