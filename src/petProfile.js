const { default: axios } = require("axios");

let tempArray = Array("https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/56509313/1/?bust=1659201126", "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/56509316/1/?bust=1659200455", "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/56483375/1/?bust=1658971544", "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/56483288/2/?bust=1658970763", "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/56450040/4/?bust=1658970812", "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/56329461/1/?bust=1657869073", "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/56328152/1/?bust=1657847814", "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/56206162/1/?bust=1657072686", "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/56094788/1/?bust=1656307150", "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/55982038/1/?bust=1655574637", "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/55981772/1/?bust=1655574035", "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/55702407/2/?bust=1655866896");

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
        div.setAttribute('class', "tinder--card")
        if (this.petid < 9) {
            div.innerHTML = `
            <img src= "${this.images[0]}">
            <h3>${this.petname}</h3>
            `;
        } else {
            div.innerHTML = `
            <img src= "${tempArray[0]}">
            <h3>${this.petname}</h3>
            `;
        }
        return div;
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

let tempPet = new RetrievedPet(10, 'test', 10, 'male', 'dsfafsd', 0832022, 5, 'yes', 'no', 10, 5, 6, []);

//generate pictures and data for dating cards
async function setupCards () {
    console.log("Pet List setup executed")
    let tinderDiv = document.getElementById("tinder--container");
    let blurbDiv = document.getElementById("mb-3");
    let table = document.getElementById("petProfile--properties");
    let idArray = Array();
    let counter = 0;

    // const petRes = await axios.get('/pet');
    // const petResData =  petRes.data;
    // for (let i = 0; i < petRes.data.length; i++){
    //     pets.push(new RetrievedPet(petResData[i].petid, petResData[i].petname, petResData[i].age, petResData[i].sex, petResData[i].blurb,
    //         petResData[i].dateprofile, petResData[i].sizeid, petResData[i].snstatus, petResData[i].ststatus, petResData[i].avid, petResData[i].typeid, petResData[i].shelterid));
    // };
    // console.log(pets[4]);
    // for (let x = 0; x < pets.length; x++){
    //     let imageRes = await axios.get(`/getPetImages/${pets[x].petid}`);
    //     let imageResData = imageRes.data;
    //     console.log(imageResData);
    //     if (imageResData.petid == pets[x].petid) {
    //                     console.log (imageResData.imageurl);
    //                     pets[x].images.push(imageResData.imageurl)
    //                 }
    //                 if (imageResData.petid == 27) {
    //                     console.log(pets[27])
    //                     console.log(pets[27].images);
    //                     console.log(pets[27].images.length);
    //                     console.log(pets[27].images[0]);
    //                 }
    // }

    async function getPet(){
        const response = await axios.get(`/pet/${tempPet.petid}`);
        return response.data;
    }

    let resp = await getPet();
    console.log(JSON.stringify(resp[0].petid));
    pet = new RetrievedPet(JSON.stringify(resp[0].petid), resp[0].petname, resp[0].age, resp[0].sex, JSON.stringify(resp[0].blurb),
        JSON.stringify(resp[0].dateprofile), JSON.stringify(resp[0].sizeid), JSON.stringify(resp[0].snstatus), JSON.stringify(resp[0].ststatus, JSON.stringify(resp[0].avid)), JSON.stringify(resp[0].typeid), JSON.stringify(resp[0].shelterid), Array());

    console.log(pet);

    async function getImage(){
        const response = await axios.get(`/getPetImages/${pet.petid}`);
        return response.data;
    }

    let respImg = await getImage();
    console.log(JSON.stringify(respImg));

    async function getType() {
        const response = await axios.get(`/type/${pet.typeid}`);
        return response.data;
    }

    let respType = await getType();
    console.log(JSON.stringify(respType[0].typename));
    pet.typeid = respType[0].typename;

    async function getAvid(){
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
        
        //     ;})
        // .then(() => {
        //         // select all images from pet_image table where petid matches the pet
        //        axios.get(`/getPetImages/${tempPet.petid}`).then((response) => {
        //             if (response.status == 200) {
        //                 const petJson = response.data
        //                 // iterate through both arrays, update each Pet in the Pets array with image values
        //                 petJson.forEach(image => {
        //                     if (image.petid == petid) {
        //                         pets[0].images.push(image.imageurl)
        //                     }
        //                 })
        //             }
        //     })

        // console.log(pets[0])

        
        //    promiseRecursive(pets[0]).then(console.log(pets[0]));


        //     function promiseRecursive(obj) {
        //         const getPromises = obj =>
        //             Object.keys(obj).reduce( (acc, key) =>
        //                 Object(obj[key]) !== obj[key]
        //                     ? acc
        //                     : acc.concat(
        //                         typeof obj[key].then === "function"
        //                             ? [[obj, key]]
        //                             : getPromises(obj[key])
        //                       )
        //             , []);
        //         const all = getPromises(obj);
        //         return Promise.all(all.map(([obj, key]) => obj[key])).then( responses =>
        //             (all.forEach( ([obj, key], i) => obj[key] = responses[i]), obj) 
        //         );
        //     }


            // function resolvePromises(obj){
            //     let resolvedObj = []
            //     return Promise.all(Object.keys(obj).map(service => {
            //         return Promise.all(obj[service]).then(result => resolvedObj[service] = result)
            //     })).then(result => resolvedObj);
            // }


        //     async function Resolve(array){
        //     Promise.all(pets).then(results => {
        //     console.log(results);
        //     })
        // }

        // resolve(pets);
        // console.log(pets);

        // const {
        //     isArray,
        //     isPlainObject,
        //     zipObject
        //   } = require('lodash');
          
        //   async function resolve(value) {
        //     // Await the value in case it's a promise.
        //     const resolved = await value;
          
        //     if (isPlainObject(resolved)) {
        //       const keys = Object.keys(resolved);
        //       // Recursively resolve object values.
        //       const resolvedValues = await Promise.all(
        //         Object.values(resolved).map(resolve)
        //       );
        //       return zipObject(keys, resolvedValues);
        //     } else if (isArray(resolved)) {
        //       // Recursively resolve array values.
        //       return Promise.all(resolved.map(resolve));
        //     }
          
        //     return resolved;
        //   }

        // Promise.allRecursive(pets);

        // Promise.allRecursive = function (entity) {
        //     const keys = Object.keys(entity)
        //     return Promise.all(keys.map(key => {
        //         const value = entity[key]
        //         if (typeof value === 'object' && !value.then) {
        //           return Promise.allRecursive(value)
        //         }
        //         return value
        //       }))
        //       .then(
        //         data => 
        //           keys.reduce((accumulator, currentKey, index) => {
        //             accumulator[currentKey] = data[index]
        //             return accumulator
        //           }, Array.isArray(entity) ? [] : {})
        //       )
        //   }


            // insert cards 
                tinderDiv.appendChild(pet.generateCard());
                blurbDiv.appendChild(pet.generateParagraph());
                table.appendChild(pet.generateTable());
                // add blurb
                //   addEventListeners(user);


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
                        // add to user saved pet
                    } else {
                        card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
                        // add to user rejected pet
                    }

                    initCards();
                    event.preventDefault();
                    // if (love){
                    //     var w = window.open(',','width = 100, height = 100');
                    //     w.document.write("Pet added to favorites");
                    //     w.focus()
                    //     setTimeout(function() {w.close()}, 3000)
                    // }
                };
            }

            var nopeListener = createButtonListener(false);
            var loveListener = createButtonListener(true);

            nope.addEventListener('click', nopeListener);
            love.addEventListener('click', loveListener);

        


            // loop through eat Pet in the Pets array
            // async function getImages(pet){
            //         let response = await axios.get(`/getPetImages/${pet.petid}`);
            //             if (response.status == 200) {
            //                 console.log(response.data);
            //                 return response.data
            //          // iterate through both arrays, update each Pet in the Pets array with image values
            //             };
            //     }
            
            // await storeImages()

        //     async function storeImages(){
        //         for (const pet of pets){
        //         let petJson = await getImages(pet) 
        //         console.log(petJson.petid);
        //         if (petJson.petid == pet.petid) {
        //             console.log (petJson.imageurl);
        //             pet.images.push(petJson.imageurl)
        //         }
        //         if (petJson.petid == 27) {
        //             console.log(pets[27])
        //             console.log(pets[27].images);
        //             console.log(pets[27].images.length);
        //             console.log(pets[27].images[0]);
        //         }
        //     }
        // }

            // pets.forEach(pet => {
            //     // select all images from pet_image table where petid matches a pet
            //    axios.get(`/getPetImages/${pet.petid}`).then((response) => {
            //         if (response.status == 200) {
            //             const petJson = response.data
            //             // iterate through both arrays, update each Pet in the Pets array with image values
            //             petJson.forEach(image => {
            //                 if (image.petid == pet.petid) {
            //                     pet.images.push(image.imageurl)
            //                 }
            //                 if (image.petid == 27) {
            //                     console.log(pets[27])
            //                     console.log(pets[27].images);
            //                     console.log(pets[27].images.length);
            //                     console.log(pets[27].images[0]);
            //                 }
            //             })
            //         }
            //     })
            // })


};
setupCards();

