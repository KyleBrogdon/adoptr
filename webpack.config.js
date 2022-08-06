const path = require('path');

module.exports = {
    entry: {

        'scripts/siteAdmin/users': path.join(__dirname, "src", "siteAdmin", "users.js"),
        'scripts/siteAdmin/shelters': path.join(__dirname, "src", "siteAdmin", "shelters.js"),
        'scripts/user/user': path.join(__dirname, "src", "user", "user.js"),
        'scripts/pets/datingCards': path.join(__dirname, "src", "datingCards.js"),
        'scripts/user/petProfile': path.join(__dirname, "src", "petProfile.js"),
        'scripts/shelterAdmin/petProfile': path.join(__dirname, "src", "shelterAdmin","petProfiles.js"),
        'scripts/shelterAdmin/shelterProfile':path.join(__dirname,"src","shelterAdmin","shelterProfile.js"),
        'scripts/shelterAdmin/adminProfile':path.join(__dirname,"src","shelterAdmin","shelterAdminProfile.js"),
        'scripts/user/login': path.join(__dirname, "src", "login.js"),
        'scripts/user/newUser': path.join(__dirname, "src", "newUser.js"),
      },
    mode: 'development',
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "[name].js",
        publicPath: "/"
    }, 
};
