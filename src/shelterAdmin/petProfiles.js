const { offset } = require("@popperjs/core");
const { default: axios, Axios } = require("axios");


const imageModal = new bootstrap.Modal(document.getElementById('imageModal'), {
    keyboard: false
    
});


class petEntry {
    constructor(
      petid,
      petname,
      age,
      sex,
      snstatus,
      ststatus,
      blurb,
      sizeid,
      typeid,
      avid,
      shelterid,
      images,
      breedid,
      breed
    ) {
      this.petid = petid;
      this.petname = petname;
      this.age = age;
      this.sex = sex;
      this.snstatus = snstatus;
      this.ststatus = ststatus;
      this.blurb = blurb;
      this.sizeid = sizeid;
      this.typeid = typeid;
      this.avid = avid;
      this.shelterid = shelterid;
      this.images = images; // empty array that we will store all pet imageURLs in later
      this.breedid = breedid;
      this.breed = breed
    }
}
  
async function updateBlurb(id){
    let blurb = document.getElementById("petBlurb").value
    await axios.put(`/petBlurb/${id}`,{
        blurb: blurb
        }).then((response) => {
        console.log(response.status)
        if (response.status >= 200 && response.status<300) {
            console.log("blurb updated");
            let element = document.createElement('div');
            element.innerHTML = `Blurb Updated`;
            element.setAttribute("class","alert alert-primary col");
            element.setAttribute("id","blurb-message");
            document.getElementById("blurbUpdateField").appendChild(element);

        }else{
            console.log("API error");  
            console.log("blurb failed");
            let element = document.createElement('div');
            element.innerHTML = `Blurb Failed to update`;
            element.setAttribute("class","alert alert-danger col");
            element.setAttribute("id","blurb-message");
            document.getElementById("blurbUpdateField").appendChild(element);
                
        }
    })  

}


async function executeImageUpdate(){
    let id = document.getElementById("hidden-imageid").value
    let imageurl = document.getElementById("updatedImageURL").value
    console.log(id)
    console.log(imageurl)
    await axios.put(`/updateImage/${id}`,{
        imageurl: imageurl
    }).then((response) => {
        console.log(response.status)
        if (response.status >= 200 && response.status<300) {
            console.log("url updated");
            let element = document.createElement('div');
            element.innerHTML = `url Updated`;
            element.setAttribute("class","alert alert-primary col");
            element.setAttribute("id","url-message");
            document.getElementById("imageModalBody").appendChild(element);
        }else{
            console.log("API error");  
            console.log("blurb failed");
            let element = document.createElement('div');
            element.innerHTML = `url Failed to update`;
            element.setAttribute("class","alert alert-danger col");
            element.setAttribute("id","url-message");
            document.getElementById("imageModalBody").appendChild(element);
                
        }
    })
}

function updatePic(pic){
    document.getElementById(`updatePic-button-${pic.imageid}`).addEventListener("click", () => {
        document.getElementById("hidden-imageid").value = pic.imageid
        const img = document.getElementById("petModalIMG")
        console.log(pic.imageurl)
        img.src = pic.imageurl
        img.className = "img-thumbnail mx-auto d-block"
        img.style="width: 300px; height: 300px; object-fit: cover;"
        let element = document.getElementById("updatedImageURL");
        element.value = pic.imageurl
        imageModal.show();
    })
}


async function addImage(id){
    let imageurl = document.getElementById('newImgURL').value
    console.log(imageurl)
    if(imageurl.length > 0){
        axios.post(`/addImage/${id}`,{
            imageurl : imageurl,
        }).then((response) => {
            console.log(response.status)
            if (response.status >= 200 && response.status<300) {
            console.log("image added")
            //location.reload();

            }else{
            console.log("API error");        
            }
        }) 
    }else{
        console.log("nothing to add")
    }
}


function deleteImage(pic){
    document.getElementById(`delete-button-${pic.imageid}`).addEventListener("click",() => {
        axios.delete(`/petImage/${pic.imageid}`).then((response) => {
            console.log(response.status)
            if (response.status == 200) {
                console.log(pic.imageid + " deleted")
                location.reload();
            }else{
                console.log("API error");        
            }
        })  
    })
}


async function updateProperties(id){
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    dateprofile = year + "-" + month + "-" + day
    console.log(dateprofile)

    let petname = document.getElementById("petName").value
    let age = document.getElementById("petAge").value
    let sex = document.getElementById("defaultSex").value
    let sizeid = document.getElementById("defaultSize").value
    let snstatus = document.getElementById("defaultSN").value
    let ststatus = document.getElementById("defaultST").value
    let avid = document.getElementById("defaultAv").value
    let typeid = document.getElementById("defaultType").value
    let breedid = document.getElementById("defaultBreed").value

    console.log(petname)
    console.log(age)
    console.log(sex)
    console.log(sizeid)
    console.log(snstatus)
    console.log(ststatus)
    console.log(avid)
    console.log(typeid)
    console.log(breedid)
    // petname,
    // age,
    // sex,
    // dateprofile,
    // sizeid,
    // snstatus,
    // ststatus,
    // avid,
    // typeid,
}

