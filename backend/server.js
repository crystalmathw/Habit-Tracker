// Import the express module
import express from 'express';
import data from "./data/users.json" assert { type: "json" }
import fs from "fs";

import cors from 'cors'
// Create an instance of the express application
const app=express();
// Specify a port number for the server
const port=5000;
// Start the server and listen to the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(cors());
app.use(express.json())

// Create a route and a handler for GET /data
app.get('/data', (req, res) => {
    // Send the data array as a JSON response
    res.status(200).json(data);
});
  
  // Create a route and a handler for GET /data/:username
app.get('/data/:username', (req, res) => {
    // Get the username parameter from the request
    const username = req.params.username;

    // Find the user with the given username in the data array
    const user = data.find((u) => u.username == username);

    // If the user exists, send it as a JSON response
    if (user) {
    res.json(user);
    } else {
    // If the user does not exist, send a 404 status code and a message
    res.status(404).send('User not found');
    }
});

    // Create a route and a handler for post /data
app.post('/data', (req, res) => {
    // To handle the request body, we need to use a middleware called express.json
    // This middleware parses the request body as JSON and adds it to the req object
    app.use(express.json());

    // Get the data from the request body
    const newData = req.body;
    console.log(req.body)

    // Validate the data
    if (newData != undefined) {
        fs.writeFileSync("./data/users.json", JSON.stringify(newData), function(err) {
            if (err) throw err;
            console.log('complete');
        })

        // Send a 201 status code and the new user as a JSON response
        res.status(201).json(newData);
    } else {
        // If the data is invalid, send a 400 status code and a message
        res.status(400).send('Invalid data');
    }
});

    // Create a route and a handler for PUT /data/:id
app.put('/data/:id', (req, res) => {
    // To handle the request body, we need to use the express.json middleware
    app.use(express.json());

    // Get the id parameter from the request
    const id = req.params.id;

    // Get the data from the request body
    const data = req.body;

    // Validate the data
    if (data.title && data.content && data.author) {
        // If the data is valid, find the user with the given id in the data array
        const user = data.find((p) => p.id == id);

        // If the user exists, update its properties with the data
        if (user) {
        user.title = data.title;
        user.content = data.content;
        user.author = data.author;

        // Send a 200 status code and the updated user as a JSON response
        res.status(200).json(user);
        } else {
        // If the user does not exist, send a 404 status code and a message
        res.status(404).send('User not found');
        }
    } else {
        res.status(400).send("Invalid data"); 
    }
})