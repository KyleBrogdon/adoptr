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

// const createDB = fs.readFileSync(path.join(__dirname, "DDL.sql")).toString();

// //create db with data
// pool.query(createDB, (err) => {
//   if (err) {
//     console.log(err);
//   }
//   process.exit();
// });

module.exports = pool;
