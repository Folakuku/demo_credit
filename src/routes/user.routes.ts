import { Router } from "express";
import WalletController from "../controllers/user.controller";
import { asyncHandler } from "../helpers/handler";

class UserRoutes {
    public router: Router;
    private userController: WalletController;

    constructor() {
        this.router = Router();
        this.userController = new WalletController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/me", asyncHandler(this.userController.getUserDetails));
    }
}

export default UserRoutes;
