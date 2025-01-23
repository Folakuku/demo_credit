import "dotenv/config";
import type { Knex } from "knex";
import path from "path";

const config: Knex.Config<any> = {
    client: "mysql2",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    migrations: {
        directory: path.join(__dirname + "/src/db/migrations"),
    },
    seeds: {
        directory: path.join(__dirname + "/src/db/seeds"),
    },
};

export default config;
