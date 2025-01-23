import db from "../db/knex";

export const insertIntoDB = async (table: string, data: {}) => {
    const result = await db(table).insert({
        ...data,
    });
    return result;
};

export const fetchFromDB = async (table: string, query: Record<string, any>) => {
    const result = await db(table).where(query);
    return result;
};
