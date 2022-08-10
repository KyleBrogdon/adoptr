// Contains routes for views concerning users
const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

//Users
router.get("/users", (req, res) => {
  if(req.session.userid > 1 && req.session.adminstatus != true){
      res.render("../views/pages/general/datingCards", {})
  }else if (req.session.userid > 1 && req.session.adminstatus == true){
      res.render("../views/pages/shelterAdmin/shelterAdminIndex", {})
  }else if (req.session.userid == 1 && req.session.adminstatus == true){
    res.render("../views/pages/siteAdmin/users", {});
  }else{
    res.render("../views/pages/general/landingPage", {});
  }
});


//shelter Admins
router.get("/shelters", (req, res) => {
  if(req.session.userid > 1 && req.session.adminstatus != true){
      res.render("../views/pages/general/datingCards", {})
  }else if (req.session.userid > 1 && req.session.adminstatus == true){
      res.render("../views/pages/shelterAdmin/shelterAdminIndex", {})
  }else if (req.session.userid == 1 && req.session.adminstatus == true){
    res.render("../views/pages/siteAdmin/sheltersSA", {});
  }else{
    res.render("../views/pages/general/landingPage", {});
  }
});


//atributesindex
router.get("/attributes", (req, res) => {
  if(req.session.userid > 1 && req.session.adminstatus != true){
      res.render("../views/pages/general/datingCards", {})
  }else if (req.session.userid > 1 && req.session.adminstatus == true){
      res.render("../views/pages/shelterAdmin/shelterAdminIndex", {})
  }else if (req.session.userid == 1 && req.session.adminstatus == true){
    res.render("../views/pages/siteAdmin/attributeOptions", {});
  }else{
    res.render("../views/pages/general/landingPage", {});
  }

});

//Atributes
//Availability
router.get("/attributes/availability", (req, res) => {
  if(req.session.userid > 1 && req.session.adminstatus != true){
      res.render("../views/pages/general/datingCards", {})
  }else if (req.session.userid > 1 && req.session.adminstatus == true){
      res.render("../views/pages/shelterAdmin/shelterAdminIndex", {})
  }else if (req.session.userid == 1 && req.session.adminstatus == true){
    res.render("../views/pages/siteAdmin/attributes/availability", {});
  }else{
    res.render("../views/pages/general/landingPage", {});
  }

});

//Breed
router.get("/attributes/breed", (req, res) => {
  if(req.session.userid > 1 && req.session.adminstatus != true){
      res.render("../views/pages/general/datingCards", {})
  }else if (req.session.userid > 1 && req.session.adminstatus == true){
      res.render("../views/pages/shelterAdmin/shelterAdminIndex", {})
  }else if (req.session.userid == 1 && req.session.adminstatus == true){
    res.render("../views/pages/siteAdmin/attributes/breed", {});
  }else{
    res.render("../views/pages/general/landingPage", {});
  }

});


//Disposition
router.get("/attributes/disposition", (req, res) => {
  if(req.session.userid > 1 && req.session.adminstatus != true){
      res.render("../views/pages/general/datingCards", {})
  }else if (req.session.userid > 1 && req.session.adminstatus == true){
      res.render("../views/pages/shelterAdmin/shelterAdminIndex", {})
  }else if (req.session.userid == 1 && req.session.adminstatus == true){
    res.render("../views/pages/siteAdmin/attributes/disposition", {});
  }else{
    res.render("../views/pages/general/landingPage", {});
  }
    
});

router.get("/attributes/size", (req, res) => {
  if(req.session.userid > 1 && req.session.adminstatus != true){
    res.render("../views/pages/general/datingCards", {})
  }else if (req.session.userid > 1 && req.session.adminstatus == true){
    res.render("../views/pages/shelterAdmin/shelterAdminIndex", {})
  }else if (req.session.userid == 1 && req.session.adminstatus == true){
    res.render("../views/pages/siteAdmin/attributes/size", {});
  }else{
    res.render("../views/pages/general/landingPage", {});
  }
});

//Type
router.get("/attributes/type", (req, res) => {
  if(req.session.userid > 1 && req.session.adminstatus != true){
    res.render("../views/pages/general/datingCards", {})
  }else if (req.session.userid > 1 && req.session.adminstatus == true){
    res.render("../views/pages/shelterAdmin/shelterAdminIndex", {})
  }else if (req.session.userid == 1 && req.session.adminstatus == true){
    res.render("../views/pages/siteAdmin/attributes/type", {});
  }else{
    res.render("../views/pages/general/landingPage", {});
  }
});


//////////////////////////////////////////////////////////////////////////////////////////////
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("../views/pages/general/landingPage", {});
});

module.exports = router;
