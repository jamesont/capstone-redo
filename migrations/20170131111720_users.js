
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('first_name').notNullable().defaultTo('')
        table.string('last_name').notNullable().defaultTo('')
        table.string('email').unique().notNullable().defaultTo('')
        table.specificType('hashed_password', 'char(60)').notNullable().defaultTo('')
        table.timestamps(true, true);
    });

};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
