const { default: axios } = require("axios");
const loggedInUser = sessionStorage.getItem('userid')
let pets = Array();

console.log(loggedInUser);
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
}

//generate pictures and data for dating cards
async function setupCards() {
    console.log("Pet List setup executed")
    let mainList = document.getElementById("slideshow-container");
    let idArray = Array();
    let counter = 0;
    let imgArray = Array();
    let imgCounter = 0;

    async function getPets() {
        const response = await axios.get(`/readPetsForCards/1`)
        console.log(response);
        return response.data
    };

    let resp = await getPets();
    for (let i = 0; i < resp.length; i++) {
        pets.push(new RetrievedPet(resp[i].petid, resp[i].petname, resp[i].age, resp[i].sex, resp[i].blurb,
            resp[i].dateprofile, resp[i].sizeid, resp[i].snstatus, resp[i].ststatus, resp[i].avid, resp[i].typeid, resp[i].shelterid, Array()));
        idArray.push(resp[i].petid);

    }

    async function getAllImages() {
        const response = await axios.get(`/getAllImages`);
        return response.data;
    }

    let respImgs = await getAllImages();
    pets.forEach(pet => {
        for (let x = 0; x < respImgs.length; x++) {
            if (respImgs[x].petid == pet.petid) {
                pet.images.push(respImgs[x].imageurl)
            }
        }
    })

    function generateSlides(pet){
        let slideDiv = document.createElement('div');
        slideDiv.setAttribute('class', 'mySlides fade');
        slideDiv.innerHTML = `
        <img class = "slideImg" src = ${pet.images[0]} width = 70% height = 70%>
        `
        return slideDiv
    }

    // insert slideslow

    // insert cards
    pets.forEach((pet) => {
        if (pet.petid < 9 || counter > 50) {
            return
        }
        mainList.appendChild(generateSlides(pet));
        counter ++;
        // add blurb
        //   addEventListeners(user);
    })

    
    function showSlides() {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length){
            slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 3600);
    }

    let slideIndex = 0;
    showSlides();

    document.getElementById("landingLogin").addEventListener("click", () =>{
        location.href = "/landing/login";
    })
}
setupCards();
