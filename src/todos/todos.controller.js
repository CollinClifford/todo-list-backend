const service = require("./todos.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasOnlyValidProperties = require("../middleware/hasOnlyValidProperties");
const hasProperties = require("../middleware/hasProperties");
// const todoExists = require("../middleware/todoExists");

const hasRequiredProperties = hasProperties("todo_description");

async function todoExists(req, res, next) {
  const todo = await service.read(req.params.todoId);
  console.log(todo);
  if (todo) {
    res.locals.todo = todo;
    return next();
  }
  next({ status: 404, message: `todo cannot be found.` });
}

async function list(req, res, next) {
  const data = await service.list();
  res.json({ data });
}

function read(req, res) {
  const { todo: data } = res.locals;
  res.json({ data });
}

async function create(req, res, next) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function destroy(req, res, next) {
  const { todo } = res.locals;
  await service.delete(todo.todo_id);
  res.sendStatus(204);
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(todoExists), read],
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(create),
  ],
  delete: [asyncErrorBoundary(todoExists), asyncErrorBoundary(destroy)],
};
