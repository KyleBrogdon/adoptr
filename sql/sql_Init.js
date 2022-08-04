//connect to DB
const Pool = require("pg").Pool;
const { rejects } = require("assert");
const { table } = require("console");
const fs = require("fs");
const path = require("path");

//for web deployment, comment this out if testing locally
const credentials = {

  host: "ec2-3-224-184-9.compute-1.amazonaws.com",
  user: "wbzkszrqyydneh",
  password: "c66bc34eae0b43e4317b1c08e1b5771905c38a5e653e8dcea41ccc04a24dcae3",
  database: "d5khufng7stn58",
  port: 5432,
}

//update credentials with your local db info. Uncomment if testing local
// const credentials = {

//     host: "localhost",
//     user: "postgres",
//     password: "password",
//     database: "adoptrdb",
//     port: 5432,
//   }


function executeQuery(newpath){
  subpath =  '/petFinderInterface/txtSQL/'
  popDB = fs.readFileSync(path.join(__dirname,subpath + newpath)).toString();
  return new Promise((resolve,reject) =>{
    pool.query(popDB, (err) => {
      if (err) {
        console.log(err);
        reject(err)
      }
      res ='table updated: ' + newpath
      resolve(console.log(res))
    });
  })
}

async function completeSQL(fileNames){
  await executeQuery(fileNames[0])
  await executeQuery(fileNames[1])
  await executeQuery(fileNames[2])
  await executeQuery(fileNames[3])
  await executeQuery(fileNames[4])
  await executeQuery(fileNames[5])
  await executeQuery(fileNames[6])
  await executeQuery(fileNames[7])
  await executeQuery(fileNames[8])
  await executeQuery(fileNames[9])
  await executeQuery(fileNames[10])
  await executeQuery(fileNames[11])
  await executeQuery(fileNames[12])
  await executeQuery(fileNames[13])
  await executeQuery(fileNames[14])
  await executeQuery(fileNames[15])
}

const pool = new Pool(credentials);
args = process.argv.slice(2);
console.log(args)

if (args != null){
  if(args[0] == 'seed'){

    const createDB = fs.readFileSync(path.join(__dirname, "DDL.sql")).toString();
    console.log('txtFiles generated')

    pool.query(createDB, (err) => {
      if (err) {
        console.log(err);
      }
      else{
        console.log('db created')
        file_names = [
          '1_state_sql.txt',
          '2_city_sql.txt',
          '3_zip_sql.txt',
          '4_type_sql.txt',
          '5_size_sql.txt',
          '6_shelter_sql.txt',
          '8_availability_sql.txt',
          '9_pet_sql.txt',
          '10_breed_sql.txt',
          '11_dispositionTable_sql.txt',
          '12_names_sql.txt',
          '13_pet_breed_sql.txt',
          '14_pet_disp_sql.txt',
          '15_pet_photos_sql.txt',
          '16_fav_pets_sql.txt',
          '17_rej_pets_sql.txt'
        ]

        subpath =  '/petFinderInterface/txtSQL/'

        completeSQL(file_names)
      }
    });
  }
}

module.exports = pool;
