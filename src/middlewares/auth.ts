import { NextFunction, Request, Response } from "express";
import { fetchFromDB } from "../helpers/db";
import JWT from "../helpers/jwt";

export async function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "User not authorized",
        });
    }
    try {
        // verify token
        const jwt = new JWT();
        const decoded = jwt.verifyToken(token) as any;

        // check if user exists or not
        const users = await fetchFromDB("users", { id: decoded.userId });
        const user = users[0];
        if (!user) {
            return res.status(404).json({
                message: `User not found`,
            });
        }
        req.user = user;
        next();
    } catch (err: any) {
        return res.status(403).json({
            message: "Invalid authorization token",
        });
    }
}
