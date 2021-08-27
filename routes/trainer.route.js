const express = require("express");
const db = require("../db/models/index");
const { Op } = require("sequelize");

const router = express.Router();

// Add POST /trainers route
router.post("/", async (req, res, next) => {
  try {
    const newTrainer = await db.Trainer.create(req.body);
    res.send(`${newTrainer.username} created!`);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Add GET /trainers route
router.get("/", async (req, res, next) => {
  try {
    const trainers = await db.Trainer.findAll();
    res.send(trainers);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/search/:username", async (req, res, next) => {
  try {
    const username = req.params.username;
    // [db.Sequelize.Op.iLike] allows you to do case-insensitive + partial querying
    // e.g. "Sa" will return Samantha, Samuel..
    const trainer = await db.Trainer.findAll({
      where: {
        username: { [Op.iLike]: "%" + username + "%" },
      },
      attributes: {
        exclude: ["password"],
      },
    });
    res.send(trainer);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
