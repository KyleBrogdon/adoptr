const { default: axios } = require("axios");

class LoginInfo{
    constructor( 
        username,
        password
    ) {
    this.username = username;
    this.password = password
    }
}

async function validateLogin(login){
    let response = await axios.get(`/login/${login.username}/${login.password}`);
    console.log(response);
    return response.data;
}

async function setupLogin (){


let login = new LoginInfo;

let loginButton = document.getElementById('loginButton');
let password = document.getElementById('InputPassword');
let email = document.getElementById('InputEmail');
let loginErrorMsg = document.getElementById("login-error-msg");
loginButton.addEventListener("click", async (e) => {
    if (!email.value){
        login.username = -1;
    } else {
        login.username = email.value;
    }
    if (!password.value){
        login.password = -1;
    } else {
        login.password = password.value;
    }
    let validate = await validateLogin(login);

    // query returns the number of matching users in the table, if count is 1, valid login.
    if (validate[0].count == 1){
        location.href = '/landing/petCards'
        //pass id to session
    }
    else {
        loginErrorMsg.style.opacity = 1;
    }
    
});
}


setupLogin();