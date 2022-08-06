// shelter Profile script
// Database access:
// CREATE/READ/UPDATE to the shelter table
const { offset } = require("@popperjs/core");
const { default: axios, Axios } = require("axios");
const loggedInUser = sessionStorage.getItem('userid')
const logoutButton = require('../logoutButtonFunction')

if (loggedInUser) { 
    logoutButton.logoutButton(loggedInUser);
}

const petModal = new bootstrap.Modal(document.getElementById('petModal'), {
    keyboard: false
});


class petEntry {
  constructor(
    petid,
    petname,
    age,
    sex,
    snstatus,
    ststatus,
    blurb,
    sizeid,
    typeid,
    avid,
    shelterid,
    images
  ) {
    this.petid = petid;
    this.petname = petname;
    this.age = age;
    this.sex = sex;
    this.snstatus = snstatus;
    this.ststatus = ststatus;
    this.blurb = blurb;
    this.sizeid = sizeid;
    this.typeid = typeid;
    this.avid = avid;
    this.shelterid = shelterid;
    this.images = images; // empty array that we will store all pet imageURLs in later
  }

  generateRow() {
    let element = document.createElement("tr");
    element.innerHTML = `
      <th scope="row">
        <a id="link-${this.petid}" href="/shelterAdmin/petProfiles?petid=${this.petid}" class="link-primary" target="_blank">${this.petname}</a>
      </th>
      <td>${this.typeid}</td>
      <td>${this.age}</td>
      <td>${this.sex}</td>
      <td>
        <button type="button" class="btn btn-primary btn-sm" id="expand-button-${this.petid}" value = "${this.petid}">Expand</button>
        <button type="button" class="btn btn-danger btn-sm" id="delete-button-${this.petid}" value = "${this.petid}">delete</button>
      </td>
    `;
    return element;
  }

};

function getShelterID(){
  let pageURL = document.URL;
  let ID = pageURL.split('=')[1];
  //console.log(ID)
  // console.log(location.search)
  // // const urlParams = new URLSearchParams(location.search);

  // // for (const [key, value] of urlParams) {
  // //     console.log(`${key}:${value}`);
  // // }

  return ID
}



async function checkCreds(){

}




const getBasePetInfo = async (pet) =>{
  try{
    const resp = await axios.get(`/pet/${pet.petid}`).then((response) => {
      if (response.status == 200 && response.status < 300) {
        const petResponse = response.data
        return new petEntry(
            JSON.stringify(petResponse[0].petid), petResponse[0].petname,
            petResponse[0].age, petResponse[0].sex,
            JSON.stringify(petResponse[0].snstatus), JSON.stringify(petResponse[0].ststatus),
            petResponse[0].blurb, JSON.stringify(petResponse[0].sizeid),
            JSON.stringify(petResponse[0].typeid), JSON.stringify(petResponse[0].avid), JSON.stringify(petResponse[0].shelterid),
            null
          )
      }else{
        console.log('failed pet pull')
      }
    })
    return resp
  }catch(err){

  }
}


function deletePet(pet){
  document.getElementById(`delete-button-${pet.petid}`).addEventListener("click",() => {
    axios.delete(`/favPets/${pet.petid}`).then((response) => {
        console.log(response.status)
        if (response.status == 200) {
            console.log(pet.petid + " deleted")
            location.reload();

        }else{
            console.log("API error");        
        }
    })  
    console.log("delete button enabled")
  })
}

