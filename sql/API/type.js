//Import required tools
const { query } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../sql_Init");

const readTypes = (request, response) => {
  pool.query("SELECT * FROM pet_type", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const readType = (request, response) => {
  const id = parseInt(request.params.typeid);
  pool.query(
    "SELECT * FROM pet_type WHERE typeid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createType = (request, response) => {
  const { typename } = request.body;
  // console.log(request.body);
  pool.query(
    "INSERT INTO \
    pet_type(typename) \
      VALUES\
      ($1)  RETURNING *",
    [typename],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`Type added with ID: ${results.rows[0].typeid}`);
    }
  );
};

const updateType = (request, response) => {
  const id = parseInt(request.params.typeid);
  const { typename } = request.body;
  console.log(request.body);
  pool.query(
    "UPDATE pet_type \
    SET typename = $1 \
    WHERE typeid = $2",
    [typename, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Type modified with ID: ${id}`);
    }
  );
};

const deleteType = (request, response) => {
  const id = parseInt(request.params.typeid);
  console.log("DELETE/" + id);
  pool.query(
    "DELETE FROM pet_type WHERE typeid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Type deleted with ID: ${id}`);
    }
  );
};
module.exports = {
  readTypes,
  readType,
  createType,
  updateType,
  deleteType,
};
