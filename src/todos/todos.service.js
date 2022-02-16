const knex = require("../db/connection");

function list() {
  return knex("todos").select("*");
}

function read(todo_id) {
  return knex("todos").select("*").where({ todo_id }).first();
}

function create(todo) {
  return knex("todos")
    .insert(todo)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function destroy(todo_id) {
  return knex("todos").where({ todo_id }).del();
}

module.exports = {
  list,
  read,
  create,
  delete: destroy,
};
