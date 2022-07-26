// Site Admin Users page
// Database access:
// CREATE/READ/UPDATE/DESTROY to the usser table

  
const updateAvailabilityModal = new bootstrap.Modal(document.getElementById('updateAvailabilityModal'), {
    keyboard: false
});
  
  
class avEntry {
    constructor(
      avID,
      pet_availability  
    ) {
      this.avID = avID;
      this.pet_availability = pet_availability;
    }
  
    generateRow() {
      let element = document.createElement("tr");
      element.innerHTML = `
        <th scope="row">${this.avID}</th>
        <td>
          <span>${this.pet_availability}</span>
          <data hidden id="availability-${this.avID}" value = ${this.pet_availability}></data>
        </td>
  
        <td>
        <button type="button" class="btn btn-outline-danger btn-sm" id="delete-button-${this.avID}" >Delete</button>
        </td>`;

      return element;
    }
  
    generateOption() {
      let element = document.createElement("option");
      element.innerHTML = `<option value="${this.avID}">${this.avID}</option>`;
      return element;
    }
  
};
  
  
  
function addEventListeners(avail){
    document.getElementById(`delete-button-${avail.avID}`).addEventListener("click", () => { //add delete
        // var req = new XMLHttpRequest();
        // var payload = "/siteAdmin/deleteAvailability?avID=" + avail.avID ;
        // console.log("sending " + payload);
        // req.open("POST", payload, true);
        // req.send();
        // location.reload();
        console.log("delete button enabled")
    });
}
  

async function addAvailability(){
    console.log("adding");
    if(document.getElementById('new-availability').value.length > 0){

        var req = new XMLHttpRequest();
        var avail = {pet_availability: null};
        avail.pet_availability = document.getElementById('new-availability').value;


        // var payload = "/siteAdmin/newAvailability/?pet_availability=" + avail.pet_availability;

        // console.log("sending " + payload);
        // req.open("POST", payload, true);
        // await req.send();
        // console.log(req.status);
        // location.reload();
        console.log("add availability button enabled")
    }
    else{
        console.log("invlaid input");
    }
}

  
function populateUpdate(){
    var id = document.getElementById('update-avail-pk-menu').value; //post db updated, update entry without having to reload the page
    var pet_availability = document.getElementById('availability-' + id).value;

    document.getElementById('update-availability').value = pet_availability;
    
}
  
function updateAvailability(){
    if(document.getElementById('update-availability-pk-menu').value != 'number' &&
     document.getElementById('update-availability').value.length > 0 ){
  
      var req = new XMLHttpRequest();
      var avail = {avID: null, pet_availability: null}
      
    avail.avID = document.getElementById('update-availability-pk-menu').value;
    avail.pet_availability = document.getElementById('update-availability').value;

    //   var payload = "/siteAdmin/updateAvailability?avID="+ avail.avID + "&pet_availability=" + avail.pet_availability;

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
    let availPK = document.getElementById("update-availability-pk-menu");
    let avails = Array();
  
    // // Get availability list from server
    // const response = await fetch('/siteAdmin/avList');
    // const parsedJson = await response.json();
    // console.log(parsedJson);
  
    // parsedJson.forEach(avail => {
    //     avails.push(new avEntry(avail.avID, avail.pet_availability));    
    // });
  
  
    // // Activate buttons for detailed item views
    // avails.forEach((avail) => { 
    //   mainList.appendChild(avEntry.generateRow());
    //   availPK.append(avEntry.generateOption());
    //   addEventListeners(avail);
    // })
  
    document.getElementById("addAvailabilityButton").addEventListener("click", () => {
      addAvailability();
    });
  
    document.getElementById("updateAvailabilityButton").addEventListener("click", () => {
      updateAvailability();
    });
  
    document.getElementById('update-availability-pk-menu').addEventListener("change", () => {
      populateUpdate();
    });
  
    document.getElementById("loadingbar").style.display = "none";
};
  
  
  
console.log("Running successfully!");
setupList();