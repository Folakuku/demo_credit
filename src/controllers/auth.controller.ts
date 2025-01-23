import { Request, Response } from "express";

class AuthController {
    public register = (req: Request, res: Response) => {
        res.status(200).json({ message: "Sign user" });
    };
}

export default AuthController;
