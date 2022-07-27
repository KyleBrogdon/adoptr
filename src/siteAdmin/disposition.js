// Site Admin Users page
// Database access:
// CREATE/READ/UPDATE/DESTROY to the usser table

  
const updateDispModal = new bootstrap.Modal(document.getElementById('updateDispModal'), { ///????
    keyboard: false
});
  
  
class dispEntry {
    constructor(
      dispID,
      dispStatus  
    ) {
      this.dispID = dispID;
      this.dispStatus = dispStatus;
    }
  
    generateRow() {
      let element = document.createElement("tr");
      element.innerHTML = `
        <th scope="row">${this.dispID}</th>
        <td>
          <span>${this.dispStatus}</span>
          <data hidden id="dispStatus-${this.dispID}" value = ${this.dispStatus}></data>
        </td>
  
        <td>
        <button type="button" class="btn btn-outline-danger btn-sm" id="delete-button-${this.dispID}" >Delete</button>
        </td>`;

      return element;
    }
  
    generateOption() {
      let element = document.createElement("option");
      element.innerHTML = `<option value="${this.dispID}">${this.dispID}</option>`;
      return element;
    }
  
};
  
  
  
function addEventListeners(disp){
    document.getElementById(`delete-button-${disp.dispID}`).addEventListener("click", () => { //add delete
        // var req = new XMLHttpRequest();
        // var payload = "/admin/deleteDisp?dispID=" + disp.dispID ;
        // console.log("sending " + payload);
        // req.open("POST", payload, true);
        // req.send();
        // location.reload();
        console.log("delete button enabled")
    });
}
  

async function addDisp(){
    console.log("adding");
    if(document.getElementById('new-dispStatus').value.length > 0){

        var req = new XMLHttpRequest();
        var disp = {dispStatus: null};
        disp.dispStatus = document.getElementById('new-dispStatus').value;


        // var payload = "/siteAdmin/newDisp/?dispStatus=" + disp.dispStatus;

        // console.log("sending " + payload);
        // req.open("POST", payload, true);
        // await req.send();
        // console.log(req.status);
        // location.reload();
        console.log("add dispStatus button enabled")
    }
    else{
        console.log("invlaid input");
    }
}

  
function populateUpdate(){
    var id = document.getElementById('update-disp-pk-menu').value; //post db updated, update entry without having to reload the page
    var typeName = document.getElementById('dispStatus-' + id).value;

    document.getElementById('update-dispStatus').value = typeName;
    
}
  
function updateDisp(){
    if(document.getElementById('update-disp-pk-menu').value != 'number' &&
     document.getElementById('update-dispStatus').value.length > 0 ){
  
      var req = new XMLHttpRequest();
      var disp = {dispID: null, dispStatus: null}
      
    disp.dispID = document.getElementById('update-disp-pk-menu').value;
    disp.dispStatus = document.getElementById('update-dispStatus').value;

    //   var payload = "/siteAdmin/updateDisp?dispID="+ disp.dispID + "&dispStatus=" + disp.dispStatus;

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
    let dispPK = document.getElementById("update-disp-pk-menu");
    let disps = Array();
  
    // // Get disp list from server
    // const response = await fetch('/siteAdmin/dispList');
    // const parsedJson = await response.json();
    // console.log(parsedJson);
  
    // parsedJson.forEach(disp => {
    //     disps.push(new dispEntry(disp.dispID, disp.dispStatus));    
    // });
  
  
    // // Activate buttons for detailed item views
    // disps.forEach((disp) => { 
    //   mainList.appendChild(dispEntry.generateRow());
    //   dispPK.append(dispEntry.generateOption());
    //   addEventListeners(disp);
    // })
  
    document.getElementById("addDispButton").addEventListener("click", () => {
      addDisp();
    });
  
    document.getElementById("updateDispButton").addEventListener("click", () => {
      updateDisp();
    });
  
    document.getElementById('update-disp-pk-menu').addEventListener("change", () => {
      populateUpdate();
    });
  
    document.getElementById("loadingbar").style.display = "none";
};
  
  
  
console.log("Running successfully!");
setupList();