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

router.put('/users/:id', (req, res) => {
	const userID = req.params.id
	db("users")
	.select("id","users", "password")
    .where('id', Number(userID))
    .update(req.body)
        .then(user => {
          res.status(201).json(user);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            message: "There was an error while saving the   user to the database."
          });
        });
});

router.delete('/users/:id', (req, res) => {
const id = req.params.id 

  db('users')
    .where('id', Number(id))
    .del()
    .then(user => {
    	if(user){
    		res.status(204).end();
		}else{
			res.status(404).json({ message: "The user with the specified ID does not exist." }) 
		}	
    })
    .catch(error => {
      res.status(500).json({ error: "The user could not be removed"  });
    });
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
	db('users').where({ id: Number(userID) })
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

router.get('/todos', (req, res) => {
	db("todos")
    .select("id", "title", "description", "user_id", "created_at" )
    .then((todo) => {
      res.status(200).json(todo);
    })
    .catch((err) => res.send(err));


});

router.get('/todos/:id', (req, res) => {
	const todoID = req.params.id
	db("todos")
    .select("id", "title", "description", "user_id", "created_at" )
    .where({id: todoID })
    .then((todo) => {
      res.status(200).json(todo);
    })
    .catch((err) => res.send(err));


});

router.get('/todos/:id', (req, res) => {
	const todoID = req.params.id
	db("todos")
    .select("id", "title", "description", "user_id", "created_at" )
    .where({id: todoID })
    .then((todo) => {
      res.status(200).json(todo);
    })
    .catch((err) => res.send(err));


});

router.put('/todos/:id', (req, res) => {
	const todoID = req.params.id
	db("todos")
	.select("id", "title", "description", "user_id", "created_at" )
    .where('id', Number(todoID))
    .update(req.body)
        .then(post => {
          res.status(201).json(post);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            message: "There was an error while saving the     post to the database."
          });
        });
});

router.delete('/todos/:id', (req, res) => {
const id = req.params.id 

  db('todos')
    .where('id', Number(id))
    .del()
    .then(todos => {
    	if(todos){
    		res.status(204).end();
		}else{
			res.status(404).json({ message: "The todo with the specified ID does not exist." }) 
		}	
    })
    .catch(error => {
      res.status(500).json({ error: "The todo could not be removed"  });
    });
});




function insertTodo(todo ) {
  return db('todos')
    .insert(todo)
    .where({ user_id: todo.user_id })
}

module.exports = router;
