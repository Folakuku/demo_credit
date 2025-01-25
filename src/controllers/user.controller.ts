import { Request, Response } from "express";
import { errorResponse, successResponse } from "../helpers/response";
import db from "../db/knex";
import { Tables } from "../typings/customs";

export default class UserController {
    public getUserDetails = async (req: Request, res: Response) => {
        const users = await db(Tables.User)
            .join(Tables.Wallet, { "wallets.user_id": "users.id" })
            .select(
                "users.id",
                "users.fullname",
                "users.email",
                { wallet_id: "wallets.id" },
                "wallets.balance"
            )
            .where({ "users.id": req.user.id });

        const user = users[0];

        if (!user) {
            return errorResponse(res, "User not found", 404);
        }

        return successResponse(res, "User fetched", { user });
    };
}
