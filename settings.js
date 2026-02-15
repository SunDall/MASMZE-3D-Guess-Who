//© SunDall, 2026
function setSetting(key, value) {
  settings[key] = value;
  localStorage.setItem("settings", JSON.stringify(settings));
  window.dispatchEvent(new CustomEvent("settingsChanged", {
    detail: {key, newValue: value}
  }));
}

function createMenu(){
  const settingsTopContainer = document.createElement("div");
  settingsTopContainer.className = "settingsTopContainer";
  const menu = document.getElementById("menu");
  menu.appendChild(settingsTopContainer);

  const settingsButton = document.createElement("button");
  settingsButton.innerHTML = '<i class="fa-solid fa-gear"></i>';
  settingsButton.className = "settingsButton";
  settingsTopContainer.appendChild(settingsButton);

  const sizeBlock = document.createElement("div");
  sizeBlock.className = "sizeBlock";

  sizeSlider = document.createElement("input");
  sizeSlider.className = "sizeSlider";
  sizeSlider.type = "range";
  sizeSlider.min = "10";
  sizeSlider.max = "120";
  sizeSlider.value = "20";
  
  const sizeLabel = document.createElement("label");
  sizeLabel.className = "sizeLabel";
  sizeLabel.textContent = "Picture size: " + sizeSlider.value;
  sizeBlock.appendChild(sizeLabel);
  sizeBlock.appendChild(sizeSlider);
  settingsTopContainer.appendChild(sizeBlock);
  
  const clearPlayground = document.createElement("button");
  clearPlayground.className = "clearPlayground";
  clearPlayground.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  menu.appendChild(clearPlayground);

  const addPicsButton = document.createElement("button");
  addPicsButton.className = "addPicsButton";
  addPicsButton.innerHTML = '<i class="fa-solid fa-plus"></i>';
  menu.appendChild(addPicsButton);
  
  const fileInput = document.getElementById("fileInput");
  addPicsButton.addEventListener("click", () => {fileInput.click();});
  fileInput.addEventListener("change", () => {
    const files = Array.from(fileInput.files);
    const paths = files.map(file => ({
      name: file.name, 
      url: URL.createObjectURL(file) 
    }));
    const jsonText = JSON.stringify(paths, null, 2);
    playgroundCards(jsonText);
  });
  
}

createMenu();

const settings = JSON.parse(localStorage.getItem("settings"));
const menu = document.getElementById("menu");
const gear = document.querySelector(".settingsButton .fa-solid.fa-gear");
const settingsButton = document.querySelector(".settingsButton");
const sizeBlock = document.querySelector(".sizeBlock");
const addPicsButton = document.querySelector("addPicsButton");

[settingsButton, gear].forEach(element =>{
  element.addEventListener("click", (event) => {
    menu.classList.toggle("active");
    event.stopPropagation();
    sizeBlock.classList.toggle("active");
    gear.classList.toggle("activated");

    let clearPlayground = document.querySelector(".clearPlayground")
    if(clearPlayground.innerHTML === "Clear Playground"){
      clearPlayground.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    } else setTimeout(() => {clearPlayground.innerHTML = 'Clear Playground';}, 100);

    let addPicsButton = document.querySelector(".addPicsButton")
    if(addPicsButton.innerHTML === 'Add Images'){
      addPicsButton.innerHTML = '<i class="fa-solid fa-plus"></i>';
    } else setTimeout(() => {addPicsButton.innerHTML = 'Add Images';}, 100);
  })
});


sizeSlider.addEventListener("input", () => {
  setSetting("size", sizeSlider.value);
  document.querySelector(".sizeLabel").textContent = "Picture size: " + sizeSlider.value;
});

document.querySelector(".clearPlayground").addEventListener("click", () => {
    document.getElementById("playGround").innerHTML = "";
});
