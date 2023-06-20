// Update with your config settings.

const path= require("path");

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    migrations:{
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds:{
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations:{
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds:{
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  }
};
