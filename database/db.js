// test
const mongoose = require('mongoose');

const itemsSchema = mongoose.Schema({
  _id: String,
  name: String,
  price: Number,
  image1: String,
  seller: String,
  condition: String,
  category: String,
});

const Item = mongoose.model('Item', itemsSchema);

// console.log(Item);

module.exports = { Item };

/** *** */
// var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
});
