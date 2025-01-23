import { Router } from "express";
import AuthController from "../controllers/auth.controller";

class UserRoutes {
    public router: Router;
    private authController: AuthController;

    constructor() {
        this.router = Router();
        this.authController = new AuthController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/", this.authController.register);
    }
}

export default UserRoutes;
