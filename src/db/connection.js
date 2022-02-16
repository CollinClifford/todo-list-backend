const env = process.env.NODE_ENV || "development";
console.log(process.env.NODE_ENV);
const config = require("../../knexfile")[env];
const knex = require("knex")(config);

module.exports = knex;
