//connect to DB
const Pool = require("pg").Pool;
const fs = require("fs");
const path = require("path");

//update credentials with your local db info
const credentials = {

  host: "localhost",
  user: "postgres",
  password: "password",
  database: "adoptrdb",
  port: 5432,
}


const pool = new Pool(credentials);



const createDB = fs.readFileSync(path.join(__dirname, "DDL.sql")).toString();
const popDB = fs.readFileSync(path.join(__dirname,"table_seeding.sql")).toString();
//create db with data
// pool.query(createDB, (err) => {
//   if (err) {
//     console.log(err);
//   }
//   else{
//     console.log('db created')
//     pool.query(popDB, (err) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log('db seeded')
//     });
//   }
// });



module.exports = pool;
