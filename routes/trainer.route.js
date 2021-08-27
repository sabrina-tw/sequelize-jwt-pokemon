const express = require("express");
const db = require("../db/models/index");

const router = express.Router();

// Add POST /trainers route
router.post("/", async (req, res, next) => {
  try {
    const newTrainer = await db.Trainer.create(req.body);
    res.send(newTrainer);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Add GET /trainers route
router.get("/", async (req, res, next) => {
  try {
    const trainers = await db.Trainer.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.send(trainers);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;