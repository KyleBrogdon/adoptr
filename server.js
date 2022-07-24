const express = require("express");
const ejs = require("ejs");
const session = require("express-session");

const PORT = process.argv[2] || 3000; //sets port for site, default to 3000

let app = express();
app.set("view engine", "ejs");
app.disable("etag");

app.use(express.static("public"));
app.use(express.json());
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

const adminRoutes = require("./routes/siteAdmin");
const landingRoutes = require("./routes/landing");
const shelterAdminRoutes = require("./routes/shelterAdmin");
const userRoutes = require("./routes/users");
const dbUsers = require("./routes/user");
const pets = require("./routes/pet");
const shelters = require("./routes/shelter");

app.use("/siteAdmin", adminRoutes);

app.use("/landing", landingRoutes);

app.use("/shelterAdmin", shelterAdminRoutes);

app.use("/users", userRoutes);

app.get("/dbUsers/:userid", dbUsers.readUser);
app.get("/dbUsers", dbUsers.readUsers);
app.post("/dbUsers", dbUsers.createUser);
app.put("/dbUsers/:userid", dbUsers.updateUser);
app.delete("/dbUsers/:userid", dbUsers.deleteUser);

app.get("/pet/:petid", pets.readPet);
app.get("/pet", pets.readPets);
app.post("/pet", pets.createPet);
app.put("/pet/:petid", pets.updatePet);
app.delete("/pet/:petid", pets.deletePet);

app.get("/shelter/:shelterid", shelters.readShelter);
app.get("/shelter", shelters.readShelters);
app.post("/shelter", shelters.createShelter);
app.put("/shelter/:shelterid", shelters.updateShelter);
app.delete("/shelter/:shelterid", shelters.deleteShelter);
//add sub routes

//Main Page
app.get("/", (req, res) => {
  res.render("../views/pages/general/landingPage", {});
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
