// organization 

const settingsItems = document.querySelectorAll(".settings-general-item");
const general = document.getElementById("general");
const photos = document.getElementById("photos");
const settingsContent = document.querySelector(".settings-content");
const photoContent = document.querySelector(".photo-content");

function activeItem() {
  settingsItems.forEach(item => item.classList.remove("active"))
  this.classList.toggle("active");
  
  if (general.classList.contains("active")) {
  settingsContent.classList.remove("none");
  photoContent.classList.add("none");
}

if (photos.classList.contains("active")) {
  settingsContent.classList.add("none");
  photoContent.classList.remove("none");
}
}
general.addEventListener("click", activeItem);
photos.addEventListener("click", activeItem);

const state = {
  language: "en",
  photoSource: "github",
  blocks: [
    "time",
    "date",
    "greeting",
    "quote",
    "weather",
    "player",
    "todolist",
  ],
};

const weatherInput = document.querySelector(".weather-input");
const audioInput = document.querySelector(".audio-input");
const timeInput = document.querySelector(".time-input");
const dateInput = document.querySelector(".date-input");
const greetingInput = document.querySelector(".greeting-input");
const quotesInput = document.querySelector(".quotes-input");

const weather = document.querySelector(".weather");
const player = document.querySelector(".player");
const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greetingContainer = document.querySelector(".greeting-container");
const quotes = document.querySelector(".quotes");

function localStorageCheck(block, input) {
  if (localStorage.getItem(block.dataset.name) !== null) {
    localStorage.setItem(block.dataset.name, "none");
    block.classList.add("none");
    input.checked = true;
  } else {
    block.classList.remove("none");
    input.checked = false;
  }
}

function changeInput(block) {
  if (this.checked) {
    block.classList.add("none");
    localStorage.setItem(block.dataset.name, "none");
  } else {
    block.classList.remove("none");
    localStorage.removeItem(block.dataset.name);
  }
}
  
weatherInput.addEventListener("change", () => {
  let thisWeather = changeInput.bind(weatherInput);
  thisWeather(weather);
});
audioInput.addEventListener("change", () => {
  let thisAudio = changeInput.bind(audioInput);
  thisAudio(player);
});
timeInput.addEventListener("change", () => {
  let thisTime = changeInput.bind(timeInput);
  thisTime(time);
});
dateInput.addEventListener("change", () => {
  let thisDate = changeInput.bind(dateInput);
  thisDate(date);
});
greetingInput.addEventListener("change", () => {
  let thisGreeting = changeInput.bind(greetingInput);
  thisGreeting(greetingContainer);
});
quotesInput.addEventListener("change", () => {
  let thisQuotes = changeInput.bind(quotesInput);
  thisQuotes(quotes);
});

localStorageCheck(weather, weatherInput);
localStorageCheck(player, audioInput);
localStorageCheck(time, timeInput);
localStorageCheck(date, dateInput);
localStorageCheck(greetingContainer, greetingInput);
localStorageCheck(quotes, quotesInput);

 // modal start

const modal = document.querySelector(".settings-wrapper");
const overlay = document.querySelector(".overlay");
const settingsBtn = document.querySelector(".settings-btn");

const closeModal = () => {
  modal.classList.toggle("active");
  overlay.classList.toggle("active");
};

function rotateIcon() {
  settingsBtn.classList.toggle("rotate");
}

overlay.addEventListener("click", closeModal);
overlay.addEventListener("click", rotateIcon);
settingsBtn.addEventListener("click", closeModal);
settingsBtn.addEventListener("click", rotateIcon);

// modal end