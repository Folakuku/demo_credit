import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("wallets").del();

    // Inserts seed entries
    await knex("wallets").insert([
        {
            id: "4ea29d07-ab85-4b9a-9f42-0c1a5b174b65",
            user_id: "76a9b01b-c3a1-401e-b042-86e6ac1eb657",
            balance: "2000.00",
            created_at: "2025-01-23T18:49:51.000",
            updated_at: "2025-01-23T18:49:51.000",
        },
        {
            id: "b3ee4672-29ea-4e16-abf2-214899e144b3",
            user_id: "8de85847-8d74-4520-bdb3-4d2bc2c7466d",
            balance: "0.00",
            created_at: "2025-01-23T19:46:12.000",
            updated_at: "2025-01-23T19:46:12.000",
        },
        {
            id: "c6e33020-c3c2-44f6-874b-a8ca35340cc1",
            user_id: "47c1bc94-dacd-42ce-a8f7-2402723c9f06",
            balance: "12000.00",
            created_at: "2025-01-23T18:59:15.000",
            updated_at: "2025-01-23T18:59:15.000",
        },
    ]);
}
