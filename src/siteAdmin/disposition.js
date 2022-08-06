// Site Admin Users page
// Database access:
// CREATE/READ/UPDATE/DESTROY to the usser table

  
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
          <data hidden id="dispositionStatus-${this.dispid}" value = ${this.dispstatus}></data>
        </td>
  
        <td>
        <button type="button" class="btn btn-outline-danger btn-sm" id="delete-button-${this.dispid}" >Delete</button>
        </td>`;

      return element;
    }
  
    generateOption() {
      let element = document.createElement("option");
      element.innerHTML = `<option value="${this.dispid}">${this.dispid}</option>`;
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
      console.log(response.status)
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
  var dispstatus = document.getElementById('disposition-' + id).value;

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


// function selectProperty(){
//   if(document.getElementById('searchBar').value.length  > 0 && 
//     document.getElementById('atribute-form').value.length > 0 && 
//     document.getElementById('atribute-form').value != 'Attribute'){
  
//       console.log("search bar: " + document.getElementById('searchBar').value)
//       document.getElementById("loadingbar").style.display = "inline";
  
//       var search = {property: null, value: null};      
//       search.property = document.getElementById('atribute-form').value;
//       search.value = document.getElementById('searchBar').value;

//       axios.get(`/dbAvailability/${search.property}/${search.value}`).then((response) => {
//         console.log(response.status)
//         if (response.status == 200) {
//           console.log(response.data)
//           const parsedJson = response.data
//           console.log(parsedJson);
          
//           if (parsedJson.length > 0){
//             console.log("results exist")

//           // parsedJson.forEach(availability => {
//           //   if(availability.availabilityid != 1){
//           //     if (availability.adminstatus){
//           //       availability.adminstatus = "true"
//           //     }
//           //     else{
//           //       availability.adminstatus = "false"
//           //     }
//           //     console.log(availability)
//           //     availabilitys.push(new availabilityEntry(availability.availabilityid, availability.firstname, availability.lastname, availability.email, availability.password, availability.adminstatus));
//           //   }
//           // });
        
        
//           // // Activate buttons for detailed item views
//           // availabilitys.forEach((availability) => { 
//           //   mainList.appendChild(availability.generateRow());
//           //   availabilityPK.append(availability.generateOption());
//           //   addEventListeners(availability);
//           // })

//           } else{
//             console.log("no results returned")
//           }
  
//           document.getElementById("addAvailabilityButton").addEventListener("click", () => {
//             addAvailability();
//           });
        
//           document.getElementById("updateAvailabilityButton").addEventListener("click", () => {
//             updateAvailability();
//           });
        
//           document.getElementById("searchButton").addEventListener("click", () => {
//             selectProperty()
//           });
        
        
//           document.getElementById('update-availability-pk-menu').addEventListener("change", () => {
//             populateUpdate();
//           });
        
//           document.getElementById("loadingbar").style.display = "none";
//         }else{
//           console.log("API error");        
//         }
//       })  

//       console.log('search Enabled')
//   }
// }


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
  let dispositionPK = document.getElementById("update-disposition-pk-menu");
  let avArray = Array();

  const avResp = await getDisposition()
  
  avResp.forEach(disposition => {
    console.log(disposition)
    let newEntry = new dispositionEntry(disposition.dispositionid, disposition.dispositionStatus)
    
    mainList.appendChild(newEntry.generateRow());
    dispositionPK.append(newEntry.generateOption())
    addEventListeners(newEntry)
    avArray.push(newEntry);

  });

  document.getElementById("addDispositionButton").addEventListener("click", () => {
    addDisposition();
  });

  document.getElementById("updateDispositionButton").addEventListener("click", () => {
    updateDisposition();
  });

  // document.getElementById("searchButton").addEventListener("click", () => {
  //   selectProperty()
  // });

  document.getElementById('update-disposition-pk-menu').addEventListener("change", () => {
    populateUpdate();
  });

  document.getElementById("loadingbar").style.display = "none";


};



console.log("Running successfully!");
setupList();



