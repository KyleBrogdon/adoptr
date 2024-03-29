const { default: axios } = require("axios");

class newUserInfo{
    constructor( 
        username,
        password,
        firstname,
        lastname,
        adminstatus = false
    ) {
    this.username = username,
    this.password = password,
    this.firstname = firstname,
    this.lastname = lastname,
    this.adminstatus = adminstatus
    }
}

async function validateEmail(user){
    let response = await axios.get(`/login/${user.username}`);
    console.log(response);
    return response.data;
}

async function validatePassword(password, confirm){
    if (password.length < 8 || password.length > 20){
        return false
    }
    if (password != confirm){
        return false
    }
    else {
        return true
    }
};

async function createUser(user){
    let response = await axios.post(`/dbUsers`,{
        firstname : user.firstname,
        lastname : user.lastname,
        email: user.username,
        userpassword : user.password,
        adminstatus : user.adminstatus})
    return response.data
}

async function setupNewUser (){


let user = new newUserInfo;

let createButton = document.getElementById('createProfileButton');
let password = document.getElementById('NewPassword');
let confirmPassword = document.getElementById('ConfirmPassword');
let email = document.getElementById('InputEmail');
let firstname = document.getElementById('InputFirstName');
let lastname = document.getElementById('InputLastName');
let invalidErrorMsg = document.getElementById("invalidEmail-error-msg");
let emailErrorMsg = document.getElementById("email-error-msg");
let passwordErrorMsg = document.getElementById("password-error-msg");
let missingErrorMsg = document.getElementById("missing-error-msg");
let formsFilled = true;
createButton.addEventListener("click", async (e) => {
    if (!email.value){
        formsFilled = false;
    } else {
        if (email.value.includes("@") == false){
            invalidErrorMsg.style.opacity = 1;
            setupNewUser();
        }
        user.username = email.value;
    }
    if (!password.value){
        formsFilled = false;
    } else {
        let validPassword = await validatePassword(password.value, confirmPassword.value);
        console.log(validPassword);
        if (validPassword == true){
            user.password = password.value;
        }
        else{
            passwordErrorMsg.style.opacity = 1;
            setupNewUser();
        }
    }
    if (!firstname.value || !lastname.value){
        formsFilled == false;
    }
    if (formsFilled == true){
        let validate = await validateEmail(user);
        if (validate[0].count == 0){
            let response = await createUser(user);
            console.log(response);
            // strip non-numeric characters to get the id from the response
            response = response.replace(/\D/g,'');
            console.log(response);
            sessionStorage.setItem('userid', response);
            if (document.getElementById("shelterAdmin").checked){
                location.href = '/shelterAdmin/shelterAdminProfile';
            } else{
                location.href = '/landing/petCards';
            }
        }
        // email already registered in database
        else {
            emailErrorMsg.style.opacity = 1;
            setupNewUser();
        }
    // form is missing required data
    } else {
        missingErrorMsg.style.opacity = 1;
        setupNewUser();
    }
    

    // query returns the number of matching users in the table, if count is 1, valid login.

    
});
}


setupNewUser();