import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("wallets", (table) => {
        table.uuid("id").primary();
        table
            .uuid("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
        table.decimal("balance", 12, 2).notNullable().defaultTo(0);
        table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("wallets");
}
