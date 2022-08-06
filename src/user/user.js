// user Profile script
// Database access:
// CREATE/READ/UPDATE to the user table
const { offset } = require("@popperjs/core");
const { default: axios, Axios } = require("axios");
const loggedInUser = sessionStorage.getItem('userid');
const petModal = new bootstrap.Modal(document.getElementById('petModal'), {
    keyboard: false
});

if (loggedInUser){
    document.getElementById('logout').style.opacity = 1
}


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
        <a id="link-${this.petid}" href="/users/petProfile?petid=${this.petid}" class="link-primary" target="_blank">${this.petname}</a>
      </th>
      <td>${this.typeid}</td>
      <td>${this.age}</td>
      <td>${this.sex}</td>
      <td>
        <button type="button" class="btn btn-outline-primary btn-sm" id="expand-button-${this.petid}" value = "${this.petid}">Expand</button>
        <button type="button" class="btn btn-outline-primary btn-sm" id="unfav-button-${this.petid}" value = "${this.petid}">Unfav</button>
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





function unfav(pet){
  document.getElementById(`unfav-button-${pet.petid}`).addEventListener("click",() => {
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

  let updatefield = document.getElementById("profileFields");

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

async function updatePet(pet){
  console.log(pet)
  let size = await getSize(pet)

  let type = await getType(pet)

  let avail = await getAvailability(pet)

  let pics = await getImage(pet)

  let shelter = await getShelter(pet)
  console.log(size)
  console.log(type)
  console.log(avail)
  console.log(pics)
  console.log(shelter)

  pet.sizeid =size
  pet.typeid =type
  pet.avid = avail
  pet.images =pics
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
    console.log(size)
    console.log(type)
    console.log(avail)
    console.log(pics)
    console.log(shelter)
    newPet.sizeid = size[0].petsize
    newPet.typeid =type[0].typename
    newPet.avid = avail[0].pet_availability
    newPet.images =pics
    newPet.shelterid = shelter[0].sheltercode

    mainList.appendChild(newPet.generateRow());
    unfav(newPet)
    petDetails(newPet)
    //console.log(newPet)
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