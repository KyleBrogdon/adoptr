const path = require('path');

module.exports = {
    entry: {
        'scripts/siteAdmin/usersSA': path.join(__dirname, "src", "siteAdmin", "usersSA.js")
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