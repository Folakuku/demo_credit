import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import JWT from "../helpers/jwt";
import { errorResponse, successResponse } from "../helpers/response";
import { IUserSignUp } from "../typings/customs";
import db from "../db/knex";
import { Tables } from "../typings/customs";
import { fetchFromDB, insertIntoDB } from "../helpers/db";
import {
    checkKarmaBlacklist,
    compareHash,
    generateHash,
} from "../helpers/utils";

export default class AuthController {
    public signup = async (req: Request, res: Response) => {
        const payload: IUserSignUp = req.body;
        const { email, fullname, password, pin } = payload;

        //Check for existing users with email
        const existingUsers = await fetchFromDB(Tables.User, {
            email: email.toLowerCase(),
        });
        if (existingUsers.length > 0) {
            return errorResponse(
                res,
                "This email has already been registered",
                400
            );
        }

        //Check karma blacklist
        const response: any = await checkKarmaBlacklist(email);

        if (response.error) {
            return errorResponse(res, response.message, 400);
        } else if (response.message !== "Successful") {
            return errorResponse(res, "Use has been blacklisted", 400);
        }

        // hash password and pin
        const hashedPassword = generateHash(password);
        const hashedPin = generateHash(pin);

        // save user record
        const userId = uuidv4();
        await insertIntoDB(Tables.User, {
            id: userId,
            email,
            password: hashedPassword,
            fullname,
            pin: hashedPin,
        });

        // create user wallet
        insertIntoDB(Tables.Wallet, {
            id: uuidv4(),
            user_id: userId,
        });

        return successResponse(
            res,
            "user registered successfully",
            undefined,
            201
        );
    };

    async login(req: Request, res: Response) {
        const payload = req.body;
        const { email, password } = payload;

        // check for user in database
        const users = await db("users").where("email", email);
        const user = users[0];
        if (!user) {
            return errorResponse(res, "Invalid email or password", 404);
        }

        // validate password
        const valid = compareHash(password, user.password);
        if (!valid) {
            return errorResponse(res, "Invalid email or password", 401);
        }

        // generate access
        const jwt = new JWT();
        const accessToken = jwt.accessToken({ userId: user.id });

        successResponse(
            res,
            "user logged in successfully",
            {
                accessToken,
                userId: user.id,
            },
            201
        );
    }
}