function petDetails(pet){
  document.getElementById(`expand-button-${pet.petid}`).addEventListener("click", () => {
      let modalTable = document.getElementById("modal-table");
  
      while(modalTable.firstChild){
          modalTable.removeChild(modalTable.firstChild)
      }
  
      let pID = pet.petid
      headers =['Name','Age','Sex','Spayed/Neutered','Shots','blurb','Size','type','Availability','shelter']
      values =[
        pet.petname,
        pet.age,
        pet.sex,
        pet.snstatus,
        pet.ststatus,
        pet.blurb,
        pet.sizeid,
        pet.typeid,
        pet.avid,
        pet.shelterid,
      ]

      const img = document.getElementById("petIMG")
      img.src = "/images/image-not-found.png"
      img.className = "img-thumbnail mx-auto d-block"
      img.style="width: 300px; height: 300px; object-fit: cover;"

      const pics = pet.images
      picL = pics.length;
      if(picL > 0){
        console.log(pics[0])
        let pic = pics[0].imageurl
        console.log(pic)
        console.log(img)
        img.src = pic
      }

      console.log(pet.images.length)

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


const updatePassword = async () => {
//function updatePassword(){
  let updatefield = document.getElementById("passwordUpdateField");

  if(document.body.contains(document.getElementById("password message"))){
    updatefield.removeChild(document.getElementById("password message")); 
  }

  if(document.getElementById('currentPassword').value.length > 0
    && document.getElementById('newPassword').value.length > 0
    && document.getElementById('confirmPassword').value.length > 0 
    && document.getElementById('newPassword').value == document.getElementById('confirmPassword').value){
      var shelter ={shelterid:null, newPassword: null, oldPassword: null};
      shelter.shelterid = document.getElementById("hidden-shelterID").value;
      shelter.newPassword = document.getElementById("newPassword").value;
      shelter.oldPassword = document.getElementById("currentPassword").value;
    

        const shelterValid = await axios.get(`/shelter/${shelter.shelterid}`).then((response) => {
            console.log(response);
            if (response.status >= 200 && response.status < 300) {
        
                const profileResponse = response.data
                console.log(profileResponse);

                console.log(profileResponse[0].shelterpassword)


                if(profileResponse[0].shelterpassword == shelter.oldPassword){
                    return true
                }else{
                    return false
                }

            } else {
            console.log("API error");
            }
        });
        console.log(shelterValid)
        if(shelterValid){
            await axios.put(`/shelterPassword/${shelter.shelterid}`,{
                shelterpassword: shelter.newPassword
                }).then((response) => {
                console.log(response.status)
                if (response.status >= 200 && response.status<300) {
                    console.log("password updated");
                    let element = document.createElement('div');
                    element.innerHTML = `Password Updated`;
                    element.setAttribute("class","alert alert-primary");
                    element.setAttribute("id","password message");
                    updatefield.appendChild(element);
                    document.getElementById('currentPassword').value = ''
                    document.getElementById('newPassword').value = ''
                    document.getElementById('confirmPassword').value= ''



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
        }else{
            console.log("API error");  
            console.log("password failed");
            let element = document.createElement('div');
            element.innerHTML = `Password Failed`;
            element.setAttribute("class","alert alert-danger");
            element.setAttribute("id","password message");
            updatefield.appendChild(element);
                
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


async function updateNaming(){
  let updatefield = document.getElementById("nameUpdateField");

  if(document.body.contains(document.getElementById("name message"))){
    updatefield.removeChild(document.getElementById("name message")); 
  }

  let sheltername = document.getElementById("newName").value
  let sheltercode = document.getElementById("newCode").value   
  let shelterid = document.getElementById("hidden-shelterID").value;
  axios.put(`/shelterName/${shelterid}`,{
    sheltername: sheltername,
    sheltercode: sheltercode,
  }).then((response) => {
    console.log(response.status)
    if (response.status >= 200 && response.status<300) {
      let element = document.createElement('div');
      element.innerHTML = `Name Updated`;
      element.setAttribute("class","alert alert-primary");
      element.setAttribute("id","name message");
      updatefield.appendChild(element);
      
    }else{
      let element = document.createElement('div');
      element.innerHTML = `Update Failed`;
      element.setAttribute("class","alert alert-danger");
      element.setAttribute("id","name message");
      updatefield.appendChild(element);
            
    }
  }) 
};

async function updateLocation(){
  let updatefield = document.getElementById("locationUpdateField");

  if(document.body.contains(document.getElementById("location message"))){
    updatefield.removeChild(document.getElementById("location message")); 
  }

  let zipcode = document.getElementById("newZip").value
  let shelterid = document.getElementById("hidden-shelterID").value;

  let zipid = await getZipID(zipcode)
  let cityid = await getCity(zipid[0].cityid)
  let stateid = await getState(cityid[0].stateid)

  console.log(zipid)
  console.log(cityid)
  console.log(stateid)
  let zipcodeid = zipid[0].zipcodeid
  cityid = cityid[0].cityid
  stateid =stateid[0].stateid

  axios.put(`/shelterLocation/${shelterid}`,{
    zipcodeid :zipcodeid,
    cityid : cityid,
    stateid : stateid
  }).then((response) => {
    console.log(response.status)
    if (response.status >= 200 && response.status<300) {
      let element = document.createElement('div');
      element.innerHTML = `Location Updated`;
      element.setAttribute("class","alert alert-primary");
      element.setAttribute("id","location message");
      updatefield.appendChild(element);
      
    }else{
      let element = document.createElement('div');
      element.innerHTML = `Update Failed`;
      element.setAttribute("class","alert alert-danger");
      element.setAttribute("id","location message");
      updatefield.appendChild(element);
            
    }
  }) 
};

async function updateContact(){
  let updatefield = document.getElementById("contactUpdateField");

  if(document.body.contains(document.getElementById("contact message"))){
    updatefield.removeChild(document.getElementById("contact message")); 
  }
  let email = document.getElementById("currentEmail").value
  let phone = document.getElementById("currentPhone").value   
  let shelterid = document.getElementById("hidden-shelterID").value;
  axios.put(`/shelterContact/${shelterid}`,{
    phonenumber: phone,
    email: email,
  }).then((response) => {
    console.log(response.status)
    if (response.status >= 200 && response.status<300) {
      let element = document.createElement('div');
      element.innerHTML = `Contact Info Updated`;
      element.setAttribute("class","alert alert-primary");
      element.setAttribute("id","contact message");
      updatefield.appendChild(element);
      
    }else{
      let element = document.createElement('div');
      element.innerHTML = `Update Failed`;
      element.setAttribute("class","alert alert-danger");
      element.setAttribute("id","contact message");
      updatefield.appendChild(element);
            
    }
  }) 
};


async function popInsertType(){
  let main = document.getElementById("atribute-form-type")
  const response = await axios.get(`/type`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      return response.data
    }
    else{
      console.log('API error')
    }
  })
  response.forEach(type=>{
    let element = document.createElement("option");
    element.value = type.typeid
    element.textContent = type.typename
    main.appendChild(element)
  })

}

async function getZipID(zipcode){
  const response = await axios.get(`/zipcodeValue/${zipcode}`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      return response.data
    }
    else{
      console.log('API error')
    }
  })
  return response
} 

async function getZip(zipcodeid){
  const response = await axios.get(`/zipcode/${zipcodeid}`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      return response.data
    }
    else{
      console.log('API error')
    }
  })
  return response
} 

async function getCity(cityid){
  const response = await axios.get(`/city/${cityid}`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      return response.data
    }
    else{
      console.log('API error')
    }
  })
  return response
} 

async function getState(stateid){
  const response = await axios.get(`/state/${stateid}`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      return response.data
    }
    else{
      console.log('API error')
    }
  })
  return response
} 

