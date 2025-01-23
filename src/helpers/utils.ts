import bcrypt from "bcrypt";
import env from "../config/env";
import axios from "axios";

export const generateHash = (password: string) => {
    const salt = bcrypt.genSaltSync(env.salt_rounds);
    return bcrypt.hashSync(password, salt);
};

export const compareHash = (password: string, hashedPassword: string) => {
    return bcrypt.compareSync(password, hashedPassword);
};

export const checkKarmaBlacklist = (email: string) => {
    const config = {
        method: "get",
        url: `${env.adjutor_url}verification/karma/${email}`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.adjutor_key}`,
        },
    };
    return new Promise((resolve, reject) => {
        axios(config)
            .then((response) => {
                return resolve(response.data);
            })
            .catch((error) => {
                return reject(error.response.data);
            });
    });
};
