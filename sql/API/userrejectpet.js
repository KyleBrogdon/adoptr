//Import required tools
const { query } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../sql_Init");

const createUserRejectPets = (request, response) => {
  const uid = request.body.params.userid
  const pid = request.body.params.petid
  //   console.log(request.body);
  pool.query(
    "INSERT INTO \
      user_rejected_pet(userid, petid) \
      VALUES\
      ($1, $2) RETURNING *",
    [uid, pid],
    (error, results) => {
      if (error) {
        console.log('user rejected pets add error')
      }
      response
        .status(201)
        .send(`User ${request.body.params.userid} saved pet ${request.body.params.petid}`);
    }
  );
};

module.exports = {
  createUserRejectPets,
};
