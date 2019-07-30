

const mongoose = require('mongoose');
const faker = require('faker');

mongoose.connect('mongodb://localhost/10million', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("we're connected!");
});

const hugeSchema = new mongoose.Schema({
  _id: String,
  name: String,
  price: Number,
  image1: String,
  seller: String,
  condition: String,
  category: String,
});

const HugeNumber = mongoose.model('HugeNumber', hugeSchema);

const hugeArray = [];

// for (let i = 1; i <= 10000000; i++) {
//   const id = new HugeNumber({
//     _id: String(i).padStart(8, 0),
//     name: faker.commerce.productName(),
//     price: faker.commerce.price(),
//     image1: faker.image.cats(),
//     seller: faker.company.companyName(),
//     condition: faker.commerce.productAdjective(),
//     category: faker.commerce.department(),
//   });
//   // id.save();
//   hugeArray.push(id);
//   if (i % 10000 === 0) {
//     console.log(i);
//   }
// }

//HugeNumber.insertMany(hugeArray, (error, docs) => {});

const Item = mongoose.model('HugeNumber', hugeSchema);

module.exports = { Item }