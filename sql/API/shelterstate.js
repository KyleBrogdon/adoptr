//Import required tools
const { query } = require("express");
const express = require("express");
const { stat } = require("fs");
const router = express.Router();
const pool = require("../sql_Init");

const readStates = (request, response) => {
  pool.query("SELECT * FROM shelter_state", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const readState = (request, response) => {
  const id = parseInt(request.params.stateid);
  pool.query(
    "SELECT * FROM shelter_state WHERE stateid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createState = (request, response) => {
  const { statename, statecode } = request.body;
  // console.log(request.body);
  pool.query(
    "INSERT INTO \
    shelter_state(statename, statecode) \
      VALUES\
      ($1, $2)  RETURNING *",
    [statename, statecode],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`State added with ID: ${results.rows[0].stateid}`);
    }
  );
};

const updateState = (request, response) => {
  const id = parseInt(request.params.stateid);
  const { statename, statecode } = request.body;
  console.log(request.body);
  pool.query(
    "UPDATE shelter_state \
    SET statename = $1, statecode = $2 \
    WHERE stateid = $3",
    [statename, statecode, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`State modified with ID: ${id}`);
    }
  );
};

const deleteState = (request, response) => {
  const id = parseInt(request.params.stateid);
  console.log("DELETE/" + id);
  pool.query(
    "DELETE FROM shelter_state WHERE stateid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`State deleted with ID: ${id}`);
    }
  );
};
module.exports = {
  readState,
  readStates,
  createState,
  updateState,
  deleteState,
};
