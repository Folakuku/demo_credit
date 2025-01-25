import express, { Router as ExpressRouter } from "express";
import AuthRoutes from "./auth.routes";
import WalletRoutes from "./wallet.routes";
import UserRoutes from "./user.routes";
import { isAuthenticated } from "../middlewares/auth";

export class Router {
    public routes: ExpressRouter;

    constructor() {
        this.routes = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.routes.use("/auth", new AuthRoutes().router);
        this.routes.use("/users", isAuthenticated, new UserRoutes().router);
        this.routes.use("/wallets", isAuthenticated, new WalletRoutes().router);
    }
}
