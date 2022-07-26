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
        <button type="button" class="btn btn-outline-primary btn-sm" id="expand-button-${this.breedID}" >expand</button>
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
    document.getElementById(`delete-button-${breed.breedID}`).addEventListener("click", () => { //add delete
        // var req = new XMLHttpRequest();
        // var payload = "/siteAdmin/deleteBreed?breedID=" + breed.breedID ;
        // console.log("sending " + payload);
        // req.open("POST", payload, true);
        // req.send();
        // location.reload();
        console.log("delete button enabled")
    });

    document.getElementById(`expand-button-${breed.breedID}`).addEventListener("click", () => { //add delete
        // var req = new XMLHttpRequest();
        // var payload = "/siteAdmin/updateBreed?breedID=" + breed.breedID ;
        // console.log("sending " + payload);
        // req.open("POST", payload, true);
        // req.send();
        // location.reload();
        console.log("update button enabled")
    });

    document.getElementById(`expand-button-${breed.breedID}`).addEventListener("click", () => {
        var id = {breedId:null};
        id.breedId = document.getElementById(`expand-button-${breed.breedID}`).value;
        // var reqOrders = new XMLHttpRequest();
        // var payload = "/siteAdming/breedInfo?breedID=" + id.breedId;
        // console.log(payload);
        // reqbreeds.open("GET", payload, true);
        // reqBreeds.send();
        // var breedResponse;/////////////////////////////////////////////////
        // reqBreeds.onreadystatechange =function(){
        //   if(reqBreeds.readyState === XMLHttpRequest.DONE && reqBreeds.status >= 200 && reqBreeds.status < 300){
        //     breedResponse = reqBreeds.responseText;
        //     breedResponse = JSON.parse(breedResponse);
        //     let modalTable = document.getElementById("modal-table");
        //     while(modalTable.firstChild){
        //       modalTable.removeChild(modalTable.firstChild)
        //     }
    
        //     orderResponse.forEach((breed,index) =>{
        //       let element = document.createElement("tr");
        //       element.innerHTML = `
        //         <th scope="row">${breed.orderId}</th>
        //         <td>${order.orderDate.substring(0,10)}</td>
        //         <td>$${order.Total.toFixed(2)}</td>
        //       `;
        //       modalTable.appendChild(element);
        //     });
        //     breedModal.show();
        //   }
        // }
    });


}
  




async function addBreed(){
    console.log("adding");
    if(document.getElementById('new-breed').value.length > 0){

        var req = new XMLHttpRequest();
        var breed = {breedName: null, typeFK: null};
        breed.breedName = document.getElementById('new-breedName').value;
        breed.typeFK = doccument.getElementById('new-type-fk-menu').value;

        // var payload = "/siteAdmin/newType/?typeName=" + type.typeName;

        // console.log("sending " + payload);
        // req.open("POST", payload, true);
        // await req.send();
        // console.log(req.status);
        // location.reload();
        
        console.log("add breed button enabled")
    }
    else{
        console.log("invlaid input");
    }
}

  
function populateUpdate(){
    var id = document.getElementById('update-breed-pk-menu').value; //post db updated, update entry without having to reload the page
    var breedName = document.getElementById('breedName-' + id).value;
    var typeFK = document.getElementById('typeFK-'+ id).value;
    document.getElementById('update-typeName').value = breedName;
    document.getElementById('update-type-fk-menu').value = typeFK
    
}
  
function updateBreed(){
    if(document.getElementById('update-breed-pk-menu').value != 'number' &&
     document.getElementById('update-type-fk-menu').value != 'number' &&
     document.getElementById('update-breedName').value.length > 0 ){
  
        var req = new XMLHttpRequest();
        var breed = {breedID: null, breedName: null, typeFK: null}
      
        breed.breedID = document.getElementById('update-breed-pk-menu').value;
        breed.breedName = document.getElementById('update-typeName').value;
        breed.typeFK = documment.getElementById('update-type-fk-menu').value;
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
    let breedPK = document.getElementById("update-breed-pk-menu");
    let breeds = Array();
  
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
  
    document.getElementById("addBreedButton").addEventListener("click", () => {
      addBreed();
    });
  
    document.getElementById("updateBreedeButton").addEventListener("click", () => {
      updateBreed();
    });
  
    document.getElementById('update-Breed-pk-menu').addEventListener("change", () => {
      populateUpdate();
    });
  
    document.getElementById("loadingbar").style.display = "none";
};
  
  
  
console.log("Running successfully!");
setupList();