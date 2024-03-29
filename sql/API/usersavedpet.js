//Import required tools
const { query } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../sql_Init");

const createUserSavedPets = (request, response) => {
  const uid = request.body.params.userid
  const pid = request.body.params.petid
  console.log(uid);
  console.log(pid);
  pool.query(
    "INSERT INTO \
      user_saved_pet(userid, petid) \
      VALUES\
      ($1, $2) RETURNING *",
    [uid, pid],
    (error, results) => {
      if (error) {
        console.log('user saved pets add error')
      }
      response
        .status(201)
        .send(`User ${request.body.params.userid} saved pet ${request.body.params.petid}`);
    }
  );
};


const readUserSavedPet = (request, response) => {
  const id = parseInt(request.params.userid);
  pool.query(
    "SELECT * FROM user_saved_pet WHERE userid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};


const deleteUserSavedPet = (request, response) => {
  const userid = parseInt(request.params.userid);
  const petid = parseInt(request.params.petid);
  console.log(`petid - ${petid} and userid - ${userid}`);
  pool.query(
    "DELETE FROM user_saved_pet WHERE userid = $1 AND petid = $2",
    [userid, petid],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User ${userid} deleted pet with ID: ${petid}`);
    }
  );
};
module.exports = {
  createUserSavedPets,
  deleteUserSavedPet,
  readUserSavedPet
};
