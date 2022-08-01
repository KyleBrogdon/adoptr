const { default: axios } = require("axios");

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
function setupCards () {
    console.log("Pet List setup executed")
    let mainList = document.getElementById("tinder--container");
    let test = new RetrievedPet();
    console.log(test);
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

    axios
        .get('/pet')
        .then((response) => {
            console.log(response.status);
            if (response.status == 200) {
                const parsedJson = response.data

                parsedJson.forEach(pet => {
                    pets.push(new RetrievedPet(pet.petid, pet.petname, pet.age, pet.sex, pet.blurb,
                        pet.dateprofile, pet.sizeid, pet.snstatus, pet.ststatus, pet.avid, pet.typeid, pet.shelterid, Array()));
                        idArray.push(pet.petid);
                })
            }      console.log(pets[counter].images)
            // Promise.all(pets).then(results => {
            //     console.log(results);
            // })
            ;})
        .then(() => {
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
                            }
                        })
                    }
                })
            })})
        .then(() => {
            Promise.all(pets);
            console.log(pets);
            Promise.all(pets[27].images)
            console.log(pets[27].images);

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

        })
        


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

