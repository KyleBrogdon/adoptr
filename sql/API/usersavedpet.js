//Import required tools
const { query } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../sql_init");

const createUserSavedPets = (request, response) => {
  const queryVals = [request.body.userid, request.body.petid];
  console.log(request.body);
  pool.query(
    "INSERT INTO \
      user_saved_pet(userid, petid) \
      VALUES\
      ($1, $2) RETURNING *",
    queryVals,
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`User ${request.body.userid} saved pet ${request.body.petid}`);
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
};
