// Site Admin Users page
// Database access:
// CREATE/READ/UPDATE/DESTROY to the usser table

  
const updateTypeModal = new bootstrap.Modal(document.getElementById('updateSizeModal'), {
    keyboard: false
});
  
  
class sizeEntry {
    constructor(
      sizeID,
      petSize
    ) {
      this.sizeID = sizeID;
      this.petSize = petSize;
    }
  
    generateRow() {
      let element = document.createElement("tr");
      element.innerHTML = `
        <th scope="row">${this.sizeID}</th>
        <td>
          <span>${this.petSize}</span>
          <data hidden id="petSize-${this.sizeID}" value = ${this.petSize}></data>
        </td>
  
        <td>
        <button type="button" class="btn btn-outline-danger btn-sm" id="delete-button-${this.sizeID}" >Delete</button>
        </td>
      `;
      return element;
    }
  
    generateOption() {
      let element = document.createElement("option");
      element.innerHTML = `<option value="${this.sizeID}">${this.sizeID}</option>`;
      return element;
    }
  
};
  
  
  
function addEventListeners(size){
    document.getElementById(`delete-button-${size.sizeID}`).addEventListener("click", () => { //add delete
        // var req = new XMLHttpRequest();
        // var payload = "/admin/deleteSize?sizeID=" + size.sizeID ;
        // console.log("sending " + payload);
        // req.open("POST", payload, true);
        // req.send();
        // location.reload();
        console.log("delete button enabled")
    });
}
  

async function addSize(){
    console.log("adding");
    if(document.getElementById('new-petSize').value.length > 0){

        var req = new XMLHttpRequest();
        var size = {petSize: null};
        size.petSize = document.getElementById('new-petSize').value;


        // var payload = "/siteAdmin/newSize/?petSize=" + size.petSize;

        // console.log("sending " + payload);
        // req.open("POST", payload, true);
        // await req.send();
        // console.log(req.status);
        // location.reload();
        console.log("add size button enabled")
    }
    else{
        console.log("invlaid input");
    }
}
  
  
function populateUpdate(){
    var id = document.getElementById('update-size-pk-menu').value; //post db updated, update entry without having to reload the page
    var petSize = document.getElementById('petSize-' + id).value;

    document.getElementById('update-petSize').value = petSize;
    
}
  
function updateSize(){
    if(document.getElementById('update-size-pk-menu').value != 'number' &&
     document.getElementById('update-petSize').value.length > 0 ){
  
      var req = new XMLHttpRequest();
      var size = {sizeID: null, petSize: null}
      
    size.sizeID = document.getElementById('update-size-pk-menu').value;
    size.petSize = document.getElementById('update-petSize').value;

    //   var payload = "/siteAdmin/updateSizes?sizeID="+ size.sizeID + "&petSize=" + size.petSize;

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
    let sizePK = document.getElementById("update-size-pk-menu");
    let sizes = Array();
  
    // // Get item list from server
    // const response = await fetch('/siteAdmin/sizeList');
    // const parsedJson = await response.json();
    // console.log(parsedJson);
  
    // parsedJson.forEach(size => {
    //     sizes.push(new sizeEntry(size.sizeID, size.petSize));    
    // });
  
  
    // // Activate buttons for detailed item views
    // sizes.forEach((size) => { 
    //   mainList.appendChild(size.generateRow());
    //   sizePK.append(size.generateOption());
    //   addEventListeners(size);
    // })
  
    document.getElementById("addSizeButton").addEventListener("click", () => {
      addSize();
    });
  
    document.getElementById("updateSizeButton").addEventListener("click", () => {
      updateSize();
    });
  
    document.getElementById('update-size-pk-menu').addEventListener("change", () => {
      populateUpdate();
    });
  
    document.getElementById("loadingbar").style.display = "none";
};
  
  
  
console.log("Running successfully!");
setupList();