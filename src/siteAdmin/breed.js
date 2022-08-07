// Site Admin Users page
// Database access:
// CREATE/READ/UPDATE/DESTROY to the usser table
const { default: axios, Axios } = require("axios");

  
// const updateTypeModal = new bootstrap.Modal(document.getElementById('updateTypeModal'), {
//     keyboard: false
// });
  
  
class breedEntry {
    constructor(
        breedid,
        breedname,
        typeid,
        typename
    ) {
        this.breedid = breedid  
        this.typeid = typeid;
        this.breedname = breedname;
        this.typename = typename;
    }
  
    generateRow() {
      let element = document.createElement("tr");
      element.innerHTML = `
        <th scope="row">${this.breedid}</th>
        <td>
          <span>${this.breedname}</span>
          <data hidden id="breed-name-${this.breedid}" value = ${this.breedname}></data>
        </td>
        <td>
          <span>${this.typename}</span>
          <data hidden id="typeid-fk-${this.breedid}" value = ${this.typeid}></data>
          <data hidden id="typename-fk-${this.breedid}" value = ${this.typename}></data>
        </td>  
        <td>
        <button type="button" class="btn btn-outline-danger btn-sm" id="delete-button-${this.breedid}" >Delete</button>
        </td>`;

      return element;
    }
  
    generateOption() {
      let element = document.createElement("option");
      element.innerHTML = `<option value="${this.breedid}">${this.breedid}</option>`;
      return element;
    }
  
};
  
class typeEntry {
  constructor(
    typeid,
    typename  
  ) {
    this.typeid = typeid;
    this.typename = typename;
  }
  generateOption() {
    let element = document.createElement("option");
    element.innerHTML = `<option value="${this.typeid}">${this.typename}</option>`;
    return element;
  }

};




function addEventListeners(breed){
  document.getElementById(`delete-button-${breed.breedid}`).addEventListener("click", () => { //add delete
    axios.delete(`/breed/${breed.breedid}`).then((response) => {
      console.log(response.status)
      if (response.status == 200) {
        console.log(breed.breedid + " deleted")
        location.reload();

      }else{
        console.log("API error");        
      }
    })  
    
      console.log("delete button enabled")
  });

}

