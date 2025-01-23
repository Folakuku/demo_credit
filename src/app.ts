import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import env from "./config/env";
import logger from "./config/logger";

class App {
    public app: Application;
    public port: number;

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT) || 8000;
        this.initializeMiddlewares();
    }

    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(helmet());
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.log(`${env.app_name} running on port ${this.port}`);
        });
    }
}

export default App;
