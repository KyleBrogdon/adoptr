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
        //console.log(shelter)
        headers = ['Phone','Zipcode','City','State']
        values = [shelter.phone, shelter.zipcode, shelter.city, shelter.state]
        //console.log(values)
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


async function postShelter(shelter,zipid,cityid,stateid){
  try {
      const response = await axios.post(`/shelter`,{
          sheltername : shelter.sheltername,
          sheltercode : shelter.sheltercode,
          email: shelter.email,
          shelterpassword : shelter.password,
          phonenumber : shelter.phone,
          zipcodeid : zipid,
          cityid : cityid,
          stateid : stateid
        }).then((response) => {
          if (response.status >= 200 && response.status<300) {
            console.log("shelter added")
            //console.log(response.data[0].shelterid)
            
            return response.data[0].shelterid
            //location.reload();
  
          }else{
            console.log("API error");
            return null        
          }
        })
        return response  
  } catch (error) {
      return null
  }
}

async function getCity(cityid){
  try {
      const response = await axios.get(`/city/${cityid}`).then((response) => {
          if(response.status >= 200 && response.status < 300){
          return response.data
          }
          else{
          console.log('API error')
          return null
          }
      })
      return response
  } catch (error) {
      console.log('API error')
      return null
  }

} 

async function getZipID(zipcode){
  try {
      const response = await axios.get(`/zipcodeValue/${zipcode}`).then((response) => {
          if(response.status >= 200 && response.status < 300){
            return response.data
          }
          else{ 
            console.log('API error')
            return null
          }
        })
        return response
  } catch (error) {
      console.log('API error')
      return null      
  }
} 

async function addShelter(){
  console.log("adding");
  if(document.getElementById('new-shelter-name').value.length > 0 &&
      document.getElementById('new-shelter-code').value.length > 0 &&
      document.getElementById('new-email').value.length > 0 &&
      document.getElementById('new-password').value.length > 0 &&
      document.getElementById('new-phone').value.length > 0 &&
      document.getElementById('new-zipcode').value.length > 0 ){

      //var req = new XMLHttpRequest();
      var shelter = {sheltername: null, sheltercode: null, email: null, password: null, phone: null, zipcode: null,city: null, state: null, zipid: null,cityid:null,stateid:null};
      shelter.sheltername = document.getElementById('new-shelter-name').value;
      shelter.sheltercode = document.getElementById('new-shelter-code').value;
      shelter.email = document.getElementById('new-email').value;
      shelter.password = document.getElementById('new-password').value;
      shelter.phone = document.getElementById('new-phone').value;
      shelter.zipcode = document.getElementById('new-zipcode').value;

      shelter.zipcode = await getZipID(shelter.zipcode);

      //console.log("shelter.zipcode: " + shelter.zipcode[0].zipcodeid)
      console.log(shelter.zipcode)
      if (shelter.zipcode.length > 0){
          shelter.zipid = shelter.zipcode[0].zipcodeid;
          console.log(shelter.zipid)
          shelter.cityid = shelter.zipcode[0].cityid
          console.log(shelter.cityid)
          shelter.state = await getCity(shelter.cityid)
          shelter.stateid = shelter.state[0].stateid
          console.log(shelter.stateid)
      }else{
          shelter.zipid= null
          shelter.cityid  =null
          shelter.stateid = null
      }
      console.log( shelter.zipid)
      console.log(shelter.cityid)
      console.log(shelter.stateid)

      let shelterid = await postShelter(shelter, shelter.zipid,shelter.cityid,shelter.stateid)
      location.reload()
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
  
async function updateShelter(){
    if(document.getElementById('update-shelter-pk-menu').value != 'number' &&
        document.getElementById('update-shelter-name').value.length > 0 &&
        document.getElementById('update-shelter-code').value.length > 0 &&
        document.getElementById('update-email').value.length > 0 &&
        document.getElementById('update-password').value.length > 0 &&
        document.getElementById('update-phone').value.length > 0 &&
        document.getElementById('update-zipcode').value.length > 0 ){
  

          var shelter = {sheltername: null, sheltercode: null, email: null, password: null, phone: null, zipcode: null,city: null, state: null, zipid: null,cityid:null,stateid:null};
      
      shelter.shelterid = document.getElementById('update-shelter-pk-menu').value;
      shelter.sheltername = document.getElementById('update-shelter-name').value;
      shelter.sheltercode = document.getElementById('update-shelter-code').value;
      shelter.email = document.getElementById('update-email').value;
      shelter.password =document.getElementById('update-password').value;
      shelter.phone =document.getElementById('update-phone').value;
      shelter.zipcode =document.getElementById('update-zipcode').value;

      shelter.zipcode = await getZipID(shelter.zipcode);

      console.log(shelter.zipcode)
      if (shelter.zipcode.length > 0){
          shelter.zipid = shelter.zipcode[0].zipcodeid;
          console.log(shelter.zipid)
          shelter.cityid = shelter.zipcode[0].cityid
          console.log(shelter.cityid)
          shelter.state = await getCity(shelter.cityid)
          shelter.stateid = shelter.state[0].stateid
          console.log(shelter.stateid)
      }else{
          shelter.zipid= null
          shelter.cityid  =null
          shelter.stateid = null
      }
      console.log( shelter.zipid)
      console.log(shelter.cityid)
      console.log(shelter.stateid)

      //console.log(shelter)
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
  
  
  
const setupList = async () => {
    console.log("setupList executed")
    let mainList = document.getElementById("main-rows");
    let shelters = Array();
    let shelterPK = document.getElementById("update-shelter-pk-menu");
    axios.get('/shelter').then((response) => {
      console.log(response.status);
      if (response.status == 200) {
        console.log(response.data);

        const parsedJson = response.data
        //console.log(parsedJson);


        parsedJson.forEach(shelter => {
            //console.log(shelter)
            shelters.push(new ShelterEntry(shelter.shelterid, shelter.sheltername, 
                shelter.sheltercode, shelter.email, shelter.password, shelter.phonenumber, 
                shelter.zipcodeid, shelter.cityid, shelter.stateid));
        });
      
      
        // Activate buttons for detailed item views
        shelters.forEach((shelter) => { 
          //console.log(shelter)
          mainList.appendChild(shelter.generateRow());
          shelterPK.append(shelter.generateOption())
          addEventListeners(shelter);
        })


        document.getElementById("addShelterButton").addEventListener("click", () => {
          addShelter();
        });
      
        document.getElementById("updateShelterButton").addEventListener("click", () => {
          updateShelter();
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