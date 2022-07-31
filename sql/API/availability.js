//Import required tools
const { query } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../sql_Init");

const readAvailabilties = (request, response) => {
  pool.query("SELECT * FROM pet_availability", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const readAvailabilty = (request, response) => {
  const id = parseInt(request.params.avid);
  pool.query(
    "SELECT * FROM pet_availability WHERE avid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createAvailability = (request, response) => {
  const { pet_availability } = request.body;
  // console.log(request.body);
  pool.query(
    "INSERT INTO \
    pet_availability(pet_availability) \
      VALUES\
      ($1)  RETURNING *",
    [pet_availability],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`Availability added with ID: ${results.rows[0].avid}`);
    }
  );
};

const updateAvailability = (request, response) => {
  const id = parseInt(request.params.avid);
  const { pet_availability } = request.body;
  console.log(request.body);
  pool.query(
    "UPDATE pet_availability \
    SET pet_availability = $1 \
    WHERE avid = $2",
    [pet_availability, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Availability modified with ID: ${id}`);
    }
  );
};

const deleteAvailability = (request, response) => {
  const id = parseInt(request.params.avid);
  console.log("DELETE/" + id);
  pool.query(
    "DELETE FROM pet_availability WHERE avid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Availability deleted with ID: ${id}`);
    }
  );
};
module.exports = {
  readAvailabilties,
  readAvailabilty,
  createAvailability,
  updateAvailability,
  deleteAvailability,
};
