// Contains routes for views concerning customers
const express = require('express');
const router = express.Router();
//const db = require('../sql/admin')
//const pool = require('../sql/sql_Init');
var thisSession  = require('../server');

//Users
router.get('/adminShelters', (req, res) => {
  console.log(req.session.userid)
  console.log(req.session.adminstatus)
  if(req.session.userid > 1 && req.session.adminstatus != true){
    res.render("../views/pages/general/datingCards", {})
  }else if (req.session.userid > 1 && req.session.adminstatus == true){
    res.render("../views/pages/shelterAdmin/adminShelters", {});
  }else{
    res.render("../views/pages/siteAdmin/siteAdminIndex", {})
  }
});


//shelter Admin profile
router.get('/shelterAdminProfile', (req, res) => {
  console.log(req.session.userid)
  console.log(req.session.adminstatus)
  if(req.session.userid > 1 && req.session.adminstatus != true){
    res.render("../views/pages/general/datingCards", {})
  }else if (req.session.userid > 1 && req.session.adminstatus == true){
    res.render("../views/pages/shelterAdmin/shelterAdminProfile", {});
  }else{
    res.render("../views/pages/siteAdmin/siteAdminIndex", {})
  }
});

//petprofile
router.get('/petProfiles', (req, res) => {
    console.log(req.session.userid)
    console.log(req.session.adminstatus)
    if(req.session.userid > 1 && req.session.adminstatus != true){
      res.render("../views/pages/general/datingCards", {})
    }else if (req.session.userid > 1 && req.session.adminstatus == true){
      res.render("../views/pages/shelterAdmin/petProfiles", {});
    }else{
      res.render("../views/pages/siteAdmin/siteAdminIndex", {})
    }
  });


//shelter profile
router.get('/shelterProfile', (req, res) => {
    console.log(req.session.userid)
    console.log(req.session.adminstatus)
    if(req.session.userid > 1 && req.session.adminstatus != true){
      res.render("../views/pages/general/datingCards", {})
    }else if (req.session.userid > 1 && req.session.adminstatus == true){
      res.render("../views/pages/shelterAdmin/shelterProfile", {});
    }else{
      res.render("../views/pages/siteAdmin/siteAdminIndex", {})
    }
  });


  
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.render("../views/pages/general/landingPage", {});
});
  
module.exports = router;