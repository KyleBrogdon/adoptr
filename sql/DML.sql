-- ============================================================================
-- DATA MANIPULATION
-- ============================================================================

/* =====| Admin Page |===== */

/* =====| List of users |===== */
SELECT * -- List of first names, last names, username and passwords
From app_user
WHERE userid = :userid;

UPDATE app_user  -- Update user
SET firstname = :inputFirstName,
    lastname = :inputLastName,
    email = :inputEmail,
    password = :inputPassword,
    adminstatus = adminStatus
WHERE userid = :userid;

INSERT INTO app_user(firstname,lastname,email,password,adminstatus)
VALUES (:inputFirstName,:inputLastName, :inputEmail, :inputPassword, inputAdminStatus)
RETURNING userid;


/* =====| List of shelters |===== */
SELECT sheltername, sheltercode, email, shelterpassword, phonenumber, zipcodeid, cityid, stateid 
FROM shelter
WHERE shelterid = :shelterid; 


UPDATE shelter  -- Update shelter
SET sheltername = :sheltername,
    sheltercode = :sheltercode,
    email = :email,
    shelterpassword = :shelterpassword,
    phonenumber = :phonenumber,
    zipcodeid = :zipcodeid,
    cityid = :cityid,
    stateid = :stateid
WHERE shelterid = :shelterid;

INSERT INTO shelter(sheltername, sheltercode, email, shelterpassword, phonenumber, zipcodeid, cityid, stateid)
VALUES (:sheltername,:inputnastname, :inputemail, :inputpassword, inputadminstatus)
RETURNING shelterid;

/* =====| List of pets |===== */

SELECT * 
From pet
WHERE petid = :petid;

UPDATE pet  -- Update pet
SET petname = :petname,
    age = :age,
    sex = :sex,
    blurb = :blurb,
    dateprofile = :dateprofile,
    sizeid = :sizeid,
    snstatus = :snstatus,
    ststatus = :ststatus,
    avid = :avid,
    typeid = :typeid,
    shelterid = :shelterid
WHERE petid = :petid;

INSERT INTO 
    pet (petname, age, sex, blurb, dateprofile, snstatus, ststatus, sizeid, avid, typeid, shelterid)
VALUES (:petname,:age, :sex, :blurb, :dateprofile, :snstatus, :ststatus, :sizeid, :avid, :typeid, :shelterid)
RETURNING petid;

