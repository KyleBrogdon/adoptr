// Contains routes for views concerning users
const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
//const db = require('../sql/admin')


//const pool = require('../sql/sql_init');

//Users
router.get("/users", (req, res) => {
  res.render("../views/pages/siteAdmin/users", {});
  /*   if(req.session.userID == 1){
      res.render("../views/pages/siteAdmin/users", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/landingPage", {});
  } */
});


//shelter Admins
router.get("/shelters", (req, res) => {
  res.render("../views/pages/siteAdmin/sheltersSA", {});
  /*   if(req.session.userID == 1){
      res.render("../views/pages/siteAdmin/shelterADmins", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/index", {});
  } */
});


//atributesindex
router.get("/attributes", (req, res) => {
  res.render("../views/pages/siteAdmin/attributeOptions", {});
  /*   if(req.session.userID == 1){
      res.render("../views/pages/siteAdmin/atributeOptions", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/index", {});
  } */
});

//Atributes
//Availability
router.get("/attributes/availability", (req, res) => {
  res.render("../views/pages/siteAdmin/attributes/availability", {});
  /*   if(req.session.userID == 1){
      res.render("../views/pages/siteAdmin/availability", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/landingPage", {});
  } */
});

//Breed
router.get("/attributes/breed", (req, res) => {
  res.render("../views/pages/siteAdmin/attributes/breed", {});
  /*   if(req.session.userID == 1){
      res.render("../views/pages/siteAdmin/breed", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/landingPage", {});
  } */
});


//Disposition
router.get("/attributes/disposition", (req, res) => {
  res.render("../views/pages/siteAdmin/attributes/disposition", {});
  /*   if(req.session.userID == 1){
      res.render("../views/pages/siteAdmin/disposition", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/landingPage", {});
  } */
});

router.get("/attributes/size", (req, res) => {
  res.render("../views/pages/siteAdmin/attributes/size", {});
  /*   if(req.session.userID == 1){
      res.render("../views/pages/siteAdmin/size", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/landingPage", {});
  } */
});

//Type
router.get("/attributes/type", (req, res) => {
  res.render("../views/pages/siteAdmin/attributes/type", {});
  /*   if(req.session.userID == 1){
      res.render("../views/pages/siteAdmin/type", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/landingPage", {});
  } */
});


//////////////////////////////////////////////////////////////////////////////////////////////
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("../views/pages/general/landingPage", {});
});

module.exports = router;
