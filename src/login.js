const { default: axios } = require("axios");

class LoginInfo{
    constructor( 
        username,
        password
    ) {
    this.username = this.username;
    this.password = this.password
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
loginButton.addEventListener("click", async (e) => {
    login.username = email.value;
    login.password = password.value;
    let validate = await validateLogin(login);

    // query returns the number of matching users in the table, if count is 1, valid login.
    if (validate[0].count == 1){
        location.href = '/landing/petCards'
        //pass id to session
    }
    else {
        // reload page
        // display invalid login modal?
    }
    
})
}


setupLogin();