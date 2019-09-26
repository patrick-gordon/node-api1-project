// implement your API here

//CRUD OPS

//IMPORRTS
const express = require('express');
const server = express();
const db = require("./data/db");


//
server.listen(4444, () => console.log("server on port 4444"));

//ROUTES

//GET
server.get('/api/users', (req, res) => {
    console.log(db.find());
    res.end();
})