async function getSize(pet){
    const response = await axios.get(`/size/${pet.sizeid}`).then((response) => {
      if(response.status >= 200 && response.status < 300){
        return response.data
      }
      else{
        console.log('API error')
      }
    })
    return response
} 

async function getShelter(pet){
  const response = await axios.get(`/shelter/${pet.shelterid}`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      return response.data
    }
    else{
      console.log('API error')
    }
  })
  return response
} 

async function getSize(pet){
  const response = await axios.get(`/size/${pet.sizeid}`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      return response.data
    }
    else{
      console.log('API error')
    }
  })
  return response
} 

async function getType(pet){
  const response = await axios.get(`/type/${pet.typeid}`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      return response.data
    }
    else{
      console.log('API error')
    }
  })
  return response
} 

async function getAvailability(pet){
  const response = await axios.get(`/availability/${pet.avid}`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      return response.data
    }
    else{
      console.log('API error')
    }
  })
  return response
} 

async function getImage(pet){
  const response = await axios.get(`/getPetImages/${pet.petid}`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      return response.data
    }
    else{
      console.log('API error')
    }
  })
  return response
} 


const setupList = async () => {
  let shelter ={shelterID: null}
  shelter.shelterID = getShelterID() //test

  document.getElementById('hidden-shelterID').value = shelter.shelterID

  const shelterCall = await axios.get(`/shelter/${shelter.shelterID}`).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      const profileResponse = response.data
      return profileResponse
    
    } else {
      console.log("API error");
    }
  });
  document.getElementById('newName').value = shelterCall[0].sheltername
  document.getElementById('newCode').value = shelterCall[0].sheltercode
  document.getElementById('currentEmail').value = shelterCall[0].email
  document.getElementById('currentPhone').value = shelterCall[0].phonenumber

  let zip = await getZip(shelterCall[0].zipcodeid)
  let city = await getCity(shelterCall[0].cityid)
  let state = await getState(shelterCall[0].stateid)

  document.getElementById('newZip').value = zip[0].zipcode
  document.getElementById('newCity').value = city[0].cityname
  document.getElementById('newState').value = state[0].statecode

  const savedPets = await axios.get(`/petshelter/${shelter.shelterID}`).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      const petIDList = response.data
      return petIDList
    }
    else{
      console.log("API error");
    }
  })

  const mainList = document.getElementById("main-rows");
  const pets = Array();
  savedPets.forEach(async petid=>{
    let newPet = await getBasePetInfo(petid)
    let size = await getSize(newPet)
    let type = await getType(newPet)
    let avail = await getAvailability(newPet)
    let pics = await getImage(newPet)
    let shelter = await getShelter(newPet)

    newPet.sizeid = size[0].petsize
    newPet.typeid =type[0].typename
    newPet.avid = avail[0].pet_availability
    newPet.images =pics
    newPet.shelterid = shelter[0].sheltercode

    mainList.appendChild(newPet.generateRow());
    deletePet(newPet)
    petDetails(newPet)

    pets.push(newPet)
  })


  await popInsertType()

  document.getElementById("loadingbar").style.display = "none";
    
  document.getElementById("updatePassword").addEventListener("click", () => {
    updatePassword();
  });

  document.getElementById("updateName").addEventListener("click", () => {
    updateNaming();
  });

  document.getElementById("updateLocation").addEventListener("click", () => {
    updateLocation();
  });

  document.getElementById("updateContact").addEventListener("click", () => {
    updateContact();
  });

  document.getElementById("addPetButton").addEventListener("click", () => {
    console.log("adding pet")
  });


};

getShelterID()
setupList();
