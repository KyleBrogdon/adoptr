// Site Admin types page
// Database access:
// CREATE/READ/UPDATE/DESTROY to the type table
const { default: axios, Axios } = require("axios");
  
class typeEntry {
    constructor(
      typeid,
      typename  
    ) {
      this.typeid = typeid;
      this.typename = typename;
    }
  
    generateRow() {
      let element = document.createElement("tr");
      element.innerHTML = `
        <th scope="row">${this.typeid}</th>
        <td>
          <span>${this.typename}</span>
          <data hidden id="type-${this.typeid}" value = ${this.typename}></data>
        </td>
  
        <td>
        <button type="button" class="btn btn-outline-danger btn-sm" id="delete-button-${this.typeid}" >Delete</button>
        </td>`;

      return element;
    }
  
    generateOption() {
      let element = document.createElement("option");
      element.innerHTML = `<option value="${this.typeid}">${this.typeid}</option>`;
      return element;
    }
  
};
  
  
function addEventListeners(type){
    document.getElementById(`delete-button-${type.typeid}`).addEventListener("click", () => { //add delete
      axios.delete(`/type/${type.typeid}`).then((response) => {
        console.log(response.status)
        if (response.status == 200) {
          console.log(type.typeid + " deleted")
          location.reload();

        }else{
          console.log("API error");        
        }
      })  
      
        console.log("delete button enabled")
    });
  
  
}
  

async function addType(){
  console.log("adding");
  if(document.getElementById('new-type-name').value.length > 0){

    var type = {typename: null};
    type.typename = document.getElementById('new-type-name').value;

    axios.post(`/type`,{
      typename : type.typename,
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
  var id = document.getElementById('update-type-pk-menu').value;
  var typename = document.getElementById('type-' + id).value;

  document.getElementById('update-type-name').value = typename;
}
  
function updateType(){
    if(document.getElementById('update-type-pk-menu').value != 'number' &&
     document.getElementById('update-type-name').value.length > 0){
  
      //var req = new XMLHttpRequest();
      var type = {typeid: null, typename: null}
      
      type.typeid = document.getElementById('update-type-pk-menu').value;
      type.typename = document.getElementById('update-type-name').value;


      console.log(type)
      axios.put(`/type/${type.typeid}`,{
        typename : type.typename,

      }).then((response) => {
        console.log(response.status)
        if (response.status >= 200 && response.status<300) {
          console.log("type updated")
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

        axios.get(`/dbtypes/${search.property}/${search.value}`).then((response) => {
          console.log(response.status)
          if (response.status == 200) {
            console.log(response.data)
            const parsedJson = response.data
            console.log(parsedJson);
            
            if (parsedJson.length > 0){
              console.log("results exist")

            // parsedJson.forEach(type => {
            //   if(type.typeid != 1){
            //     if (type.adminstatus){
            //       type.adminstatus = "true"
            //     }
            //     else{
            //       type.adminstatus = "false"
            //     }
            //     console.log(type)
            //     types.push(new typeEntry(type.typeid, type.firstname, type.lastname, type.email, type.password, type.adminstatus));
            //   }
            // });
          
          
            // // Activate buttons for detailed item views
            // types.forEach((type) => { 
            //   mainList.appendChild(type.generateRow());
            //   typePK.append(type.generateOption());
            //   addEventListeners(type);
            // })

            } else{
              console.log("no results returned")
            }
    
            document.getElementById("addtypeButton").addEventListener("click", () => {
              addtype();
            });
          
            document.getElementById("updatetypeButton").addEventListener("click", () => {
              updatetype();
            });
          
            document.getElementById("searchButton").addEventListener("click", () => {
              selectProperty()
            });
          
          
            document.getElementById('update-type-pk-menu').addEventListener("change", () => {
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

async function getType(){
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
  
const setupList = async () => {
    console.log("setupList executed")
    let mainList = document.getElementById("main-rows");
    let typePK = document.getElementById("update-type-pk-menu");
    let typeArray = Array();
  

    const typeResp = await getType()
    console.log(typeResp)
    typeResp.forEach(type => {
      console.log(type)
      let newEntry = new typeEntry(type.typeid, type.typename)
      
      mainList.appendChild(newEntry.generateRow());
      typePK.append(newEntry.generateOption())
      addEventListeners(newEntry)
      typeArray.push(newEntry);
  
    });
  
    document.getElementById("addTypeButton").addEventListener("click", () => {
      addType();
    });
  
    document.getElementById("updateTypeButton").addEventListener("click", () => {
      updateType();
    });
  
    // document.getElementById("searchButton").addEventListener("click", () => {
    //   selectProperty()
    // });
  
    document.getElementById('update-type-pk-menu').addEventListener("change", () => {
      populateUpdate();
    });
  
    document.getElementById("loadingbar").style.display = "none";

};
  
  
  
console.log("Running successfully!");
setupList();