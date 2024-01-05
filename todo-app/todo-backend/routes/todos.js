const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const redis = require("../redis");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  todoCount = parseInt((await redis.getAsync("added_todos")) ?? 0);
  await redis.setAsync("added_todos", todoCount + 1);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
router.get("/:id", findByIdMiddleware, async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
router.put("/:id", findByIdMiddleware, async (req, res) => {
  const updateStatus = await req.todo.update({
    done: req.body.done,
  });
  const updatedTodo = await Todo.findById(req.todo.id);
  if (updateStatus.ok !== 1) return res.sendStatus(500);
  res.send(updatedTodo);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
