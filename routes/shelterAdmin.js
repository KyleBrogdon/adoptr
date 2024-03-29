// Contains routes for views concerning customers
const express = require('express');
const router = express.Router();
//const db = require('../sql/admin')
//const pool = require('../sql/sql_Init');
var thisSession  = require('../server');

//Users
router.get('/adminShelters', (req, res) => {
  if(req.session.userid > 1 && req.session.adminstatus != true){
    res.render("../views/pages/general/datingCards", {})
  }else if (req.session.userid > 1 && req.session.adminstatus == true){
    res.render("../views/pages/shelterAdmin/adminShelters", {});
  }else if (req.session.userid == 1 && req.session.adminstatus == true){
    res.render("../views/pages/siteAdmin/siteAdminIndex", {})
  }else{
    res.render("../views/pages/general/landingPage", {});
  }
});


//shelter Admin profile
router.get('/shelterAdminProfile', (req, res) => {

  if(req.session.userid > 1 && req.session.adminstatus != true){
    res.render("../views/pages/general/datingCards", {})
  }else if (req.session.userid > 1 && req.session.adminstatus == true){
    res.render("../views/pages/shelterAdmin/shelterAdminProfile", {});
  }else if (req.session.userid == 1 && req.session.adminstatus == true){
    res.render("../views/pages/siteAdmin/siteAdminIndex", {})
  }else{
    res.render("../views/pages/general/landingPage", {});
  }
});

//petprofile
router.get('/petProfiles', (req, res) => {

    if(req.session.userid > 1 && req.session.adminstatus != true){
      res.render("../views/pages/general/datingCards", {})
    }else if (req.session.userid > 1 && req.session.adminstatus == true){
      res.render("../views/pages/shelterAdmin/petProfiles", {});
    }else if (req.session.userid == 1 && req.session.adminstatus == true){
      res.render("../views/pages/siteAdmin/siteAdminIndex", {})
    }else{
      res.render("../views/pages/general/landingPage", {});
    }
  });


//shelter profile
router.get('/shelterProfile', (req, res) => {

    if(req.session.userid > 1 && req.session.adminstatus != true){
      res.render("../views/pages/general/datingCards", {})
    }else if (req.session.userid > 1 && req.session.adminstatus == true){
      res.render("../views/pages/shelterAdmin/shelterProfile", {});
    }else if (req.session.userid == 1 && req.session.adminstatus == true){
      res.render("../views/pages/siteAdmin/siteAdminIndex", {})
    }else{
      res.render("../views/pages/general/landingPage", {});
    }
  });


  
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.render("../views/pages/general/landingPage", {});
});
  
module.exports = router;