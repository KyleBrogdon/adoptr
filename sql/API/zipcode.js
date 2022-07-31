//Import required tools
const { query } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../sql_Init");

const readZipcodes = (request, response) => {
  pool.query("SELECT * FROM zipcode", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const readZipcode = (request, response) => {
  const id = parseInt(request.params.zipcodeid);
  pool.query(
    "SELECT * FROM zipcode WHERE zipcodeid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createZipcode = (request, response) => {
  const { zipcode, cityid } = request.body;
  // console.log(request.body);
  pool.query(
    "INSERT INTO \
    zipcode(zipcode, cityid) \
      VALUES\
      ($1, $2)  RETURNING *",
    [zipcode, cityid],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`Zipcode added with ID: ${results.rows[0].zipcodeid}`);
    }
  );
};

const updateZipcode = (request, response) => {
  const id = parseInt(request.params.zipcodeid);
  const { zipcode, cityid } = request.body;
  console.log(request.body);
  pool.query(
    "UPDATE zipcode \
    SET zipcode = $1, cityid = $2 \
    WHERE zipcodeid = $3",
    [zipcode, cityid, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Zipcode modified with ID: ${id}`);
    }
  );
};

const deleteZipcode = (request, response) => {
  const id = parseInt(request.params.zipcodeid);
  console.log("DELETE/" + id);
  pool.query(
    "DELETE FROM zipcode WHERE zipcodeid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Zipcode deleted with ID: ${id}`);
    }
  );
};
module.exports = {
  readZipcodes,
  readZipcode,
  createZipcode,
  updateZipcode,
  deleteZipcode,
};
