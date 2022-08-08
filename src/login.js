const { default: axios } = require("axios");
// const loggedInUser = sessionStorage.getItem('userid');

// console.log(loggedInUser);
// if (loggedInUser) {
//     location.href = '/landing/petCards'
// }




class LoginInfo {
    constructor(
        username,
        password
    ) {
        this.username = username;
        this.password = password
    }
}
console.log('here');



async function setupLogin() {

    let login = new LoginInfo;
    let formsFilled = true;
    let loginButton = document.getElementById('loginButton');
    let password = document.getElementById('InputPassword');
    let email = document.getElementById('InputEmail');
    let loginErrorMsg = document.getElementById("login-error-msg");
    loginButton.addEventListener("click", async (e) => {
        if (!email.value) {
            formsFilled = false;
        } else {
            login.username = email.value;
        }
        if (!password.value) {
            formsFilled = false;
        } else {
            login.password = password.value;
        }
        if (formsFilled) {
            let validate = await validateLogin(login);

            // query returns the number of matching users in the table, if count is 1, valid login.
            if (validate[0]) {
                if (validate[0].userid) {
                    let userid = validate[0].userid;
                    let adminstatus = validate[0].adminstatus;
                    console.log(userid);
                    console.log(adminstatus);
                    if (adminstatus){
                        adminstatus = 1;
                    } else{
                        adminstatus = 0
                    }
                    axios.post(`/users/login/`, {
                        params: {
                            userid: `${userid}`,
                            adminstatus: `${adminstatus}`}})
                    console.log("made it past post");
                    location.href = '/landing/petCards';
                }
                else {
                    loginErrorMsg.style.opacity = 1;
                    setupLogin()
                }
            } else {
                loginErrorMsg.style.opacity = 1;
                setupLogin()
            }
        }
        else {
            loginErrorMsg.style.opacity = 1;
            setupLogin()
        }

    });
}

// setupLogin();



async function validateLogin(login) {
    console.log('validating');
    //console.log(login)
    const response = await axios.get(`/loginFunc/${login.username}/${login.password}`).then((response) => {
        if(response.status >= 200 && response.status < 300){
        //console.log(response.data)
            return response.data
        }
        else{
            console.log('API error')
        }
    })
    return response
}




async function executeLogin(){
    let updatefield = document.getElementById("loginMessageBox");

    if(document.body.contains(document.getElementById("login message"))){
        updatefield.removeChild(document.getElementById("login message")); 
    }

    if(document.getElementById('InputPassword').value.length > 0 &&
        document.getElementById('InputPassword').value.length  > 0){
        let password = document.getElementById('InputPassword').value;
        //password = "'"+password+"'"
        let email = document.getElementById('InputEmail').value;
        //email = "'"+email+"'"
        let login = new LoginInfo(email,password)

        let response = await validateLogin(login)
        console.log(response)
        if(response == 'bad'){
            console.log('invalid login')
            let element = document.createElement('div');
            element.innerHTML = `Login Failed`;
            element.setAttribute("class","alert alert-danger");
            element.setAttribute("id","login message");
            updatefield.appendChild(element);
        }else{
            console.log(response)
            if(response.userid > 1 && response.adminstatus != true){
                window.location.href ="/landing/petCards"
            }else if(response.userid > 1 && response.adminstatus == true){
                window.location.href ="/landing/shelterAdminIndex"
            }else{
                window.location.href ="/landing/siteAdminIndex"
            }
            console.log(response)
        }
    }else{
        console.log('need inputs')
    }

}



async function getLoggedInUser(){
    let response = await axios.get('/users/getSessionId');
    console.log(response.data);
    return response.data
}

async function loginPage(){
    let loggedInUser = await getLoggedInUser()
    if (loggedInUser > 0){
        location.href = '/landing/petCards'
    }
    let login = new LoginInfo;
    let loginButton = document.getElementById('loginButton');

  loginButton.addEventListener("click", () => {
    executeLogin();
  });
}

loginPage()


