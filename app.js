const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

const db = require("./db/models/index");

const pokemonRouter = require("./routes/pokemon.route.js");

app.use(express.json());
app.use(cookieParser());

app.use("/pokemons", pokemonRouter);



db.sequelize.sync();

// default error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
