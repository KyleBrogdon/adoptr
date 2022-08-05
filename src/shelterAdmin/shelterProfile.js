// shelter Profile script
// Database access:
// CREATE/READ/UPDATE to the shelter table
const { offset } = require("@popperjs/core");
const { default: axios, Axios } = require("axios");







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
      <th scope="row">${this.petname}</th>
      <td>${this.typeid}</td>
      <td>${this.age}</td>
      <td>${this.sex}</td>
      <td>
        <button type="button" class="btn btn-outline-primary btn-sm" id="expand-button-${this.petid}" value = "${this.petid}">Expand</button>
        <button type="button" class="btn btn-outline-primary btn-sm" id="delete-button-${this.petid}" value = "${this.petid}">delete</button>
        <button type="button" class="btn btn-outline-primary btn-sm" id="profile-button-${this.petid}" value = "${this.petid}"><a class="nav-link" href="/shelterAdmin/petProfiles?petid=${this.petid}">Profile</a></button>
      </td>
    `;
    return element;
  }

};



const getBasePetInfo = async (pet) =>{
  try{
    const resp = await axios.get(`/pet/${pet.petid}`).then((response) => {
      if (response.status == 200 && response.status < 300) {
        const petResponse = response.data
        console.log(petResponse)
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
    console.log(resp)
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


function selectProperty(){
  if(document.getElementById('searchBar').value.length  > 0 && 
    document.getElementById('atribute-form').value.length > 0 && 
    document.getElementById('atribute-form').value != 'Attribute'){
  
      console.log("search bar: " + document.getElementById('searchBar').value)
      document.getElementById("loadingbar").style.display = "inline";
  
      var search = {property: null, value: null};      
      search.property = document.getElementById('atribute-form').value;
      search.value = document.getElementById('searchBar').value;

      axios.get(`/pets/${search.property}/${search.value}`).then((response) => {
        console.log(response.status)
        if (response.status == 200) {
          console.log(response.data)
          const parsedJson = response.data
          console.log(parsedJson);
          
          if (parsedJson.length > 0){
            console.log("results exist")

          } else{
            console.log("no results returned")
          }
  
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

        }else{
          console.log("API error");        
        }
      })  

      console.log('search Enabled')
  }
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


function updateProfile(){
  console.log("updating profile")

  let updatefield = document.getElementById("profileFields");

  if(document.body.contains(document.getElementById("profileMessage"))){
    updatefield.removeChild(document.getElementById("profileMessage")); 
  }

  if(document.getElementById('InputFirstName').value.length > 0
  && document.getElementById('InputLastName').value.length > 0
  && document.getElementById('InputEmail').value.length > 0){
    
    var shelter ={shelterid:null, firstname: null, lastname: null, email:null};
    shelter.shelterid = document.getElementById("hidden-shelterID").value;
    shelter.firstname = document.getElementById("InputFirstName").value;
    shelter.lastname = document.getElementById("InputLastName").value;
    shelter.email = document.getElementById("InputEmail").value;

    axios.put(`/dbshelterNameEmail/${shelter.shelterid}`,{
      firstname: shelter.firstname,
      lastname: shelter.lastname,
      email : shelter.email
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


function getShelterID(){
    let pageURL = document.URL;
    let ID = pageURL.split('=')[1];
    console.log(ID)
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
  console.log('setting up list')
  document.getElementById('hidden-shelterID').value = shelter.shelterID

  // const shelterCallTest = await fetch(`/dbshelters/${shelter.shelterID}`)
  // const profileResponse = await shelterCallTest.json();

  // console.log(profileResponse[0])


  const shelterCall = await axios.get(`/shelter/${shelter.shelterID}`).then((response) => {
    console.log(response);
    if (response.status >= 200 && response.status < 300) {

      const profileResponse = response.data
      console.log(profileResponse);

      //document.getElementById("shelterID").value = profileResponse.shelterID
        return profileResponse
    
    } else {
      console.log("API error");
    }
  });
  document.getElementById('newName').value = shelterCall[0].sheltername
  document.getElementById('newCode').value = shelterCall[0].sheltercode
  document.getElementById('currentEmail').value = shelterCall[0].email
  document.getElementById('currentPhone').value = shelterCall[0].phonenumber

  let zip = await getZip(shelterCall[0])
  let city = await getCity(shelterCall[0])
  let state = await getState(shelterCall[0])

  console.log(shelterCall[0])

  document.getElementById('newZip').value = zip[0].zipcode
  document.getElementById('newCity').value = city[0].cityname
  document.getElementById('newState').value = state[0].statecode



  const savedPets = await axios.get(`/petshelter/${shelter.shelterID}`).then((response) => {
    console.log(response.status);
    if (response.status >= 200 && response.status < 300) {
      const petIDList = response.data
      console.log(petIDList)
      return petIDList
    }
    else{
      console.log("API error");
    }
  })

  console.log(savedPets)

  const mainList = document.getElementById("main-rows");
  const pets = Array();
  savedPets.forEach(async petid=>{
    console.log("getting: " + petid.petid)
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
  console.log(pets)

  
  document.getElementById("loadingbar").style.display = "none";
    
  document.getElementById("searchButton").addEventListener("click", () => {
    selectProperty()
  });

  document.getElementById("updatePassword").addEventListener("click", () => {
    updatePassword();
  });


  document.getElementById("updateName").addEventListener("click", () => {
    updateProfile();
  });

  document.getElementById("updateLocation").addEventListener("click", () => {
    updateProfile();
  });

  document.getElementById("updateContact").addEventListener("click", () => {
    updateProfile();
  });


};


console.log(document.URL)
console.log("Running successfully!");
getShelterID()
setupList();
