//Import required tools

const express = require("express");
const router = express.Router();
const pool = require("../sql_Init");

const validate = (request, response) => {
    const email = request.params.email;
    const password = request.params.userpassword;
    console.log(email)
    console.log(password)
    pool.query(
        "SELECT * FROM app_user WHERE email = $1 AND userpassword = $2",
        [email, password],
        (error, results) => {
          if (error) {
            throw error;
          }
          if(results.rows.length == 0){
            console.log("bad login")
            response.status(200).json("bad");
          }else{
            console.log(results.rows)
            request.session.userid = results.rows[0].userid
            request.session.adminstatus = results.rows[0].adminstatus
            credentials = {userid : null, adminstatus : null};
            credentials.userid =results.rows[0].userid
            credentials.adminstatus =results.rows[0].adminstatus


            response.status(200).json(credentials);
          }

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

