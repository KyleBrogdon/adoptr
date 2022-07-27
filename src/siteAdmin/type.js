// Site Admin Users page
// Database access:
// CREATE/READ/UPDATE/DESTROY to the usser table

  
const updateTypeModal = new bootstrap.Modal(document.getElementById('updateTypeModal'), {
    keyboard: false
});
  
  
class typeEntry {
    constructor(
      typeID,
      typeName  
    ) {
      this.typeID = typeID;
      this.typeName = typeName;
    }
  
    generateRow() {
      let element = document.createElement("tr");
      element.innerHTML = `
        <th scope="row">${this.typeID}</th>
        <td>
          <span>${this.typeName}</span>
          <data hidden id="type-name-${this.typeID}" value = ${this.typeName}></data>
        </td>
  
        <td>
        <button type="button" class="btn btn-outline-danger btn-sm" id="delete-button-${this.typeID}" >Delete</button>
        </td>`;

      return element;
    }
  
    generateOption() {
      let element = document.createElement("option");
      element.innerHTML = `<option value="${this.typeID}">${this.typeID}</option>`;
      return element;
    }
  
};
  
  
  
function addEventListeners(type){
    document.getElementById(`delete-button-${type.typeID}`).addEventListener("click", () => { //add delete
        // var req = new XMLHttpRequest();
        // var payload = "/admin/deleteType?typeID=" + type.typeID ;
        // console.log("sending " + payload);
        // req.open("POST", payload, true);
        // req.send();
        // location.reload();
        console.log("delete button enabled")
    });
}
  

async function addType(){
    console.log("adding");
    if(document.getElementById('new-type').value.length > 0){

        var req = new XMLHttpRequest();
        var type = {typeName: null};
        type.typeName = document.getElementById('new-typeName').value;


        // var payload = "/siteAdmin/newType/?typeName=" + type.typeName;

        // console.log("sending " + payload);
        // req.open("POST", payload, true);
        // await req.send();
        // console.log(req.status);
        // location.reload();
        console.log("add Type button enabled")
    }
    else{
        console.log("invlaid input");
    }
}

  
function populateUpdate(){
    var id = document.getElementById('update-type-pk-menu').value; //post db updated, update entry without having to reload the page
    var typeName = document.getElementById('typeName-' + id).value;

    document.getElementById('update-typeName').value = typeName;
    
}
  
function updateType(){
    if(document.getElementById('update-type-pk-menu').value != 'number' &&
     document.getElementById('update-typeName').value.length > 0 ){
  
      var req = new XMLHttpRequest();
      var type = {typeID: null, typeName: null}
      
    type.typeID = document.getElementById('update-type-pk-menu').value;
    type.typeName = document.getElementById('update-typeName').value;

    //   var payload = "/siteAdmin/updateType?typeID="+ type.typeID + "&typeName=" + type.typeName;

    //   console.log("sending " + payload);
    //   req.open("POST", payload, true);
    //   req.send();
    //   location.reload();
      console.log("populate enabled")
    }
    else{
      console.log("invlaid input");
    }
}
  
  
  
   
const setupList = async () => {
    console.log("setupList executed")
    let mainList = document.getElementById("main-rows");
    let typePK = document.getElementById("update-type-pk-menu");
    let types = Array();
  
    // // Get type list from server
    // const response = await fetch('/siteAdmin/typeList');
    // const parsedJson = await response.json();
    // console.log(parsedJson);
  
    // parsedJson.forEach(type => {
    //     types.push(new typeEntry(type.typeID, type.typeName));    
    // });
  
  
    // // Activate buttons for detailed item views
    // types.forEach((type) => { 
    //   mainList.appendChild(type.generateRow());
    //   typePK.append(type.generateOption());
    //   addEventListeners(type);
    // })
  
    document.getElementById("addTypeButton").addEventListener("click", () => {
      addType();
    });
  
    document.getElementById("updateTypeButton").addEventListener("click", () => {
      updateType();
    });
  
    document.getElementById('update-Type-pk-menu').addEventListener("change", () => {
      populateUpdate();
    });
  
    document.getElementById("loadingbar").style.display = "none";
};
  
  
  
console.log("Running successfully!");
setupList();