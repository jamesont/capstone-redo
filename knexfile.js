module.exports = {
  development: {
    client: "postgresql",
    useNullAsDefault: true,
    connection: 'postgres://localhost/bandwagon',
  },
  staging: {
    client: "postgresql",
    useNullAsDefault: true,
    connection: {
      database: "bandwagon",
      user: "thomas jameson",
      password: "monkeyman042008"
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },
  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL + "?ssl=true",
    useNullAsDefault: true,
    connection: {
      database: "bandwagon",
      user: "username"
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
}
