const express = require("express");
//const pool = require("../sql/sql_Init");
const router = express.Router();
//const db = require('../sql/admin')
//const pool = require('../sql/sql_Init');
var thisGlobal  = require('../server');


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
    thisGlobal.thisSession = req.session;
    console.log(req.body.params);
    thisGlobal.thisSession.userid = req.body.params.userid;
    thisGlobal.thisSession.adminstatus = req.body.params.adminstatus;
    req.session.save();
})

router.get('/getSessionId',(req, res) => {
    let id = thisGlobal.thisSession.userid
    res.json(id);
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
