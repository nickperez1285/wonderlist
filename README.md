routes 


base route : https://wonderlist.herokuapp.com/ 

post /api/auth/register
* adds 1 user with encrypted password

 post /api/auth/login
* logins user 

get /users

* gets all users

post /users
* inserts 1 user

get /users/:id
* gets 1 users info 

get /users/:id/todos
* gets 1 users todo items 

post /users/:id/todos
 * creates 1 todo item 

<!-- not working on heroku -->
 get /todos 
 * gets all todos 

 get /todos/:id 
 * gets ID'd todo

put /todos/:id 
 * updates ID'd todo

 delete /todos/:id 
 * removes ID'd todo  

  delete /users/:id 
 * removes ID'd user  

  update /users/:id 
 * updates ID'd user  