function getPetID(){
    let pageURL = document.URL;
    let ID = pageURL.split('=')[1];
    console.log(ID)
    return ID
}

async function getShelter(pet){
  const response = await axios.get(`/shelter/${pet.shelterid}`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      return response.data
    }
    else{
      console.log('API error')
    }
  })
  return response
} 

async function getSize(pet){
  const response = await axios.get(`/size/${pet.sizeid}`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      return response.data
    }
    else{
      console.log('API error')
    }
  })
  return response
} 

async function getType(pet){
  const response = await axios.get(`/type/${pet.typeid}`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      return response.data
    }
    else{
      console.log('API error')
    }
  })
  return response
} 

async function getBreedID(pet){
    const response = await axios.get(`/petbreedPID/${pet.petid}`).then((response) => {
      if(response.status >= 200 && response.status < 300){
        return response.data
      }
      else{
        console.log('API error')
      }
    })
    return response
} 

async function getBreed(pet){
    const response = await axios.get(`/breed/${pet.breedid}`).then((response) => {
      if(response.status >= 200 && response.status < 300){
        return response.data
      }
      else{
        console.log('API error')
      }
    })
    return response
} 

async function getAvailability(pet){
  const response = await axios.get(`/availability/${pet.avid}`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      return response.data
    }
    else{
      console.log('API error')
    }
  })
  return response
} 

async function getImage(pet){
  const response = await axios.get(`/getPetImages/${pet.petid}`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      return response.data
    }
    else{
      console.log('API error')
    }
  })
  return response
} 

const getBasePetInfo = async (petid) =>{
    try{
      const resp = await axios.get(`/pet/${petid}`).then((response) => {
        if (response.status == 200 && response.status < 300) {
          const petResponse = response.data
          console.log(petResponse)
          return new petEntry(
              JSON.stringify(petResponse[0].petid), petResponse[0].petname,
              petResponse[0].age, petResponse[0].sex,
              JSON.stringify(petResponse[0].snstatus), JSON.stringify(petResponse[0].ststatus),
              petResponse[0].blurb, JSON.stringify(petResponse[0].sizeid),
              JSON.stringify(petResponse[0].typeid), JSON.stringify(petResponse[0].avid), JSON.stringify(petResponse[0].shelterid),
              null,null,null
            )
        }else{
          console.log('failed pet pull')
        }
      })
      console.log(resp)
      return resp
    }catch(err){
  
    }
}



function setSNStatus(status){
    if(status == 'true'){
        document.getElementById("defaultSN").value = 'true'
        document.getElementById("secondSN").value = 'false'
        document.getElementById("defaultSN").textContent = 'true'
        document.getElementById("secondSN").textContent = 'false'
    }else{
        document.getElementById("defaultSN").value = 'false'
        document.getElementById("secondSN").value = 'true'
        document.getElementById("defaultSN").textContent = 'false'
        document.getElementById("secondSN").textContent = 'true'
    }
}

function setSTStatus(status){
    if(status == 'true'){
        document.getElementById("defaultST").value = 'true'
        document.getElementById("secondST").value = 'false'
        document.getElementById("defaultST").textContent = 'true'
        document.getElementById("secondST").textContent = 'false'
    }else{
        document.getElementById("defaultST").value = 'false'
        document.getElementById("secondST").value = 'true'
        document.getElementById("defaultST").textContent = 'false'
        document.getElementById("secondST").textContent = 'true'
    }
}

async function setSizeStatus(status){
    let body = document.getElementById("atribute-form-size")

    const response = await axios.get(`/size`).then((response) => {
        if(response.status >= 200 && response.status < 300){
        return response.data
        }
        else{
        console.log('API error')
        }
    })
    response.forEach(element => {
        if(element.sizeid == status){
            document.getElementById("defaultSize").value = element.sizeid
            document.getElementById("defaultSize").textContent = element.petsize
        }else{
            let opt = document.createElement('option')
            opt.id = "size-" + element.sizeid
            opt.textContent = element.petsize
            body.appendChild(opt)
        }
    });
}

async function setAVStatus(status){
    let body = document.getElementById("atribute-form-availability")

    const response = await axios.get(`/availability`).then((response) => {
        if(response.status >= 200 && response.status < 300){
        return response.data
        }
        else{
        console.log('API error')
        }
    })
    response.forEach(element => {
        if(element.avid == status){
            document.getElementById("defaultAv").value = element.avid
            document.getElementById("defaultAv").textContent = element.pet_availability
        }else{
            let opt = document.createElement('option')
            opt.id = "av-" + element.avid
            opt.textContent = element.pet_availability
            body.appendChild(opt)
        }
    });
}

