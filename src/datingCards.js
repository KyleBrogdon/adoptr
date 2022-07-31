const { default: axios } = require("axios");

// work in progress
console.log('running dating cards script');

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
      images,
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
      this.images = []; // empty array that we will store all pet imageURLs in later
    }

    // need to get this to display 
    generateCard() {
        let element = document.createElement("ul");
        element.innerHTML = `
        <li class="card">1</li>
        `;
        return element;
      }
    };

    // <button type="button" class="btn btn-outline-primary btn-sm" id="expand-button-${this.petid}" value = ${this.petid}>Expand</button>
    // <td>
    // <button type="button" class="btn btn-outline-danger btn-sm" id="delete-button-${this.petid}" >Delete</button>
    // </td>
// grab first twenty pets

//generate pictures and data for dating cards
const setupList = async () => {
    console.log("Pet List setup executed")
    let mainList = document.getElementById("petCardList");
    let pets = Array();
    let petImages = Array();

    //test image query
    // axios.get('/getPetImages', {params: {id: '1'}}).then((response) => {
    //     if (response.status == 200){
    //         console.log(response.data);
    //         const petJson = response.data
    //         console.log(petJson);
    //         // iterate through both arrays, update each Pet in the Pets array with image values
    //     }
    // })
    

    axios.get('/pet').then((response) => {
      console.log(response.status);
      if (response.status == 200) {
        console.log(response.data);

        const parsedJson = response.data
        console.log(parsedJson);

        

            parsedJson.forEach(pet => {
            pets.push(new RetrievedPet(pet.petid, pet.petname, pet.age, pet.sex, pet.blurb, 
                pet.dateprofile, pet.sizeid, pet.snstatus, pet.ststatus, pet.avid, pet.typeid, pet.shelterid))
            });
            console.log(pets[0].petid);

            // loop through eat Pet in the Pets array
            pets.forEach(pet =>{
                // select all images from pet_image table where petid matches a pet
                axios.get(`/getPetImages/${pet.petid}`).then((response) => {
                    if (response.status == 200){
                        const petJson = response.data
                        console.log(petJson);
                        // iterate through both arrays, update each Pet in the Pets array with image values
                        petJson.forEach(image => {
                            if (image.petid == pet.petid){
                                pet.images.push(image.imageURL)
                            }
                        })
                    }
                })
            })
        
      
        // insert rows into cards
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
setupList();
  

