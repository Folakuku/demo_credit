import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { asyncHandler } from "../helpers/handler";
import validate from "../middlewares/validators/validate";
import { loginSchema, signupSchema } from "../middlewares/validators/schema";

class UserRoutes {
    public router: Router;
    private authController: AuthController;

    constructor() {
        this.router = Router();
        this.authController = new AuthController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            "/signup",
            validate(signupSchema, { body: true }),
            asyncHandler(this.authController.signup)
        );
        this.router.post(
            "/login",
            validate(loginSchema, { body: true }),
            asyncHandler(this.authController.login)
        );
    }
}

export default UserRoutes;
