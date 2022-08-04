//Import required tools
const { query } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../sql_init");
console.log('hi');

const readAdminShelters = (request, response) => {
  pool.query("SELECT * FROM admin_shelter", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const readAdminShelter = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT * FROM admin_shelter WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const readAdminShelterUser = (request, response) => {
  const id = parseInt(request.params.userid);
  pool.query(
    "SELECT * FROM admin_shelter WHERE userid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createAdminShelter = (request, response) => {
  const { userid, shelterid } = request.body;
  // console.log(request.body);
  pool.query(
    "INSERT INTO \
      admin_shelter(userid, shelterid) \
      VALUES\
      ($1, $2)  RETURNING *",
    [userid, shelterid],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`Admin-shelter added with ID: ${results.rows[0].id}`);
    }
  );
};

const updateAdminShelter = (request, response) => {
  const id = parseInt(request.params.id);
  const { userid, shelterid } = request.body;
  console.log(request.body);
  pool.query(
    "UPDATE admin_shelter \
    SET userid = $1, shelterid = $2 \
    WHERE id = $3",
    [userid, shelterid, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Admin_shelter modified with ID: ${id}`);
    }
  );
};

const deleteAdminShelter = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "DELETE FROM admin_shelter WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Admin_shelter deleted with ID: ${id}`);
    }
  );
};
module.exports = {
  readAdminShelters,
  readAdminShelter,
  readAdminShelterUser,
  createAdminShelter,
  updateAdminShelter,
  deleteAdminShelter,
};
