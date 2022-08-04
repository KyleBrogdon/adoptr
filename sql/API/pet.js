//Import required tools
const { query } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../sql_init");

const readPets = (request, response) => {
  pool.query("SELECT * FROM pet", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const readPetsForCards = (request, response) => {
    pool.query("SELECT * FROM pet WHERE NOT EXISTS \
    (SELECT * FROM user_rejected_pet WHERE pet.petid = user_rejected_pet.petid) \
    AND NOT EXISTS (SELECT * FROM user_saved_pet WHERE pet.petid = user_saved_pet.petid)", 
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };

const readPetShelter = (request, response) => {
  const id = parseInt(request.params.shelterid);
  pool.query(
    "SELECT * FROM pet WHERE shelterid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getPetImages = (request, response) => {
  const id = parseInt(request.params.petid);
  pool.query(
    "SELECT * FROM images WHERE petid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getAllImages = (request, response) => {
    pool.query(
      "SELECT * FROM images",
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  };
  

const readPet = (request, response) => {
  const id = parseInt(request.params.petid);
  console.log(request.params.petid)
  pool.query(
    "SELECT * FROM pet WHERE petid = $1", 
    [id],
    (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createPet = (request, response) => {
  const {
    petname,
    age,
    sex,
    blurb,
    dateprofile,
    sizeid,
    snstatus,
    ststatus,
    avid,
    typeid,
    shelterid,
  } = request.body;
  // console.log(request.body);
  pool.query(
    "INSERT INTO \
      pet(petname, age, sex, blurb, dateprofile, sizeid, snstatus, ststatus, avid, typeid, shelterid) \
      VALUES\
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)  RETURNING *",
    [
      petname,
      age,
      sex,
      blurb,
      dateprofile,
      sizeid,
      snstatus,
      ststatus,
      avid,
      typeid,
      shelterid,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Pet added with ID: ${results.rows[0].petid}`);
    }
  );
};

const updatePet = (request, response) => {
  const id = parseInt(request.params.petid);
  const {
    petname,
    age,
    sex,
    blurb,
    dateprofile,
    sizeid,
    snstatus,
    ststatus,
    avid,
    typeid,
    shelterid,
  } = request.body;
  console.log(request.body);
  pool.query(
    "UPDATE pet \
    SET petname = $1, age = $2, sex = $3, blurb = $4, dateprofile = $5, \
    sizeid = $6, snstatus = $7, ststatus = $8, avid = $9, typeid = $10, shelterid = $11\
    WHERE petid = $12",
    [
      petname,
      age,
      sex,
      blurb,
      dateprofile,
      sizeid,
      snstatus,
      ststatus,
      avid,
      typeid,
      shelterid,
      id,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Pet modified with ID: ${id}`);
    }
  );
};

const deletePet = (request, response) => {
  const id = parseInt(request.params.petid);
  console.log("DELETE/" + id);
  pool.query("DELETE FROM pet WHERE petid = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Pet deleted with ID: ${id}`);
  });
};
module.exports = {
  readPets,
  readPet,
  readPetShelter,
  createPet,
  updatePet,
  deletePet,
  getPetImages,
  readPetsForCards,
  getAllImages,
};
