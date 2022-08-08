const express = require("express");
const session = require("express-session");
//const pool = require("../sql/sql_Init");
const router = express.Router();
//const db = require('../sql/admin')
//const pool = require('../sql/sql_Init');
var thisGlobal  = require('../server');


//shelter Admin profile
router.get("/userProfile", (req, res) => {
    console.log(req.session.userid)
    console.log(req.session.adminstatus)
    if(req.session.userid > 1 && req.session.adminstatus != true){
        res.render("../views/pages/users/userProfile", {});
    }else if (req.session.userid > 0 && req.session.adminstatus == true){
        res.render("../views/pages/shelterAdmin/shelterAdminIndex", {})
    }else{
        res.render("../views/pages/siteAdmin/siteAdminIndex", {})
    }
});

//petprofile
router.get("/petProfile", (req, res) => {
    console.log(req.session.userid)
    console.log(req.session.adminstatus)
    if(req.session.userid > 1 && req.session.adminstatus != true){
        res.render("../views/pages/users/petProfile", {});
    }else if (req.session.userid > 0 && req.session.adminstatus == true){
        res.render("../views/pages/shelterAdmin/shelterAdminIndex", {})
    }else{
        res.render("../views/pages/siteAdmin/siteAdminIndex", {})
    }
});

//search pets
router.get("/petSearch", (req, res) => {
    console.log(req.session.userid)
    console.log(req.session.adminstatus)
    if(req.session.userid > 1 && req.session.adminstatus != true){
        res.render("../views/pages/users/petSearch", {});
    }else if (req.session.userid > 0 && req.session.adminstatus == true){
        res.render("../views/pages/shelterAdmin/shelterAdminIndex", {})
    }else{
        res.render("../views/pages/siteAdmin/siteAdminIndex", {})
    }
});

router.post("/login", (req, res) => {
    //thisGlobal.thisSession = req.session;
    // console.log(req.body.params);
    // thisGlobal.thisSession.userid = req.body.params.userid;
    // thisGlobal.thisSession.adminstatus = req.body.params.adminstatus;
    // req.session.save();
})

router.get('/getSessionId',(req, res) => {
    console.log(req.session)
    res.json(req.session.userid)
    // let id = thisGlobal.thisSession.userid
    // res.json(id);
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
