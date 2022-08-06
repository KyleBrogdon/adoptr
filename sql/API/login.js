//Import required tools
const { query } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../sql_Init");

const validate = (request, response) => {
    const email = request.params.email;
    const password = request.params.userpassword;
    pool.query(
        "SELECT userid FROM app_user WHERE email = $1 AND userpassword = $2",
        [email, password],
        (error, results) => {
          if (error) {
            throw error;
          }
          response.status(200).json(results.rows);
        })
}

const checkEmail = (request, response) => {
    const email = request.params.email;
    pool.query(
        "SELECT COUNT(*) FROM app_user WHERE email = $1",
        [email],
        (error, results) => {
          if (error) {
            throw error;
          }
          response.status(200).json(results.rows);
        })
}


module.exports = {
    validate,
    checkEmail
}

