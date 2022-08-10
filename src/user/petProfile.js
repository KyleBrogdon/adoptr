const { default: axios } = require("axios");
const loggedInUser = sessionStorage.getItem('userid')
const { divide } = require("lodash");

if (loggedInUser){
    document.getElementById('logout').style.opacity = 1
}


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
        this.images = images; // empty array that we will store all pet imageURLs in later
    }


    generateImages() {
        let containerDiv = document.getElementById('petRow')
        let images = this.images;
        if (images.length == 0) {

            let img = document.createElement('img');
            img.src = "/images/image-not-found.png"
            img.className = "img-thumbnail mx-auto d-block"
            img.style = "width: 300px; height: 300px; object-fit: cover;"
            containerDiv.appendChild(img);


            // let div = document.createElement('div');
            // div.innerHTML = ' <p>No Images Found</p>'
            // containerDiv.appendChild(div);
        }
        images.forEach(image => {
            let div = document.createElement('div');
            div.setAttribute("class", "petColumn");
            div.innerHTML = `<img src = "${image}" style="width:50%" style="height: 25%" style ="max-height: 20%">`
            // div.src = images[i]
            // div.className = "img-thumbnail mx-auto d-block"
            // div.style="width: 300px; height: 300px; object-fit: cover;"
            containerDiv.appendChild(div);
        })
    }


    generateParagraph() {
        let para = document.createElement("p")
        para.setAttribute('class', 'petProfile--blurb')
        para.innerHTML = `${this.blurb}`
        return para;
    }

    fillTable() {
        document.getElementById('petname').innerText = this.petname;
        document.getElementById('age').innerText = this.age;
        document.getElementById('sex').innerText = this.sex;
        document.getElementById('typeid').innerText = this.typeid;
        document.getElementById('avid').innerText = this.avid;
        document.getElementById('sizeid').innerText = this.sizeid;
        document.getElementById('snstatus').innerText = this.snstatus;
        document.getElementById('ststatus').innerText = this.ststatus;
        return;
    }

};
let pet;


async function getPetID(){
    let pageURL = document.URL;
    let ID = pageURL.split('=')[1];
    console.log(ID)
    return ID
}


async function getShelterMinData(pet){
    const response = await axios.get(`/shelterMinData/${pet.shelterid}`).then((response) => {
      if(response.status >= 200 && response.status < 300){
        return response.data
      }
      else{
        console.log('API error')
      }
    })
    return response
  } 

async function getPet(petid) {
    const response = await axios.get(`/pet/${petid}`);
    return response.data;
}

async function getImage(pet) {
    const response = await axios.get(`/getPetImages/${pet.petid}`);
    //console.log(response.data[0].imageurl);
    return response.data;
}
async function getType(pet) {
    const response = await axios.get(`/type/${pet.typeid}`);
    return response.data;
}
async function getAvid(pet) {
    const response = await axios.get(`/availability/${pet.avid}`);
    return response.data;
}
async function getSize(pet) {
    const response = await axios.get(`/size/${pet.sizeid}`)
    return response.data;
}

//generate pictures and data for dating cards
async function setupCards() {
    document.getElementById("hidden-petid").value = getPetID()
    let petid = document.getElementById("hidden-petid").value

    console.log("Pet List setup executed")
    let imageDiv = document.getElementById("petRow");
    let blurbDiv = document.getElementById("mb-3");

    let idFromLink = await getPetID(petid);
    let resp = await getPet(idFromLink);
    console.log(JSON.stringify(resp[0].petid));
    pet = new RetrievedPet(JSON.stringify(resp[0].petid), resp[0].petname, resp[0].age, resp[0].sex, JSON.stringify(resp[0].blurb),
        JSON.stringify(resp[0].dateprofile), JSON.stringify(resp[0].sizeid), JSON.stringify(resp[0].snstatus), JSON.stringify(resp[0].ststatus), JSON.stringify(resp[0].avid), JSON.stringify(resp[0].typeid), JSON.stringify(resp[0].shelterid), Array());


    console.log(pet)


    let respImg = await getImage(pet);
    respImg.forEach(response => {
        pet.images.push(response.imageurl)
    })

    let respType = await getType(pet);
    pet.typeid = respType[0].typename;

    let respAvid = await getAvid(pet);
    pet.avid = respAvid[0].pet_availability;

    let respSize = await getSize(pet);
    pet.sizeid = respSize[0].petsize;


    let shelter = await getShelterMinData(pet);
    console.log(shelter)
    console.log(shelter[0])
    console.log(shelter[0].email)
    document.getElementById('sheltername').innerText = shelter[0].sheltername;
    document.getElementById('sheltercode').innerText = shelter[0].sheltercode;
    document.getElementById('shelteremail').innerText = shelter[0].email;
    document.getElementById('phonenumber').innerText = shelter[0].phonenumber;

    function generateSlides(pet){
        let slideDiv = document.createElement('div');
        slideDiv.setAttribute('class', 'mySlides fade');
        slideDiv.innerHTML = `
        <img class = "slideImg" src = ${pet.images[0]} width = 70% height = 70%>
        `
        return slideDiv
    }

    // insert petProfileData
    pet.generateImages();
    blurbDiv.appendChild(pet.generateParagraph());
    pet.fillTable();


    //   addEventListeners(petProfile user)....need to fix


    // var nopeListener = createButtonListener(false);
    // var loveListener = createButtonListener(true);

    // nope.addEventListener('click', nopeListener);
    // love.addEventListener('click', loveListener);

};
setupCards();

