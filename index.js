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
    const { name, bio } = req.body;  
    if (!name || !bio) { // prevents name or bio being null on backend side
        res.status
    }
    // const user = req.body //save user to the body
    db.insert({ name, bio }) // can only insert stuff in keys, no extra fields
    .then(({id }) => db.findById(id))
        .then(user => {
            res.status(201).json(user);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "server error"});
    });
});



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

//DELETE
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then((deleted) => {
            if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({error: "user with id does not exist"});
        }
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "server error deleted"});
        });
});


//PUT (update user)
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body;
    if (!name && !bio) {
        res.status(400).json({error: 'Requires some changes'});
    }
    db.update(id, { name, bio })
        .then(updated => {
            if (updated) {
                db.findById(id)
                .then(user => res.status(200).json(user))
                .catch(err => {
                    console.log(err);
                    res.status(500).json({error: "Error retrieving user"});
                });
            } else {
                res.status(404).json({error: "user id not found"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "Error updating user"});
        })
})

server.listen(4444, () => console.log("server on port 4444"));
