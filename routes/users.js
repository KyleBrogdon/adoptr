const express = require("express");
const pool = require("../sql/sql_init");
const router = express.Router();
//const db = require('../sql/admin')
//const pool = require('../sql/sql_init');

//shelter Admin profile
router.get("/userProfile", (req, res) => {
  res.render("../views/pages/users/userProfile", {});
  /*   if(req.session.userID == 1){
        res.render("../views/pages/siteAdmin/shelterADmins", {});
    }
    else{
        console.log("unauthorized access")
        res.render("../views/pages/general/index", {});
    } */
});

//petprofile
router.get("/petProfile", (req, res) => {
  res.render("../views/pages/users/petProfile", {});
  /*   if(req.session.userID == 1){
        res.render("../views/pages/siteAdmin/shelterADmins", {});
    }
    else{
        console.log("unauthorized access")
        res.render("../views/pages/general/index", {});
    } */
});

//search pets
router.get("/petSearch", (req, res) => {
  res.render("../views/pages/users/petSearch", {});
  /*   if(req.session.userID == 1){
        res.render("../views/pages/siteAdmin/shelterADmins", {});
    }
    else{
        console.log("unauthorized access")
        res.render("../views/pages/general/index", {});
    } */
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("../views/pages/general/landingPage", {});
});

module.exports = router;
