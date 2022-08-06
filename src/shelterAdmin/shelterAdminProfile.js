
const { offset } = require("@popperjs/core");
const { default: axios, Axios } = require("axios");
const loggedInUser = sessionStorage.getItem('userid');
const shelterModal = new bootstrap.Modal(document.getElementById('shelterModal'), {
    keyboard: false
});

if (loggedInUser){
    document.getElementById('logout').style.opacity = 1
}


class shelterEntry{
    constructor(
        shelterid,
        sheltername,
        sheltercode,
        email,
        phonenumber,
        zipcodeid,
        cityid,
        stateid,
        cityname,
        statecode,
        zipcode,
        adminshelterid,
    ){
        this.shelterid =shelterid;
        this.sheltername =sheltername;
        this.sheltercode =sheltercode;
        this.email = email;
        this.phonenumber = phonenumber;
        this.zipcodeid = zipcodeid;
        this.cityid = cityid;
        this.stateid =stateid;
        this.cityname = cityname;
        this.statecode =statecode
        this.zipcode =zipcode
        this.adminshelterid =adminshelterid
    }

    generateRow() {
        let element = document.createElement("tr");
        element.innerHTML = `
          <th scope="row">
            ${this.shelterid}
          </th>
          <td>
            <a id="link-${this.shelterid}" href="/shelterAdmin/shelterProfile?shelterid=${this.shelterid}" class="link-primary" target="_blank">${this.sheltername}</a>
          </td>
          <td>${this.sheltercode}</td>
          <td>${this.cityname}, ${this.statecode}</td>
          <td>
            <button type="button" class="btn btn-primary btn-sm" id="expand-button-${this.shelterid}" value = "${this.shelterid}">Expand</button>
            <button type="button" class="btn btn-warning btn-sm" id="remove-button-${this.shelterid}" value = "${this.shelterid}">Remove</button>
          </td>
          <td>
            <button type="button" class="btn btn-danger btn-sm" id="delete-button-${this.shelterid}" value = "${this.shelterid}">delete</button>
          </td>
        `;
        return element;
      }
}




function delistShelter(shelter){
    document.getElementById(`remove-button-${shelter.shelterid}`).addEventListener("click", () => {
        axios.delete(`/adminshelter/${shelter.adminshelterid}`).then((response) => {
            console.log(response.status)
            if (response.status == 200) {
                console.log(shelter.adminshelterid + " deleted")
                location.reload();
    
            }else{
                console.log("API error");        
            }
        })  
        console.log("delete button enabled")
    })
}

function shelterDetails(shelter){
    document.getElementById(`expand-button-${shelter.shelterid}`).addEventListener("click", () => {
        let modalTable = document.getElementById("modal-table");
    
        while(modalTable.firstChild){
            modalTable.removeChild(modalTable.firstChild)
        }

        headers =['Shelter ID','Name','Code','Email','Phone Number','Zipcode','City','State']
        values =[
            shelter.shelterid,
            shelter.sheltername,
            shelter.sheltercode,
            shelter.email,
            shelter.phonenumber,
            shelter.zipcode,
            shelter.cityname,
            shelter.statecode
        ]
  
        for (let i  = 0; i < values.length; i++){
            console.log(headers[i] + " " + values[i])
            let element = document.createElement("tr");
            element.innerHTML = `
                <th scope="row">${headers[i]}</th>
                <td>${values[i]}</td>
            `;
            modalTable.appendChild(element);
        }
        shelterModal.show();
    });
}



function getUserID(){
    let pageURL = document.URL;
    let ID = pageURL.split('=')[1];  
    return ID
}


async function getZip(shelter){
    const response = await axios.get(`/zipcode/${shelter.zipcodeid}`).then((response) => {
      if(response.status >= 200 && response.status < 300){
        return response.data
      }
      else{
        console.log('API error')
      }
    })
    return response
} 
  
async function getUserNoPassword(id){
    const response = await axios.get(`/dbUsers/${id}`).then((response) => {
        if(response.status >= 200 && response.status < 300){
            response.data[0].password = null
            return response.data
        }
        else{
        console.log('API error')
        }
    })
    return response
}


async function getCity(shelter){
    const response = await axios.get(`/city/${shelter.cityid}`).then((response) => {
        if(response.status >= 200 && response.status < 300){
        return response.data
        }
        else{
        console.log('API error')
        }
    })
    return response
} 
  
