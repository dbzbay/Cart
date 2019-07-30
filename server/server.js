const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
//const {Item} = require('../database/db')

const {Item} = require('../database/tenMillion')

const path = require('path')
const mongoose = require('mongoose')
const port = process.env.PORT || 3099;
const host = process.env.HOST || '0.0.0.0'

// need for mongo to find env
require('dotenv').config()

//mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@zbaycart-tvfyb.mongodb.net/ZbayCart?retryWrites=true&w=majority`, { useNewUrlParser: true });

mongoose.connect('mongodb://localhost/10million', { useNewUrlParser: true });

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use( bodyParser.json() )
app.use(cors())

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/items', (req, res) => {
  Item.find()
    .exec()
    .then(results => {
      res.status(200).send(results)
    })
    .catch(err => res.status(500).json({message: 'There was an error with your request', error: err}));
});

//format for request must be like http://127.0.0.1:3099/item:?id=RAI357e
app.get('/item:id', (req, res) => {
  Item.findById(req.query.id)
    .exec()
    .then(results => {
      res.status(200).send(results)
    })
    .catch(err => {
      res.status(500).json({message: 'Invalid ID', error: err});
      console.log(err);
    });
});

app.listen(port, function() {
  console.log(`Running on https://${host}:${port}!`);
})