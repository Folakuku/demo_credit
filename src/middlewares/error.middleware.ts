import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err.message);
    res.status(500).json({ status: false, message: "Internal Server Error" });
};

export default errorMiddleware;
