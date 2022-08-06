const { default: axios } = require("axios");
const loggedInUser = sessionStorage.getItem('userid')
const logoutButton = require ("./logoutButtonFunction");
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
        let images = this.images;
        if (images == null) {
            let div = document.createElement('div');
            div.innerHTML = ' <p>No Images Found</p>'
        }
        for (let i = 0; i < images.length; i++) {
            let div = document.createElement('div');
            div.setAttribute("class", "column");
            div.innerHTML = `<img src = "${images[i]}" style="width:40%" style="height: 40%">`
            return div;
        }
    }


    generateParagraph() {
        let para = document.createElement("p")
        para.setAttribute('class', 'petProfile--blurb')
        para.innerHTML = `${this.blurb}`
        return para;
    }

    generateTable() {
        let tbody = document.createElement('tbody');
        tbody.setAttribute("id", "main-rows");
        tbody.innerHTML = `
        <tr>
            <th scope="col">name</th>
            <th scope="col">${this.petname}</th>     
        </tr>
        <tr>
            <th scope="col">age</th>
            <th scope="col">${this.age}</th>   
        </tr>
        <tr>
            <th scope="col">sex</th>
            <th scope="col">${this.sex}</th>   
        </tr>
        <tr>
            <th scope="col">type</th>
            <th scope="col">${this.typeid}</th>      
        </tr>
        <tr>
            <th scope="col">availability</th>
            <th scope="col">${this.avid}</th>     

        </tr>
        <tr>
            <th scope="col">size</th>
            <th scope="col">${this.sizeid}</th>    
        </tr>
        <tr>
            <th scope="col">spayed/neutered</th>
            <th scope="col">${this.snstatus}</th>   
        </tr>
        <tr>
            <th scope="col">Shots Current</th>
            <th scope="col">${this.ststatus}</th>   
        </tr>`
        return tbody;
    }

};
let pet;



//generate pictures and data for dating cards
async function setupCards() {
    console.log("Pet List setup executed")
    let imageDiv = document.getElementById("petRow");
    let blurbDiv = document.getElementById("mb-3");
    let table = document.getElementById("petProfile--properties");

    async function getPet() {
        const response = await axios.get(`/pet/${tempPet.petid}`);
        return response.data;
    }

    let resp = await getPet();
    console.log(JSON.stringify(resp[0].petid));
    pet = new RetrievedPet(JSON.stringify(resp[0].petid), resp[0].petname, resp[0].age, resp[0].sex, JSON.stringify(resp[0].blurb),
        JSON.stringify(resp[0].dateprofile), JSON.stringify(resp[0].sizeid), JSON.stringify(resp[0].snstatus), JSON.stringify(resp[0].ststatus), JSON.stringify(resp[0].avid), JSON.stringify(resp[0].typeid), JSON.stringify(resp[0].shelterid), Array());

    console.log(pet);

    async function getImage() {
        const response = await axios.get(`/getPetImages/${pet.petid}`);
        return response.data;
    }

    let respImg = await getImage();
    pet.images.push(respImg[0].imageurl)

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

    // insert petProfileData
    imageDiv.appendChild(pet.generateImages());
    blurbDiv.appendChild(pet.generateParagraph());
    table.appendChild(pet.generateTable());
    
    
    //   addEventListeners(petProfile user)....need to fix

    function createButtonListener(love) {
        return function (event) {
            var cards = document.querySelectorAll('.tinder--card:not(.removed)');
            var moveOutWidth = document.body.clientWidth * 1.5;

            if (!cards.length) return false;
            var card = cards[0];
            card.classList.add('removed');

            if (love) {
                card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
                // add to user saved pet
            } else {
                card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
                // add to user rejected pet
            }

            initCards();
            event.preventDefault();
        };
    }

    // var nopeListener = createButtonListener(false);
    // var loveListener = createButtonListener(true);

    // nope.addEventListener('click', nopeListener);
    // love.addEventListener('click', loveListener);

};
setupCards();

