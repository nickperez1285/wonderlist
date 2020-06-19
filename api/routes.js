const router = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require("../data/dbConfig.js");

router.get("/users", (req, res) => {
  db("users")
    .select("id", "username", "password")
    .orderBy("id")
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.send(err));
});

// needs password hashing
router.post("/users", (req, res) => {
  db("users")
    .insert(req.body)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.send(err));
});

router.get("/users/:id", (req, res) => {
  const userID = req.params.id;

  db("users")
    .select("id", "username", "password")
    .where({ id: userID })
    .orderBy("id")
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.send(err));
});

router.get("/users/:id/todos", (req, res) => {
  const userID = req.params.id;

  db("todos")
    .select("id", "title", "description", "created_at", "user_id", "completed")
    .where({ user_id: userID })
    .then((todos) => {
      res.status(200).json(todos);
    })
    .catch((err) => res.send(err));
});


router.post('/users/:id/todos', (req, res) => {
	const userID = req.params.id
	findById(userID)
    .then(user => {
        if (user) {
            req.body.title  && req.body.description ? 
                insertTodo({...req.body, user_id: userID})
                    .then(res.status(200).json(req.body))
                    .catch(err => {
                        console.log(err);
                    })
            : res.status(400).json({ 
                errorMessage: "Please add both a title and description."
            });
        } else {
            res.status(404).json({
                message: "user not found",
            });
        }
    })
    .catch((err) => {
        res.status(500).json({
            err,
            message: "Error processing request",
         });
    });
});

function findById(id) {
  return db('users').where({ id: Number(id) });
}
function insertTodo(todo ) {
  return db('todos')
    .insert(todo)
    .where({ user_id: todo.user_id })
}

module.exports = router;
