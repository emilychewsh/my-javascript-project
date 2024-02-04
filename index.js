document.addEventListener("DOMContentLoaded", initialise);

const digimonList = document.querySelector("#digimon-list")

async function initialise() {
    const digimons = await fetch100Digimons()

    digimons.forEach(element => {
      const btn = document.createElement("button")
      btn.className = "digimonNameList"
      btn.innerText = element.name
      btn.id = element.id
      btn.addEventListener("click", getDigimon)
      digimonList.appendChild(btn)
    });

}

async function fetch100Digimons(){
  const url = "https://digi-api.com/api/v1/digimon?pageSize=100"
  const response = await fetch (url)
  const digimonData = await response.json()
  const digimons = digimonData.content
  return digimons
  // console.log(digimons)
}

function getDigimon(event){
  let url = "https://digi-api.com/api/v1/digimon/"
  console.log(event.target)
  let digimonId = event.target.id
  let digimonData = fetch(url + digimonId)

  .then(response => response.json())
  .then((data) => {
    console.log(data)
    const imageElement = document.createElement("img")
    imageElement.src = data.images[0].href
    const imageContainer = document.querySelector("#image-container")
    imageContainer.innerHTML = ""
    imageContainer.appendChild(imageElement)
    
    renderDigimonTypes(data)
    renderDigimonAttributes(data)
    renderDigimonDesc(data)
    renderDigimonYear(data)
    
  })
}

function renderDigimonTypes(object){
  const digimonType = object.types[0].type
  const digimonTypeBox = document.querySelector("#type-box-type")
  digimonTypeBox.innerHTML = "Type: " + ""
  digimonTypeBox.append(digimonType)
}

function renderDigimonAttributes(object){
  const digimonAttributes = object.attributes[0].attribute
  console.log(digimonAttributes)
  const digimonAttributeBox = document.querySelector("#type-box-attribute")
  digimonAttributeBox.innerHTML = "Attribute: " + ""
  digimonAttributeBox.append(digimonAttributes)
}

function renderDigimonDesc(object){
  const digimonDesc = object.descriptions[0].description
  console.log(digimonDesc)

  const digimonDescBox = document.querySelector("#digimon-description")
  digimonDescBox.innerHTML = ""
  digimonDescBox.append(digimonDesc)
}

function renderDigimonYear(object){
  const digimonYear = object.releaseDate
  const digimonYearBox = document.querySelector("#yearReleased")
  digimonYearBox.innerHTML = "Year Released: " + ""
  digimonYearBox.append(digimonYear)
}

//filter digimons
// function searchDigimon(object){
//   const digimonName = object.name
//   const term = document.querySelector("#input").value
//   document.addEventListener("keyup", ()=>{
//     if (term == digimonName){
//       console.log(digimonName)
//     }
//   })
// }


// const searchBar = document.querySelector("input.form-control").value

// searchBar.addEventListener("keyup", function(e){
//   const term = e.target.value.toLowerCase()

//   const digimons = document.querySelectorAll(".digimonNameList")
//   Array.from(digimons).forEach(function(digimon){
//     const name = digimon.firstElementChild.textContent
//     if(name.toLowerCase().indexOf(term) != -1){
//       digimon.style.display = "block"
//     } else {
//       digimon.style.display = "none"
//     }
//   })
// })
