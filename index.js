document.addEventListener("DOMContentLoaded", initialise);

const digimonList = document.querySelector("#digimon-list")

// Initialise async function
// Creating Scrollable 100 Digimon names on Right of page 
async function initialise() {
    const digimons = await fetch100Digimons()
    
    //Array to be manipulated 
    let filterDigimons = [...digimons]

    //Function = Add event listener on button names + get Digimon Data
    const FilteredDigimonData = () => {
    filterDigimons.forEach(element => {
      const btn = document.createElement("button")
      btn.className = "digimonNameList"
      btn.innerText = element.name
      btn.id = element.id
      btn.addEventListener("click", getDigimon)
      digimonList.appendChild(btn)
    });
    }
    FilteredDigimonData()

    // Search digimon in search bar
    const searchInput = document.querySelector("#input")
    const searchBtn = document.querySelector("#searchBtn")

    searchBtn.addEventListener("click", () => {
    filterDigimons = digimons.filter((digimon) => {
      return digimon.name.toLowerCase().includes(searchInput.value.toLowerCase())
    })
    digimonList.innerHTML = ""
    FilteredDigimonData()
    })

    // Refresh Button to reset scroll bar on the right
    const refreshBtn = document.querySelector("#refreshBtn")
    refreshBtn.addEventListener("click", () => {
      filterDigimons = [...digimons]
      digimonList.innerHTML = ""
      FilteredDigimonData()
    })

    const sortAscendingBtn = document.querySelector("#sortAscendingBtn")
    sortAscendingBtn.addEventListener("click", () => {
      filterDigimons = digimons.filter((digimon) => {
        return digimon.name.sort()
      })
      digimonList.innerHTML = ""
      FilteredDigimonData()
    })

}

//Fetching 100 Digimon Data from external API 
async function fetch100Digimons(){
  const url = "https://digi-api.com/api/v1/digimon?pageSize=100"
  const response = await fetch (url)
  const digimonData = await response.json()
  const digimons = digimonData.content
  return digimons
  // console.log(digimons)
}

// Rendering ALL Digimon Data once clicked on the scrollable Digimon names 
function getDigimon(event){
  let url = "https://digi-api.com/api/v1/digimon/"
  // console.log(event.target)
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

//Fx for rendering Types
function renderDigimonTypes(object){
  const digimonType = object.types[0].type
  const digimonTypeBox = document.querySelector("#type-box-type")
  digimonTypeBox.innerHTML = "Type: " + ""
  digimonTypeBox.append(digimonType)
}

//Fx for rendering Attributes
function renderDigimonAttributes(object){
  const digimonAttributes = object.attributes[0].attribute
  // console.log(digimonAttributes)
  const digimonAttributeBox = document.querySelector("#type-box-attribute")
  digimonAttributeBox.innerHTML = "Attribute: " + ""
  digimonAttributeBox.append(digimonAttributes)
}

//Fx for rendering Description and find method to look for only english description
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

//Fx for rendering Digimon Year
function renderDigimonYear(object){
  const digimonYear = object.releaseDate
  const digimonYearBox = document.querySelector("#yearReleased")
  digimonYearBox.innerHTML = "Year Released: " + ""
  digimonYearBox.append(digimonYear)
}