async function setTypeStatus(status){
    let body = document.getElementById("atribute-form-type")

    const response = await axios.get(`/type`).then((response) => {
        if(response.status >= 200 && response.status < 300){
        return response.data
        }
        else{
        console.log('API error')
        }
    })
    response.forEach(element => {
        if(element.typeid == status){
            document.getElementById("defaultType").value = element.typeid
            document.getElementById("defaultType").textContent = element.typename
        }else{
            let opt = document.createElement('option')
            opt.id = "type-" + element.typeid
            opt.textContent = element.typename
            body.appendChild(opt)
        }
    });
}

async function setBreedStatus(pet){
    let body = document.getElementById("atribute-form-breed")

    const response = await axios.get(`/breedType/${pet.typeid}`).then((response) => {
        if(response.status >= 200 && response.status < 300){
        return response.data
        }
        else{
        console.log('API error')
        }
    })
    response.forEach(element => {
        if(element.breedid == pet.breedid){
            document.getElementById("defaultBreed").value = element.breedid
            document.getElementById("defaultBreed").textContent = element.breedname
        }else{
            let opt = document.createElement('option')
            opt.id = "breed-" + element.breedid
            opt.textContent = element.breedname
            body.appendChild(opt)
        }
    });
}

function setSexStatus(status){
    if(status == 'Male'){
        document.getElementById("defaultSex").value = 'Male'
        document.getElementById("secondSex").value = 'Female'
        document.getElementById("defaultSex").textContent = 'Male'
        document.getElementById("secondSex").textContent = 'Female'
    }else{
        document.getElementById("defaultSex").value = 'Female'
        document.getElementById("secondSex").value = 'Male'
        document.getElementById("defaultSex").textContent = 'Female'
        document.getElementById("secondSex").textContent = 'Male'
    }
}

function setPetPic(pet){
    const img = document.getElementById("petIMG")
    img.src = "/images/image-not-found.png"
    img.className = "img-thumbnail mx-auto d-block"
    img.style="width: 500px; height: 300px; object-fit: cover;"

    const pics = pet.images
    picL = pics.length;
    if(picL > 0){
      console.log(pics[0])
      let pic = pics[0].imageurl
      img.src = pic
    }
}


function generateImageList(images){
    let body = document.getElementById("main-pic-rows");
    images.forEach(pic=>{
        let element = document.createElement("tr");
        element.innerHTML = `
          <th scope="row">${pic.imageid}</th>
          <td>
            <a id="link-${pic.imageid}" href="${pic.imageurl}" class="link-primary" target="_blank">Open Image</a>
          </td>
          <td>
            <button type="button" class="btn btn-primary btn-sm" id="updatePic-button-${pic.imageid}" value = "${pic.imageid}">Update</button>
            <button type="button" class="btn btn-danger btn-sm" id="delete-button-${pic.imageid}" value = "${pic.imageid}">delete</button>
          </td>
        `;
        body.appendChild(element)
        deleteImage(pic)
        updatePic(pic)
        console.log(element)
    })


}


const setupPage = async () => {
    const petid = getPetID()
    document.getElementById('hidden-petid').value = petid

    pet = await getBasePetInfo(petid)

    let size = await getSize(pet)
    let type = await getType(pet)
    let avail = await getAvailability(pet)
    let pics = await getImage(pet)
    let shelter = await getShelter(pet)
    let breedid =await getBreedID(pet)
    //console.log(breedid)
    pet.breedid = breedid[0].breedid
    //console.log(pet)
    let breed = await getBreed(pet)
    pet.breed = breed[0].breedname
    // pet.sizeid = size[0].petsize
    // pet.typeid =type[0].typename
    // pet.avid = avail[0].pet_availability
    pet.images =pics
    // pet.shelterid = shelter[0].sheltercode
    console.log(pics)
    setPetPic(pet)
    setSNStatus(pet.snstatus)
    setSTStatus(pet.ststatus)
    setSexStatus(pet.sex)
    await setSizeStatus(pet.sizeid)
    await setAVStatus(pet.avid)
    await setTypeStatus(pet.typeid)
    await setBreedStatus(pet)
    document.getElementById("petName").value = pet.petname
    document.getElementById("petAge").value = pet.age
    document.getElementById("petBlurb").value = pet.blurb
    generateImageList(pet.images)
    console.log(pet)

    document.getElementById("updateBlurb").addEventListener("click", () => {
        updateBlurb(pet.petid);
      });

    document.getElementById("updateProperties").addEventListener("click", () => {
        updateProperties(pet.petid);
    });

    document.getElementById("addImageButton").addEventListener("click", () => {
        addImage(pet.petid);
    });

    document.getElementById("updateImageButton").addEventListener("click", () => {
        executeImageUpdate();
    });

    

}

setupPage()