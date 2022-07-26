// Site Admin Users page
// Database access:
// CREATE/READ/UPDATE/DESTROY to the usser table

// const userModal = new bootstrap.Modal(document.getElementById('userModal'), {
//     keyboard: false
// });
  
const updateUserModal = new bootstrap.Modal(document.getElementById('updateUserModal'), {
    keyboard: false
});
  
  
class UserEntry {
    constructor(
      userID,
      firstName,
      lastName,
      zipCode,
      email,
      adminStatus
    ) {
      this.userID = userID;
      this.firstName = firstName;
      this.lastName = lastName;
      this.zipCode = zipCode;
      this.email = email;
      this.password = email;
      this.adminStatus = adminStatus;
    }
  
    generateRow() {
      let element = document.createElement("tr");
      element.innerHTML = `
        <th scope="row">${this.userID}</th>
        <td>
          <span>${this.firstName}</span>
          <data hidden id="firstName-${this.userID}" value = ${this.firstName}></data>
        </td>
  
        <td>
          <span>${this.lastName}</span>
          <data hidden id="lastName-${this.userID}" value = ${this.lastName}></data>
        </td>
  
        <td>
          <span>${this.zipCode}</span>
          <data hidden id="zipCode-${this.userID}" value = ${this.zipCode}></data>
        </td>
  
        <td>
          <span>${this.email}</span>
          <data hidden id="email-${this.userID}" value = ${this.email}></data>
        </td>

        <td>
          <span>${this.adminStatus}</span>
          <data hidden id="adminStatus-${this.userID}" value = ${this.adminStatus}></data>
        </td>

        <!--<td>
          <button type="button" class="btn btn-outline-primary btn-sm" id="expand-button-${this.userID}" value = ${this.userID}>Expand</button>
        </td>-->
        <td>
        <button type="button" class="btn btn-outline-danger btn-sm" id="delete-button-${this.userID}" >Delete</button>
        </td>
      `;
      return element;
    }
  
    generateOption() {
      let element = document.createElement("option");
      element.innerHTML = `<option value="${this.userID}">${this.userID}</option>`;
      return element;
    }
  
};
  
  
  
function addEventListeners(user){
    document.getElementById(`delete-button-${user.userID}`).addEventListener("click", () => { //add delete
        // var req = new XMLHttpRequest();
        // var payload = "/admin/deleteUser?userID=" + user.userID ;
        // console.log("sending " + payload);
        // req.open("POST", payload, true);
        // req.send();
        // location.reload();
        console.log("delete button enabled")
    });
  
    // document.getElementById(`expand-button-${user.userID}`).addEventListener("click", () => {
    //   var id = {userID:null};

    //   id.userID = document.getElementById(`expand-button-${user.userID}`).value;


    //   var reqOrders = new XMLHttpRequest();
    //   var payload = "/siteAdmin/customerOrders?customerID=" + id.userID;
    //   console.log(payload);
    //   reqOrders.open("GET", payload, true);
    //   reqOrders.send();
    //   var orderResponse;
    //   reqOrders.onreadystatechange =function(){
    //     if(reqOrders.readyState === XMLHttpRequest.DONE && reqOrders.status >= 200 && reqOrders.status < 300){
    //       orderResponse = reqOrders.responseText;
    //       orderResponse = JSON.parse(orderResponse);
    //       let modalTable = document.getElementById("modal-table");
    //       while(modalTable.firstChild){
    //         modalTable.removeChild(modalTable.firstChild)
    //       }
  
    //       orderResponse.forEach((order,index) =>{
    //         let element = document.createElement("tr");
    //         element.innerHTML = `
    //           <th scope="row">${order.userID}</th>
    //           <td>${order.orderDate.substring(0,10)}</td>
    //           <td>$${order.Total.toFixed(2)}</td>
    //         `;
    //         modalTable.appendChild(element);
    //       });
    //       customerModal.show();
    //     }
    //   }
    // })
  
}
  

async function addUser(){
    console.log("adding");
    if(document.getElementById('new-first-name').value.length > 0 &&
        document.getElementById('new-last-name').value.length > 0 &&
        document.getElementById('new-zip-code').value > 0 &&
        document.getElementById('new-email').value.length > 0 &&
        document.getElementById('new-password').value.length > 0 &&
        document.getElementById('new-admin-status').value != null){

        var req = new XMLHttpRequest();
        var user = {firstName: null, lastName: null, zipCode: null, email: null, password: null, adminStatus: null};
        user.firstName = document.getElementById('new-first-name').value;
        user.lastName = document.getElementById('new-last-name').value;
        user.zipCode = document.getElementById('new-zip-code').value;
        user.email = document.getElementById('new-email').value;
        user.password = document.getElementById('new-password').value;
        user.adminStatus = document.getElementById('new-admin-status').value;

        // var payload = "/admin/newCustomer/?firstName=" + 
        //     user.firstName + "&lastName=" + user.lastName + 
        //     "&zipCode=" + user.zipCode + "&email=" + user.email +
        //     "&password=" + user.password + "&adminStatus=" + user.adminStatus;

        // console.log("sending " + payload);
        // req.open("POST", payload, true);
        // await req.send();
        // console.log(req.status);
        // location.reload();
        console.log("add user button enabled")
    }
    else{
        console.log("invlaid input");
    }
}
  
  
function populateUpdate(){
    var id = document.getElementById('update-user-pk-menu').value;
    var firstName = document.getElementById('firstName-' + id).value;
    var lastName = document.getElementById('lastName-' + id).value;
    var zipCode = document.getElementById('zipCode-' + id).value;
    var email = document.getElementById('email-' + id).value;
    var adminStatus = document.getElementById('adminStatus-' + id).value
  
    document.getElementById('update-first-name').value = firstName;
    document.getElementById('update-last-name').value = lastName;
    document.getElementById('update-zip-code').value = zipCode;
    document.getElementById('update-email').value = email;
    document.getElementById('update-admin-status').value = adminStatus;
}
  
