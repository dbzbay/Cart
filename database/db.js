//test
const mongoose = require('mongoose');

const itemsSchema = mongoose.Schema({
  _id: String,
  name: String,
  price: Number,
  image1: String,
  seller: String,
  condition: String,
  category: String
});

const Item = mongoose.model('Item', itemsSchema);

module.exports = { Item };