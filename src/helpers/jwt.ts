import jwt from "jsonwebtoken";
import env from "../config/env";

export default class JWT {
    private _secret = env.jwt_secret!;

    accessToken(data: any) {
        const token = jwt.sign(data, this._secret, { expiresIn: "1h" });
        return token;
    }

    verifyToken(token: any) {
        const decoded = jwt.verify(token, this._secret);
        return decoded;
    }
}
