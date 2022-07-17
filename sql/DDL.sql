--ALTER DATABASE name OWNER to postgres
-- Cleanup database
<<<<<<< Updated upstream
DROP TABLE IF EXISTS admin_shelter CASCADE;
DROP TABLE IF EXISTS disposition_pet CASCADE;
DROP TABLE IF EXISTS breed CASCADE;
DROP TABLE IF EXISTS pet_breed CASCADE;
DROP TABLE IF EXISTS pet_image CASCADE;
DROP TABLE IF EXISTS user_saved_pet CASCADE;
DROP TABLE IF EXISTS user_rejected_pet CASCADE;
DROP TABLE IF EXISTS app_user CASCADE;
/* DROP TABLE IF EXISTS admin; */
DROP TABLE IF EXISTS disposition CASCADE;
DROP TABLE IF EXISTS images CASCADE;
DROP TABLE IF EXISTS pet CASCADE;
DROP TABLE IF EXISTS shelter CASCADE;
DROP TABLE IF EXISTS zipcode CASCADE;
DROP TABLE IF EXISTS city CASCADE;
DROP TABLE IF EXISTS shelter_state CASCADE;
DROP TABLE IF EXISTS pet_size CASCADE;
DROP TABLE IF EXISTS pet_availability CASCADE;
DROP TABLE IF EXISTS pet_type CASCADE;

=======
DROP TABLE IF EXISTS admin_shelter;
DROP TABLE IF EXISTS disposition_pet;
DROP TABLE IF EXISTS breed;
DROP TABLE IF EXISTS pet_image;
DROP TABLE IF EXISTS user_saved_pet;
DROP TABLE IF EXISTS user_rejected_pet;
DROP TABLE IF EXISTS app_user;
/* DROP TABLE IF EXISTS admin; */
DROP TABLE IF EXISTS disposition;
DROP TABLE IF EXISTS image;
DROP TABLE IF EXISTS pet;
DROP TABLE IF EXISTS shelter;
DROP TABLE IF EXISTS zipcode;
DROP TABLE IF EXISTS city;
DROP TABLE IF EXISTS state;
DROP TABLE IF EXISTS size;
DROP TABLE IF EXISTS availability;
DROP TABLE IF EXISTS type;
DROP TABLE IF EXISTS spayed_neutered;
>>>>>>> Stashed changes

-- Table: availability

CREATE TABLE IF NOT EXISTS pet_availability
(
    avID SERIAL PRIMARY KEY,
    pet_availability VARCHAR(100)
);

ALTER TABLE IF EXISTS pet_availability
    OWNER to postgres;

-- Table: type

CREATE TABLE IF NOT EXISTS pet_type
(
    typeID SERIAL PRIMARY KEY,
    typeName VARCHAR(20)
);

ALTER TABLE IF EXISTS pet_type
	OWNER to postgres;

-- Table: disposition


CREATE TABLE IF NOT EXISTS disposition
(
    dispID SERIAL PRIMARY KEY,
    dispStatus VARCHAR(50)
);

ALTER TABLE IF EXISTS disposition
    OWNER to postgres;

-- Table: image


CREATE TABLE IF NOT EXISTS images
(
    imageID SERIAL PRIMARY KEY,
    imageURL VARCHAR(100)
);

ALTER TABLE IF EXISTS images
    OWNER to postgres;


-- Table: size


CREATE TABLE IF NOT EXISTS pet_size
(
    sizeID SERIAL PRIMARY KEY,
    petsize VARCHAR(20)
);

ALTER TABLE IF EXISTS pet_size
    OWNER to postgres;

-- Table: app_user


CREATE TABLE IF NOT EXISTS app_user
(
    userID SERIAL PRIMARY KEY,
<<<<<<< Updated upstream
    firstname VARCHAR(20),
    lastname VARCHAR(20),
    email VARCHAR(20) NOT NULL,
    userpassword VARCHAR(20) NOT NULL,
=======
    firstname VARCHAR(10),
    lastname VARCHAR(10),
    email VARCHAR(20) NOT NULL,
    password VARCHAR(10) NOT NULL,
>>>>>>> Stashed changes
    adminStatus BOOLEAN
);

ALTER TABLE IF EXISTS app_user
    OWNER to postgres;


<<<<<<< Updated upstream
-- Table: shelter_state
=======
/* CREATE TABLE IF NOT EXISTS admin
(
    adminID SERIAL PRIMARY KEY,
    adminName VARCHAR(20)
);
ALTER TABLE IF EXISTS admin
    OWNER to postgres; */
>>>>>>> Stashed changes


CREATE TABLE IF NOT EXISTS shelter_state
(
    stateID SERIAL PRIMARY KEY,
    stateName VARCHAR(50),
    stateCode VARCHAR(10)
);

ALTER TABLE IF EXISTS shelter_state
    OWNER to postgres;

-- Table: city


CREATE TABLE IF NOT EXISTS city
(
    cityID SERIAL PRIMARY KEY,
    cityName VARCHAR(50),
    stateID INT,
   CONSTRAINT fk_state
      FOREIGN KEY(stateID) 
	  REFERENCES shelter_state(stateID)
);

ALTER TABLE IF EXISTS city
    OWNER to postgres;

-- Table: zipcode


CREATE TABLE IF NOT EXISTS zipcode
(
    zipCodeID SERIAL PRIMARY KEY,
    zipCode INT,
    cityID INT,
   CONSTRAINT fk_city
      FOREIGN KEY(cityID) 
	  REFERENCES city(cityID)
);

ALTER TABLE IF EXISTS zipcode
    OWNER to postgres;


-- Table: shelter


