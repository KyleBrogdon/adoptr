const express = require("express");
const ejs = require("ejs");
const session = require("express-session");




const PORT = process.argv[2] || 3000    //sets port for site, default to 3000


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
  


const adminRoutes = require('./routes/siteAdmin');
const landingRoutes = require('./routes/landing');
const shelterAdminRoutes = require('./routes/shelterAdmin');
const userRoutes = require('./routes/users');

app.use('/siteAdmin', adminRoutes);

app.use('/landing', landingRoutes);

app.use('/shelterAdmin', shelterAdminRoutes);

app.use('/user', userRoutes)




//add sub routes

//Main Page 
app.get('/', (req, res) => {
    res.render("../views/pages/general/landingPage", {

    });
});


app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
  });