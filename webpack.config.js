const path = require('path');

module.exports = {
    entry: {
        'scripts/siteAdmin/users': path.join(__dirname, "src", "siteAdmin", "users.js"),
        'scripts/siteAdmin/shelters': path.join(__dirname, "src", "siteAdmin", "shelters.js")
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