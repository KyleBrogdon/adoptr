//Import required tools
const { query } = require("express");
const express = require("express");
const { stat } = require("fs");
const router = express.Router();
const pool = require("../sql_Init");

const readStates = (request, response) => {
  pool.query("SELECT * FROM shelter_state", (error, results) => {
    if (error) {
      console.log("failed to pull states")
      response.status(200).json(null);
    }else{
      response.status(200).json(results.rows);
    }
  });
};

const readState = (request, response) => {
  const id = parseInt(request.params.stateid);
  pool.query(
    "SELECT * FROM shelter_state WHERE stateid = $1",
    [id],
    (error, results) => {
      if (error) {
        console.log("failed to pull state")
        response.status(200).json(null);
      }else{
        response.status(200).json(results.rows);
      }

    }
  );
};

const readStateValue = (request, response) => {
  const statename = parseInt(request.params.statename);
  pool.query(
    "SELECT * FROM shelter_state WHERE statename = $1",
    [statename],
    (error, results) => {
      if (error) {
        console.log("failed to pull state")
        response.status(200).json(null);
      }else{
        response.status(200).json(results.rows);
      }

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
        console.log("failed to create state")
        response.status(200).json(null);
      }else{
        response
        .status(201)
        .send(`State added with ID: ${results.rows[0].stateid}`);
      }

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
        console.log("failed to update state")
        response.status(200).json(null);
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
        console.log("failed to delete state")
        response.status(200).json(null);
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
  readStateValue,
};
