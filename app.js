const express = require("express");
const cookieParser = require("cookie-parser");

const pokemonRouter = require("./routes/pokemon.route.js");
const trainerRouter = require("./routes/trainer.route.js");

const db = require("./db/models/index");
db.sequelize.sync();

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/pokemons", pokemonRouter);
app.use("/trainers", trainerRouter);

// default error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
