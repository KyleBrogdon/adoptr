const express = require("express");
const ejs = require("ejs");
const session = require("express-session");
// const redis = require('redis');
// const connectRedis = require('connect-redis');
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000; //dynamically acquire ports, default to 3000 if not assigned

var thisSession;

let app = express();
app.set("view engine", "ejs");
app.disable("etag");

app.use(express.static("public"));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// const RedisStore = connectRedis(session);

// let redisClient = redis.createClient({
//     host: 'localhost',
//     port: 6379,
// });


// async function connect (){
//     redisClient.on('error', function (err) {
//         console.log('Could not establish a connection with redis.' + err);
//     });
//     redisClient.on('connect', function (err){
//         console.log('Connected to redis successfully');
//     })

//     await redisClient.connect();
// }


app.use(
  session({
    secret: 'secret$%^134',
    resave: false,
    saveUninitialized: true,
  })
);


app.use('/images', express.static('images'))

///////////////main routes//////////////////////
const adminRoutes = require("./routes/siteAdmin");
const landingRoutes = require("./routes/landing");
const shelterAdminRoutes = require("./routes/shelterAdmin");
const userRoutes = require("./routes/users");

app.use("/siteAdmin", adminRoutes);
app.use("/landing", landingRoutes);
app.use("/shelterAdmin", shelterAdminRoutes);
app.use("/users", userRoutes);

///////////API endpoints routes/////////////////////
const dbUsers = require("./sql/API/user");
const pets = require("./sql/API/pet");
const shelters = require("./sql/API/shelter");
const adminshelters = require("./sql/API/adminshelter");
const usersavedpet = require("./sql/API/usersavedpet");
const userrejectedpet = require("./sql/API/userrejectpet");
const availability = require("./sql/API/availability");
const petbreed = require("./sql/API/petbreed");
const breed = require("./sql/API/breed");
const disposition = require("./sql/API/disposition");
const size = require("./sql/API/size");
const type = require("./sql/API/type");
const city = require("./sql/API/city");
const zipcode = require("./sql/API/zipcode");
const shelterstate = require("./sql/API/shelterstate");
const login = require("./sql/API/login");
const router = require("./routes/users");

//user API endpoints
app.get("/dbUsers/:userid", dbUsers.readUser);
app.get("/dbUsers", dbUsers.readUsers);
app.get("/dbUserSearch/:property/:value", dbUsers.searchUser);
app.get("/dbUsers/:userid/:password", dbUsers.readUserCredential);
app.post("/dbUsers", dbUsers.createUser);
app.put("/dbUsers/:userid", dbUsers.updateUser);
app.put("/dbUserPassword/:userid", dbUsers.updateUserPassword);
app.put("/dbUserNameEmail/:userid", dbUsers.updateUserNameEmail);
app.delete("/dbUsers/:userid", dbUsers.deleteUser);

//pet API endpoints
app.get("/pet/:petid", pets.readPet);
app.get("/petshelter/:shelterid", pets.readPetShelter);
app.get("/pet", pets.readPets);
app.get("/readPetsForCards/:userid", pets.readPetsForCards);
app.get("/readPetsByName/:name", pets.readPetsByName);
app.get("/readPetsByAge/:age", pets.readPetsByAge);
app.get("/readPetsBySex/:sex", pets.readPetsBySex);
app.get("/readPetsByType/:type", pets.readPetsByType);
app.get("/getPetImages/:petid", pets.getPetImages);
app.get("/getAllImages", pets.getAllImages);
app.post("/pet", pets.createPet);
app.post("/addImage/:petid", pets.addImage);
app.put("/pet/:petid", pets.updatePet);
app.put("/petBlurb/:petid", pets.updatePetProfileBlurb);
app.put("/petProperties/:petid", pets.updatePetProfileProperties);
app.put("/updateImage/:imageid", pets.updateImage);
app.delete("/pet/:petid", pets.deletePet);
app.delete("/petImage/:imageid", pets.deleteImage);

//shelter API endpoints
app.get("/shelter/:shelterid", shelters.readShelter);
app.get(
  "/shelter/:sheltercode/:shelterpassword",
  shelters.readShelterCredential
);
app.get("/shelter", shelters.readShelters);
app.get("/shelter/:shelterid", shelters.readShelter);
app.post("/shelter", shelters.createShelter);
app.put("/shelter/:shelterid", shelters.updateShelter);
app.put("/shelterContact/:shelterid", shelters.updateShelterContact);
app.put("/shelterPassword/:shelterid", shelters.updateShelterPassword);
app.put("/shelterName/:shelterid", shelters.updateShelterName);
app.put("/shelterLocation/:shelterid", shelters.updateShelterLocation);
app.delete("/shelter/:shelterid", shelters.deleteShelter);

