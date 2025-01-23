import { Response, Request, NextFunction } from "express";

export const asyncHandler =
    (cb: Function) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await cb(req, res);
        } catch (error: any) {
            return next(error);
        }
    };
