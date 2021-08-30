require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const apiRouter = express.Router();

const pokemonRouter = require("./routes/pokemon.route.js");
const trainerRouter = require("./routes/trainer.route.js");

const db = require("./db/models/index");
db.sequelize.sync();

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api", apiRouter);
apiRouter.use("/pokemons", pokemonRouter);
apiRouter.use("/trainers", trainerRouter);

// allows us to deploy both front/backend to 1 Heroku app
app.use(express.static(path.resolve("client", "build")));
app.get("*", (req, res) =>
  res.sendFile(path.resolve("client", "build", "index.html"))
);

// default error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
