import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import env from "./config/env";
import logger from "./config/logger";
import errorMiddleware from "./middlewares/error.middleware";
import { Router } from "./routes";

class App {
    public app: Application;
    public port: number;

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT) || 8000;
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(helmet());
        this.app.use(logger.logan);
    }

    private initializeRoutes() {
        const router = new Router();
        this.app.get("/", (req: Request, res: Response) => {
            res.status(200).json({
                status: true,
                message: "Welcome to Demo Credit",
            });
        });
        this.app.use("/api", router.routes);
        this.app.use("*", (req: Request, res: Response) => {
            res.status(404).json({ status: false, message: "Page not found" });
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.log(`${env.app_name} running on port ${this.port}`);
        });
    }
}

export default App;
