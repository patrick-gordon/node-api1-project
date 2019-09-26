// implement your API here

//CRUD OPS

//IMPORRTS
const express = require('express');
const db = require("./data/db");

const server = express();
server.use(express.json()); //middleware

//ROUTES

//GET all users
server.get('/api/users', (req, res) => {
    db.find() // server meathod (find())
    // .then(users => console.log(users)) return the list of users in the console
    .then(users => res.status(200).json(users))
    .catch(err => {
        console.log(err);
        res.status(500).json({error: "user info could not be retrieved"})
    }); //returns users when endpoint is called
});



//POST add a user (NEED MIDDLEWARE TO CONSOLE.LOG!!!)
server.post('/api/users', (req, res) => {
    console.log(req.body);  //console.log JSON that is being added 
    const user = req.body //save user to the body
    db.insert(user)
    .then(idObj => db.findById(idObj.id))
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: "server error"});
    })
})



//GET specific user object
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id; // requests params for user
    db.findById(id) //server method (findById())
        .then(user => { // if searched for id that doesnt exist if statement for diff res codes
            console.log("user", user); // console.log user with that ID that was requested
            if (user){
                res.status(200).json(user);
            } else {
                res.status(400).json({error: "The user with the specified ID does not exist"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "user info could not be retrieved"})
        })
});



server.listen(4444, () => console.log("server on port 4444"));
