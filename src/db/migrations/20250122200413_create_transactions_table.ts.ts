import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("transactions", (table) => {
        table.uuid("id").primary();
        table
            .uuid("wallet_id")
            .notNullable()
            .references("id")
            .inTable("wallets")
            .onDelete("CASCADE");
        table
            .uuid("receiver_wallet_id")
            .references("id")
            .inTable("wallets")
            .onDelete("CASCADE");
        table.enum("type", ["deposit", "withdrawal", "transfer"]).notNullable();
        table.decimal("amount", 12, 2).notNullable();
        table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("transactions");
}
