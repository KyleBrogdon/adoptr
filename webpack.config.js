const path = require('path');

module.exports = {
    entry: {
        //'scripts/index': path.join(__dirname, "src", "index.js"),
        //'scripts/user/items': path.join(__dirname, "src", "user", "items.js"),
        //'scripts/siteAdmin/shelterAdmins': path.join(__dirname, "src", "siteAdmin", "shelterAdmins.js"),
        //'scripts/siteAdmin/users': path.join(__dirname, "src", "siteAdmin", "users.js"),
        //'scripts/admin/admin_categories': path.join(__dirname, "src", "admin", "admin_categories.js"),
        //'scripts/admin/admin_orders': path.join(__dirname, "src", "admin", "admin_orders.js"),
        //'scripts/admin/admin_purchases': path.join(__dirname, "src", "admin", "admin_purchases.js"),
        //'scripts/admin/admin_category_items': path.join(__dirname, "src", "admin", "admin_category_items.js"),
        //'scripts/admin/login': path.join(__dirname, "src", "admin", "login.js"),
        //'scripts/admin/newUser': path.join(__dirname, "src", "admin", "newUser.js"),
        //'scripts/admin/admin_customers': path.join(__dirname, "src", "admin", "admin_customers.js"),
        //'scripts/user/customer_profile': path.join(__dirname, "src", "user", "customer_profile.js"),
        //'scripts/user/cart': path.join(__dirname, "src", "user", "cart.js"),
  
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