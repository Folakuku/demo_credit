import Joi from "joi";
import { IUserSignUp } from "../../typings/customs";

export const signupSchema = Joi.object({
    body: Joi.object<IUserSignUp>({
        email: Joi.string().email().required(),
        fullname: Joi.string().required(),
        pin: Joi.string()
            .pattern(/^\d{4}$/)
            .required()
            .messages({
                "string.pattern.base": "PIN must be 4 digits.",
                "string.empty": "PIN is required.",
            })
            .required(),
        password: Joi.string()
            .min(8)
            .pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,20}$/
            )
            .required()
            .messages({
                "string.pattern.base":
                    "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character",
                "string.min": "Password must be at least 8 characters long",
            }),
    }),
}).required();

export const loginSchema = Joi.object({
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
}).required();

export const amountSchema = Joi.object({
    body: Joi.object({
        amount: Joi.number().required(),
    }),
}).required();

export const withdrawSchema = Joi.object({
    body: Joi.object({
        amount: Joi.number().required(),
        pin: Joi.string()
            .pattern(/^\d{4}$/)
            .required()
            .messages({
                "string.pattern.base": "PIN must be 4 digits.",
                "string.empty": "PIN is required.",
            })
            .required(),
    }),
}).required();

export const transferSchema = Joi.object({
    body: Joi.object({
        amount: Joi.number().required(),
        pin: Joi.string()
            .pattern(/^\d{4}$/)
            .required()
            .messages({
                "string.pattern.base": "PIN must be 4 digits.",
                "string.empty": "PIN is required.",
            })
            .required(),
        receiverWalletId: Joi.string().required(),
    }),
}).required();
