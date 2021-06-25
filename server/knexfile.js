// Update with your config settings.

require("dotenv").config({
  path: process.env.NODE_MODE === "test" ? ".env.test" : ".env"
});

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: process.env.DATABASE,
      user: process.env.DATABASE_USER,
      password: process.env.PASSWORD,
      port: process.env.PORT
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/infra/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/infra/seeds`
    }
  }
};
