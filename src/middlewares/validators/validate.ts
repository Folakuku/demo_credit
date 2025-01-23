import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export default (
    schema: Joi.ObjectSchema<any>,
    intercept: { query?: boolean; body?: boolean; params?: boolean }
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        //   handle the payload interception
        let payload = {};
        if (intercept.query) {
            payload = { ...payload, query: req.query };
        }
        if (intercept.body) {
            payload = { ...payload, body: req.body };
        }
        if (intercept.params) {
            payload = { ...payload, params: req.params };
        }

        // validate the payload
        const validated = schema.validate(payload);
        if (validated.error) {
            res.statusCode = 400;
            next(validated.error);
        }
        // continue to the next middleware
        return next();
    };
};
