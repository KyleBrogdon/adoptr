//Import required tools
const { query } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../sql_Init");

const readPets = (request, response) => {
  pool.query("SELECT * FROM pet", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const readPetsByAge = (request, response) => {
  console.log("AGE->" + request.params.age);
  pool.query(
    "SELECT * FROM pet LEFT JOIN pet_type ON pet.typeid = pet_type.typeid WHERE age = $1",
    [request.params.age],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const readPetsBySex = (request, response) => {
  console.log("SEX->" + request.params.sex);
  pool.query(
    "SELECT * FROM pet LEFT JOIN pet_type ON pet.typeid = pet_type.typeid WHERE sex = $1",
    [request.params.sex],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const readPetsByName = (request, response) => {
  console.log("NAME->" + request.params.sex);
  pool.query(
    "SELECT * FROM pet LEFT JOIN pet_type ON pet.typeid = pet_type.typeid WHERE petname = $1",
    [request.params.name],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const readPetsByType = (request, response) => {
  pool.query(
    "SELECT * FROM pet LEFT JOIN pet_type ON pet.typeid = pet_type.typeid WHERE typename = $1",
    [request.params.type],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const readPetsForCards = (request, response) => {
  const id = parseInt(request.params.userid);
  pool.query(
    "SELECT * FROM pet WHERE NOT EXISTS \
  (SELECT * FROM user_rejected_pet WHERE pet.petid = (SELECT user_rejected_pet.petid WHERE user_rejected_pet.userid = $1) \
   AND NOT EXISTS (SELECT * FROM user_saved_pet WHERE pet.petid = (SELECT user_saved_pet.petid WHERE user_saved_pet.userid = $1)))",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
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

const getAllImages = (request, response) => {
  pool.query("SELECT * FROM images", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const readPet = (request, response) => {
  const id = parseInt(request.params.petid);
  console.log(request.params.petid);
  pool.query("SELECT * FROM pet WHERE petid = $1", [id], (error, results) => {
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
const updatePetProfileProperties = (request, response) => {
  const id = parseInt(request.params.petid);
  const {
    petname,
    age,
    sex,
    dateprofile,
    sizeid,
    snstatus,
    ststatus,
    avid,
    typeid,
  } = request.body;
  console.log(request.body);
  pool.query(
    "UPDATE pet \
    SET petname = $1, age = $2, sex = $3, dateprofile = $4, \
    sizeid = $5, snstatus = $6, ststatus = $7, avid = $8, typeid = $9\
    WHERE petid = $10",
    [
      petname,
      age,
      sex,
      dateprofile,
      sizeid,
      snstatus,
      ststatus,
      avid,
      typeid,
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

const updatePetProfileBlurb = (request, response) => {
  const id = parseInt(request.params.petid);
  const { blurb } = request.body;
  console.log(request.body);
  pool.query(
    "UPDATE pet \
    SET blurb = $1 \
    WHERE petid = $2",
    [blurb, id],
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

const addImage = (request, response) => {
  const id = parseInt(request.params.petid);
  const { imageurl } = request.body;
  pool.query(
    "INSERT INTO \
    images(petid,imageurl) \
    VALUES\
    ($1, $2) RETURNING *",
    [id, imageurl],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const updateImage = (request, response) => {
  const id = parseInt(request.params.imageid);
<<<<<<< HEAD
  const { imageurl } = request.body;
  console.log(request.body);
=======
  const {
    imageurl
  } = request.body;
>>>>>>> main
  pool.query(
    "UPDATE images \
    SET imageurl = $1 \
    WHERE imageid = $2",
    [imageurl, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`image modified with ID: ${id}`);
    }
  );
};

const deleteImage = (request, response) => {
  const id = parseInt(request.params.imageid);
  console.log("DELETE/" + id);
  pool.query(
    "DELETE FROM images WHERE imageid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`image deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  readPets,
  readPet,
  readPetsByName,
  readPetsByAge,
  readPetsBySex,
  readPetsByType,
  readPetShelter,
  createPet,
  updatePet,
  deletePet,
  getPetImages,
  addImage,
  updateImage,
  deleteImage,
  readPetsForCards,
  updatePetProfileBlurb,
  updatePetProfileProperties,
  getAllImages,
};
