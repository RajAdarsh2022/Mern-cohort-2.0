/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
  const express = require('express');
  const bodyParser = require('body-parser');
  
  const app = express();
  app.use(bodyParser.json());

  /* 
  todo = {
    id : int
    title : "string"
    completed : true/false
    description : "string"
  }
  */
  let todoList = []
  let nextId = 1  // For creating Id's for each todos


  //Exposing desired API endpoints

  // 1. Getting all todos
  app.get("/todos", (req, res) => {
    const allTodos = todoList.map(todo => ({
      title: todo.title,
      description: todo.description
    }));
    res.json(allTodos);
  })

  // 2. Getting a specific todo by their id
  app.get("/todos/:id", (req, res) => {
    const todoId = req.params.id;
    const todo = todoList.find(todo => todo.id === parseInt(todoId));
    if (todo) {
      res.json({
        id: todo.id, // Include id here
        title: todo.title,
        description: todo.description
      });
    } else {
      res.status(404).send("Todo item not found");
    }
  })

  // 3. Adding a new todo to the list
  app.post("/todos", (req,res) => {
    const todoTitle = req.body.title
    const IsCompleted = req.body.completed 
    const todoDescription = req.body.description
    
    const newTodo = {
      id : nextId,
      title : todoTitle,
      completed : IsCompleted,
      description : todoDescription,
    }

    //pushing it into the list and increasing the id
    todoList.push(newTodo)
    nextId += 1

    res.status(201).json({id : nextId - 1})

  })

  // 4. Updates an existing todo item by Id
  app.put("/todos/:id", (req,res) => {
    const todoId = req.params.id
    const todoTitle = req.body.title
    const IsCompleted = req.body.completed 

    todoList.forEach( e => {
      if (e.id == todoId){
        e.title = todoTitle
        e.completed = IsCompleted
        res.sendStatus(200)
      }
    })

    res.status(404).send('todo id is not present')
  })

  // 5. Deleting a todo item by its Id
  app.delete("/todos/:id", (req,res) => {
    const todoId = req.params.id

    for(let i = 0 ; i < todoList.length ; i++){
      let e = todoList[i]
      if (e.id == todoId){
        todoList.splice(i , 1)
        res.sendStatus(200)
      }
    }

    res.sendStatus(404)
  })
  
  //Handling undesirable route
  app.use((req,res) => {
    res.status(404).send('Route not found')
  })
  module.exports = app;