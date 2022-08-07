// Controls access to sensitive pages. 
const express = require('express');
const router = express.Router();
var thisSession  = require('../server');


module.exports = {
  unauthorized: (req, res, next) => {
    console.log("Authorization check (middleware)");
    if (req.session.userID) {
      next();
    } else {
      res.redirect('/unauthorized'); 
    }
  },

  admin_needed: (req, res, next) => {
    console.log("Admin check (middleware)");
    if (req.session.userID == 1) {
      next();
    } else {
      res.redirect('/admin_needed');
    }
  }

};