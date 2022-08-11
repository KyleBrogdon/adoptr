const { default: axios, Axios } = require("axios");

const shelterModal = new bootstrap.Modal(document.getElementById('shelterModal'), {
    keyboard: false
});


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
            <a id="link-${this.shelterid}" href="/shelterAdmin/shelterProfile?shelterid=${this.shelterid}" class="link-primary" >${this.sheltername}</a>
          </td>
          <td>${this.sheltercode}</td>
          <td>${this.cityname}, ${this.statecode}</td>
          <td>
            <button type="button" class="btn btn-primary btn-sm" id="expand-button-${this.shelterid}" value = "${this.shelterid}">Expand</button>
          </td>
          <td>
            <button type="button" class="btn btn-warning btn-sm" id="remove-button-${this.shelterid}" value = "${this.shelterid}">Remove</button>
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







async function getZipID(zipcode){
    try {
        const response = await axios.get(`/zipcodeValue/${zipcode}`).then((response) => {
            if(response.status >= 200 && response.status < 300){
              return response.data
            }
            else{ 
              console.log('API error')
              return null
            }
          })
          return response
    } catch (error) {
        console.log('API error')
        return null      
    }
} 
  
async function getZip(zipcodeid){
    try {
        const response = await axios.get(`/zipcode/${zipcodeid}`).then((response) => {
            if(response.status >= 200 && response.status < 300){
                return response.data
            }
            else{
                console.log('API error')
                return null
            }
        })
        return response
    } catch (error) {
        console.log('API error')
        return null
    }
} 

async function getCityID(cityname){
    try {
        const response = await axios.get(`/cityValue/${cityname}`).then((response) => {
            if(response.status >= 200 && response.status < 300){
              return response.data
            }
            else{ 
              console.log('API error')
              return null
            }
          })
          return response
    } catch (error) {
        console.log('API error')
        return null      
    }
} 

async function getCity(cityid){
    try {
        const response = await axios.get(`/city/${cityid}`).then((response) => {
            if(response.status >= 200 && response.status < 300){
            return response.data
            }
            else{
            console.log('API error')
            return null
            }
        })
        return response
    } catch (error) {
        console.log('API error')
        return null
    }

} 

async function getStateID(statename){
    try {
        const response = await axios.get(`/stateValue/${statename}`).then((response) => {
            if(response.status >= 200 && response.status < 300){
              return response.data
            }
            else{ 
              console.log('API error')
              return null
            }
          })
          return response
    } catch (error) {
        console.log('API error')
        return null      
    }
} 



async function getUserNoPassword(id){
    try{
        const response = await axios.get(`/dbUsers/${id}`).then((response) => {
            if(response.status >= 200 && response.status < 300){
                response.data[0].password = null
                return response.data
            }
            else{
                console.log('API error')
                return null
            }
        })
        return response
    }catch(err){
        return null
    }

}

  
async function getState(shelter){
    try{
        const response = await axios.get(`/state/${shelter.stateid}`).then((response) => {
            if(response.status >= 200 && response.status < 300){
                return response.data
            }
            else{
                console.log('API error')
                return null
            }
        })
        return response
    }catch(err){
        console.log("no state")
        return null
    }

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
        document.getElementById('new-zipcode').value.length > 0 ){

        //var req = new XMLHttpRequest();
        var shelter = {sheltername: null, sheltercode: null, email: null, password: null, phone: null, zipcode: null,city: null, state: null, zipid: null,cityid:null,stateid:null};
        shelter.sheltername = document.getElementById('new-shelter-name').value;
        shelter.sheltercode = document.getElementById('new-shelter-code').value;
        shelter.email = document.getElementById('new-email').value;
        shelter.password = document.getElementById('new-password').value;
        shelter.phone = document.getElementById('new-phone').value;
        shelter.zipcode = document.getElementById('new-zipcode').value;

        shelter.zipcode = await getZipID(shelter.zipcode);

        //console.log("shelter.zipcode: " + shelter.zipcode[0].zipcodeid)
        console.log(shelter.zipcode)
        if (shelter.zipcode.length > 0){
            shelter.zipid = shelter.zipcode[0].zipcodeid;
            console.log(shelter.zipid)
            shelter.cityid = shelter.zipcode[0].cityid
            console.log(shelter.cityid)
            shelter.state = await getCity(shelter.cityid)
            shelter.stateid = shelter.state[0].stateid
            console.log(shelter.stateid)
        }else{
            shelter.zipid= null
            shelter.cityid  =null
            shelter.stateid = null
        }
        console.log( shelter.zipid)
        console.log(shelter.cityid)
        console.log(shelter.stateid)

        let shelterid = await postShelter(shelter, shelter.zipid,shelter.cityid,shelter.stateid)
        console.log(shelterid)
        let userid = document.getElementById("hidden-userID").value
        
        await addAdminShelter(userid,shelterid)
        location.reload()
        console.log("add shelter button enabled")
    }
    else{
        console.log("invlaid input");
    }
}

async function postShelter(shelter,zipid,cityid,stateid){
    try {
        const response = await axios.post(`/shelter`,{
            sheltername : shelter.sheltername,
            sheltercode : shelter.sheltercode,
            email: shelter.email,
            shelterpassword : shelter.password,
            phonenumber : shelter.phone,
            zipcodeid : zipid,
            cityid : cityid,
            stateid : stateid
          }).then((response) => {
            if (response.status >= 200 && response.status<300) {
              console.log("shelter added")
              //console.log(response.data[0].shelterid)
              
              return response.data[0].shelterid
              //location.reload();
    
            }else{
              console.log("API error");
              return null        
            }
          })
          return response  
    } catch (error) {
        return null
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
                location.reload()
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
              //location.reload();
            }else{
              console.log("API error");        
            }
        })  
    }catch(err){
        console.log(err)
    }
}





async function getLoggedInUser(){
    let response = await axios.get('/users/getSessionId');
    console.log(response.data);
    return response.data
}




const setupList = async () => {
    let userInfo = await getLoggedInUser()
    console.log(userInfo)
    //userid = 9;
    document.getElementById('hidden-userID').value = userInfo
    const shelterList = await getShelterAdmin(userInfo)
    console.log(shelterList)
    const mainList = document.getElementById("main-rows");
    const sheltersArray = Array()
    shelterList.forEach( async shelter => {
        console.log(shelter)
        let adminShelterid = shelter.id
        let newShelter = await getBaseShelterInfo(shelter)

        let zip = await getZip(newShelter.zipcodeid)

        //console.log(zip)
        if(zip != null){
            newShelter.zipcode = zip[0].zipcode
        }else{
            newShelter.zipcode = null
        }

        let city = await getCity(newShelter.cityid)
        if(city != null){
            newShelter.cityname = city[0].cityname
        }else{
            newShelter.cityname = null
        }

        let state = await getState(newShelter)
        if( state != null){
            newShelter.statecode = state[0].statecode
        }else{
            newShelter.statecode = null
        }
        newShelter.adminshelterid = adminShelterid
        console.log(newShelter)

        mainList.appendChild(newShelter.generateRow());
        shelterDetails(newShelter)
        delistShelter(newShelter)
        sheltersArray.push(newShelter)
    });


    document.getElementById("loadingbar").style.display = "none";



    document.getElementById("newShelter").addEventListener("click", () => {
        addNewShelterForm();
    });

    document.getElementById("existingShelter").addEventListener("click", () => {
        addExistingShelterForm();
    });

}

setupList()