document.addEventListener("DOMContentLoaded", initialise);

const digimonList = document.querySelector("#digimon-list")
const digimonInfoLeftContainer = document.querySelector("#left-digimon-info")

// Initialise async function
// Creating Scrollable 100 Digimon names on Right of page 
async function initialise() {
    const digimons = await fetch100Digimons()
    
    //Array to be manipulated 
    let filterDigimons = [...digimons]

    //Function = Add event listener on button names + get Digimon Data
    const FilteredDigimonData = () => {
      digimonList.innerHTML = ""
      filterDigimons.forEach(element => {
      const btn = document.createElement("button")
      btn.className = "digimonNameList"
      btn.innerText = element.name
      btn.id = element.id
      btn.addEventListener("mouseover", getDigimon)
      digimonList.appendChild(btn)
    });
    }
    FilteredDigimonData()

    //Fx to get rid of Digimon data on left after clicking Search, Refresh and Sort buttons
    function resetContainer () {
      const imageContainer = document.querySelector("#image-container")
      imageContainer.innerHTML= ""
      const digimonNameContainer = document.querySelector("#digimonName")
      digimonNameContainer.innerHTML = ""
      const digimonTypeBox = document.querySelector("#type-box-type")
      digimonTypeBox.innerHTML = ""
      const digimonAttributeBox = document.querySelector("#type-box-attribute")
      digimonAttributeBox.innerHTML = ""
      const digimonDescBox = document.querySelector("#digimon-description")
      digimonDescBox.innerHTML = ""
      const digimonYearBox = document.querySelector("#yearReleased")
      digimonYearBox.innerHTML = ""
      digimonInfoLeftContainer.classList.add("none")
    }

    //Declare variables for button functions
    const searchInput = document.querySelector("#input")
    const searchBtn = document.querySelector("#searchBtn")
    const sortBtn = document.querySelector("#sortBtn")
    const sortBtnOriginalValue = document.querySelector("#sortBtn").innerHTML

    // Search digimon in search bar
    searchBtn.addEventListener("click", () => {
    resetContainer()
    filterDigimons = digimons.filter((digimon) => {
      return digimon.name.toLowerCase().includes(searchInput.value.toLowerCase())
    })
    //Return sort button value to original 
    sortBtn.innerHTML = sortBtnOriginalValue
    //If no digimon with the name is found 
    if (filterDigimons.length === 0) {
        digimonList.innerHTML = `No Digimon with the name "${searchInput.value}" found. Please try another Digimon or click the "Refresh" button!`
    } else {
      digimonList.innerHTML = ""
      FilteredDigimonData()
    }
    })

    // Refresh Button to reset scroll bar on the right
    const refreshBtn = document.querySelector("#refreshBtn")
    refreshBtn.addEventListener("click", () => {
      resetContainer()
      filterDigimons = [...digimons]

      //Return sort button value to original
      sortBtn.innerHTML = sortBtnOriginalValue

      digimonList.innerHTML = ""
      FilteredDigimonData()
    })

    //Sort Digimon in Ascending order
    const sortAscendingBtn = document.querySelector("#sortAscendingBtn")
    sortAscendingBtn.addEventListener("click", () => {
        resetContainer()
        // console.log(filterDigimons.sort(digimon => digimon.name))
        filterDigimons.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
        sortBtn.innerHTML = "Sort " + "&uarr;"
        FilteredDigimonData()
    })

    //Sort Digimon in Descending Order
    const sortDescendingBtn = document.querySelector("#sortDescendingBtn")
    sortDescendingBtn.addEventListener("click", () => {
      resetContainer()
      filterDigimons.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
      sortBtn.innerHTML = "Sort " + "&darr;"
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
    
    const imageElement = document.createElement("img")
    imageElement.src = data.images[0].href
    imageElement.alt = "Failed to get image"
    const imageContainer = document.querySelector("#image-container")
    imageContainer.innerHTML = ""
    imageContainer.appendChild(imageElement)
  
  
    renderDigimonTypes(data)
    renderDigimonAttributes(data)
    renderDigimonDesc(data)
    renderDigimonYear(data)
    renderDigimonName(data)

    //To remove display box on left unless clicked
    digimonInfoLeftContainer.classList.remove("none")
  })
}

//Fx for rendering Names
function renderDigimonName (object) {
  const digimonName = object.name.toUpperCase()
  const digimonNameContainer = document.querySelector("#digimonName")
  digimonNameContainer.innerHTML = ""
  digimonNameContainer.append(digimonName)
}

//Fx for rendering Types
function renderDigimonTypes(object){
  if (object.types.length > 0 ) {
    const digimonType = object.types[0].type
    const digimonTypeBox = document.querySelector("#type-box-type")
    digimonTypeBox.innerHTML = "Type: " + ""
    digimonTypeBox.append(digimonType)
  } else {
    const digimonTypeBox = document.querySelector("#type-box-type")
    digimonTypeBox.innerHTML = "No type found"
  }

}

//Fx for rendering Attributes
function renderDigimonAttributes(object){
  if (object.attributes.length > 0){
    const digimonAttributes = object.attributes[0].attribute
    const digimonAttributeBox = document.querySelector("#type-box-attribute")
    digimonAttributeBox.innerHTML = "Attribute: " + ""
    digimonAttributeBox.append(digimonAttributes)
  } else {
    const digimonAttributeBox = document.querySelector("#type-box-attribute")
    digimonAttributeBox.innerHTML = "No Attribute found"
  }
}

//Fx for rendering Description and find method to look for only english description
function renderDigimonDesc(object){
  const englishDesc = object.descriptions.find((desc) =>{
    return desc.language === "en_us"
  })

  if (englishDesc != undefined){
    const digimonDescBox = document.querySelector("#digimon-description")
    const digimonParagraph = document.createElement("p")
    digimonParagraph.textContent = englishDesc.description
    digimonDescBox.innerHTML = ""
    digimonDescBox.append(digimonParagraph)
  } else {
    const digimonDescBox = document.querySelector("#digimon-description")
    const digimonParagraph = document.createElement("p")
    digimonParagraph.textContent = "No Description Found"
    digimonDescBox.innerHTML = ""
    digimonDescBox.append(digimonParagraph)
  }
}

//Fx for rendering Digimon Year
function renderDigimonYear(object){
  
    const digimonYearBox = document.querySelector("#yearReleased")
    const digimonYear = object.releaseDate
    digimonYearBox.innerHTML = "Year Released: " + "" 
    digimonYearBox.append(digimonYear)
}