async function addBreed(){
  console.log("adding");
  if(document.getElementById('new-breed-name').value.length > 0){

    var breed = {breedStatus: null};
    breed.breedStatus = document.getElementById('new-breed-name').value;


    axios.post(`/breed`,{
      pet_breed : breed.breedStatus,
    }).then((response) => {
      console.log(response.status)
      if (response.status >= 200 && response.status<300) {
        console.log("breed added")
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

function populateUpdate(){
  var id = document.getElementById('update-breed-pk-menu').value;
  var breedStatus = document.getElementById('breed-name-' + id).value;
  var typename = document.getElementById('typename-fk-' + id).value;
  document.getElementById('update-breed-name').value = breedStatus;
  document.getElementById('update-type-name').value = typename;
}

async function updateBreed(){
  if(document.getElementById('update-breed-pk-menu').value != 'number' &&
   document.getElementById('update-breed-name').value.length > 0){

    var breed = {breedid: null, breedname: null, typeid: null, typename:null}
    
    breed.breedid = document.getElementById('update-breed-pk-menu').value;
    breed.breedname = document.getElementById('update-breed-name').value;
    breed.typename = document.getElementById('update-type-name').value;
    breed.typeid = await getTypeName(breed.typename)
    console.log(breed.typeid)
    breed.typeid = breed.typeid[0].typeid
    console.log(breed.typeid)

    axios.put(`/breed/${breed.breedid}`,{
      breedname : breed.breedname,
      typeid : breed.typeid,

    }).then((response) => {
      console.log(response.status)
      if (response.status >= 200 && response.status<300) {
        console.log("breed updated")
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


// function selectProperty(){
//   if(document.getElementById('searchBar').value.length  > 0 && 
//     document.getElementById('atribute-form').value.length > 0 && 
//     document.getElementById('atribute-form').value != 'Attribute'){
  
//       console.log("search bar: " + document.getElementById('searchBar').value)
//       document.getElementById("loadingbar").style.display = "inline";
  
//       var search = {property: null, value: null};      
//       search.property = document.getElementById('atribute-form').value;
//       search.value = document.getElementById('searchBar').value;

//       axios.get(`/dbbreed/${search.property}/${search.value}`).then((response) => {
//         console.log(response.status)
//         if (response.status == 200) {
//           console.log(response.data)
//           const parsedJson = response.data
//           console.log(parsedJson);
          
//           if (parsedJson.length > 0){
//             console.log("results exist")

//           // parsedJson.forEach(breed => {
//           //   if(breed.breedid != 1){
//           //     if (breed.adminstatus){
//           //       breed.adminstatus = "true"
//           //     }
//           //     else{
//           //       breed.adminstatus = "false"
//           //     }
//           //     console.log(breed)
//           //     breeds.push(new breedEntry(breed.breedid, breed.firstname, breed.lastname, breed.email, breed.password, breed.adminstatus));
//           //   }
//           // });
        
        
//           // // Activate buttons for detailed item views
//           // breeds.forEach((breed) => { 
//           //   mainList.appendChild(breed.generateRow());
//           //   breedPK.append(breed.generateOption());
//           //   addEventListeners(breed);
//           // })

//           } else{
//             console.log("no results returned")
//           }
  
//           document.getElementById("addbreedButton").addEventListener("click", () => {
//             addbreed();
//           });
        
//           document.getElementById("updatebreedButton").addEventListener("click", () => {
//             updatebreed();
//           });
        
//           document.getElementById("searchButton").addEventListener("click", () => {
//             selectProperty()
//           });
        
        
//           document.getElementById('update-breed-pk-menu').addEventListener("change", () => {
//             populateUpdate();
//           });
        
//           document.getElementById("loadingbar").style.display = "none";
//         }else{
//           console.log("API error");        
//         }
//       })  

//       console.log('search Enabled')
//   }
// }


async function getBreed(){
  const response = await axios.get(`/breed`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      return response.data
    }
    else{
      console.log('API error')
    }
  })
  return response
} 

async function getType(id){
  const response = await axios.get(`/type/${id}`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      return response.data
    }
    else{
      console.log('API error')
    }
  })
  return response
} 

async function getTypeName(name){
  console.log(name)
  const response = await axios.get(`/typeName/${name}`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      return response.data
    }
    else{
      console.log('API error')
    }
  })
  return response
} 

async function getTypes(){
  const response = await axios.get(`/type`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      return response.data
    }
    else{
      console.log('API error')
    }
  })
  return response
} 


async function createEntry(breed){
  let mainList = document.getElementById("main-rows");
  let breedPK = document.getElementById("update-breed-pk-menu");
  let typename = await getType(breed.typeid)
  let newEntry = new breedEntry(breed.breedid, breed.breedname, breed.typeid, typename[0].typename)
  
  mainList.appendChild(newEntry.generateRow());
  breedPK.append(newEntry.generateOption())
  addEventListeners(newEntry)
}

const setupList = async () => {
  console.log("setupList executed")
  let mainList = document.getElementById("main-rows");
  let breedPK = document.getElementById("update-breed-pk-menu");
  const breedResp = await getBreed()

  breedResp.forEach(async breed => {
    // let typename = await getType(breed.typeid)
    // let newEntry = new breedEntry(breed.breedid, breed.breedname, breed.typeid, typename[0].typename)
    
    // mainList.appendChild(newEntry.generateRow());
    // breedPK.append(newEntry.generateOption())
    // addEventListeners(newEntry)
    await createEntry(breed)

  });

  let typeFK = document.getElementById("update-type-name");
  const types = await getTypes()
  types.forEach(async type=>{
    let newEntry = new typeEntry(type.typeid, type.typename)
    typeFK.append(newEntry.generateOption())
  })


  document.getElementById("addBreedButton").addEventListener("click", () => {
    addBreed();
  });

  document.getElementById("updateBreedButton").addEventListener("click", () => {
    updateBreed();
  });

  // // document.getElementById("searchButton").addEventListener("click", () => {
  // //   selectProperty()
  // // });

  document.getElementById('update-breed-pk-menu').addEventListener("change", () => {
    populateUpdate();
  });

  document.getElementById("loadingbar").style.display = "none";


};



console.log("Running successfully!");
setupList();