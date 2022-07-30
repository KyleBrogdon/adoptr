// Site Admin Users page
// Database access:
// CREATE/READ/UPDATE/DESTROY to the usser table

  
const updatedispositionModal = new bootstrap.Modal(document.getElementById('updatedispositionModal'), { ///????
    keyboard: false
});
  
  
class dispositionEntry {
    constructor(
      dispositionID,
      dispositionStatus  
    ) {
      this.dispositionID = dispositionID;
      this.dispositionStatus = dispositionStatus;
    }
  
    generateRow() {
      let element = document.createElement("tr");
      element.innerHTML = `
        <th scope="row">${this.dispositionID}</th>
        <td>
          <span>${this.dispositionStatus}</span>
          <data hidden id="dispositionStatus-${this.dispositionID}" value = ${this.dispositionStatus}></data>
        </td>
  
        <td>
        <button type="button" class="btn btn-outline-danger btn-sm" id="delete-button-${this.dispositionID}" >Delete</button>
        </td>`;

      return element;
    }
  
    generateOption() {
      let element = document.createElement("option");
      element.innerHTML = `<option value="${this.dispositionID}">${this.dispositionID}</option>`;
      return element;
    }
  
};
   
function addEventListeners(disposition){
  document.getElementById(`delete-button-${disposition.dispositionid}`).addEventListener("click", () => { //add delete
    axios.delete(`/dbDispositions/${disposition.dispositionid}`).then((response) => {
      console.log(response.status)
      if (response.status == 200) {
        console.log(disposition.dispositionid + " deleted")
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

      //var req = new XMLHttpRequest();
      var disposition = {dispositionStatus: null};
      disposition.dispositionStatus = document.getElementById('new-disposition-name').value;


      axios.post(`/dbDispositions`,{
        dispositionStatus : disposition.dispositionStatus,
      }).then((response) => {
        console.log(response.status)
        if (response.status >= 200 && response.status<300) {
          console.log("disposition added")
          location.reload();

        }else{
          console.log("API error");        
        }
      })  

      console.log("add disposition button enabled")
  }
  else{
      console.log("invlaid input");
  }
}

function populateUpdate(){
var id = document.getElementById('update-disposition-pk-menu').value;
var dispositionStatus = document.getElementById('disposition-name-' + id).value;

document.getElementById('update-disposition-name').value = dispositionStatus;
}

function updateDisposition(){
  if(document.getElementById('update-disposition-pk-menu').value != 'number' &&
   document.getElementById('update-disposition-name').value.length > 0){

    //var req = new XMLHttpRequest();
    var disposition = {dispositionid: null, dispositionStatus: null}
    
    disposition.dispositionid = document.getElementById('update-disposition-pk-menu').value;
    disposition.dispositionStatus = document.getElementById('update-disposition-name').value;


    console.log(disposition)
    axios.put(`/dbDispositions/${disposition.dispositionid}`,{
      dispositionStatus : disposition.dispositionStatus,

    }).then((response) => {
      console.log(response.status)
      if (response.status >= 200 && response.status<300) {
        console.log("disposition updated")
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

      axios.get(`/dbDispositions/${search.property}/${search.value}`).then((response) => {
        console.log(response.status)
        if (response.status == 200) {
          console.log(response.data)
          const parsedJson = response.data
          console.log(parsedJson);
          
          if (parsedJson.length > 0){
            console.log("results exist")

          // parsedJson.forEach(disposition => {
          //   if(disposition.dispositionid != 1){
          //     if (disposition.adminstatus){
          //       disposition.adminstatus = "true"
          //     }
          //     else{
          //       disposition.adminstatus = "false"
          //     }
          //     console.log(disposition)
          //     dispositions.push(new dispositionEntry(disposition.dispositionid, disposition.firstname, disposition.lastname, disposition.email, disposition.password, disposition.adminstatus));
          //   }
          // });
        
        
          // // Activate buttons for detailed item views
          // dispositions.forEach((disposition) => { 
          //   mainList.appendChild(disposition.generateRow());
          //   dispositionPK.append(disposition.generateOption());
          //   addEventListeners(disposition);
          // })

          } else{
            console.log("no results returned")
          }
  
          document.getElementById("adddispositionButton").addEventListener("click", () => {
            addDisposition();
          });
        
          document.getElementById("updatedispositionButton").addEventListener("click", () => {
            updateDisposition();
          });
        
          document.getElementById("searchButton").addEventListener("click", () => {
            selectProperty()
          });
        
        
          document.getElementById('update-disposition-pk-menu').addEventListener("change", () => {
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


const setupList = async () => {
  console.log("setupList executed")
  let mainList = document.getElementById("main-rows");
  let dispositionPK = document.getElementById("update-disposition-pk-menu");
  let dispositions = Array();

  axios.get('/dbDispositions').then((response) => {
    console.log(response.status);
    if (response.status == 200) {
      console.log(response.data);

      const parsedJson = response.data
      console.log(parsedJson);


      parsedJson.forEach(disposition => {
        console.log(disposition)
        dispositions.push(new dispositionEntry(disposition.dispositionid, disposition.dispositionStatus));
      });
    
    
      // Activate buttons for detailed item views
      dispositions.forEach((disposition) => { 
        mainList.appendChild(disposition.generateRow());
        dispositionPK.append(disposition.generateOption());
        addEventListeners(disposition);
      })


      document.getElementById("addFispositionButton").addEventListener("click", () => {
        addDisposition();
      });
    
      document.getElementById("updateDispositionButton").addEventListener("click", () => {
        updateDisposition();
      });
    
      document.getElementById("searchButton").addEventListener("click", () => {
        selectProperty()
      });
    
    
      document.getElementById('update-disposition-pk-menu').addEventListener("change", () => {
        populateUpdate();
      });
    
      document.getElementById("loadingbar").style.display = "none";




    } else {
      console.log("API error");
    }
  });

  // Get item list from server
};



console.log("Running successfully!");
setupList();