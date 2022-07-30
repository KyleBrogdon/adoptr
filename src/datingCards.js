const { default: axios } = require("axios");

// work in progress

class RetrievedPet {
    constructor(
      petid,
      petname,
      age,
      sex,
      blurb,
      dateprofile,
      sizeid,
      snstatus,
      ststatus,
      avid,
      typeid,
      shelterid,
      imageid,
      firstimg,
    ) {
      this.petid = petid;
      this.petname = petname;
      this.age = age;
      this.sex = sex;
      this.blurb = blurb;
      this.dateprofile = dateprofile;
      this.sizeid = sizeid;
      this.snstatus = snstatus;
      this.ststatus = ststatus;
      this.avid = avid;
      this.typeid = typeid;
      this.shelterid = shelterid;
      this.imageid = imageid;  // need to get this from separate axios call
      this.firstimg = firstimg; // need to store this as a separate variable 
    }

    generateCard() {
        let element = document.createElement("ul");
        element.innerHTML = `
        <li class="card">1</li>
        <button type="button" class="btn btn-outline-primary btn-sm" id="expand-button-${this.petid}" value = ${this.petid}>Expand</button>
          <td>
          <button type="button" class="btn btn-outline-danger btn-sm" id="delete-button-${this.petid}" >Delete</button>
          </td>
        `;
        return element;
      }
    };
// grab first twenty pets

//generate pictures and data for dating cards
const setupList = async () => {
    console.log("Pet List setup executed")
    let mainList = document.getElementById("petCardList");
    let pets = Array();
  


    axios.get('/pet').then((response) => {
      console.log(response.status);
      if (response.status == 200) {
        console.log(response.data);

        const parsedJson = response.data
        console.log(parsedJson);

        // Get image url

            console.log(pet);
            parsedJson.forEach(pet => {
            pets.push(new RetrievedPet(pet.petid, pet.petname, pet.age, pet.sex, pet.blurb, 
                pet.dateprofile, pet.sizeid, pet.snstatus, pet.ststatus, pet.avid, pet.typeid, pet.shelterid, 'img variable here'))
            });
            // users.push(new UserEntry(user.petid, user.petname, user.lastname, user.email, user.password, user.adminstatus));
        
      
        // Activate buttons for detailed item views
        pets.forEach((pet) => { 
          mainList.appendChild(pet.generateCard());
          // add blurb
        //   addEventListeners(user);
        })


        // document.getElementById("addUserButton").addEventListener("click", () => {
        //   addUser();
        // });
      
        // document.getElementById("updateUserButton").addEventListener("click", () => {
        //   updateUser();
        // });
      
        // document.getElementById("searchButton").addEventListener("click", () => {
        //   selectProperty()
        // });
      
      
        // document.getElementById('update-user-pk-menu').addEventListener("change", () => {
        //   populateUpdate();
        // });
      
        // document.getElementById("loadingbar").style.display = "none";




      } else {
        console.log("API error");
      }
    });

    // Get item list from server

  

  

};