function updateCustomer(){
    if(document.getElementById('update-user-pk-menu').value != 'number' &&
     document.getElementById('update-first-name').value.length > 0 &&
     document.getElementById('update-last-name').value.length > 0 &&
     document.getElementById('update-zip-code').value > 0 &&
     document.getElementById('update-email').value.length > 0){
  
      var req = new XMLHttpRequest();
      var user = {userID: null, firstName: null, lastName: null, zipCode: null, email:null, password:null, adminStatus:null}
      
      user.userID = document.getElementById('update-user-pk-menu').value;
      user.firstName = document.getElementById('update-first-name').value;
      user.lastName = document.getElementById('update-last-name').value;
      user.zipCode = document.getElementById('update-zip-code').value;
      user.email = document.getElementById('update-email').value;
      user.password =document.getElementById('update-password').value;
      user.adminStatus =document.getElementById('update-admin-status').value;

    //   var payload = "/siteAdmin/updateUsers?userID="+ user.userID + "&firstName=" + 
    //   user.firstName + "&lastName=" + user.lastName + "&zipCode=" + user.zipCode + 
    //   "&email=" + user.email + "&password=" + user.password + "&adminStatus=" + user.adminStatus;

    //   console.log("sending " + payload);
    //   req.open("POST", payload, true);
    //   req.send();
    //   location.reload();
      console.log("populate enabled")
    }
    else{
      console.log("invlaid input");
    }
}
  
  
  
function selectProperty(){
    if(document.getElementById('searchBar').value.length  > 0 && 
      document.getElementById('atribute-form').value.length > 0 && 
      document.getElementById('atribute-form').value != 'Attribute'){
    
        document.getElementById("loadingbar").style.display = "inline";
    
        var req = new XMLHttpRequest();
        var search = {property: null, value: null};      
        search.property = document.getElementById('atribute-form').value;
        search.value = document.getElementById('searchBar').value;
        // var payload = "/siteAdmin/searchUsers?property=" + search.property + "&value=" + search.value;
        // console.log("sending " + payload);
        // req.open("GET", payload, true);
        // req.send();
        console.log('search Enabled')
        var response;
        req.onreadystatechange = function(){
            if (req.readyState === XMLHttpRequest.DONE && req.status >= 200 && req.status < 300) {
                response = req.responseText;
                response = JSON.parse(response);
        
                let mainList = document.getElementById("main-rows");
                let userPK = document.getElementById("update-user-pk-menu");
        
                let users = Array();
                
                while(mainList.firstChild){
                    mainList.removeChild(mainList.firstChild)
                }
                while(userPK.firstChild){
                    userPK.removeChild(userPK.firstChild)
                }
        
                response.forEach(user => {
                    if(user.userID != 1){
                    users.push(new customerEntry(user.userID, user.firstName, user.lastName, user.zipCode, user.email, user.adminStatus));
                    }
                });
        
        
                users.forEach((user) => { 
                    mainList.appendChild(user.generateRow());
                    userPK.append(user.generateOption());
                    addEventListeners(user);
                })
        
                document.getElementById("addUserButton").addEventListener("click", () => {
                    addCustomer();
                });
                
                document.getElementById("updateUserButton").addEventListener("click", () => {
                    updateCustomer();
                });
        
                document.getElementById('update-user-pk-menu').addEventListener("change", () => {
                    populateUpdate();
                });
                
                document.getElementById("searchButton").addEventListener("click", () => {
                    selectProperty()
                });
            
            }
        }
    }
}
  
  
const setupList = async () => {
    console.log("setupList executed")
    let mainList = document.getElementById("main-rows");
    let userPK = document.getElementById("update-user-pk-menu");
    let users = Array();
  
    // Get item list from server
    const response = await fetch('/siteAdmin/userList');
    console.log(response)
    const parsedJson = await response.json();
    console.log(parsedJson);
  
    // parsedJson.forEach(user => {
    //   if(user.userID != 1){
    //     users.push(new customerEntry(user.userID, user.firstName, user.lastName, user.zipCode, user.email, user.adminStatus));
    //   }
    // });
  
  
    // // Activate buttons for detailed item views
    // users.forEach((user) => { 
    //   mainList.appendChild(user.generateRow());
    //   userPK.append(user.generateOption());
    //   addEventListeners(user);
    // })
  
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
};
  
  
  
console.log("Running successfully!");
setupList();