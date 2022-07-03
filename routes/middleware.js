// Controls access to sensitive pages. 
const express = require('express');

module.exports = {
  unauthorized: (req, res, next) => {
    console.log("Authorization check (middleware)");
    if (req.session.userID) {
      next();
    } else {
      res.redirect('/unauthorized'); 
    }
  },
};