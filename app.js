const express = require("express");
const app = express();
const db = require("./db/models/index");

app.use(express.json());

db.sequelize.sync();

// default error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
