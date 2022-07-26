// Contains routes for views concerning users
const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
//const db = require('../sql/admin')
const userDB = require("../routes/user");

//const pool = require('../sql/sql_init');

//Users
router.get("/users", (req, res) => {
  //TODO: Replace hardcoded port number and server details with environment variable
  axios.get("http://localhost:3000/dbUsers").then((response) => {
    console.log(response.status);
    if (response.status == 200) {
      console.log(response);
      //Pass response to render
      res.render("../views/pages/siteAdmin/users", {});
    } else {
      console.log("API error");
    }
  });
  /*   if(req.session.userID == 1){
      res.render("../views/pages/siteAdmin/users", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/landingPage", {});
  } */
});

router.get("/userList", async (req, res) => {
  var users = await userDB.readUsers();
  console.log(users);
  res.json(users);
});

//shelter Admins
router.get("/shelterAdmins", (req, res) => {
  res.render("../views/pages/siteAdmin/shelterAdmins", {});
  /*   if(req.session.userID == 1){
      res.render("../views/pages/siteAdmin/shelterADmins", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/index", {});
  } */
});

router.get("/shelterAdminsList", async (req, res) => {
  //var shelterAdmins = await db.getUsers();
  res.json(shelterAdmins);
});

//atributesindex
router.get("/atributes", (req, res) => {
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
router.get("/atributes/availability", (req, res) => {
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
router.get("/atributes/breed", (req, res) => {
  res.render("../views/pages/siteAdmin/atributes/breed", {});
  /*   if(req.session.userID == 1){
      res.render("../views/pages/siteAdmin/breed", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/landingPage", {});
  } */
});

router.get("/breedList"),
  (req, res) => {
    console.log("returning list of breeds");
  };

router.get("/updateBreeds"), (req, res) => {};

router.get("/newbreed"), (req, res) => {};

router.get("/deletebreed"), (req, res) => {};
/////////////////////////////////////////////////////////
//Disposition
router.get("/atributes/disposition", (req, res) => {
  res.render("../views/pages/siteAdmin/atributes/disposition", {});
  /*   if(req.session.userID == 1){
      res.render("../views/pages/siteAdmin/disposition", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/landingPage", {});
  } */
});

//Size///////////////////////////////////////////////////////////////////////////////////
router.get("/atributes/size", (req, res) => {
  res.render("../views/pages/siteAdmin/atributes/size", {});
  /*   if(req.session.userID == 1){
      res.render("../views/pages/siteAdmin/size", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/landingPage", {});
  } */
});

router.get("/sizeList"), (req, res) => {};

router.get("/updateSizes"), (req, res) => {};

router.get("/newSize"), (req, res) => {};

router.get("/deleteSize"), (req, res) => {};

//////////////////////////////////////////////////////////////////////////////////////////////
//Type
router.get("/atributes/type", (req, res) => {
  res.render("../views/pages/siteAdmin/atributes/type", {});
  /*   if(req.session.userID == 1){
      res.render("../views/pages/siteAdmin/type", {});
  }
  else{
      console.log("unauthorized access")
      res.render("../views/pages/general/landingPage", {});
  } */
});

router.get("/typeList"), (req, res) => {};

router.get("/updateTypes"), (req, res) => {};

router.get("/newType"), (req, res) => {};

router.get("/deleteType"), (req, res) => {};

//////////////////////////////////////////////////////////////////////////////////////////////
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("../views/pages/general/landingPage", {});
});

module.exports = router;
