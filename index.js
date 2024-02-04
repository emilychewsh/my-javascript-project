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

  })
}

function renderDigimonTypes(object){
  const digimonType = object.types[0].type
  const digimonTypeBox = document.querySelector(".type-box-type")
  digimonTypeBox.innerHTML = ""
  digimonTypeBox.append(digimonType)
}


async function fetch100Digimons(){
    const url = "https://digi-api.com/api/v1/digimon?pageSize=100"
    const response = await fetch (url)
    const digimonData = await response.json()
    const digimons = digimonData.content
    return digimons
    // console.log(digimons)
}

