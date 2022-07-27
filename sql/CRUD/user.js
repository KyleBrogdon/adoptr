//Import required tools
const { query } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../sql_init");

const readUsers = (request, response) => {
  pool.query("SELECT * FROM app_user", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const readUser = (request, response) => {
  const id = parseInt(request.params.userid);
  pool.query(
    "SELECT * FROM app_user WHERE userid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createUser = (request, response) => {
  const queryVals = [
    request.body.firstname,
    request.body.lastname,
    request.body.email,
    request.body.userpassword,
    Boolean(request.body.adminstatus),
  ];
  console.log(request.body);
  pool.query(
    "INSERT INTO \
      app_user(firstname, lastname, email, userpassword, adminstatus) \
      VALUES\
      ($1, $2, $3, $4, $5) RETURNING *",
    queryVals,
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`User added with ID: ${results.rows[0].userid}`);
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.userid);
  const { firstname, lastname, email, userpassword, adminstatus } =
    request.body;

  pool.query(
    "UPDATE app_user \
    SET firstname = $1, lastname = $2, email = $3, userpassword = $4, adminstatus = $5 \
    WHERE userid = $6",
    [firstname, lastname, email, userpassword, adminstatus, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.userid);
  console.log("DELETE/" + id);
  pool.query(
    "DELETE FROM app_user WHERE userid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};
module.exports = {
  readUsers,
  readUser,
  createUser,
  updateUser,
  deleteUser,
};
