const express = require("express");
const session = require("express-session");
//const pool = require("../sql/sql_Init");
const router = express.Router();
//const db = require('../sql/admin')
//const pool = require('../sql/sql_Init');
var thisGlobal  = require('../server');


//shelter Admin profile
router.get("/userProfile", (req, res) => {
    if(req.session.userid > 1 && req.session.adminstatus != true){
        res.render("../views/pages/users/userProfile", {});
    }else if (req.session.userid > 0 && req.session.adminstatus == true){
        res.render("../views/pages/shelterAdmin/shelterAdminIndex", {})
    }else if (req.session.userid == 1 && req.session.adminstatus == true){
        res.render("../views/pages/siteAdmin/siteAdminIndex", {})
      }else{
        res.render("../views/pages/general/landingPage", {});
      }
});

//petprofile
router.get("/petProfile", (req, res) => {
    if(req.session.userid > 1 && req.session.adminstatus != true){
        res.render("../views/pages/users/petProfile", {});
    }else if (req.session.userid > 0 && req.session.adminstatus == true){
        res.render("../views/pages/shelterAdmin/shelterAdminIndex", {})
    }else if (req.session.userid == 1 && req.session.adminstatus == true){
        res.render("../views/pages/siteAdmin/siteAdminIndex", {})
    }else{
        res.render("../views/pages/general/landingPage", {});
    }
});

//search pets
router.get("/petSearch", (req, res) => {
    if(req.session.userid > 1 && req.session.adminstatus != true){
        res.render("../views/pages/users/petSearch", {});
    }else if (req.session.userid > 0 && req.session.adminstatus == true){
        res.render("../views/pages/shelterAdmin/shelterAdminIndex", {})
    }else if (req.session.userid == 1 && req.session.adminstatus == true){
        res.render("../views/pages/siteAdmin/siteAdminIndex", {})
    }else{
        res.render("../views/pages/general/landingPage", {});
    }
});

// router.post("/login", (req, res) => {

// })

router.get('/getSessionId',(req, res) => {
    console.log(req.session)
    res.json(req.session.userid)
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
