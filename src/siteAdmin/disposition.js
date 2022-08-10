// Site Admin Users page
// Database access:
// CREATE/READ/UPDATE/DESTROY to the usser table
const { default: axios, Axios } = require("axios");
  
  
const updateDispositionModal = new bootstrap.Modal(document.getElementById('updateDispositionModal'), { ///????
    keyboard: false
});
  
  
class dispositionEntry {
    constructor(
      dispid,
      dispstatus  
    ) {
      this.dispid = dispid;
      this.dispstatus = dispstatus;
    }
  
    generateRow() {
      let element = document.createElement("tr");
      element.innerHTML = `
        <th scope="row">${this.dispid}</th>
        <td>
          <span>${this.dispstatus}</span>
          <data hidden id="dispstatus-${this.dispid}" value = ${this.dispstatus}></data>
        </td>
  
        <td>
        <button type="button" class="btn btn-outline-danger btn-sm" id="delete-button-${this.dispid}" >Delete</button>
        </td>`;

      return element;
    }

};


   
function addEventListeners(disposition){
  document.getElementById(`delete-button-${disposition.dispid}`).addEventListener("click", () => { //add delete
    axios.delete(`/disposition/${disposition.dispid}`).then((response) => {
      console.log(response.status)
      if (response.status == 200) {
        console.log(disposition.dispid + " deleted")
        location.reload();

      }else{
        console.log("API error");        
      }
    })  
    
      console.log("delete button enabled")
  });

}

async function addDisposition(){
  console.log("adding");
  if(document.getElementById('new-disposition-name').value.length > 0){

    var disposition = {dispid: null, dispstatus: null}
    disposition.dispstatus = document.getElementById('new-disposition-name').value;

    axios.post(`/disposition`,{
      dispstatus : disposition.dispstatus,
    }).then((response) => {
      //console.log(response.status)
      if (response.status >= 200 && response.status<300) {
        console.log("disposition added")
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
  var id = document.getElementById('update-disposition-pk-menu').value;
  var dispstatus = document.getElementById('dispstatus-' + id).value;
  document.getElementById('update-disposition-name').value = dispstatus;
}

function updateDisposition(){
  if(document.getElementById('update-disposition-pk-menu').value != 'number' &&
   document.getElementById('update-disposition-name').value.length > 0){

    //var req = new XMLHttpRequest();
    var disposition = {dispid: null, dispstatus: null}
    
    disposition.dispid = document.getElementById('update-disposition-pk-menu').value;
    disposition.dispstatus = document.getElementById('update-disposition-name').value;


    console.log(availability)

    axios.put(`/disposition/${disposition.dispid}`,{
      dispstatus : disposition.dispstatus,

    }).then((response) => {
      console.log(response.status)
      if (response.status >= 200 && response.status<300) {
        console.log("Disposition updated")
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


async function getDisposition(){
  const response = await axios.get(`/disposition`).then((response) => {
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
  let dispArray = Array();

  const dispResp = await getDisposition()
  
  dispResp.forEach(disposition => {
    //console.log(disposition)
    let newEntry = new dispositionEntry(disposition.dispid, disposition.dispstatus)
    //console.log(newEntry)
    mainList.appendChild(newEntry.generateRow());
    addEventListeners(newEntry)
    dispArray.push(newEntry);

  });

  document.getElementById("addDispositionButton").addEventListener("click", () => {
    addDisposition();
  });

  document.getElementById("updateDispositionButton").addEventListener("click", () => {
    updateDisposition();
  });

  document.getElementById('update-disposition-pk-menu').addEventListener("change", () => {
    populateUpdate();
  });

  document.getElementById("loadingbar").style.display = "none";


};



console.log("Running successfully!");
setupList();



