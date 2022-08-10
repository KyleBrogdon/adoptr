// Site Admin Users page
// Database access:
// CREATE/READ/UPDATE/DESTROY to the usser table
const { default: axios, Axios } = require("axios");
  
const updateAvailabilityModal = new bootstrap.Modal(document.getElementById('updateAvailabilityModal'), {
    keyboard: false
});
  
  
class availabilityEntry {
    constructor(
      availabilityid,
      availabilityStatus  
    ) {
      this.availabilityid = availabilityid;
      this.availabilityStatus = availabilityStatus;
    }
  
    generateRow() {
      let element = document.createElement("tr");
      element.innerHTML = `
        <th scope="row">${this.availabilityid}</th>
        <td>
          <span>${this.availabilityStatus}</span>
          <data hidden id="availability-${this.availabilityid}" value = ${this.availabilityStatus}></data>
        </td>
  
        <td>
        <button type="button" class="btn btn-outline-danger btn-sm" id="delete-button-${this.availabilityid}" >Delete</button>
        </td>`;

      return element;
    }
};
  
  
   
function addEventListeners(availability){
  document.getElementById(`delete-button-${availability.availabilityid}`).addEventListener("click", () => { //add delete
    axios.delete(`/availability/${availability.availabilityid}`).then((response) => {
      console.log(response.status)
      if (response.status == 200) {
        console.log(availability.availabilityid + " deleted")
        location.reload();

      }else{
        console.log("API error");        
      }
    })  
    
      console.log("delete button enabled")
  });

}

async function addAvailability(){
  console.log("adding");
  if(document.getElementById('new-availability-name').value.length > 0){

    var availability = {availabilityStatus: null};
    availability.availabilityStatus = document.getElementById('new-availability-name').value;


    axios.post(`/availability`,{
      pet_availability : availability.availabilityStatus,
    }).then((response) => {
      console.log(response.status)
      if (response.status >= 200 && response.status<300) {
        console.log("availability added")
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
var id = document.getElementById('update-availability-pk-menu').value;
var availabilityStatus = document.getElementById('availability-' + id).value;

document.getElementById('update-availability-name').value = availabilityStatus;
}

function updateAvailability(){
  if(document.getElementById('update-availability-pk-menu').value != 'number' &&
   document.getElementById('update-availability-name').value.length > 0){

    //var req = new XMLHttpRequest();
    var availability = {availabilityid: null, availabilityStatus: null}
    
    availability.availabilityid = document.getElementById('update-availability-pk-menu').value;
    availability.availabilityStatus = document.getElementById('update-availability-name').value;


    //console.log(availability)

    axios.put(`/availability/${availability.availabilityid}`,{
      pet_availability : availability.availabilityStatus,

    }).then((response) => {
      console.log(response.status)
      if (response.status >= 200 && response.status<300) {
        console.log("availability updated")
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



async function getAvailability(){
  const response = await axios.get(`/availability`).then((response) => {
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
  let avArray = Array();

  const avResp = await getAvailability()

  avResp.forEach(availability => {
    //console.log(availability)
    let newEntry = new availabilityEntry(availability.avid, availability.pet_availability)
    
    mainList.appendChild(newEntry.generateRow());
    addEventListeners(newEntry)
    avArray.push(newEntry);

  });

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