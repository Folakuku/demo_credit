import express, { Router as ExpressRouter } from "express";
import AuthRoutes from "./auth.routes";

export class Router {
    public routes: ExpressRouter;

    constructor() {
        this.routes = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.routes.use("/auth", new AuthRoutes().router);
    }
}
