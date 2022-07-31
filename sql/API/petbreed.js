//Import required tools
const { query } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../sql_Init");

const readPetBreeds = (request, response) => {
  pool.query("SELECT * FROM pet_breed", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const readPetBreed = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT * FROM pet_breed WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createPetBreed = (request, response) => {
  const { petid, breedid } = request.body;
  // console.log(request.body);
  pool.query(
    "INSERT INTO \
    pet_breed(petid, breedid) \
      VALUES\
      ($1, $2)  RETURNING *",
    [petid, breedid],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`Pet Breed added with ID: ${results.rows[0].id}`);
    }
  );
};

const updatePetBreed = (request, response) => {
  const id = parseInt(request.params.id);
  const { petid, breedid } = request.body;
  console.log(request.body);
  pool.query(
    "UPDATE pet_breed \
    SET petid = $1, breedid = $2 \
    WHERE id = $3",
    [petid, breedid, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Pet Breed modified with ID: ${id}`);
    }
  );
};

const deletePetBreed = (request, response) => {
  const id = parseInt(request.params.id);
  console.log("DELETE/" + id);
  pool.query("DELETE FROM pet_breed WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Pet Breed deleted with ID: ${id}`);
  });
};
module.exports = {
  readPetBreeds,
  readPetBreed,
  createPetBreed,
  updatePetBreed,
  deletePetBreed,
};
