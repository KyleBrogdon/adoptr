//Import required tools
const { query } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../sql_Init");

const readBreeds = (request, response) => {
  pool.query(
    "SELECT * \
    FROM breed\
    ORDER BY breedid ASC", 
    (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const readBreed = (request, response) => {
  const id = parseInt(request.params.breedid);
  pool.query(
    "SELECT * FROM breed WHERE breedid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};


const readBreedType = (request, response) => {
  const id = parseInt(request.params.typeid);
  pool.query(
    "SELECT * FROM breed WHERE typeid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};


const createBreed = (request, response) => {
  const { breedname, typeid } = request.body;
  // console.log(request.body);
  pool.query(
    "INSERT INTO \
    breed(breedname, typeid) \
      VALUES\
      ($1, $2)  RETURNING *",
    [breedname, typeid],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`Breed added with ID: ${results.rows[0].breedid}`);
    }
  );
};

const updateBreed = (request, response) => {
  const id = parseInt(request.params.breedid);
  const { breedname, typeid } = request.body;
  console.log(request.body);
  pool.query(
    "UPDATE breed \
    SET breedname = $1, typeid = $2 \
    WHERE breedid = $3",
    [breedname, typeid, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Breed modified with ID: ${id}`);
    }
  );
};

const deleteBreed = (request, response) => {
  const id = parseInt(request.params.breedid);
  console.log("DELETE/" + id);
  pool.query("DELETE FROM breed WHERE breedid = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Breed deleted with ID: ${id}`);
  });
};
module.exports = {
  readBreeds,
  readBreed,
  createBreed,
  updateBreed,
  deleteBreed,
  readBreedType,
};
