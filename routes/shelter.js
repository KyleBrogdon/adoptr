//Import required tools
const { query } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../sql/sql_init");

const readShelters = (request, response) => {
  pool.query("SELECT * FROM shelter", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const readShelter = (request, response) => {
  const id = parseInt(request.params.shelterid);
  pool.query(
    "SELECT * FROM shelter WHERE shelterid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createShelter = (request, response) => {
  const {
    sheltername,
    sheltercode,
    email,
    shelterpassword,
    phonenumber,
    zipcodeid,
    cityid,
    stateid,
  } = request.body;
  // console.log(request.body);
  pool.query(
    "INSERT INTO \
    shelter(sheltername, sheltercode, email, shelterpassword, phonenumber, zipcodeid, cityid, stateid) \
      VALUES\
      ($1, $2, $3, $4, $5, $6, $7, $8)  RETURNING *",
    [
      sheltername,
      sheltercode,
      email,
      shelterpassword,
      phonenumber,
      zipcodeid,
      cityid,
      stateid,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`Shelter added with ID: ${results.rows[0].shelterid}`);
    }
  );
};

const updateShelter = (request, response) => {
  const id = parseInt(request.params.shelterid);
  const {
    sheltername,
    sheltercode,
    email,
    shelterpassword,
    phonenumber,
    zipcodeid,
    cityid,
    stateid,
  } = request.body;
  console.log(request.body);
  pool.query(
    "UPDATE shelter \
    SET sheltername = $1, sheltercode = $2, email = $3, shelterpassword = $4, phonenumber = $5, \
    zipcodeid = $6, cityid = $7, stateid = $8\
    WHERE shelterid = $9",
    [
      sheltername,
      sheltercode,
      email,
      shelterpassword,
      phonenumber,
      zipcodeid,
      cityid,
      stateid,
      id,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Shelter modified with ID: ${id}`);
    }
  );
};

const deleteShelter = (request, response) => {
  const id = parseInt(request.params.shelterid);
  console.log("DELETE/" + id);
  pool.query(
    "DELETE FROM shelter WHERE shelterid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Shelter deleted with ID: ${id}`);
    }
  );
};
module.exports = {
  readShelters,
  readShelter,
  createShelter,
  updateShelter,
  deleteShelter,
};
