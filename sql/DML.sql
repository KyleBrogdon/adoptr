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
SELECT sheltername, sheltercode, email, password, phonenumber, zipcodeid, cityid, stateid 
FROM shelter
WHERE shelterid = :shelterid; 


UPDATE shelter  -- Update user
SET sheltername = :sheltername,
    sheltercode = :sheltercode,
    email = :email,
    password = :password,
    phonenumber = :phonenumber,
    zipcodeid = :zipcodeid,
    cityid = :cityid,
    stateid = :stateid
WHERE shelterid = :shelterid;

INSERT INTO shelter(sheltername, sheltercode, email, password, phonenumber, zipcodeid, cityid, stateid)
VALUES (:sheltername,:inputnastname, :inputemail, :inputpassword, inputadminstatus)
RETURNING shelterid;

/* =====| List of pets |===== */

SELECT * 
From app_user
WHERE petid = :petid;

UPDATE app_user  -- Update user
SET name = :name,
    age = :age,
    email = :inputEmail,
    password = :inputPassword,
    adminstatus = adminStatus
WHERE userid = :userid;

INSERT INTO app_user(firstname,lastname,email,password,adminstatus)
VALUES (:inputFirstName,:inputLastName, :inputEmail, :inputPassword, inputAdminStatus)
RETURNING userid;

