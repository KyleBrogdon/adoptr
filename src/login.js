const { default: axios } = require("axios");
const loggedInUser = sessionStorage.getItem('userid');

console.log(loggedInUser);
if (loggedInUser) {
    location.href = '/landing/petCards'
}

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
async function validateLogin(login) {
    console.log('validating');
    let response = await axios.get(`/login/${login.username}/${login.password}`);
    console.log(response.data[0].userid);
    return response.data;
}

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
                    await axios.post(`/users/login/`, {
                        params: {
                            userid: `${userid}`,
                            adminstatus: `${adminstatus}`}})
                    console.log("made it past post");
                    // location.replace('/landing/petCards')
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

setupLogin();