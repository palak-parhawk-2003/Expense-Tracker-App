const express = require('express'); //import express.js framswork(library for building web applications with node.js)
const app = express(); //creates an instance of express application. app variable will be used to handle http request in the server
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/Transaction.js');
const { default: mongoose } = require('mongoose');

app.use(cors());
app.use(express.json());
app.get('/api/test', (req,res) => { //defines a route for handling http get requests to /api/test endpoint. api.get specifies what should happen when a get request is made to the specified endpoint.
    res.json('test ok');  // 2nd argument to app.get() is a callback function that takes 2 parameters req(request) and res(response)
});  //here it responds to the request with a json object containing message 'test ok' using res.json() method.

app.post('/api/transaction', async(req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const {name, price, description, datetime} = req.body;
    const transaction = await Transaction.create({name, price, description, datetime});
    console.log(transaction);
    res.json(transaction);
});

app.get('/api/transactions', async (req,res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
});

app.listen(4000);  //starts the express application and makes it listen for incoming requests on port 4000
