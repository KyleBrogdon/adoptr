//Import required tools
const { query } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../sql_Init");

const createUserRejectPets = (request, response) => {
  const queryVals = [request.body.userid, request.body.petid];
  //   console.log(request.body);
  pool.query(
    "INSERT INTO \
      user_rejected_pet(userid, petid) \
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

module.exports = {
  createUserRejectPets,
};
