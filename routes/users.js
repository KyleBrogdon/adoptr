const express = require("express");
const session = require("express-session");
//const pool = require("../sql/sql_Init");
const router = express.Router();
//const db = require('../sql/admin')
//const pool = require('../sql/sql_Init');


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

router.post("/login", (req, res) => {
    let sess = req.session
    console.log(req.body.params);
    sess.userid = req.body.params.userid;
    sess.adminstatus = req.body.params.adminstatus;
    console.log("the id is" + sess.userid);
    // res.redirect("/landing/petCards")
})


router.get("/logout", (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            return console.log(err)
        } else {
            res.redirect('/')
        }
    });
});

module.exports = router;
