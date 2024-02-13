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


    // Search digimon in search bar
    const searchInput = document.querySelector("#input")
    const searchBtn = document.querySelector("#searchBtn")
    const sortBtn = document.querySelector("#sortBtn")
    const sortBtnOriginalValue = document.querySelector("#sortBtn").innerHTML

    searchBtn.addEventListener("click", () => {
    filterDigimons = digimons.filter((digimon) => {
      return digimon.name.toLowerCase().includes(searchInput.value.toLowerCase())
    })
      // digimonInfoLeftContainer.innerHTML = "";

      //Return sort button value to original 
      sortBtn.innerHTML = sortBtnOriginalValue

      if (filterDigimons.length === 0) {
        digimonList.innerHTML = `No Digimon with the name "${searchInput.value}" found. Please try another Digimon!`
      } else {
        digimonList.innerHTML = ""
        FilteredDigimonData()
      }
    })

    // Refresh Button to reset scroll bar on the right
    const refreshBtn = document.querySelector("#refreshBtn")
    refreshBtn.addEventListener("click", () => {
      filterDigimons = [...digimons]

      //Return sort button value to original
      sortBtn.innerHTML = sortBtnOriginalValue
      
      // digimonInfoLeftContainer.innerHTML = "";
      digimonList.innerHTML = ""
      FilteredDigimonData()
    })

    //Sort Digimon in Ascending order
    const sortAscendingBtn = document.querySelector("#sortAscendingBtn")
    sortAscendingBtn.addEventListener("click", () => {
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
  const digimonYearBox = document.querySelector("#yearReleased")
  const digimonYear = object.releaseDate
  digimonYearBox.innerHTML = "Year Released: " + "" 
  digimonYearBox.append(digimonYear)
}



// fix within refresh and sort - to clear left digimon data