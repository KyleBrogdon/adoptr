// user Profile script
// Database access:
// CREATE/READ/UPDATE to the user table
const { default: axios, Axios } = require("axios");

const petModal = new bootstrap.Modal(document.getElementById('petModal'), {
    keyboard: false
  });
  
  class petEntry {
    constructor(
      petID,
      petName,
      petAge,
      petSex,
      petSN,
      petST,
      petBlurb,
      petSize,
      petType,
      petAvailability,
      petBreed,
      petPic
    ) {
      this.petID = petID;
      this.petName = petName;
      this.petAge = petAge;
      this.petSex = petSex;
      this.petSN = petSN;
      this.petST = petST;
      this.petBlurb = petBlurb;
      this.petSize = petSize;
      this.petType = petType;
      this.petAvailability = petAvailability;
      this.petBreed = petBreed;
      this.petPic = petPic
    }

    generateRow() {
      let element = document.createElement("tr");
      element.innerHTML = `
        <th scope="row">${this.petName}</th>
        <td>${this.petType}}</td>
        <td>${this.petBreed}}</td>
        <td>${this.petAge}}</td>
        <td>${this.petSex}}</td>
        <td>
          <button type="button" class="btn btn-outline-primary btn-sm" id="expand-button-${this.petID}" value = "${this.petID}">Expand</button>
        </td>
        <td>
            <button type="button" class="btn btn-outline-primary btn-sm" id="unfav-button-${this.petID}" value = "${this.petID}">Unfav</button>
        </td>
      `;
      return element;
    }
  };
  
  function unfav(pet){
    document.getElementById(`unfav-button-${pet.petID}`).addEventListener("click",() => {
        axios.delete(`/favPets/${pet.petID}`).then((response) => {
            console.log(response.status)
            if (response.status == 200) {
              console.log(pet.petID + " deleted")
              location.reload();
    
            }else{
              console.log("API error");        
            }
        })  
        console.log("delete button enabled")
    })
  }
  

  function petDetails(pet){
    document.getElementById(`expand-button-${pet.petID}`).addEventListener("click", () => {
        let modalTable = document.getElementById("modal-table");
    
        while(modalTable.firstChild){
            modalTable.removeChild(modalTable.firstChild)
        }
    
        var id = pet.petID
        headers =['Name','Age','Sex','Type','Breed','Spayed/Neutered','Shots','Size','Availability']
        values = [pet.petName, pet.petAge, pet.petSex, pet.petType, pet.petBreed, pet.petSN, pet.petST, pet.petSize, pet.petAvailability]
        
        var pic = pet.petPic
        //   var req = new XMLHttpRequest();
        //   var payload = "/user/orderItems?orderID=" + id.orderId;
        //   console.log(payload);
        //   req.open("GET", payload, true);
        //   req.send();

        for (let i  = 0; i < values.length; i++){
            console.log(headers[i] + " " + values[i])
            let element = document.createElement("tr");
            element.innerHTML = `
                <th scope="row">${headers[i]}</th>
                <td>${values[i]}</td>
            `;
            modalTable.appendChild(element);
        }
        petModal.show();
    });
  }
  
  
  function selectProperty(){
    console.log(document.getElementById('atribute-form').value);
    console.log(document.getElementById('searchBar').value);
    if(document.getElementById('searchBar').value.length  > 0 && document.getElementById('atribute-form').value.length > 0 && document.getElementById('atribute-form').value != 'Attribute'){
  
      document.getElementById("loadingbar").style.display = "inline";
  
      var req = new XMLHttpRequest();
      var search = {property: null, value: null};      
      search.property = document.getElementById('atribute-form').value;
      search.value = document.getElementById('searchBar').value;
      var payload = "/user/searchProfileOrders?property=" + search.property + "&value=" + search.value;
      console.log("sending " + payload);
      req.open("GET", payload, true);
      req.send();
  
      var response;
      req.onreadystatechange = function(){
        if (req.readyState === XMLHttpRequest.DONE && req.status >= 200 && req.status < 300) {
          response = req.responseText;
          console.log(response);
          response = JSON.parse(response);
  
          let mainList = document.getElementById("main-rows");
          let orders = Array();
          
          while(mainList.firstChild){
            mainList.removeChild(mainList.firstChild)
          }
  
  
          response.forEach(order => {
            orders.push(new orderEntry(order.orderID, order.orderDate, order.customerID));
          });
  
          orders.forEach((order, index) => {
            mainList.appendChild(order.generateRow());
            orderList(order);
  
          });
        }
      }
    }
  }
  
  
  function updatePassword(){
  /*   console.log("updating password")
    console.log(document.getElementById('currentPassword').value);
    console.log(document.getElementById('newPassword').value); */
    let updatefield = document.getElementById("passwordUpdateField");
  
    if(document.body.contains(document.getElementById("password message"))){
     updatefield.removeChild(document.getElementById("password message")); 
    }
  
    if(document.getElementById('currentPassword').value.length > 0
      && document.getElementById('newPassword').value.length > 0
      && document.getElementById('confirmPassword').value.length > 0 
      && document.getElementById('newPassword').value == document.getElementById('confirmPassword').value){
      var req = new XMLHttpRequest();
      var user ={customerID:null, newPassword: null, oldPassword: null};
      user.customerID = document.getElementById("customerID").value;
      user.newPassword = document.getElementById("newPassword").value;
      user.oldPassword = document.getElementById("currentPassword").value;
      
      var payload = "/user/updatePassword?customerID=" + user.customerID + "&newPassword=" + user.newPassword + "&oldPassword=" + user.oldPassword;
      console.log("sending " + payload);
      req.open("post", payload, true);
      req.send();
  
      var response;
      req.onreadystatechange = function(){
        if (req.readyState === XMLHttpRequest.DONE){
          
  
          if(req.status >= 200 && req.status < 300){
            console.log("password updated");
            let element = document.createElement('div');
            element.innerHTML = `Password Updated`;
            element.setAttribute("class","alert alert-primary");
            element.setAttribute("id","password message");
            updatefield.appendChild(element);
          }
          else{
            console.log("password failed");
            let element = document.createElement('div');
            element.innerHTML = `Password Failed`;
            element.setAttribute("class","alert alert-danger");
            element.setAttribute("id","password message");
            updatefield.appendChild(element);
          }
        } 
      }
  
    }
    else{ 
      console.log("new password does not match");
      let element = document.createElement('div');
      element.innerHTML = `new Password does not match`;
      element.setAttribute("class","alert alert-danger");
      element.setAttribute("id","password message");
      updatefield.appendChild(element);
    }
  }
  
  function updateProfile(){
    console.log("updating profile")
  
    let updatefield = document.getElementById("profileFields");
  
    if(document.body.contains(document.getElementById("profileMessage"))){
     updatefield.removeChild(document.getElementById("profileMessage")); 
    }
  
    if(document.getElementById('InputFirstName').value.length > 0
    && document.getElementById('InputLastName').value.length > 0
    && document.getElementById('InputZipCode').value > 0
    && document.getElementById('InputEmail').value.length > 0){
      var req = new XMLHttpRequest();
      var user ={customerID:null, firstName: null, lastName: null, zipCode:null, email:null};
      user.customerID = document.getElementById("customerID").value;
      user.firstName = document.getElementById("InputFirstName").value;
      user.lastName = document.getElementById("InputLastName").value;
      user.zipCode = document.getElementById("InputZipCode").value;
      user.email = document.getElementById("InputEmail").value;
  
      var payload = "/user/updateProfile?customerID=" + user.customerID + "&firstName=" + user.firstName + "&lastName=" + user.lastName + "&zipCode="+ user.zipCode +"&email="+ user.email;
      console.log("sending " + payload);
      req.open("post", payload, true);
      req.send();
  
      var response;
      req.onreadystatechange = function(){
        if (req.readyState === XMLHttpRequest.DONE){
          if(req.status >= 200 && req.status < 300){
            let element = document.createElement('div');
            element.innerHTML = `Profile Updated`;
            element.setAttribute("class","alert alert-primary");
            element.setAttribute("id","profileMessage");
            updatefield.appendChild(element);
          }
          else{
            let element = document.createElement('div');
            element.innerHTML = `Update Failed`;
            element.setAttribute("class","alert alert-danger");
            element.setAttribute("id","profileMessage");
            updatefield.appendChild(element);
          }
        } 
      }
  
    }
    else{ 
      console.log("invalid update");
      let element = document.createElement('div');
      element.innerHTML = `Provide a complete profile`;
      element.setAttribute("class","alert alert-danger");
      element.setAttribute("id","profileMessage");
      updatefield.appendChild(element);
    }
  }
  
  
  const setupList = async () => {
    // Get user profile info from server
    const profileResponse = await fetch('/user/profileInfo')
    const profileJson = await profileResponse.json();
    console.log(profileJson);
  
    document.getElementById("customerID").value = profileJson.customerID;
  
  
    let customerInfo = document.getElementById("profileUpdateField");
    let element1 = document.createElement("div");
    element1.innerHTML = `
      <label for="InputFirstName" class="form-label">First Name</label>
      <input type="text" class="form-control" id="InputFirstName" value="${profileJson.firstName}">
    `
    element1.classList.add("mb-3")
  
    let element2 = document.createElement("div");
    element2.innerHTML = `
      <label for="InputFirstName" class="form-label">Last Name</label>
      <input type="text" class="form-control" id="InputLastName" value="${profileJson.lastName}">
    `
    element2.classList.add("mb-3")
  
    let element3 = document.createElement("div");
    element3.innerHTML = `
      <label for="InputFirstName" class="form-label">Zip Code</label>
      <input type="text" class="form-control" id="InputZipCode" value="${profileJson.zipCode}">
    `
    element3.classList.add("mb-3")
  
    let element4 = document.createElement("div");
    element4.innerHTML = `
      <label for="InputFirstName" class="form-label">Email Address</label>
      <input type="text" class="form-control" id="InputEmail" value="${profileJson.email}">
    `
    element4.classList.add("mb-3")
  
    let element5 = document.createElement("button");
    element5.classList.add("btn");
    element5.classList.add("btn-primary");
    element5.setAttribute("id","updateProfileButton");
    element5.textContent = "Update";
    element5.type = "submit";
  
    customerInfo.append(element1);
    customerInfo.append(element2);
    customerInfo.append(element3);
    customerInfo.append(element4);
    customerInfo.append(element5);
  
    //const orderResponse = await fetch('/user/orderInfo')
    const parsedJson = await orderResponse.json();
  
    console.log(parsedJson);
  
    let mainList = document.getElementById("main-rows");
    let pets = Array();
  
  
    parsedJson.forEach(pet => {
      console.log(pet);
      pets.push(new orderEntry(order.orderId, order.orderDate));
    });
  
    // Activate buttons for detailed item views
    orders.forEach((order, index) => {
      mainList.appendChild(order.generateRow());
      orderList(order);
    });
  
    document.getElementById("loadingbar").style.display = "none";
  
    document.getElementById("searchButton").addEventListener("click", () => {
      selectProperty()
    });
  
    document.getElementById("updatePassword").addEventListener("click", () => {
      updatePassword();
    });
  
  
    document.getElementById("updateProfileButton").addEventListener("click", () => {
      updateProfile();
    });

    document.getElementById("resetRejectsButton").addEventListener("click", () => {
        resetRejectTable();
    });

    document.getElementById("resetLikesButton").addEventListener("click", () => {
        resetLikeTable();
    });

  };
  
  console.log("Running successfully!");
  setupList();