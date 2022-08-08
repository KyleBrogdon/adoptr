// Contains routes for views concerning users
const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
//const db = require('../sql/admin')
var thisSession  = require('../server');


//const pool = require('../sql/sql_Init');

//Users
router.get("/users", (req, res) => {
  console.log(req.session.userid)
  console.log(req.session.adminstatus)
  if(req.session.userid > 1 && req.session.adminstatus != true){
      res.render("../views/pages/general/datingCards", {})
  }else if (req.session.userid > 1 && req.session.adminstatus == true){
      res.render("../views/pages/shelterAdmin/shelterAdminIndex", {})
  }else{
      res.render("../views/pages/siteAdmin/users", {});
  }
});


//shelter Admins
router.get("/shelters", (req, res) => {
  console.log(req.session.userid)
  console.log(req.session.adminstatus)
  if(req.session.userid > 1 && req.session.adminstatus != true){
      res.render("../views/pages/general/datingCards", {})
  }else if (req.session.userid > 1 && req.session.adminstatus == true){
      res.render("../views/pages/shelterAdmin/shelterAdminIndex", {})
  }else{
    res.render("../views/pages/siteAdmin/sheltersSA", {});
  }
});


//atributesindex
router.get("/attributes", (req, res) => {
  console.log(req.session.userid)
  console.log(req.session.adminstatus)
  if(req.session.userid > 1 && req.session.adminstatus != true){
      res.render("../views/pages/general/datingCards", {})
  }else if (req.session.userid > 1 && req.session.adminstatus == true){
      res.render("../views/pages/shelterAdmin/shelterAdminIndex", {})
  }else{
    res.render("../views/pages/siteAdmin/attributeOptions", {});
  }
});

//Atributes
//Availability
router.get("/attributes/availability", (req, res) => {
  console.log(req.session.userid)
  console.log(req.session.adminstatus)
  if(req.session.userid > 1 && req.session.adminstatus != true){
      res.render("../views/pages/general/datingCards", {})
  }else if (req.session.userid > 1 && req.session.adminstatus == true){
      res.render("../views/pages/shelterAdmin/shelterAdminIndex", {})
  }else{
    res.render("../views/pages/siteAdmin/attributes/availability", {});
  }
});

//Breed
router.get("/attributes/breed", (req, res) => {
  
  console.log(req.session.userid)
  console.log(req.session.adminstatus)
  if(req.session.userid > 1 && req.session.adminstatus != true){
      res.render("../views/pages/general/datingCards", {})
  }else if (req.session.userid > 1 && req.session.adminstatus == true){
      res.render("../views/pages/shelterAdmin/shelterAdminIndex", {})
  }else{
    res.render("../views/pages/siteAdmin/attributes/breed", {});
  }
});


//Disposition
router.get("/attributes/disposition", (req, res) => {
  console.log(req.session.userid)
  console.log(req.session.adminstatus)
  if(req.session.userid > 1 && req.session.adminstatus != true){
      res.render("../views/pages/general/datingCards", {})
  }else if (req.session.userid > 1 && req.session.adminstatus == true){
      res.render("../views/pages/shelterAdmin/shelterAdminIndex", {})
  }else{
    res.render("../views/pages/siteAdmin/attributes/disposition", {});
  }
});

router.get("/attributes/size", (req, res) => {
  console.log(req.session.userid)
  console.log(req.session.adminstatus)
  if(req.session.userid > 1 && req.session.adminstatus != true){
    res.render("../views/pages/general/datingCards", {})
  }else if (req.session.userid > 1 && req.session.adminstatus == true){
    res.render("../views/pages/shelterAdmin/shelterAdminIndex", {})
  }else{
    res.render("../views/pages/siteAdmin/attributes/size", {});
  }
});

//Type
router.get("/attributes/type", (req, res) => {
  console.log(req.session.userid)
  console.log(req.session.adminstatus)
  if(req.session.userid > 1 && req.session.adminstatus != true){
    res.render("../views/pages/general/datingCards", {})
  }else if (req.session.userid > 1 && req.session.adminstatus == true){
    res.render("../views/pages/shelterAdmin/shelterAdminIndex", {})
  }else{
    res.render("../views/pages/siteAdmin/attributes/type", {});
  }
});


//////////////////////////////////////////////////////////////////////////////////////////////
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("../views/pages/general/landingPage", {});
});

module.exports = router;
