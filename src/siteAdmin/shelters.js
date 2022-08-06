// Site Admin shelters page
// Database access:
// CREATE/READ/UPDATE/DESTROY to the usser table
const { default: axios, Axios } = require("axios");
const loggedInUser = sessionStorage.getItem('userid');
const logoutButton = require('../logoutButtonFunction');



const shelterModal = new bootstrap.Modal(document.getElementById('shelterModal'), {
    keyboard: false
});
if (loggedInUser) { 
    logoutButton.logoutButton(loggedInUser);
}
  
// const updateshelterModal = new bootstrap.Modal(document.getElementById('updateshelterModal'), {
//     keyboard: false
// });

if (loggedInUser) { 
    logoutButton.logoutButton(loggedInUser);
    }
  
class ShelterEntry {
    constructor(
        shelterid,
        sheltername,
        sheltercode,
        email,
        password,
        phone,
        zipcode,
        city,
        state
    ) {
        this.shelterid =shelterid;
        this.sheltername = sheltername;
        this.sheltercode = sheltercode;
        this.email = email;
        this.password = password;
        this.phone =phone;
        this.zipcode =zipcode;
        this.city = city;
        this.state = state;
    }
  
    generateRow() {
      let element = document.createElement("tr");
      element.innerHTML = `
        <th scope="row">${this.shelterid}</th>
        <td>
          <span>${this.sheltername}</span>
          <data hidden id="sheltername-${this.shelterid}" value = ${this.sheltername}></data>
        </td>
  
        <td>
          <span>${this.sheltercode}</span>
          <data hidden id="sheltercode-${this.shelterid}" value = ${this.sheltercode}></data>
        </td>
        <td>
          <span>${this.email}</span>
          <data hidden id="email-${this.shelterid}" value = ${this.email}></data>
          <data hidden id="phone-${this.shelterid}" value = ${this.phone}></data>
          <data hidden id="zipcode-${this.shelterid}" value = ${this.zipcode}></data>
          <data hidden id="city-${this.shelterid}" value = ${this.city}></data>
          <data hidden id="state-${this.shelterid}" value = ${this.state}></data>
        </td>
        <td>
          <button type="button" class="btn btn-outline-primary btn-sm" id="expand-button-${this.shelterid}" value = ${this.shelterid}>Expand</button>
        </td>
        <td>
          <button type="button" class="btn btn-outline-danger btn-sm" id="delete-button-${this.shelterid}" >Delete</button>
        </td>
      `;
      return element;
    }
  
    generateOption() {
      let element = document.createElement("option");
      element.innerHTML = `<option value="${this.shelterid}">${this.shelterid}</option>`;
      return element;
    }
  
};
  
function addEventListeners(shelter){
    document.getElementById(`delete-button-${shelter.shelterid}`).addEventListener("click", () => { //add delete
      axios.delete(`/shelter/${shelter.shelterid}`).then((response) => {
        console.log(response.status)
        if (response.status == 200) {
          console.log(shelter.shelterid + " deleted")
          location.reload();

        }else{
          console.log("API error");        
        }
      })  
      
        console.log("delete button enabled")
    });
  
    document.getElementById(`expand-button-${shelter.shelterid}`).addEventListener("click", () => { //add expand
        let modalTable = document.getElementById("modal-table");
        while(modalTable.firstChild){
            modalTable.removeChild(modalTable.firstChild)
        }
        console.log(shelter)
        headers = ['Phone','Zipcode','City','State']
        values = [shelter.phone, shelter.zipcode, shelter.city, shelter.state]
        console.log(values)
        for (let i  = 0; i < values.length; i++){
            console.log(headers[i] + " " + values[i])
            let element = document.createElement("tr");
            element.innerHTML = `
                <th scope="row">${headers[i]}</th>
                <td>${values[i]}</td>
            `;
            modalTable.appendChild(element);
        }
        shelterModal.show();
    });

}
  
async function addShelter(){
    console.log("adding");
    if(document.getElementById('new-shelter-name').value.length > 0 &&
        document.getElementById('new-shelter-code').value.length > 0 &&
        document.getElementById('new-email').value.length > 0 &&
        document.getElementById('new-password').value.length > 0 &&
        document.getElementById('new-phone').value.length > 0 &&
        document.getElementById('new-zipcode').value.length > 0 &&
        document.getElementById('new-city').value.length > 0 &&
        document.getElementById('new-state').value.length > 0 ){

        //var req = new XMLHttpRequest();
        var shelter = {sheltername: null, sheltercode: null, email: null, password: null, phone: null};
        shelter.sheltername = document.getElementById('new-shelter-name').value;
        shelter.sheltercode = document.getElementById('new-shelter-code').value;
        shelter.email = document.getElementById('new-email').value;
        shelter.password = document.getElementById('new-password').value;
        shelter.phone = document.getElementById('new-phone').value;
        shelter.zipcode = document.getElementById('new-zipcode').value;
        shelter.city = document.getElementById('new-city').value;
        shelter.state = document.getElementById('new-state').value;

        axios.post(`/shelter`,{
          sheltername : shelter.sheltername,
          sheltercode : shelter.sheltercode,
          email: shelter.email,
          shelterpassword : shelter.password,
          phone : shelter.phone,
          zipcode : shelter.zipcode,
          city : shelter.city,
          state : shelter.state
        }).then((response) => {
          console.log(response.status)
          if (response.status >= 200 && response.status<300) {
            console.log("shelter added")
            location.reload();
  
          }else{
            console.log("API error");        
          }
        })  

        console.log("add shelter button enabled")
    }
    else{
        console.log("invlaid input");
    }
}
  
