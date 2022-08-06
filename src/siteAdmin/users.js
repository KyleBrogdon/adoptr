// Site Admin Users page
// Database access:
// CREATE/READ/UPDATE/DESTROY to the usser table

const { default: axios, Axios } = require("axios");

const loggedInUser = sessionStorage.getItem('userid');
const logoutButton = require('../logoutButtonFunction');
if (loggedInUser) { 
    logoutButton.logoutButton(loggedInUser);
}


// const userModal = new bootstrap.Modal(document.getElementById('userModal'), {
//     keyboard: false
// });
  
// const updateUserModal = new bootstrap.Modal(document.getElementById('updateUserModal'), {
//     keyboard: false
// });
  
class UserEntry {
    constructor(
      userid,
      firstname,
      lastname,
      email,
      password,
      adminstatus
    ) {
      this.userid = userid;
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.adminstatus = adminstatus;
      this.password = password;

    }
  
    generateRow() {
      let element = document.createElement("tr");
      element.innerHTML = `
        <th scope="row">${this.userid}</th>
        <td>
          <span>${this.firstname}</span>
          <data hidden id="firstname-${this.userid}" value = ${this.firstname}></data>
        </td>
  
        <td>
          <span>${this.lastname}</span>
          <data hidden id="lastname-${this.userid}" value = ${this.lastname}></data>
        </td>
  
        <td>
          <span>${this.email}</span>
          <data hidden id="email-${this.userid}" value = ${this.email}></data>
        </td>

        <td>
          <span>${this.adminstatus}</span>
          <data hidden id="adminstatus-${this.userid}" value = ${this.adminstatus}></data>
        </td>

        <!--<td>
          <button type="button" class="btn btn-outline-primary btn-sm" id="expand-button-${this.userid}" value = ${this.userid}>Expand</button>
        </td>-->
        <td>
        <button type="button" class="btn btn-outline-danger btn-sm" id="delete-button-${this.userid}" >Delete</button>
        </td>
      `;
      return element;
    }
  
    generateOption() {
      let element = document.createElement("option");
      element.innerHTML = `<option value="${this.userid}">${this.userid}</option>`;
      return element;
    }
  
};
  
function addEventListeners(user){
    document.getElementById(`delete-button-${user.userid}`).addEventListener("click", () => { //add delete
      axios.delete(`/dbUsers/${user.userid}`).then((response) => {
        console.log(response.status)
        if (response.status == 200) {
          console.log(user.userid + " deleted")
          location.reload();

        }else{
          console.log("API error");        
        }
      })  
      
        console.log("delete button enabled")
    });
  
  
}
  
async function addUser(){
    console.log("adding");
    if(document.getElementById('new-first-name').value.length > 0 &&
        document.getElementById('new-last-name').value.length > 0 &&
        document.getElementById('new-email').value.length > 0 &&
        document.getElementById('new-password').value.length > 0 ){

        //var req = new XMLHttpRequest();
        var user = {firstname: null, lastname: null, email: null, password: null, adminstatus: null};
        user.firstname = document.getElementById('new-first-name').value;
        user.lastname = document.getElementById('new-last-name').value;
        user.email = document.getElementById('new-email').value;
        user.password = document.getElementById('new-password').value;
        user.adminstatus = document.getElementById('new-admin-status').checked;

        axios.post(`/dbUsers`,{
          firstname : user.firstname,
          lastname : user.lastname,
          email: user.email,
          userpassword : user.password,
          adminstatus : user.adminstatus
        }).then((response) => {
          console.log(response.status)
          if (response.status >= 200 && response.status<300) {
            console.log("user added")
            location.reload();
  
          }else{
            console.log("API error");        
          }
        })  

        console.log("add user button enabled")
    }
    else{
        console.log("invlaid input");
    }
}
  
function populateUpdate(){
  var id = document.getElementById('update-user-pk-menu').value;
  var firstname = document.getElementById('firstname-' + id).value;
  var lastname = document.getElementById('lastname-' + id).value;
  var email = document.getElementById('email-' + id).value;

  document.getElementById('update-first-name').value = firstname;
  document.getElementById('update-last-name').value = lastname;
  document.getElementById('update-email').value = email;
}
  
