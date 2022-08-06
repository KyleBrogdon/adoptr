const { default: axios } = require("axios");
const loggedInUser = sessionStorage.getItem('userid')
const logoutButton = require("../logoutButtonFunction");
const { divide } = require("lodash");

if (loggedInUser) {
    logoutButton.logoutButton(loggedInUser);
};


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
        let slideContainer = document.getElementById("petSlideRow")
        let images = this.images;
        if (images == null) {
            let div = document.createElement('div');
            div.innerHTML = ' <p>No Images Found</p>'
            console.log(slideDiv);
            slideContainer.appendChild(slideDiv);
            return 
        }
        images.forEach(image => {
            let slideDiv = document.createElement('div');
            console.log(image);
            slideDiv.setAttribute('class', 'mySlides petFade');
            slideDiv.innerHTML = `
            <img class = "petSlideImg" src = ${image} width = 20% height = 20%>
        `
            console.log(slideDiv);
            slideContainer.appendChild(slideDiv);
            return 
        })
        // for (let i = 0; i < images.length; i++) {
        //     let div = document.createElement('div');
        //     div.setAttribute("class", "column");
        //     div.innerHTML = `<img src = "${images[i]}" style="width:25%" style="height: 25%" style ="max-height: 20%">`
        //     // div.src = images[i]
        //     // div.className = "img-thumbnail mx-auto d-block"
        //     // div.style="width: 300px; height: 300px; object-fit: cover;"
        //     return div;
        // }
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


async function getPetID() {
    let pageURL = document.URL;
    let ID = pageURL.split('=')[1];
    console.log(ID)
    return ID
}



//generate pictures and data for dating cards
async function setupCards() {
    document.getElementById("hidden-petid").value = getPetID()
    let petid = document.getElementById("hidden-petid").value

    console.log("Pet List setup executed")
    let imageDiv = document.getElementById("petSlideRow");
    let blurbDiv = document.getElementById("mb-3");


    async function getPet(petid) {
        const response = await axios.get(`/pet/${petid}`);
        return response.data;
    }
    let idFromLink = await getPetID();
    let resp = await getPet(idFromLink);
    console.log(JSON.stringify(resp[0].petid));
    pet = new RetrievedPet(JSON.stringify(resp[0].petid), resp[0].petname, resp[0].age, resp[0].sex, JSON.stringify(resp[0].blurb),
        JSON.stringify(resp[0].dateprofile), JSON.stringify(resp[0].sizeid), JSON.stringify(resp[0].snstatus), JSON.stringify(resp[0].ststatus), JSON.stringify(resp[0].avid), JSON.stringify(resp[0].typeid), JSON.stringify(resp[0].shelterid), Array());


    async function getImage() {
        const response = await axios.get(`/getPetImages/${pet.petid}`);
        console.log(response.data[0].imageurl);
        return response.data;
    }

    let respImg = await getImage();
    respImg.forEach(response => {
        pet.images.push(response.imageurl)
    })


    async function getType() {
        const response = await axios.get(`/type/${pet.typeid}`);
        return response.data;
    }

    let respType = await getType();
    pet.typeid = respType[0].typename;

    async function getAvid() {
        const response = await axios.get(`/availability/${pet.avid}`);
        return response.data;
    }

    let respAvid = await getAvid();
    pet.avid = respAvid[0].pet_availability;

    async function getSize() {
        const response = await axios.get(`/size/${pet.sizeid}`)
        return response.data;
    }

    let respSize = await getSize();
    pet.sizeid = respSize[0].petsize;


    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        console.log(slides.length);
        let dots = document.getElementsByClassName("dot");
        console.log(dots.length)
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }


    // insert petProfileData
    console.log(imageDiv);
    pet.generateImages();
    blurbDiv.appendChild(pet.generateParagraph());
    pet.fillTable();
    document.getElementById('span1').addEventListener("click", () => {
        currentSlide(1)
    })
    document.getElementById('span1').addEventListener("click", () => {
        currentSlide(1)
    })
    document.getElementById('span1').addEventListener("click", () => {
        currentSlide(1)
    })

    let slideIndex = 1;
    showSlides(slideIndex);




    //   addEventListeners(petProfile user)....need to fix


    // var nopeListener = createButtonListener(false);
    // var loveListener = createButtonListener(true);

    // nope.addEventListener('click', nopeListener);
    // love.addEventListener('click', loveListener);

};
setupCards();

