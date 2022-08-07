// Contains routes for views concerning customers
const express = require('express');
const router = express.Router();
//const db = require('../sql/admin')
//const pool = require('../sql/sql_Init');
var thisSession  = require('../server');

//Users
router.get('/adminShelters', (req, res) => {
  res.render("../views/pages/shelterAdmin/adminShelters", {});
/*   if(req.session.customerID == 1){
      res.render("../views/pages/siteAdmin/users", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/index", {});
  } */
});


//shelter Admin profile
router.get('/shelterAdminProfile', (req, res) => {
  res.render("../views/pages/shelterAdmin/shelterAdminProfile", {});
/*   if(req.session.userID == 1){
      res.render("../views/pages/siteAdmin/shelterADmins", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/index", {});
  } */
});

//petprofile
router.get('/petProfiles', (req, res) => {
    res.render("../views/pages/shelterAdmin/petProfiles", {});
  /*   if(req.session.userID == 1){
        res.render("../views/pages/siteAdmin/shelterADmins", {});
    }
    else{
        console.log("unauthorized access")
        res.render("../views/pages/general/index", {});
    } */
  });


//shelter profile
router.get('/shelterProfile', (req, res) => {
    res.render("../views/pages/shelterAdmin/shelterProfile", {});
  /*   if(req.session.userID == 1){
        res.render("../views/pages/siteAdmin/shelterADmins", {});
    }
    else{
        console.log("unauthorized access")
        res.render("../views/pages/general/index", {});
    } */
  });


  
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.render("../views/pages/general/landingPage", {});
});
  
module.exports = router;