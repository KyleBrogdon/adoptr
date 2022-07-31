//Import required tools
const { query } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../sql_Init");

const readCities = (request, response) => {
  pool.query("SELECT * FROM city", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const readCity = (request, response) => {
  const id = parseInt(request.params.cityid);
  pool.query("SELECT * FROM city WHERE cityid = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createCity = (request, response) => {
  const { cityname, stateid } = request.body;
  // console.log(request.body);
  pool.query(
    "INSERT INTO \
    city(cityname, stateid) \
      VALUES\
      ($1, $2)  RETURNING *",
    [cityname, stateid],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`City added with ID: ${results.rows[0].cityid}`);
    }
  );
};

const updateCity = (request, response) => {
  const id = parseInt(request.params.cityid);
  const { cityname, stateid } = request.body;
  console.log(request.body);
  pool.query(
    "UPDATE city \
    SET cityname = $1, stateid = $2 \
    WHERE cityid = $3",
    [cityname, stateid, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`City modified with ID: ${id}`);
    }
  );
};

const deleteCity = (request, response) => {
  const id = parseInt(request.params.cityid);
  console.log("DELETE/" + id);
  pool.query("DELETE FROM city WHERE cityid = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`City deleted with ID: ${id}`);
  });
};
module.exports = {
  readCities,
  readCity,
  createCity,
  updateCity,
  deleteCity,
};