async function getState(shelter){
    const response = await axios.get(`/state/${shelter.stateid}`).then((response) => {
        if(response.status >= 200 && response.status < 300){
            return response.data
        }
        else{
            console.log('API error')
        }
    })
    return response
} 

async function getShelterAdmin(adminid){
    const response = await axios.get(`/adminshelteruser/${adminid}`).then((response) => {
    if(response.status >= 200 && response.status < 300){
        return response.data
    }
    else{
        console.log('API error')
    }
    })
    return response
} 

async function getShelter(shelterid){
    const response = await axios.get(`/shelter/${shelterid}`).then((response) => {
      if(response.status >= 200 && response.status < 300){
        return response.data
      }
      else{
        console.log('API error')
      }
    })
    return response
}

const getBaseShelterInfo = async (shelter) =>{
    try{
      const resp = await axios.get(`/shelter/${shelter.shelterid}`).then((response) => {
        if (response.status == 200 && response.status < 300) {
          const shelterResponse = response.data
          console.log(shelterResponse)
          return new shelterEntry(
              JSON.stringify(shelterResponse[0].shelterid),shelterResponse[0].sheltername,
              shelterResponse[0].sheltercode, shelterResponse[0].email, shelterResponse[0].phonenumber,
              JSON.stringify(shelterResponse[0].zipcodeid), JSON.stringify(shelterResponse[0].cityid),
              JSON.stringify(shelterResponse[0].stateid), null,null,null,null
            )
        }else{
          console.log('failed shelter pull')
        }
      })
      console.log(resp)
      return resp
    }catch(err){
  
    }
}





