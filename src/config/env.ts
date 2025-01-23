const env = {
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
    app_name: process.env.APP_NAME || "Demo Credit",
    port: Number(process.env.PORT) || 8000,
    jwt_secret: process.env.JWT_SECRET,
    salt_rounds: Number(process.env.SALT_ROUNDS) || 10,
} as const;

const missingEnvVars = Object.entries(env)
    .filter(([key, value]) => {
        return !value;
    })
    .map(([key, _]) => key);

if (missingEnvVars.length > 0) {
    throw new Error(
        `Missing required environment variables: ${missingEnvVars.join(", ")}`
    );
}

export default env;
