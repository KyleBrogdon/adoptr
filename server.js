const express = require("express");
const ejs = require("ejs");
const session = require("express-session");


const PORT = process.argv[2] || 3000    //sets port for site, default to 3000

//add main routes

let app = express();
app.set('view engine', 'ejs')
app.disable('etag')



app.use(express.static('public'));
app.use(express.json())
app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  }))


//add sub routes

//Main Page 
app.get('/', (req, res) => {
    res.render("../views/pages/general/landingPage", {

    });
});


app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
  });