//Admin-shelter API endpoints
app.get("/adminshelter/:id", adminshelters.readAdminShelter);
app.get("/adminshelteruser/:userid", adminshelters.readAdminShelterUser);
app.get("/adminshelter", adminshelters.readAdminShelters);
app.post("/adminshelter", adminshelters.createAdminShelter);
app.put("/adminshelter/:id", adminshelters.updateAdminShelter);
app.delete("/adminshelter/:id", adminshelters.deleteAdminShelter);



//usersavedpets API endpoints
app.post("/usersavedpet", usersavedpet.createUserSavedPets);
app.get("/usersavedpet/:userid", usersavedpet.readUserSavedPet);
app.delete("/usersavedpet/:userid/:petid", usersavedpet.deleteUserSavedPet);

//userrejectpets API endpoints
app.post("/userrejectedpet", userrejectedpet.createUserRejectPets);

//availability API endpoints
app.get("/availability/:avid", availability.readAvailabilty);
app.get("/availability", availability.readAvailabilties);
app.post("/availability", availability.createAvailability);
app.put("/availability/:avid", availability.updateAvailability);
app.delete("/availability/:avid", availability.deleteAvailability);

//petbreed API endpoints
app.get("/petbreed/:id", petbreed.readPetBreed);
app.get("/petbreed", petbreed.readPetBreeds);
app.get("/petbreedPID/:petid", petbreed.readPetBreedPetID);
app.post("/petbreed", petbreed.createPetBreed);
app.put("/petbreed/:id", petbreed.updatePetBreed);
app.delete("/petbreed/:id", petbreed.deletePetBreed);

//Breed API endpoints
app.get("/breed/:breedid", breed.readBreed);
app.get("/breed", breed.readBreeds);
app.get("/breedType/:typeid", breed.readBreedType);
app.post("/breed", breed.createBreed);
app.put("/breed/:breedid", breed.updateBreed);
app.delete("/breed/:breedid", breed.deleteBreed);

//Disposition API endpoints
app.get("/disposition/:dispid", disposition.readDisposition);
app.get("/disposition", disposition.readDispositions);
app.post("/disposition", disposition.createDisposition);
app.put("/disposition/:dispid", disposition.updateDisposition);
app.delete("/disposition/:dispid", disposition.deleteDisposition);

//Size API endpoints
app.get("/size/:sizeid", size.readSize);
app.get("/size", size.readSizes);
app.post("/size", size.createSize);
app.put("/size/:sizeid", size.updateSize);
app.delete("/size/:sizeid", size.deleteSize);

//Type API endpoints
app.get("/type/:typeid", type.readType);
app.get("/typeName/:typename", type.readTypeName);
app.get("/type", type.readTypes);
app.post("/type", type.createType);
app.put("/type/:typeid", type.updateType);
app.delete("/type/:typeid", type.deleteType);

//City API endpoints
app.get("/city/:cityid", city.readCity);
app.get("/city", city.readCities);
app.post("/city", city.createCity);
app.put("/city/:cityid", city.updateCity);
app.delete("/city/:cityid", city.deleteCity);

//Zipcode API endpoints
app.get("/zipcode/:zipcodeid", zipcode.readZipcode);
app.get("/zipcodeValue/:zipcode", zipcode.readZipcodeValue);
app.get("/zipcode", zipcode.readZipcodes);
app.post("/zipcode", zipcode.createZipcode);
app.put("/zipcode/:zipcodeid", zipcode.updateZipcode);
app.delete("/zipcode/:zipcodeid", zipcode.deleteZipcode);

//State API endpoints
app.get("/state/:stateid", shelterstate.readState);
app.get("/state", shelterstate.readStates);
app.post("/state", shelterstate.createState);
app.put("/state/:stateid", shelterstate.updateState);
app.delete("/state/:stateid", shelterstate.deleteState);

//Login API endpoints
app.get("/login/:email/:userpassword", login.validate)
app.get("/login/:email", login.checkEmail)
// is this needed?
// app.get("/users/storeSession/:userid/:adminstaus")


app.get("/", (req, res) => {
  res.render("../views/pages/general/landingPage", {});
});


app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

module.exports = thisSession;
