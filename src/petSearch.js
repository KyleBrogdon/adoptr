const { offset } = require("@popperjs/core");
const { default: axios, Axios } = require("axios");

class PetEntry {
  constructor(petId, petName, petType, petAge, petSex) {
    this.petId = petId;
    this.petName = petName;
    this.petType = petType;
    this.petAge = petAge;
    this.petSex = petSex;
  }

  generateRow() {
    let element = document.createElement("tr");
    element.innerHTML = `
      <th scope="row">${this.petId}</th>
      <td>
        <span>${this.petName}</span>
      </td>

      <td>
        <span>${this.petType}</span>
      </td>

      <td>
        <span>${this.petAge}</span>
      </td>

      <td>
        <span>${this.petSex}</span>
      </td>

      <td>
        <button type="button" class="btn btn-outline-primary btn-sm" id="expand-button-${this.petId}" value = ${this.petId}><a id="link-${this.petId}" href="user/petProfile?petid=${this.petid}" class="link-primary" >Profile</a></button>
      </td>
    `;
    return element;
  }
}

function loadTable(res) {
  let mainList = document.getElementById("main-rows");
  document.getElementById("loadingbar").style.display = "none";
  // }
  let receivedPets = Array();
  const parsedJson = res.data;
  console.log(parsedJson);
  //petId, petName, petType, petAge, petSex
  parsedJson.forEach((pet) => {
    console.log();
    receivedPets.push(
      new PetEntry(pet.petid, pet.petname, pet.typename, pet.age, pet.sex)
    );
  });

  receivedPets.forEach((pet) => {
    mainList.appendChild(pet.generateRow());
  });
}

async function search() {
  let prop = "";

  document
    .getElementById("attribute-form")
    .addEventListener("change", function () {
      if (this.value === "petID") {
        console.log("petId");
        prop = "petid";
      } else if (this.value === "petName") {
        prop = "petname";
        console.log("petName");
      } else if (this.value === "petType") {
        prop = "type";
        console.log("petType");
      } else if (this.value === "petAge") {
        prop = "age";
        console.log("petAge");
      } else if (this.value === "petSex") {
        prop = "sex";
        console.log("petSex");
      }
    });

  let searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", async (e) => {
    let deleteList = document.getElementById("main-rows");
    let numRowsToDelete = deleteList.rows.length;
    for (let i = 0; i < numRowsToDelete; i++) {
      console.log(`deleting row ${i}`);
      deleteList.deleteRow(0);
    }
    let paramVal = document.getElementById("searchBar").value;

    console.log("Value from search bar is " + paramVal);

    if (prop == "sex") {
      if (paramVal !== "Male" || paramVal !== "Female") {
        return;
      }
      axios.get(`/readPetsBySex/${paramVal}`).then((res) => {
        console.log("response from axios request ->");

        loadTable(res);
      });
    } else if (prop == "age") {
      axios.get(`/readPetsByAge/${paramVal}`).then((res) => {
        console.log("received age result");
        console.log(res.data);
        loadTable(res);
      });
    } else if (prop == "petid") {
      axios.get(`/pet/${paramVal}`).then((res) => {
        console.log("received id result");
        console.log(res.data);
        loadTable(res);
      });
    } else if (prop == "petname") {
      axios.get(`/readPetsByName/${paramVal}`).then((res) => {
        console.log("received pet name result");
        console.log(res.data);
        loadTable(res);
      });
    } else if (prop == "type") {
      axios.get(`/readPetsByType/${paramVal}`).then((res) => {
        console.log("received pet type result");
        console.log(res.data);
        loadTable(res);
      });
    }
  });
}

search();
