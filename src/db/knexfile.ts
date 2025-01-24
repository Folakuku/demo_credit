import type { Knex } from "knex";
import path from "path";

import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "..", "..", "./.env") });
import env from "../config/env";

const config: Record<string, Knex.Config<any>> = {
    production: {
        client: "mysql2",
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT),
        },
        migrations: {
            directory: path.join(__dirname + "/migrations"),
        },
        seeds: {
            directory: path.join(__dirname + "/seeds"),
        },
    },
    development: {
        client: "mysql2",
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT),
        },
        migrations: {
            directory: path.join(__dirname + "/migrations"),
        },
        seeds: {
            directory: path.join(__dirname + "/seeds"),
        },
    },
    test: {
        client: "mysql2",
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_TEST_NAME,
        },
        migrations: {
            directory: path.join(__dirname + "/migrations"),
        },
        seeds: {
            directory: path.join(__dirname + "/seeds"),
        },
    },
};

export default config;
