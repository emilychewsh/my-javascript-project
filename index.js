document.addEventListener("DOMContentLoaded", initialise);

const digimonList = document.querySelector("#digimon-list")

let digimonNames = []

async function initialise() {
    const digimons = await fetch100Digimons()

    digimons.forEach(element => {
      const btn = document.createElement("button")
      btn.className = "digimonNameList"
      btn.innerText = element.name
      btn.id = element.id
      btn.addEventListener("click", getDigimon)
      digimonList.appendChild(btn)
      
      digimonNames.push(element.name)
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
    // console.log(data)
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
  // console.log(digimonAttributes)
  const digimonAttributeBox = document.querySelector("#type-box-attribute")
  digimonAttributeBox.innerHTML = "Attribute: " + ""
  digimonAttributeBox.append(digimonAttributes)
}

function renderDigimonDesc(object){
  console.log(object)
  const englishDesc = object.descriptions.find((desc) =>{
    return desc.language === "en_us"
  })

  const digimonDescBox = document.querySelector("#digimon-description")
  const digimonParagraph = document.createElement("p")
  digimonParagraph.textContent = englishDesc.description
  digimonDescBox.innerHTML = ""
  digimonDescBox.append(digimonParagraph)
}

function renderDigimonYear(object){
  const digimonYear = object.releaseDate
  const digimonYearBox = document.querySelector("#yearReleased")
  digimonYearBox.innerHTML = "Year Released: " + ""
  digimonYearBox.append(digimonYear)
}

const input = document.querySelector("#input")
input.addEventListener("input", searchDigimon)

function searchDigimon(event){
  console.log(event.target.value)
  const matchName = digimonNames.find((name) =>{
    return name.toLowerCase().includes(event.target.value.toLowerCase())
  })
  if (matchName != undefined){
    event.target.after(matchName)
  }
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
