const path = require('path');

module.exports = {
    entry: {

        'scripts/siteAdmin/users': path.join(__dirname, "src", "siteAdmin", "users.js"),
        'scripts/siteAdmin/shelters': path.join(__dirname, "src", "siteAdmin", "shelters.js"),
        'scripts/user/user': path.join(__dirname, "src", "user", "user.js"),
        'scripts/pets/datingCards': path.join(__dirname, "src", "datingCards.js"),
        'scripts/user/petProfile': path.join(__dirname, "src", "petProfile.js")

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