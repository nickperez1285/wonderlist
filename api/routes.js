const router = require('express').Router(); 
const bcrypt = require('bcryptjs')
const db = require("../data/dbConfig.js");



router.get("/users", (req, res) => {
  	db("users")
  	.select("id", "username", "password")
  	.orderBy("id")
	    .then(users => {
	      res.status(200).json(users);
	    })
	    .catch(err => res.send(err));
});

// needs password hashing 
router.post("/users", (req, res) => {
  	db("users")
  	.insert(req.body)
	    .then(users => {
	      res.status(200).json(users);
	    })
	    .catch(err => res.send(err));
});

router.get("/users/:id", (req, res) => {
		const userID = req.params.id

  	db("users")
  	.select("id", "username", "password")
  	.where({ id: userID })
  	.orderBy("id")
	    .then(users => {
	      res.status(200).json(users);
	    })
	    .catch(err => res.send(err));
});

router.get("/users/:id/todos", (req, res) => {
	const userID = req.params.id

  	db("todos")
  	.select("title", "description", "created_at", "user", "completed")
  	.where({ id: userID })
	    .then(todos => {
	      res.status(200).json(todos);
	    })
	    .catch(err => res.send(err));
});

// not working , cant insert todos into db ? 

router.post("/users/:id/todos",  (req, res) => {
	const userID = req.params.id
	const body =req.body


  	db("todos").insert(body).where(userID)

	    .then(todos => {
	      res.status(200).json(todos);
	    })
	    .catch(err => res.send(err));
});

module.exports = router;
