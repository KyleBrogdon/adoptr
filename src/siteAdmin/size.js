// Site Admin size page
// Database access:
// CREATE/READ/UPDATE/DESTROY to the size table
const { default: axios, Axios } = require("axios");
  
const updatesizeModal = new bootstrap.Modal(document.getElementById('updateSizeModal'), {
    keyboard: false
});
  
  
class sizeEntry {
    constructor(
      sizeid,
      petsize
    ) {
      this.sizeid = sizeid;
      this.petsize = petsize;
    }
  
    generateRow() {
      let element = document.createElement("tr");
      element.innerHTML = `
        <th scope="row">${this.sizeid}</th>
        <td>
          <span>${this.petsize}</span>
          <data hidden id="petsize-${this.sizeid}" value = ${this.petsize}></data>
        </td>
  
        <td>
        <button type="button" class="btn btn-outline-danger btn-sm" id="delete-button-${this.sizeid}" >Delete</button>
        </td>
      `;
      return element;
    }
  
    generateOption() {
      let element = document.createElement("option");
      element.innerHTML = `<option value="${this.sizeid}">${this.sizeid}</option>`;
      return element;
    }
  
};
    
function addEventListeners(size){
    document.getElementById(`delete-button-${size.sizeid}`).addEventListener("click", () => { //add delete
      axios.delete(`/size/${size.sizeid}`).then((response) => {
        console.log(response.status)
        if (response.status == 200) {
          console.log(size.sizeid + " deleted")
          location.reload();

        }else{
          console.log("API error");        
        }
      })  
      
        console.log("delete button enabled")
    });
  
  
}
  
async function addSize(){
    console.log("adding");
    if(document.getElementById('new-size-name').value.length > 0){

      var size = {petsize: null};
      size.petsize = document.getElementById('new-size-name').value;

      axios.post(`/size`,{
        petsize : size.petsize,
      }).then((response) => {
        console.log(response.status)
        if (response.status >= 200 && response.status<300) {
          console.log("size added")
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
  var id = document.getElementById('update-size-pk-menu').value;
  var petsize = document.getElementById('petsize-' + id).value;
  document.getElementById('update-size-name').value = petsize;
}
  
function updateSize(){
    if(document.getElementById('update-size-pk-menu').value != 'number' &&
     document.getElementById('update-size-name').value.length > 0){
  
      var size = {sizeid: null, petsize: null}
      
      size.sizeid = document.getElementById('update-size-pk-menu').value;
      size.petsize = document.getElementById('update-size-name').value;

      console.log(size)

      axios.put(`/size/${size.sizeid}`,{
        petsize : size.petsize,
  
      }).then((response) => {
        console.log(response.status)
        if (response.status >= 200 && response.status<300) {
          console.log("size updated")
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

        axios.get(`/dbsizes/${search.property}/${search.value}`).then((response) => {
          console.log(response.status)
          if (response.status == 200) {
            console.log(response.data)
            const parsedJson = response.data
            console.log(parsedJson);
            
            if (parsedJson.length > 0){
              console.log("results exist")

            // parsedJson.forEach(size => {
            //   if(size.sizeid != 1){
            //     if (size.adminstatus){
            //       size.adminstatus = "true"
            //     }
            //     else{
            //       size.adminstatus = "false"
            //     }
            //     console.log(size)
            //     sizes.push(new sizeEntry(size.sizeid, size.firstname, size.lastname, size.email, size.password, size.adminstatus));
            //   }
            // });
          
          
            // // Activate buttons for detailed item views
            // sizes.forEach((size) => { 
            //   mainList.appendChild(size.generateRow());
            //   sizePK.append(size.generateOption());
            //   addEventListeners(size);
            // })

            } else{
              console.log("no results returned")
            }
    
            document.getElementById("addsizeButton").addEventListener("click", () => {
              addsize();
            });
          
            document.getElementById("updatesizeButton").addEventListener("click", () => {
              updatesize();
            });
          
            document.getElementById("searchButton").addEventListener("click", () => {
              selectProperty()
            });
          
          
            document.getElementById('update-size-pk-menu').addEventListener("change", () => {
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
  
async function getSize(){
  const response = await axios.get(`/size`).then((response) => {
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
    console.log("setupList executed")
    let mainList = document.getElementById("main-rows");
    let sizePK = document.getElementById("update-size-pk-menu");
    let sizeArray = Array();
  
    const szResp = await getSize()
    console.log(szResp)
    szResp.forEach(size => {
      console.log(size)
      let newEntry = new sizeEntry(size.sizeid, size.petsize)
      
      mainList.appendChild(newEntry.generateRow());
      sizePK.append(newEntry.generateOption())
      addEventListeners(newEntry)
      sizeArray.push(newEntry);
  
    });
  
    document.getElementById("addSizeButton").addEventListener("click", () => {
      addSize();
    });
  
    document.getElementById("updateSizeButton").addEventListener("click", () => {
      updateSize();
    });
  
    // document.getElementById("searchButton").addEventListener("click", () => {
    //   selectProperty()
    // });
  
    document.getElementById('update-size-pk-menu').addEventListener("change", () => {
      populateUpdate();
    });
  
    document.getElementById("loadingbar").style.display = "none";
};
  
  
  
console.log("Running successfully!");
setupList();