function populateUpdate(){
  var id = document.getElementById('update-shelter-pk-menu').value;
  var sheltername = document.getElementById('sheltername-' + id).value;
  var sheltercode = document.getElementById('sheltercode-' + id).value;
  var email = document.getElementById('email-' + id).value;
  var phone = document.getElementById('phone-' + id).value;
  var zipcode = document.getElementById('zipcode-' + id).value;
  var city = document.getElementById('city-' + id).value;
  var state = document.getElementById('state-' + id).value;

  document.getElementById('update-shelter-name').value = sheltername;
  document.getElementById('update-shelter-code').value = sheltercode;
  document.getElementById('update-email').value = email;
  document.getElementById('update-phone').value = phone;
  document.getElementById('update-zipcode').value = zipcode;
  document.getElementById('update-city').value = city;
  document.getElementById('update-state').value = state;
}
  
function updateShelter(){
    if(document.getElementById('update-shelter-pk-menu').value != 'number' &&
        document.getElementById('update-shelter-name').value.length > 0 &&
        document.getElementById('update-shelter-code').value.length > 0 &&
        document.getElementById('update-email').value.length > 0 &&
        document.getElementById('update-password').value.length > 0 &&
        document.getElementById('update-phone').value.length > 0 &&
        document.getElementById('update-zipcode').value.length > 0 &&
        document.getElementById('update-city').value.length > 0 &&
        document.getElementById('update-state').value.length > 0 ){
  

      var shelter = {shelterid: null, sheltername: null, sheltercode: null, email:null, password:null, phone:null, zipcode:null, city:null, state:null}
      
      shelter.shelterid = document.getElementById('update-shelter-pk-menu').value;
      shelter.sheltername = document.getElementById('update-sheltername').value;
      shelter.sheltercode = document.getElementById('update-sheltercode').value;
      shelter.email = document.getElementById('update-email').value;
      shelter.password =document.getElementById('update-password').value;
      shelter.phone =document.getElementById('update-phone').value;
      shelter.zipcode =document.getElementById('update-zipcode').value;
      shelter.city =document.getElementById('update-city').value;
      shelter.state =document.getElementById('update-state').value;



      console.log(shelter)
      axios.put(`/shelter/${shelter.shelterid}`,{
        sheltername : shelter.sheltername,
        sheltercode : shelter.sheltercode,
        email: shelter.email,
        shelterpassword : shelter.password,
        phone : shelter.phone,
        zipcode: shelter.zipcode,
        city : shelter.city,
        state : shelter.state
      }).then((response) => {
        console.log(response.status)
        if (response.status >= 200 && response.status<300) {
          console.log("shelter updated")
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

        axios.get(`/shelter/${search.property}/${search.value}`).then((response) => {
          console.log(response.status)
          if (response.status == 200) {
            console.log(response.data)
            const parsedJson = response.data
            console.log(parsedJson);
            
            if (parsedJson.length > 0){
              console.log("results exist")

            // parsedJson.forEach(shelter => {
            //   if(shelter.shelterid != 1){
            //     if (shelter.phone){
            //       shelter.phone = "true"
            //     }
            //     else{
            //       shelter.phone = "false"
            //     }
            //     console.log(shelter)
            //     shelters.push(new ShelterEntry(shelter.shelterid, shelter.sheltername, shelter.sheltercode, shelter.email, shelter.password, shelter.phone));
            //   }
            // });
          
          
            // // Activate buttons for detailed item views
            // shelters.forEach((shelter) => { 
            //   mainList.appendChild(shelter.generateRow());
            //   shelterPK.append(shelter.generateOption());
            //   addEventListeners(shelter);
            // })

            } else{
              console.log("no results returned")
            }
    

    
    
            document.getElementById("addShelterButton").addEventListener("click", () => {
              addShelter();
            });
          
            document.getElementById("updateShelterButton").addEventListener("click", () => {
              updateShelter();
            });
          
            document.getElementById("searchButton").addEventListener("click", () => {
              selectProperty()
            });
          
          
            document.getElementById('update-shelter-pk-menu').addEventListener("change", () => {
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
    let shelterPK = document.getElementById("update-shelter-pk-menu");
    let shelters = Array();
  
    axios.get('/shelter').then((response) => {
      console.log(response.status);
      if (response.status == 200) {
        console.log(response.data);

        const parsedJson = response.data
        //console.log(parsedJson);


        parsedJson.forEach(shelter => {
            console.log(shelter)
            shelters.push(new ShelterEntry(shelter.shelterid, shelter.sheltername, 
                shelter.sheltercode, shelter.email, shelter.password, shelter.phonenumber, 
                shelter.zipcodeid, shelter.cityid, shelter.stateid));
        });
      
      
        // Activate buttons for detailed item views
        shelters.forEach((shelter) => { 
          //console.log(shelter)
          mainList.appendChild(shelter.generateRow());
          shelterPK.append(shelter.generateOption());
          addEventListeners(shelter);
        })


        document.getElementById("addShelterButton").addEventListener("click", () => {
          addShelter();
        });
      
        document.getElementById("updateShelterButton").addEventListener("click", () => {
          updateShelter();
        });
      
        document.getElementById("searchButton").addEventListener("click", () => {
          selectProperty()
        });
      
      
        document.getElementById('update-shelter-pk-menu').addEventListener("change", () => {
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