function updateUser(){
    if(document.getElementById('update-user-pk-menu').value != 'number' &&
     document.getElementById('update-first-name').value.length > 0 &&
     document.getElementById('update-last-name').value.length > 0 &&
     document.getElementById('update-email').value.length > 0){
  
      //var req = new XMLHttpRequest();
      var user = {userid: null, firstname: null, lastname: null, email:null, password:null, adminstatus:null}
      
      user.userid = document.getElementById('update-user-pk-menu').value;
      user.firstname = document.getElementById('update-first-name').value;
      user.lastname = document.getElementById('update-last-name').value;
      user.email = document.getElementById('update-email').value;
      user.password =document.getElementById('update-password').value;
      user.adminstatus =document.getElementById('update-admin-status').checked;

      console.log(user)
      axios.put(`/dbUsers/${user.userid}`,{
        firstname : user.firstname,
        lastname : user.lastname,
        email: user.email,
        userpassword : user.password,
        adminstatus : user.adminstatus
      }).then((response) => {
        console.log(response.status)
        if (response.status >= 200 && response.status<300) {
          console.log("user updated")
          location.reload();

        }else{
          console.log("API error");        
        }
      })  

    }
    else{
      console.log("invlaid input");
    }
}
  
  
function selectProperty(){
    if(document.getElementById('searchBar').value.length  > 0 && 
      document.getElementById('atribute-form').value.length > 0 && 
      document.getElementById('atribute-form').value != 'Attribute'){
    
        console.log("search bar: " + document.getElementById('searchBar').value)
        document.getElementById("loadingbar").style.display = "inline";
    
        var search = {property: null, value: null};      
        search.property = document.getElementById('atribute-form').value;
        search.value = document.getElementById('searchBar').value;

        axios.get(`/dbUsers/${search.property}/${search.value}`).then((response) => {
          console.log(response.status)
          if (response.status == 200) {
            console.log(response.data)
            const parsedJson = response.data
            console.log(parsedJson);
            
            if (parsedJson.length > 0){
              console.log("results exist")

            // parsedJson.forEach(user => {
            //   if(user.userid != 1){
            //     if (user.adminstatus){
            //       user.adminstatus = "true"
            //     }
            //     else{
            //       user.adminstatus = "false"
            //     }
            //     console.log(user)
            //     users.push(new UserEntry(user.userid, user.firstname, user.lastname, user.email, user.password, user.adminstatus));
            //   }
            // });
          
          
            // // Activate buttons for detailed item views
            // users.forEach((user) => { 
            //   mainList.appendChild(user.generateRow());
            //   userPK.append(user.generateOption());
            //   addEventListeners(user);
            // })

            } else{
              console.log("no results returned")
            }
    

    
    
            document.getElementById("addUserButton").addEventListener("click", () => {
              addUser();
            });
          
            document.getElementById("updateUserButton").addEventListener("click", () => {
              updateUser();
            });
          
            document.getElementById("searchButton").addEventListener("click", () => {
              selectProperty()
            });
          
          
            document.getElementById('update-user-pk-menu').addEventListener("change", () => {
              populateUpdate();
            });
          
            document.getElementById("loadingbar").style.display = "none";
          }else{
            console.log("API error");        
          }
        })  

        console.log('search Enabled')
    }
}
  
  
const setupList = async () => {
    console.log("setupList executed")
    let mainList = document.getElementById("main-rows");
    let userPK = document.getElementById("update-user-pk-menu");
    let users = Array();
  
    axios.get('/dbUsers').then((response) => {
      console.log(response.status);
      if (response.status == 200) {
        console.log(response.data);

        const parsedJson = response.data
        console.log(parsedJson);


        parsedJson.forEach(user => {
          if(user.userid != 1){
            if (user.adminstatus){
              user.adminstatus = "true"
            }
            else{
              user.adminstatus = "false"
            }
            console.log(user)
            users.push(new UserEntry(user.userid, user.firstname, user.lastname, user.email, user.password, user.adminstatus));
          }
        });
      
      
        // Activate buttons for detailed item views
        users.forEach((user) => { 
          mainList.appendChild(user.generateRow());
          userPK.append(user.generateOption());
          addEventListeners(user);
        })


        document.getElementById("addUserButton").addEventListener("click", () => {
          addUser();
        });
      
        document.getElementById("updateUserButton").addEventListener("click", () => {
          updateUser();
        });
      
        document.getElementById("searchButton").addEventListener("click", () => {
          selectProperty()
        });
      
      
        document.getElementById('update-user-pk-menu').addEventListener("change", () => {
          populateUpdate();
        });
      
        document.getElementById("loadingbar").style.display = "none";




      } else {
        console.log("API error");
      }
    });

    // Get item list from server
};
  
  
  
console.log("Running successfully!");
setupList();