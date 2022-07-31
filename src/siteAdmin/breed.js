// Site Admin Users page
// Database access:
// CREATE/READ/UPDATE/DESTROY to the usser table

  
const updateTypeModal = new bootstrap.Modal(document.getElementById('updateTypeModal'), {
    keyboard: false
});
  
  
class breedEntry {
    constructor(
        breedID,
        breedName,
        typeID
    ) {
        this.breedID = breedID  
        this.typeID = typeID;
        this.breedName = breedName;
    }
  
    generateRow() {
      let element = document.createElement("tr");
      element.innerHTML = `
        <th scope="row">${this.breedID}</th>
        <td>
          <span>${this.breedName}</span>
          <data hidden id="breed-name-${this.breedID}" value = ${this.breedName}></data>
        </td>
        <td>
          <span>${this.typeID}</span>
          <data hidden id="type-fk-${this.breedID}" value = ${this.typeID}></data>
        </td>  
        <td>
        <button type="button" class="btn btn-outline-danger btn-sm" id="delete-button-${this.breedID}" >Delete</button>
        </td>`;

      return element;
    }
  
    generateOption() {
      let element = document.createElement("option");
      element.innerHTML = `<option value="${this.breedID}">${this.breedID}</option>`;
      return element;
    }
  
};
  
  
    
function addEventListeners(breed){
    document.getElementById(`delete-button-${breed.breedid}`).addEventListener("click", () => { //add delete
      axios.delete(`/dbBreeds/${breed.breedid}`).then((response) => {
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
  
  async function addbreed(){
    console.log("adding");
    if(document.getElementById('new-breed-name').value.length > 0){
  
        //var req = new XMLHttpRequest();
        var breed = {breedName: null};
        breed.breedName = document.getElementById('new-breed-name').value;
  
  
        axios.post(`/dbBreeds`,{
          breedName : breed.breedName,
        }).then((response) => {
          console.log(response.status)
          if (response.status >= 200 && response.status<300) {
            console.log("breed added")
            location.reload();
  
          }else{
            console.log("API error");        
          }
        })  
  
        console.log("add breed button enabled")
    }
    else{
        console.log("invlaid input");
    }
  }
  
  function populateUpdate(){
  var id = document.getElementById('update-breed-pk-menu').value;
  var breedName = document.getElementById('breed-name-' + id).value;
  
  document.getElementById('update-breed-name').value = breedName;
  }
  
  function updatebreed(){
    if(document.getElementById('update-breed-pk-menu').value != 'number' &&
     document.getElementById('update-breed-name').value.length > 0){
  
      //var req = new XMLHttpRequest();
      var breed = {breedid: null, breedName: null, typeID: null}
      
      breed.breedid = document.getElementById('update-breed-pk-menu').value;
      breed.breedName = document.getElementById('update-breed-name').value;
      breed.typeID = document.getElementById('update-type-id').value;  
  
      console.log(breed)
      axios.put(`/dbBreeds/${breed.breedid}`,{
        breedName : breed.breedName,
  
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
  
  
  function selectProperty(){
    if(document.getElementById('searchBar').value.length  > 0 && 
      document.getElementById('atribute-form').value.length > 0 && 
      document.getElementById('atribute-form').value != 'Attribute'){
    
        console.log("search bar: " + document.getElementById('searchBar').value)
        document.getElementById("loadingbar").style.display = "inline";
    
        var search = {property: null, value: null};      
        search.property = document.getElementById('atribute-form').value;
        search.value = document.getElementById('searchBar').value;
  
        axios.get(`/dbBreeds/${search.property}/${search.value}`).then((response) => {
          console.log(response.status)
          if (response.status == 200) {
            console.log(response.data)
            const parsedJson = response.data
            console.log(parsedJson);
            
            if (parsedJson.length > 0){
              console.log("results exist")
  
            // parsedJson.forEach(breed => {
            //   if(breed.breedid != 1){
            //     if (breed.adminstatus){
            //       breed.adminstatus = "true"
            //     }
            //     else{
            //       breed.adminstatus = "false"
            //     }
            //     console.log(breed)
            //     breeds.push(new breedEntry(breed.breedid, breed.breedName, breed.typeID));
            //   }
            // });
          
          
            // // Activate buttons for detailed item views
            // breeds.forEach((breed) => { 
            //   mainList.appendChild(breed.generateRow());
            //   breedPK.append(breed.generateOption());
            //   addEventListeners(breed);
            // })
  
            } else{
              console.log("no results returned")
            }
    
            document.getElementById("addBreedButton").addEventListener("click", () => {
              addBreed();
            });
          
            document.getElementById("updateBreedButton").addEventListener("click", () => {
              updateBreed();
            });
          
            document.getElementById("searchButton").addEventListener("click", () => {
              selectProperty()
            });
          
          
            document.getElementById('update-breed-pk-menu').addEventListener("change", () => {
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
    let breedPK = document.getElementById("update-breed-pk-menu");
    let breeds = Array();
  
    axios.get('/dbBreeds').then((response) => {
      console.log(response.status);
      if (response.status == 200) {
        console.log(response.data);
  
        const parsedJson = response.data
        console.log(parsedJson);
  
  
        parsedJson.forEach(breed => {
          console.log(breed)
          breeds.push(new breedEntry(breed.breedid, breed.breedName, breed.typeID));
        });
      
      
        // Activate buttons for detailed item views
        breeds.forEach((breed) => { 
          mainList.appendChild(breed.generateRow());
          breedPK.append(breed.generateOption());
          addEventListeners(breed);
        })
  
  
        document.getElementById("addBreedButton").addEventListener("click", () => {
          addBreed();
        });
      
        document.getElementById("updateBreedButton").addEventListener("click", () => {
          updateBreed();
        });
      
        document.getElementById("searchButton").addEventListener("click", () => {
          selectProperty()
        });
      
      
        document.getElementById('update-breed-pk-menu').addEventListener("change", () => {
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