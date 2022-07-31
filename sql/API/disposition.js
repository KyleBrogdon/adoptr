//Import required tools
const { query } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../sql_Init");

const readDispositions = (request, response) => {
  pool.query("SELECT * FROM disposition", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const readDisposition = (request, response) => {
  const id = parseInt(request.params.dispid);
  pool.query(
    "SELECT * FROM disposition WHERE dispid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createDisposition = (request, response) => {
  const { dispstatus } = request.body;
  // console.log(request.body);
  pool.query(
    "INSERT INTO \
    disposition(dispstatus) \
      VALUES\
      ($1)  RETURNING *",
    [dispstatus],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`Disposition added with ID: ${results.rows[0].dispid}`);
    }
  );
};

const updateDisposition = (request, response) => {
  const id = parseInt(request.params.dispid);
  const { dispstatus } = request.body;
  console.log(request.body);
  pool.query(
    "UPDATE disposition \
    SET dispstatus = $1 \
    WHERE dispid = $2",
    [dispstatus, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Disposition modified with ID: ${id}`);
    }
  );
};

const deleteDisposition = (request, response) => {
  const id = parseInt(request.params.dispid);
  console.log("DELETE/" + id);
  pool.query(
    "DELETE FROM disposition WHERE dispid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Disposition deleted with ID: ${id}`);
    }
  );
};
module.exports = {
  readDispositions,
  readDisposition,
  createDisposition,
  updateDisposition,
  deleteDisposition,
};
