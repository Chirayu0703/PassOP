const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
dotenv.config()
const cors = require('cors');


// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';

const app = express()

const port = 3000
app.use(cors()); 
app.use(bodyparser.json())


client.connect();
const db = client.db(dbName);

// get all the password
app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// Save a password
app.post('/', async(req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.json({success: true, result: findResult})
})

//Deleting a password
app.delete('/', async(req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.json({success: true, result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
