// user Profile script
// Database access:
// CREATE/READ/UPDATE to the user table
const { offset } = require("@popperjs/core");
const { default: axios, Axios } = require("axios");



// const petModal = new bootstrap.Modal(document.getElementById('petModal'), {
//     keyboard: false
// });


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
    petShelter,
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
    this.petShelter = petShelter;
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


const getPet = async (pet) =>{
  console.log(pet)
  try{
    pet.petSize = await getSize(pet)
    pet.petType = await getType(pet)
    pet.petAvailability = await getAvailability(pet)
    pet.petBreed = await getBreed(pet)
    pet.petPic = await getImage(pet)
    return pet
  }catch{
    console.log(err)
  }
}
 

const getSize = async (pet) =>{
  try{
    const resp = await axios.get(`/size/${pet.petSize}`).then((response) => {
      if(response.status >= 200 && response.status < 300){
        const sizedata = response.data
        return sizedata.petsize
      }
      else{
        console.log('API error')
      }
    })
    console.log(resp)
    return resp
  }catch{
    console.log(err)
  }
}

const getType = async (pet) => {
  try{
    console.log(pet)
    const resp = await axios.get(`/type/${pet.petType}`).then((response) => {
      if(response.status >= 200 && response.status < 300){
        const typedata = response.data
        console.log(typedata)
        return typedata.typename
      }
      else{
        console.log('API error')
      }
    })
    console.log(resp)
    return resp
  }catch{
    console.log(err)
  }
}

const getAvailability = async (pet) => {
  try{
    const resp = await axios.get(`/availability/${pet.petAvailability}`).then((response) => {
      if(response.status >= 200 && response.status < 300){
        const availdata = response.data
        return availdata.pet_availability
      }
      else{
        console.log('API error')
      }
    })
    console.log(resp)
    return resp
  }catch(err){
    console.error(err)
  }
}

const getBreed = async (pet)=>{
  try{
    const resp  = await axios.get(`petbreedPID/${pet.petID}`).then((response)=>{
      if(response.status >= 200 && response.status < 300){
        var pbData = response.data
        pbID = pbData.breedID
        axios.get(`/breed/${pbID}`).then((response) => {
          if(response.status >= 200 && response.data < 300){
            const breedData = response.data
            return breedData.breedname
          }
          else{
            console.log('API error')
          }
        })
      }else{
        console.log('API error')
      }
    })
    console.log(resp)
    return resp
  }catch(err){
    console.error(err)
  }
}

const getImage = async (pet) =>{
  try{
    const resp = await axios.get(`/getPetImages/${pet.petID}`).then((response) => {
      if(response.status >= 200 && response.status < 300){
        const imageData = response.data
        return imageData.imageurl
      }
      else{
        console.log('API error')
      }
    })
    console.log(resp)
    return resp
  }catch(err){
    console.error(err)
  }
}


