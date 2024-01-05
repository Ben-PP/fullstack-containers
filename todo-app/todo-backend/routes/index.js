const express = require("express");
const router = express.Router();
const redis = require("../redis");

const configs = require("../util/config");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;
  await redis.setAsync("visits", visits);

  res.send({
    ...configs,
    visits: await redis.getAsync("visits"),
  });
});

router.get("/statistics", async (req, res) => {
  res.send({
    added_todos: parseInt((await redis.getAsync("added_todos")) ?? 0),
  });
});

module.exports = router;
