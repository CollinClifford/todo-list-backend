const express = require("express");
const morgan = require("morgan");
const router = require("./todos/todos.router");
const app = express();
app.use(morgan("dev"));

app.use(express.json());
app.use("/todos", router);

app.use((req, res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
