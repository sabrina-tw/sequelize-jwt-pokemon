const express = require("express");
const router = express.Router();

const db = require("../db/models/index");

// route to GET /pokemons
router.get("/", async (req, res, next) => {
  try {
    const pokemons = await db.Pokemon.findAll();

    res.json(pokemons);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
