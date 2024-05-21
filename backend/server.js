// Import the express module
import express from 'express';
import data from "./data/users.json" with { type: "json" }
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

    // Get the data from the request body
    const newData = req.body;


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
app.put('/data/:username/journal', (req, res) => {
    // To handle the request body, we need to use the express.json middleware


    // Get the id parameter from the request
    const username = req.params.username;

    // Get the data from the request body
    const entryData = req.body;

    // Validate the data
    if (entryData.id && entryData.date && entryData.entry) {
        // If the data is valid, find the user with the given id in the data array
        const user = data.find((p) => p.username == username);

        // If the user exists, update its properties with the data
        if (user) {
            user.journal.content.push(entryData)
            data[user.id-1]=user
            fs.writeFileSync("./data/users.json", JSON.stringify(data), function(err) {
                if (err) throw err;
                console.log('complete');
            })
        // Send a 200 status code and the updated user as a JSON response
        res.status(200).json(user);
        } else {
        // If the user does not exist, send a 404 status code and a message
        res.status(404).send('User not found');
        }
    } else {
        res.status(400).send("Invalid data"); 
    }
}),



app.put('/data/:username/goals', (req, res) => {
    const username = req.params.username;
    const goalData = req.body;

    if (goalData.id && goalData.startDate && goalData.name) {
        const user = data.find((p) => p.username == username);
        if (user) {
            user.goals.content.push(goalData)
            data[user.id-1]=user

            /fs.writeFileSync("./data/users.json", JSON.stringify(data), function(err) {
                if (err) throw err;
                console.log('complete');
            })
        res.status(200).json(user);
        } else {
        res.status(404).send('User not found');
        }
    }
})

app.put('/data/:username/habits', (req, res) => {
    const username = req.params.username;
    const habitData = req.body;

    if (habitData.id && habitData.name && habitData.frequency) {
        const user = data.find((p) => p.username == username);
        if (user) {
            user.habits.content.push(habitData)
            data[user.id-1]=user

            /fs.writeFileSync("./data/users.json", JSON.stringify(data), function(err) {
                if (err) throw err;
                console.log('complete');
            })
        res.status(200).json(user);
        } else {
        res.status(404).send('User not found');
        }
    }
})

app.put('/data/:username/delete/journal', (req, res) => {
    app.use(express.json());
    var newUserData = req.body;
    if (newUserData.journal.content.length !== 0){
        for (let i = 0; i < newUserData.journal.content.length; i++) {
            newUserData.journal.content[i].id = i + 1
        }
    }
    data[newUserData.id-1]=newUserData
    fs.writeFileSync("./data/users.json", JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('complete');
    })
    res.status(200).json(data)
})

app.put('/data/:username/delete/goals', (req, res) => {
    app.use(express.json());
    var newUserData = req.body;
    if (newUserData.goals.content.length !== 0){
        for (let i = 0; i < newUserData.goals.content.length; i++) {
            newUserData.goals.content[i].id = i + 1
        }
    }
    data[newUserData.id-1]=newUserData
    fs.writeFileSync("./data/users.json", JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('complete');
    })
    res.status(200).json(data)
})

app.put('/data/:username/delete/habits', (req, res) => {
    app.use(express.json());
    var newUserData = req.body;
    if (newUserData.habits.content.length !== 0){
        for (let i = 0; i < newUserData.habits.content.length; i++) {
            newUserData.habits.content[i].id = i + 1
        }
    }
    data[newUserData.id-1]=newUserData
    fs.writeFileSync("./data/users.json", JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('complete');
    })
    res.status(200).json(data)
})

app.put('/data/:username/habits/history', (req, res) => {
    app.use(express.json());
    var userData = req.body;
    data[userData.id-1]=userData
    fs.writeFileSync("./data/users.json", JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('complete');
    })
    res.status(200).json(data)
})