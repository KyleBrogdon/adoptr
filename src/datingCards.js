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
        images = [],
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
        div.setAttribute('class', "tinder--card")
        if (this.petid > 9) {
            div.innerHTML = `
            <img src= "${this.images[0]}">
            <h3>${this.petname}</h3>
            `;
        } else {
            div.innerHTML = `
            <img src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKHOPH_1mdCVi4buEUxZyAg5u6E6fx25TtBw&usqp=CAU">
            <h3>${this.petname}</h3>
            `;
        }
        return div;
    }
};



//generate pictures and data for dating cards
const setupCards = async () => {
    console.log("Pet List setup executed")
    let mainList = document.getElementById("tinder--container");
    let buttonList = document.getElementById("tinder--buttons");
    let pets = Array();


    axios.get('/pet').then((response) => {
        console.log(response.status);
        if (response.status == 200) {
            console.log(response.data);

            const parsedJson = response.data

            parsedJson.forEach(pet => {
                pets.push(new RetrievedPet(pet.petid, pet.petname, pet.age, pet.sex, pet.blurb,
                    pet.dateprofile, pet.sizeid, pet.snstatus, pet.ststatus, pet.avid, pet.typeid, pet.shelterid))
            });

            // loop through eat Pet in the Pets array
            pets.forEach(pet => {
                // select all images from pet_image table where petid matches a pet
                axios.get(`/getPetImages/${pet.petid}`).then((response) => {
                    if (response.status == 200) {
                        const petJson = response.data
                        // iterate through both arrays, update each Pet in the Pets array with image values
                        petJson.forEach(image => {
                            if (image.petid == pet.petid) {
                                pet.images.push(image.imageurl)
                            }
                            if (image.petid == 27) {
                                console.log(pets[27])
                                console.log(pets[27].images);
                                console.log(pets[27].images[0]);
                            }
                        })
                    }
                })
            })
            // insert rows into cards
            let i = 0;
                pets.forEach((pet) => {
                    if ( i > 20){
                        return}
                    mainList.appendChild(pet.generateCard());
                    i = i + 1;
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
            // issues with animations, need to fix

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


            

            function createButtonListener(love) {
                return function (event) {
                    var cards = document.querySelectorAll('.tinder--card:not(.removed)');
                    var moveOutWidth = document.body.clientWidth * 1.5;

                    if (!cards.length) return false;
                    var card = cards[0];
                    card.classList.add('removed');

                    if (love) {
                        card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
                    } else {
                        card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
                    }

                    initCards();

                    event.preventDefault();

                    // do things with database on backend here
                };
            }

            var nopeListener = createButtonListener(false);
            var loveListener = createButtonListener(true);

            nope.addEventListener('click', nopeListener);
            love.addEventListener('click', loveListener);

        } else {
            console.log("API error");
        }
    });
};
setupCards();