CREATE TABLE IF NOT EXISTS shelter
(
    shelterID SERIAL PRIMARY KEY,
<<<<<<< Updated upstream
    shelterName VARCHAR(50) NOT NULL,
    shelterCode VARCHAR(10) NOT NULL,
    email VARCHAR(50) NOT NULL,
    shelterPassword VARCHAR(20) NOT NULL,
    phoneNumber VARCHAR(25),
=======
    shelterName VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
>>>>>>> Stashed changes
    zipCodeId INT,
    cityId INT,
    stateId INT,
   CONSTRAINT fk_zipcode
      FOREIGN KEY(zipcodeID) 
	  REFERENCES zipcode(zipcodeID),
   CONSTRAINT fk_city
      FOREIGN KEY(cityID) 
	  REFERENCES city(cityID),
   CONSTRAINT fk_state
      FOREIGN KEY(stateID) 
	  REFERENCES shelter_state(stateID)
);

ALTER TABLE IF EXISTS shelter
    OWNER to postgres;

-- Table: pets


CREATE TABLE IF NOT EXISTS pet
(
    petID SERIAL PRIMARY KEY,
<<<<<<< Updated upstream
    petName VARCHAR(50) NOT NULL,
    age VARCHAR(20),
    sex VARCHAR(10),
    blurb VARCHAR(500),
=======
    name VARCHAR(20) NOT NULL,
    age INT,
    sex VARCHAR(1),
    blurb VARCHAR(100),
    weight INT,
>>>>>>> Stashed changes
    dateProfile DATE,
    sizeID INT,
    snStatus BOOLEAN,
    ststatus BOOLEAN,
    avID INT,
    typeID INT,
    shelterID INT,
   CONSTRAINT fk_size
      FOREIGN KEY(sizeID) 
	  REFERENCES pet_size(sizeID),
   CONSTRAINT fk_av
      FOREIGN KEY(avID) 
	  REFERENCES pet_availability(avID),
   CONSTRAINT fk_type
      FOREIGN KEY(typeID) 
	  REFERENCES pet_type(typeID),
   CONSTRAINT fk_shelter
      FOREIGN KEY(shelterID) 
	  REFERENCES shelter(shelterID)
);


ALTER TABLE IF EXISTS pet
    OWNER to postgres;

-- Table: disposition-pet


CREATE TABLE IF NOT EXISTS disposition_pet
(
    ID SERIAL PRIMARY KEY,
    dispID INT,
    petID INT,
   CONSTRAINT fk_disposition
      FOREIGN KEY(dispID) 
	  REFERENCES disposition(dispID),
   CONSTRAINT fk_pet
      FOREIGN KEY(petID) 
	  REFERENCES pet(petID)
);

ALTER TABLE IF EXISTS disposition_pet
    OWNER to postgres;

-- Table: pet_breed


CREATE TABLE IF NOT EXISTS breed
(
    breedID SERIAL PRIMARY KEY,
    breedName VARCHAR(50),
    typeID INT,
   CONSTRAINT fk_type
      FOREIGN KEY(typeID) 
	  REFERENCES pet_type(typeID)
);

ALTER TABLE IF EXISTS breed
    OWNER to postgres;



-- Table: pet_breed
CREATE TABLE IF NOT EXISTS pet_breed
(
    ID SERIAL PRIMARY KEY,
    petID INT,
    breedID INT,
   CONSTRAINT fk_pet
      FOREIGN KEY(petID) 
	  REFERENCES pet(petID),
   CONSTRAINT fk_breed
      FOREIGN KEY(breedID) 
	  REFERENCES breed(breedID)
);

ALTER TABLE IF EXISTS pet_breed
    OWNER to postgres;


-- Table: pet_image

CREATE TABLE IF NOT EXISTS pet_image
(
    ID SERIAL PRIMARY KEY,
    petID INT,
    imageID INT,
   CONSTRAINT fk_pet
      FOREIGN KEY(petID) 
	  REFERENCES pet(petID),
   CONSTRAINT fk_image
      FOREIGN KEY(imageID) 
	  REFERENCES images(imageID)
);

ALTER TABLE IF EXISTS pet_image
    OWNER to postgres;


-- Table: user_saved_pet

CREATE TABLE IF NOT EXISTS user_saved_pet
(
    ID SERIAL PRIMARY KEY,
    userID INT,
    petID INT,
   CONSTRAINT fk_user
      FOREIGN KEY(userID) 
	  REFERENCES app_user(userID),
   CONSTRAINT fk_pet
      FOREIGN KEY(petID) 
	  REFERENCES pet(petID)
);

ALTER TABLE IF EXISTS user_saved_pet
    OWNER to postgres;

-- Table: user_rejected_pet

CREATE TABLE IF NOT EXISTS user_rejected_pet
(
    ID SERIAL PRIMARY KEY,
    userID INT,
    petID INT,
   CONSTRAINT fk_user
      FOREIGN KEY(userID) 
	  REFERENCES app_user(userID),
   CONSTRAINT fk_pet
      FOREIGN KEY(petID) 
	  REFERENCES pet(petID)
);

ALTER TABLE IF EXISTS user_rejected_pet
    OWNER to postgres;

-- Table: admin_shelter


CREATE TABLE IF NOT EXISTS admin_shelter
(
    ID SERIAL PRIMARY KEY,
    userId INT,
    shelterId INT,
   CONSTRAINT fk_user
      FOREIGN KEY(userID) 
	  REFERENCES app_user(userID),
   CONSTRAINT fk_shelter
      FOREIGN KEY(shelterID) 
	  REFERENCES shelter(shelterID)
);

ALTER TABLE IF EXISTS admin_shelter
    OWNER to postgres;