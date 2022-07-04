--ALTER DATABASE name OWNER to postgres
-- Cleanup database
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

-- Table: availability

CREATE TABLE IF NOT EXISTS availability
(
    avID SERIAL PRIMARY KEY,
    availability VARCHAR(100)
);

ALTER TABLE IF EXISTS availability
    OWNER to postgres;

-- Table: type

CREATE TABLE IF NOT EXISTS type
(
typeID SERIAL PRIMARY KEY,
typeName VARCHAR(20)
);

ALTER TABLE IF EXISTS type
	OWNER to postgres;

-- Table: disposition


CREATE TABLE IF NOT EXISTS disposition
(
    dispID SERIAL PRIMARY KEY,
    dispStatus VARCHAR(20)
);

ALTER TABLE IF EXISTS disposition
    OWNER to postgres;

-- Table: image


CREATE TABLE IF NOT EXISTS image
(
    imageID SERIAL PRIMARY KEY,
    imageURL VARCHAR(100)
);

ALTER TABLE IF EXISTS image
    OWNER to postgres;

-- Table: spayed_neutered

CREATE TABLE IF NOT EXISTS spayed_neutered
(
    snID SERIAL PRIMARY KEY,
    snStatus VARCHAR(10)
);

ALTER TABLE IF EXISTS spayed_neutered
    OWNER to postgres;

-- Table: size


CREATE TABLE IF NOT EXISTS size
(
    sizeID SERIAL PRIMARY KEY,
    size VARCHAR(10)
);

ALTER TABLE IF EXISTS size
    OWNER to postgres;

-- Table: app_user


CREATE TABLE IF NOT EXISTS app_user
(
    userID SERIAL PRIMARY KEY,
    firstname VARCHAR(10),
    lastname VARCHAR(10),
    email VARCHAR(20) NOT NULL,
    password VARCHAR(10) NOT NULL,
    adminStatus BOOLEAN
);

ALTER TABLE IF EXISTS app_user
    OWNER to postgres;

-- Table: admin


/* CREATE TABLE IF NOT EXISTS admin
(
    adminID SERIAL PRIMARY KEY,
    adminName VARCHAR(20)
);

ALTER TABLE IF EXISTS admin
    OWNER to postgres; */

-- Table: state


CREATE TABLE IF NOT EXISTS state
(
    stateID SERIAL PRIMARY KEY,
    stateName VARCHAR(20)
);

ALTER TABLE IF EXISTS state
    OWNER to postgres;

-- Table: city


CREATE TABLE IF NOT EXISTS city
(
    cityID SERIAL PRIMARY KEY,
    cityName VARCHAR(20),
    stateID INT,
   CONSTRAINT fk_state
      FOREIGN KEY(stateID) 
	  REFERENCES state(stateID)
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
    shelterName VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
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
	  REFERENCES state(stateID)
);

ALTER TABLE IF EXISTS shelter
    OWNER to postgres;

-- Table: pets


CREATE TABLE IF NOT EXISTS pet
(
    petID SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    age INT,
    sex VARCHAR(1),
    blurb VARCHAR(100),
    weight INT,
    dateProfile DATE,
    sizeID INT,
    snID INT,
    avID INT,
    typeID INT,
    shelterID INT,
   CONSTRAINT fk_size
      FOREIGN KEY(sizeID) 
	  REFERENCES size(sizeID),
   CONSTRAINT fk_sn
      FOREIGN KEY(snID) 
	  REFERENCES spayed_neutered(snID),
   CONSTRAINT fk_av
      FOREIGN KEY(avID) 
	  REFERENCES availability(avID),
   CONSTRAINT fk_type
      FOREIGN KEY(typeID) 
	  REFERENCES type(typeID),
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

-- Table: breed


CREATE TABLE IF NOT EXISTS breed
(
    breedID SERIAL PRIMARY KEY,
    breedName VARCHAR(20),
    typeID INT,
   CONSTRAINT fk_type
      FOREIGN KEY(typeID) 
	  REFERENCES type(typeID)
);

ALTER TABLE IF EXISTS breed
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
	  REFERENCES image(imageID)
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