const getBasePetInfo = async (pet) =>{
  try{
    const resp = await axios.get(`/pet/${pet.petid}`).then((response) => {
      if (response.status == 200 && response.status < 300) {
        const petResponse = response.data
        console.log(petResponse)
        return new petEntry(
            petResponse[0].petid, petResponse[0].petname,
            petResponse[0].age, petResponse[0].sex,
            petResponse[0].snstatus, petResponse[0].ststatus,
            petResponse[0].blurb, petResponse[0].sizeid,
            petResponse[0].typeid, petResponse[0].avid, petResponse[0].shelterid,
            null, null
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


// const updateData = async (pet) =>{
//   try{
//     const sizeData = await axios.get(`/size/${pet.petSize}`).then((response) => {
//       if(response.status >= 200 && response.status < 300){
//         const sizedata = response.data
//         return sizedata.petsize
//       }
//       else{
//         console.log('API error')
//       }
//     })

//     const typeData = await axios.get(`/type/${pet.petType}`).then((response) => {
//       if(response.status >= 200 && response.status < 300){
//         const typedata = response.data
//         console.log(typedata)
//         return typedata.typename
//       }
//       else{
//         console.log('API error')
//       }
//     })

//     const getAVData = await axios.get(`petbreedPID/${pet.petID}`).then((response)=>{
//       if(response.status >= 200 && response.status < 300){
//         var pbData = response.data
//         pbID = pbData.breedID
//         axios.get(`/breed/${pbID}`).then((response) => {
//           if(response.status >= 200 && response.data < 300){
//             const breedData = response.data
//             return breedData.breedname
//           }
//           else{
//             console.log('API error')
//           }
//         })
//       }else{
//         console.log('API error')
//       }
//     })

//     const getBreedData = await axios.get(`petbreedPID/${pet.petID}`).then((response)=>{
//       if(response.status >= 200 && response.status < 300){
//         var pbData = response.data
//         pbID = pbData.breedID
//         axios.get(`/breed/${pbID}`).then((response) => {
//           if(response.status >= 200 && response.data < 300){
//             const breedData = response.data
//             return breedData.breedname
//           }
//           else{
//             console.log('API error')
//           }
//         })
//       }else{
//         console.log('API error')
//       }
//     })

//     const imageData = await axios.get(`/getPetImages/${pet.petID}`).then((response) => {
//       if(response.status >= 200 && response.status < 300){
//         const imageData = response.data
//         return imageData.imageurl
//       }
//       else{
//         console.log('API error')
//       }
//     })

//     pet.petSize = sizeData;
//     pet.petType = typeData;
//     pet.petAvailability = getAVData;
//     pet.petBreed = getBreedData;
//     pet.petPic = imageData;
//     console.log(pet)

//   }catch(err){
//     console.log(err)
//   }

// }




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


function updatePassword(){
  let updatefield = document.getElementById("passwordUpdateField");

  if(document.body.contains(document.getElementById("password message"))){
    updatefield.removeChild(document.getElementById("password message")); 
  }

  if(document.getElementById('currentPassword').value.length > 0
    && document.getElementById('newPassword').value.length > 0
    && document.getElementById('confirmPassword').value.length > 0 
    && document.getElementById('newPassword').value == document.getElementById('confirmPassword').value){
      var user ={userID:null, newPassword: null, oldPassword: null};
      user.userID = document.getElementById("userID").value;
      user.newPassword = document.getElementById("newPassword").value;
      user.oldPassword = document.getElementById("currentPassword").value;
    
      axios.put(`/userPasswordUpdate/${user.userid}`,{
        oldPassword: user.oldPassword,
        newPassword: user.newPassword
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

  let updatefield = document.getElementById("profileFields");

  if(document.body.contains(document.getElementById("profileMessage"))){
    updatefield.removeChild(document.getElementById("profileMessage")); 
  }

  if(document.getElementById('InputFirstName').value.length > 0
  && document.getElementById('InputLastName').value.length > 0
  && document.getElementById('InputEmail').value.length > 0){
    
    var user ={userID:null, firstName: null, lastName: null, email:null};
    user.userID = document.getElementById("userID").value;
    user.firstName = document.getElementById("InputFirstName").value;
    user.lastName = document.getElementById("InputLastName").value;
    user.email = document.getElementById("InputEmail").value;

    axios.put(`/userUpdateProfile/${user.userid}`,{
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

function executeQuery(pet,petArray){
  return new Promise((resolve,reject) =>{
    axios.get(`/pet/${pet.petid}`).then((response) => {
      if (response.status == 200 && response.status < 300) {
        const petResponse = response.data
        console.log(petResponse)
        petArray.push(
          new petEntry(
            petResponse.petID, petResponse.petName,
            petResponse.petAge, petResponse.petSex,
            petResponse.petSN, petResponse.petSN,
            petResponse.petBlurb, petResponse.petSize,
            petResponse.petType, petResponse.petAvailability,
            petResponse.petBreed, null
          )
        );
      }else{
        console.log('failed pet pull')
        reject('failed pet pull');
      }
      resolve(console.log('call complete'))
    })
  })
}

// async function compileList(petArray){
//   for (const pet of petArray){
//     await executeQuery(pet,petArray)
//   }
// }



function resetLikesTable(){
  
  userid= document.getElementById("hidden-userID").value;
  axios.delete(`/resetLikes/${user.userid}`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      console.log('likes reset')
      let element = document.createElement("div");
      element.setAttribute('class','modal fade')
      element.setAttribute('id','myModal')
      element.setAttribute('role','dialog')

      element.innerHTML = `
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-body">
            <p>Likes Reset.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
      `

      location.reload();
    }
    else{
      console.log('API error')
    }
  })
}

function resetRejectsTable(){
  console.log('resetTable')
  userid = document.getElementById("hidden-userID").value;
  axios.delete(`/resetRejects/${user.userid}`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      console.log('likes rejects')
      let element = document.createElement("div");
      element.setAttribute('class','modal fade')
      element.setAttribute('id','myModal')
      element.setAttribute('role','dialog')

      element.innerHTML = `
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-body">
            <p>Likes Rejects.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
      `

      location.reload();
    }
    else{
      console.log('API error')
    }

  })

}


const buildPetArry = async (parsedJson)=>{
  try{
    console.log(parsedJson)
    const pets = Array();
    parsedJson.forEach(async petid=>{
      console.log("getting: " + petid.petid)
      const newPet = await getBasePetInfo(petid)
      //console.log(newPet)
      pets.push(newPet)
    })
    //console.log(pets)
    return pets

  }catch(err){
    console.log(err)
  }
}


const updatedPetArray = async (petArray) =>{
  try{
    console.log(petArray)
    let mainList = document.getElementById("main-rows");
    const newPetArray =Array();
    for(let i =0;i<petArray.length;i++){
      console.log(petArray[i])
      //await updateData(petArray[i])
      const size = await getSize(petArray[i])
      const type = await getType(petArray[i])
      const availability = await getAvailability(petArray[i])
      const breed = await getBreed(petArray[i])
      const pic = await getImage(petArray[i])
      petArray[i].petSize =size
      petArray[i].petType =type
      petArray[i].petAvailability =availability 
      petArray[i].petBreed =breed
      petArray[i].petPic =pic
      const updatedPet = await getPet(pet)
      let row = petArray[i].generateRow()
      mainList.appendChild(row)
      newPetArray.push(petArray[i])
    }
    console.log(petArray)
    console.log(newPetArray)
    return newPetArray
  }catch(err){
    console.log(err)
  }
}


const setupList = async () => {
  let user ={userID: null}
  user.userID = 5 //test
  console.log('setting up list')
  document.getElementById('hidden-userID').value = user.userID

  // const userCallTest = await fetch(`/dbUsers/${user.userID}`)
  // const profileResponse = await userCallTest.json();

  // console.log(profileResponse[0])


  const userCall = await axios.get(`/dbUsers/${user.userID}`).then((response) => {
    console.log(response);
    if (response.status >= 200 && response.status < 300) {

      const profileResponse = response.data
      console.log(profileResponse);

      //document.getElementById("userID").value = profileResponse.userID;
    
    
      let userInfo = document.getElementById("profileUpdateField");
      let element1 = document.createElement("div");
      element1.innerHTML = `
        <label for="InputFirstName" class="form-label">First Name</label>
        <input type="text" class="form-control" id="InputFirstName" value="${profileResponse[0].firstname}">
      `
      element1.classList.add("mb-3")
    
      let element2 = document.createElement("div");
      element2.innerHTML = `
        <label for="InputLastName" class="form-label">Last Name</label>
        <input type="text" class="form-control" id="InputLastName" value="${profileResponse[0].lastname}">
      `
      element2.classList.add("mb-3")
    
      let element3 = document.createElement("div");
      element3.innerHTML = `
        <label for="InputEmail" class="form-label">Email Address</label>
        <input type="text" class="form-control" id="InputEmail" value="${profileResponse[0].email}">
      `
      element3.classList.add("mb-3")
    
      let element4 = document.createElement("button");
      element4.classList.add("btn");
      element4.classList.add("btn-primary");
      element4.setAttribute("id","updateProfileButton");
      element4.textContent = "Update";
      element4.type = "submit";
    
      userInfo.append(element1);
      userInfo.append(element2);
      userInfo.append(element3);
      userInfo.append(element4);

    } else {
      console.log("API error");
    }
  });


  const savedPets = await axios.get(`/usersavedpet/${user.userID}`).then((response) => {
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
  
  const petArray = await buildPetArry(savedPets)
  console.log(petArray)

  let mainList = document.getElementById("main-rows");
  petArray.forEach((pet, index) => {
    mainList.appendChild(pet.generateRow());
  });

  //(order, index)
  // const newPetArray = await updatedPetArray(petArray)
  // console.log(newPetArray)


  // const pets = Array();
  
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
    resetRejectsTable();
  });

  document.getElementById("resetLikesButton").addEventListener("click", () => {
    resetLikesTable();
  });




};

console.log("Running successfully!");
setupList();