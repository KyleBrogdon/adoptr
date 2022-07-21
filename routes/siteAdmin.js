// Contains routes for views concerning users
const express = require('express');
const router = express.Router();
//const db = require('../sql/admin')
//const pool = require('../sql/sql_init');

//Users
router.get('/users', (req, res) => {
  res.render("../views/pages/siteAdmin/users", {});
/*   if(req.session.userID == 1){
      res.render("../views/pages/siteAdmin/users", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/index", {});
  } */
});

router.get("/userList", async (req,res) => {
  //var users = await db.getUsers();
  res.json(users);
})


//shelter Admins
router.get('/shelterAdmins', (req, res) => {
  res.render("../views/pages/siteAdmin/shelterAdmins", {});
/*   if(req.session.userID == 1){
      res.render("../views/pages/siteAdmin/shelterADmins", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/index", {});
  } */
});

router.get("/shelterAdminsList", async (req,res) => {
  //var shelterAdmins = await db.getUsers();
  res.json(shelterAdmins);
})

//atributesindex
router.get('/atributes', (req, res) => {
  res.render("../views/pages/siteAdmin/atributeOptions", {});
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
router.get('/atributes/availability', (req, res) => {
  res.render("../views/pages/siteAdmin/atributes/availability", {});
/*   if(req.session.userID == 1){
      res.render("../views/pages/siteAdmin/availability", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/landingPage", {});
  } */
});

//Breed
router.get('/atributes/breed', (req, res) => {
  res.render("../views/pages/siteAdmin/atributes/breed", {});
/*   if(req.session.userID == 1){
      res.render("../views/pages/siteAdmin/breed", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/landingPage", {});
  } */
});

//Disposition
router.get('/atributes/disposition', (req, res) => {
  res.render("../views/pages/siteAdmin/atributes/disposition", {});
/*   if(req.session.userID == 1){
      res.render("../views/pages/siteAdmin/disposition", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/landingPage", {});
  } */
});

//Size
router.get('/atributes/size', (req, res) => {
  res.render("../views/pages/siteAdmin/atributes/size", {});
/*   if(req.session.userID == 1){
      res.render("../views/pages/siteAdmin/size", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/landingPage", {});
  } */
});


//Type
router.get('/atributes/type', (req, res) => {
  res.render("../views/pages/siteAdmin/atributes/type", {});
/*   if(req.session.userID == 1){
      res.render("../views/pages/siteAdmin/type", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/landingPage", {});
  } */
});


  
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.render("../views/pages/general/landingPage", {});
});
  
  module.exports = router;