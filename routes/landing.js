// Contains routes for views concerning customers
const express = require('express');
const router = express.Router();
const pool = require("../sql/sql_init");


const Pets = (request, response) => {
    pool.query("SELECT * FROM pet LIMIT 20", (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };

router.get("/landingPage", (req,res) => {
    res.render("../views/pages/general/landingPage", { pets: Pets
  
    });
})

router.get('/login', (req, res) => {
    res.render("../views/pages/general/login", { //need to add

    });
});

router.get('/newUser', (req, res) => {
    res.render("../views/pages/general/newUser", { //need to add

    });
});

////////////////////////////////////////////////////////////////////////////////////
router.get('/shelterAdminTest', (req, res) => {
    res.render("../views/pages/shelterAdmin/shelterAdminIndex", { //need to add

    });
});
router.get('/userTest', (req, res) => {
    res.render("../views/pages/users/userIndex", { //need to add

    });
});


/////////////////////////////////////////////////////
router.post('/addUser', (req, res) => {
    pool.query(`INSERT INTO Users (firstName, lastName, email, password, adminStatus) VALUES (?, ?, ?, ? ,?, ?)`,
    [req.query.firstName,req.query.lastName, req.query.zipCode, req.query.email, req.query.password, req.query.adminStatus],
    function(err,rows,fields){
    if(err){
        console.log(err);
        res.sendStatus(400);
    }
    else {
        pool.query(`SELECT * FROM Customers WHERE email = ? and password = ?`,
        [req.query.email, req.query.password],
        function(err,rows,fields){
        if(err){
            console.log(err);
            res.sendStatus(400);
        }
        else {
            console.log(rows);
            if(rows.length == 0){
            console.log("null output");
            res.sendStatus(400);
            }else{
            rows = JSON.stringify(rows);
            rows = JSON.parse(rows);
            console.log(rows)
            console.log(rows[0].customerID);
            req.session.customerID = rows[0].customerID
            console.log("session "+ req.session.customerID)
            res.json(rows[0].customerID);
            }
        }
        });
    }
    });
});
  
  
router.get('/loadUser', (req, res) => {
console.log('loading User');
pool.query(`SELECT * FROM Users WHERE email = ? and password = ?`,
[req.query.email, req.query.password],
function(err,rows,fields){
    if(err){
    console.log(err);
    res.sendStatus(400);
    }
    else {
    if(rows.length == 0){
        console.log("null output");
        res.sendStatus(400);
    }else{
        rows = JSON.stringify(rows);
        rows = JSON.parse(rows);
        console.log(rows)
        console.log(rows[0].userID);
        req.session.userID = rows[0].userID
        req.session.UserName = rows[0].email;

        console.log("session ID "+ req.session.userID)
        res.json(rows[0].customerID);
    }
    }
});
});

router.get('/siteAdminIndex', (req, res) => {
res.render("../views/pages/siteAdmin/siteAdminIndex", {

});
});

module.exports = router;