function updatePassword(){
    let updatefield = document.getElementById("passwordUpdateField");
  
    if(document.body.contains(document.getElementById("password message"))){
      updatefield.removeChild(document.getElementById("password message")); 
    }
  
    if(document.getElementById('currentPassword').value.length > 0
      && document.getElementById('newPassword').value.length > 0
      && document.getElementById('confirmPassword').value.length > 0 
      && document.getElementById('newPassword').value == document.getElementById('confirmPassword').value){
        var user ={userid:null, newPassword: null, oldPassword: null};
        user.userid = document.getElementById("hidden-userID").value;
        user.newPassword = document.getElementById("newPassword").value;
        user.oldPassword = document.getElementById("currentPassword").value;
      
        axios.put(`/dbUserPassword/${user.userid}`,{
          userpassword: user.newPassword
        }).then((response) => {
          console.log(response.status)
          if (response.status >= 200 && response.status<300) {
            console.log("password updated");
            let element = document.createElement('div');
            element.innerHTML = `Password Updated`;
            element.setAttribute("class","alert alert-primary");
            element.setAttribute("id","password message");
            updatefield.appendChild(element);
            
          }else{
            console.log("API error");  
            console.log("password failed");
            let element = document.createElement('div');
            element.innerHTML = `Password Failed`;
            element.setAttribute("class","alert alert-danger");
            element.setAttribute("id","password message");
            updatefield.appendChild(element);
                  
          }
        })  
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

    let updatefield = document.getElementById("profileUpdateField");

    if(document.body.contains(document.getElementById("profileMessage"))){
        updatefield.removeChild(document.getElementById("profileMessage")); 
    }

    if(document.getElementById('InputFirstName').value.length > 0
    && document.getElementById('InputLastName').value.length > 0
    && document.getElementById('InputEmail').value.length > 0){
        
        var user ={userid:null, firstname: null, lastname: null, email:null};
        user.userid = document.getElementById("hidden-userID").value;
        user.firstname = document.getElementById("InputFirstName").value;
        user.lastname = document.getElementById("InputLastName").value;
        user.email = document.getElementById("InputEmail").value;

        axios.put(`/dbUserNameEmail/${user.userid}`,{
        firstname: user.firstname,
        lastname: user.lastname,
        email : user.email
        }).then((response) => {
        console.log(response.status)
        if (response.status >= 200 && response.status<300) {
            let element = document.createElement('div');
            element.innerHTML = `Profile Updated`;
            element.setAttribute("class","alert alert-primary");
            element.setAttribute("id","profileMessage");
            updatefield.appendChild(element);
            
        }else{
            let element = document.createElement('div');
            element.innerHTML = `Update Failed`;
            element.setAttribute("class","alert alert-danger");
            element.setAttribute("id","profileMessage");
            updatefield.appendChild(element);
                
        }
        })  

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



async function addNewShelterForm(){
    let element = document.createElement('div')
    element.innerHTML = `
    <div class="card card-body" id="insert-card">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">shelterName</span>
          <input type="text" id="new-shelter-name" class="form-control" aria-label="shelterName" aria-describedby="inputGroup-sizing-sm">
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">shelterCode</span>
          <input type="text" id="new-shelter-code" class="form-control" aria-label="shelterCode" aria-describedby="inputGroup-sizing-sm">
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">email</span>
          <input type="text" id="new-email" class="form-control" aria-label="email" aria-describedby="inputGroup-sizing-sm" placeholder="Enter Unique Email">
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">password</span>
          <input type="text" id="new-password" class="form-control" aria-label="password" aria-describedby="inputGroup-sizing-sm" >
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">phone</span>
          <input type="text" id="new-phone" class="form-control" aria-label="phone" aria-describedby="inputGroup-sizing-sm" >
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">zipcode</span>
          <input type="text" id="new-zipcode" class="form-control" aria-label="zipcode" aria-describedby="inputGroup-sizing-sm" >
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">city</span>
          <input type="text" id="new-city" class="form-control" aria-label="city" aria-describedby="inputGroup-sizing-sm" >
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">state</span>
          <input type="text" id="new-state" class="form-control" aria-label="state" aria-describedby="inputGroup-sizing-sm" >
        </div>
        <div class="my-3 mx-4 border-top"></div>
        <div class="row">
            <div class="col d-flex justify-content-start">
                <button type="button" class="btn btn-success" id="addShelterButton">INSERT shelter entry</button>
            </div>
            <div class="col d-flex justify-content-end">
                <button type="button" class="btn btn-light" id="closeShelterForm">X</button>
            </div>
        </div>

    </div>`
    element.setAttribute("id","newShelterForm");
    document.getElementById("pageContent").appendChild(element)
    document.getElementById("newShelter").setAttribute("class","btn btn-primary disabled");
    document.getElementById("existingShelter").setAttribute("class","btn btn-primary disabled");
    
    document.getElementById("closeShelterForm").addEventListener("click", () => {
        location.reload()
    });

    document.getElementById("addShelterButton").addEventListener("click", () => {
        addShelter();
    });
}

async function addShelter(){
    console.log("adding");
    if(document.getElementById('new-shelter-name').value.length > 0 &&
        document.getElementById('new-shelter-code').value.length > 0 &&
        document.getElementById('new-email').value.length > 0 &&
        document.getElementById('new-password').value.length > 0 &&
        document.getElementById('new-phone').value.length > 0 &&
        document.getElementById('new-zipcode').value.length > 0 &&
        document.getElementById('new-city').value.length > 0 &&
        document.getElementById('new-state').value.length > 0 ){

        //var req = new XMLHttpRequest();
        var shelter = {sheltername: null, sheltercode: null, email: null, password: null, phone: null};
        shelter.sheltername = document.getElementById('new-shelter-name').value;
        shelter.sheltercode = document.getElementById('new-shelter-code').value;
        shelter.email = document.getElementById('new-email').value;
        shelter.password = document.getElementById('new-password').value;
        shelter.phone = document.getElementById('new-phone').value;
        shelter.zipcode = document.getElementById('new-zipcode').value;
        shelter.city = document.getElementById('new-city').value;
        shelter.state = document.getElementById('new-state').value;

        axios.post(`/shelter`,{
          sheltername : shelter.sheltername,
          sheltercode : shelter.sheltercode,
          email: shelter.email,
          shelterpassword : shelter.password,
          phone : shelter.phone,
          zipcode : shelter.zipcode,
          city : shelter.city,
          state : shelter.state
        }).then((response) => {
          console.log(response.status)
          if (response.status >= 200 && response.status<300) {
            console.log("shelter added")
            location.reload();
  
          }else{
            console.log("API error");        
          }
        })  

        console.log("add shelter button enabled")
    }
    else{
        console.log("invlaid input");
    }
}



async function addExistingShelterForm(){
    let element = document.createElement('div')
    element.innerHTML = `
    <div class="card card-body" id="insert-card">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">shelterCode</span>
          <input type="text" id="existing-shelter-code" class="form-control" aria-label="shelterCode" aria-describedby="inputGroup-sizing-sm">
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Password</span>
          <input type="password" id="existing-shelter-password" class="form-control" aria-label="shelterPassword" aria-describedby="inputGroup-sizing-sm">
        </div>
        <div class="my-3 mx-4 border-top"></div>
        <div class="row">
            <div class="col d-flex justify-content-start">
                <button type="button" class="btn btn-success" id="addExisitingShelterButton">Login to Shelter</button>
            </div>
            <div class="col d-flex justify-content-end">
                <button type="button" class="btn btn-light" id="closeShelterForm">X</button>
            </div>
        </div>
    </div>`
    element.setAttribute("id","exisitingShelterForm");
    document.getElementById("pageContent").appendChild(element)
    document.getElementById("existingShelter").setAttribute("class","btn btn-primary disabled");
    document.getElementById("newShelter").setAttribute("class","btn btn-primary disabled");

    document.getElementById("closeShelterForm").addEventListener("click", () => {
        location.reload()
    });

    document.getElementById("addExisitingShelterButton").addEventListener("click", () => {
        addExistingShelter();
    });
}



async function checkShelterCred(){
    let code = document.getElementById('existing-shelter-code').value
    let password = document.getElementById('existing-shelter-password').value
    const resp = await axios.get(`/shelter/${code}/${password}`).then((response) => {
        if (response.status == 200 && response.status < 300) {
            const shelterResponse = response.data
            console.log(shelterResponse)
            return shelterResponse
            
        }else{
            console.log('failed shelter pull')
        }
    })
    return resp
}


async function addExistingShelter(){
    try{
        console.log("adding");
        if(document.getElementById('existing-shelter-code').value.length > 0 &&
        document.getElementById('existing-shelter-password').value.length > 0){
            const valid = await checkShelterCred()
            console.log(valid)

            if(valid != null){
                let shelterid = valid[0].shelterid
                let userid = document.getElementById("hidden-userID").value
                await addAdminShelter(userid,shelterid)
            }
        }else{
            console.log("failed")
        }

    }catch(err){
        console.log(err)
    }
}

async function addAdminShelter(userid,shelterid){
    try{
        console.log(userid)
        console.log(shelterid)
        axios.post(`/adminshelter`,{
            userid : userid,
            shelterid : shelterid,
        }).then((response) => {
            console.log(response.status)
            if (response.status >= 200 && response.status<300) {
              console.log("shelter added")
              location.reload();
            }else{
              console.log("API error");        
            }
        })  
    }catch(err){
        console.log(err)
    }
}












const setupList = async () => {
    userid = 9;
    document.getElementById('hidden-userID').value = userid
    const shelterList = await getShelterAdmin(userid)
    console.log(shelterList)
    const mainList = document.getElementById("main-rows");
    const sheltersArray = Array()
    shelterList.forEach( async shelter => {
        console.log(shelter)
        let adminShelterid = shelter.id
        let newShelter = await getBaseShelterInfo(shelter)
        let zip = await getZip(newShelter)
        let city = await getCity(newShelter)
        let state = await getState(newShelter)
        newShelter.statecode = state[0].statecode
        newShelter.cityname = city[0].cityname
        newShelter.zipcode = zip[0].zipcode
        newShelter.adminshelterid = adminShelterid
        console.log(newShelter)

        mainList.appendChild(newShelter.generateRow());
        shelterDetails(newShelter)
        delistShelter(newShelter)
        sheltersArray.push(newShelter)
    });

    let user = await getUserNoPassword(userid)
    
    console.log(user)
    document.getElementById("InputFirstName").value =user[0].firstname
    document.getElementById("InputLastName").value = user[0].lastname
    document.getElementById("InputEmail").value = user[0].email
  
    document.getElementById("loadingbar").style.display = "none";




    document.getElementById("updatePassword").addEventListener("click", () => {
        updatePassword();
    });
    
    
    document.getElementById("updateProfileButton").addEventListener("click", () => {
        updateProfile();
    });

    document.getElementById("newShelter").addEventListener("click", () => {
        addNewShelterForm();
    });

    document.getElementById("existingShelter").addEventListener("click", () => {
        addExistingShelterForm();
    });


}

setupList()