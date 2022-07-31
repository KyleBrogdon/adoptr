//Import required tools
const { query } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../sql_Init");

const readSizes = (request, response) => {
  pool.query("SELECT * FROM pet_size", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const readSize = (request, response) => {
  const id = parseInt(request.params.sizeid);
  pool.query(
    "SELECT * FROM pet_size WHERE sizeid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createSize = (request, response) => {
  const { petsize } = request.body;
  // console.log(request.body);
  pool.query(
    "INSERT INTO \
    pet_size(petsize) \
      VALUES\
      ($1)  RETURNING *",
    [petsize],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`Size added with ID: ${results.rows[0].sizeid}`);
    }
  );
};

const updateSize = (request, response) => {
  const id = parseInt(request.params.sizeid);
  const { petsize } = request.body;
  console.log(request.body);
  pool.query(
    "UPDATE pet_size \
    SET petsize = $1 \
    WHERE sizeid = $2",
    [petsize, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Size modified with ID: ${id}`);
    }
  );
};

const deleteSize = (request, response) => {
  const id = parseInt(request.params.sizeid);
  console.log("DELETE/" + id);
  pool.query(
    "DELETE FROM pet_size WHERE sizeid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Size deleted with ID: ${id}`);
    }
  );
};
module.exports = {
  readSizes,
  readSize,
  createSize,
  updateSize,
  deleteSize,
};
