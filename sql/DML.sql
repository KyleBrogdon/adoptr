-- ============================================================================
-- DATA MANIPULATION
-- ============================================================================


/* =====| Admin Page |===== */

/* =====| List of users |===== */
SELECT firstname, lastname, email -- List of first names, last names, username and passwords
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


/* =====| List of shelter admin |===== */