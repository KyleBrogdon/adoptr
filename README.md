# Adoptr - Dating App for Animal Adoption
Adoptr is intended to be a one-stop-shop "dating" app for animal adoption,
fashioned similarly to the popular dating apps. This "dating" app allows users to view
animals available for adoption near them. It will include crucial details about
temperament, age, vaccination status, spay/neuter status, and adoption requirements
by the shelter.

## Getting Started
These instructions will cover installing the project on your local machine and then interacting with the website. If you wish to skip local installation, a live deployment of the project is hosted at adoptr.heroku.com

### Prerequisites
- Node.js installed

### Local Installation 
1. Clone this repository
2. Navigate to project directory or use IDE
3. Run the command "npm i" to install required dependencies
4. If this your first time running this project locally: Run the command "npm run genDB", followed by the command "npm run seedDB" to create and seed the database with Petfinder Data
5. Run the command "npm run build" to generate webpack scripts
6. Run the command "npm run start:dev" to run the server
7. Open localhost:3000 in your web browser (port number can be adjusted in server.js).

### Using the web application
1. Navigate to the project website (either http://adoptr.herokuapp.com or assigned localhost)
2. Click the login button from the landing page [add screenshot]
3. Login to the app with desired permissions. We recommend logging in as a normal user. [add screenshot]
4. You are now on the "dating cards" page.  You can click on the pet picture to pull up that pet's bio. You can click the heart or dislike buttons to save or reject a pet, which makes changes to the database transparent to the logged in user.
5. There is also search functionality [add screenshot]
6. There is a user profile page which allows editing user information, viewing saved pets, or resetting the "disliked" or rejected pets table for the logged in user.
7. User sessions are stored via express-sessions and redis, ensuring only users with proper permissions can visit certain pages. 
8. Users can logout via the button at the top right.
9. You can revisit the login page to use shelter or site admin credentials to view the website with elevated permissions. 

### Deployment
Deployment to Heroku server's is simple:
1. Create a Heroku node.js project
2. Ensure "heroku-prebuild: npm install --dev" is added to package.json  [add screenshot]
3. Create a Postgres Heroku addon for your Heroku project.
4. Dump data from your Postgres db to the heroku postgres datastore.
5. Modify "credentials" in sql_init.js and replace the login credentials with the Postgres Heroku credentials
6. Push your codebase to github
7. Connect your github to Heroku.
8. Manually deploy your github branch through the Heroku Console [add screenshot]

### Built With
- Javascript
- Node.js
- Express.js
- PostgreSQL
- Embedded Javascript
- Bootstrap
- Axios
- Nodemon
- Webpack
- PetFinder API
- Python (PetFinder API)
- Redis
- Heroku

### Authors
Kyle Brogdon  
Brody Willard  
Sriram Narayanan


### License
This project is licensed under the MIT License - see the LICENSE.md file for details
