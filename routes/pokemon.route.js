const express = require("express");
const router = express.Router();

const db = require("../db/models/index");

router.get("/", async (req, res, next) => {
  try {
    const pokemons = await db.Pokemon.findAll();

    res.json(pokemons);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const pokemon = req.body;

    const newPokemon = await db.Pokemon.create(pokemon);
    res.status(201).json(newPokemon);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const pokemonId = req.params.id;
    const pokemon = await db.Pokemon.findByPk(pokemonId); // returns null if not found

    if (pokemon === null) return res.sendStatus(404);

    res.json(pokemon);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const pokemonId = req.params.id;
    const pokemonToDelete = await db.Pokemon.findByPk(pokemonId);

    if (pokemonToDelete === null) return res.sendStatus(404);

    await db.Pokemon.destroy({
      where: {
        id: pokemonId,
      },
    });

    res.json(pokemonToDelete);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const pokemonId = req.params.id;
    const pokemonToUpdate = await db.Pokemon.findByPk(pokemonId);

    if (pokemonToUpdate === null) return res.sendStatus(404);
    await pokemonToUpdate.update(req.body);

    res.json({ message: `Updated ${pokemonToUpdate.name} successfully!` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
