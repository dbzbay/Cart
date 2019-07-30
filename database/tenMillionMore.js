const { Pool, Client } = require('pg');
// const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'
const faker = require('faker');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sdc',
  password: 'zaq12wsx',
  port: 5432,
});

const Item = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'sdc',
  password: 'zaq12wsx',
  port: 5432,
});
// Item.connect()
//   .then((success) => {
//     console.log('-Database Connected.');
//   })
//   .catch((err) => {
//     console.error('Error connecting to the database: ', err);
//   });


// const huge = [];
// // handles one million at a time
// for (let i = 1000000; i < 10000001; i += 1000000) {
//   const id = String(i).padStart(8, 0);
//   const name = faker.commerce.productName();
//   const price = faker.commerce.price();
//   const image1 = faker.image.cats();
//   let seller = faker.company.companyName();
//   const condition = faker.commerce.productAdjective();
//   const category = faker.commerce.department();

//   while (seller.indexOf("'") > -1) {
//     seller = faker.company.companyName();
//   }

//   huge.push(`('${id}', '${name}', ${price}, '${image1}', '${seller}', '${condition}', '${category}')`);

//   if (i % 10000 === 0) {
//     console.log(i);
//   }
// }
// for (const item of huge) {
//   Item.query(
//     `INSERT INTO public.tenmillion VALUES ${item};`,
//   );
// }

module.exports = { Item };