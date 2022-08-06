const { default: axios } = require("axios");
const logoutButton = require('./logoutButtonFunction')
const loggedInUser = sessionStorage.getItem('userid')
const { get, set } = require("lodash");
const petModal = new bootstrap.Modal(document.getElementById('petModal'), {
    keyboard: false
});

if (loggedInUser) { 
logoutButton.logoutButton(loggedInUser);
}

// work in progress
console.log('running dating cards script');
let pets = Array();

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

    generateCard() {
        let div = document.createElement("div");
        div.setAttribute('class', "tinder--card");
        div.setAttribute('id', `petBio-${this.petid}`);
        // check if images were uploaded
        if (this.images === undefined || this.images.length == 0) {
            div.innerHTML = `
            <img src= "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930">
            <h3>${this.petname}</h3>
            `;
        } else {
            div.innerHTML = `
            <img src= "${this.images[0]}">
            <h3>${this.petname}</h3>
            `;
        }
        return div;
    }

};


//generate pictures and data for dating cards
async function setupCards() {
    console.log("Pet List setup executed")
    let mainList = document.getElementById("tinder--container");
    let idArray = Array();
    let counter = 0;

    async function getPets() {
        const response = await axios.get(`/readPetsForCards/${loggedInUser}`)
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

    async function getShelter(pet) {
        const response = await axios.get(`/shelter/${pet.shelterid}`)
        return response.data;
    }




    // insert cards
        console.log(pets[9]);
        pets.forEach((pet) => {
            if (pet.petid < 9 || counter > 50) {
                return
            }
            mainList.appendChild(pet.generateCard());
            petDetails(pet);
            counter ++;
            // add blurb
            //   addEventListeners(user);
        })



        var tinderContainer = document.querySelector('.tinder');
        var allCards = document.querySelectorAll('.tinder--card');
        var nope = document.getElementById('nope');
        var love = document.getElementById('love');

        function initCards() {
            var newCards = document.querySelectorAll('.tinder--card:not(.removed)');
            newCards.forEach(function (card, index) {
                card.style.zIndex = allCards.length - index;
                card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
                card.style.opacity = (10 - index) / 10;
            });
            tinderContainer.classList.add('loaded');
        }

        initCards();

        // issues with swipe animations, stretch goal to fix

        // allCards.forEach(function (el) {
        //     var hammertime = new Hammer(el);
        //     hammertime.on('pan', function (event) {
        //         el.classList.add('moving');
        //     });

        //     hammertime.on('pan', function (event) {
        //         if (event.deltaX === 0) return;
        //         if (event.center.x === 0 && event.center.y === 0) return;

        //         tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
        //         tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

        //         var xMulti = event.deltaX * 0.03;
        //         var yMulti = event.deltaY / 80;
        //         var rotate = xMulti * yMulti;

        //         event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
        //     });

        //     hammertime.on('panend', function (event) {
        //         el.classList.remove('moving');
        //         tinderContainer.classList.remove('tinder_love');
        //         tinderContainer.classList.remove('tinder_nope');

        //         var moveOutWidth = document.body.clientWidth;
        //         var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

        //         event.target.classList.toggle('removed', !keep);

        //         if (keep) {
        //             event.target.style.transform = '';
        //         } else {
        //             var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
        //             var toX = event.deltaX > 0 ? endX : -endX;
        //             var endY = Math.abs(event.velocityY) * moveOutWidth;
        //             var toY = event.deltaY > 0 ? endY : -endY;
        //             var xMulti = event.deltaX * 0.03;
        //             var yMulti = event.deltaY / 80;
        //             var rotate = xMulti * yMulti;
        //             event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
        //             initCards();
        //         }
        //     });
        // });


        async function petDetails(pet) {
            let respType = await getType(pet);
            console.log(respType[0].typename);
            pet.typeid = respType[0].typename;
            console.log(pet.typeid);
            let respAvid = await getAvid(pet);
            pet.avid = respAvid[0].pet_availability;
            let respSize = await getSize(pet);
            pet.sizeid = respSize[0].petsize;
            let respShelter = await getShelter(pet);
            pet.shelterid = respShelter[0].sheltername;
            document.getElementById(`petBio-${pet.petid}`).addEventListener("click", () => {
                let modalTable = document.getElementById("modal-table");

                while (modalTable.firstChild) {
                    modalTable.removeChild(modalTable.firstChild)
                }

                let pID = pet.petid
                headers = ['Name', 'Age', 'Sex', 'Spayed/Neutered', 'Shots', 'blurb', 'Size', 'type', 'Availability', 'shelter']
                values = [
                    pet.petname,
                    pet.age,
                    pet.sex,
                    pet.snstatus,
                    pet.ststatus,
                    pet.blurb,
                    pet.sizeid,
                    pet.typeid,
                    pet.avid,
                    pet.shelterid,
                ]

                const img = document.getElementById("petIMG")
                img.src = pet.images[0];
                img.className = "img-thumbnail mx-auto d-block"
                img.style = "width: 300px; height: 300px; object-fit: cover;"

                console.log(pet.images.length)

                for (let i = 0; i < values.length; i++) {
                    console.log(headers[i] + " " + values[i])
                    let element = document.createElement("tr");
                    element.innerHTML = `
                            <th scope="row">${headers[i]}</th>
                            <td>${values[i]}</td>
                        `;
                    modalTable.appendChild(element);
                }
                petModal.show();
            });
        }



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

        var nopeListener = createButtonListener(false);
        var loveListener = createButtonListener(true);

        nope.addEventListener('click', nopeListener);
        love.addEventListener('click', loveListener);



    };
if (loggedInUser == null){
    location.href = "/landing/login";
}
setupCards();
