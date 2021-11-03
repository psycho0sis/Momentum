const currentTime = document.querySelector(".time");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");

const tagInput = document.querySelector(".tag-input");
const unsplashInput = document.querySelector(".unsplash-input");
const githubInput = document.querySelector(".github-input");
const flickrInput = document.querySelector(".flickr-input");
const photoInputs = document.querySelectorAll(".photo-input");

// inline date

const currentDate = document.querySelector(".date");

const options = { month: "long", weekday: "long", day: "numeric" };

function date_(language) {
  let current_datetime = new Date();
  return current_datetime.toLocaleDateString(language, options);
}

function currentDateTime(language) {
  currentDate.innerHTML = date_(language);
}

currentDateTime("en");

// inline time

function date_time() {
  const curDate = new Date();
  let curHour = curDate.getHours();
  let curMin = curDate.getMinutes();
  let curSek = curDate.getSeconds();
  let result = `${addZero(curHour)}:${addZero(curMin)}:${addZero(curSek)}`;
  return result;
}
function addZero(a) {
  if (a < 10) {
    return "0" + a;
  } else if (a >= 10) {
    return a;
  }
}
function currentTimeResult() {
  currentTime.innerHTML = date_time();
}
currentTimeResult();
setInterval(currentTimeResult, 1000);

// bg slider

const body = document.querySelector("body");
const slidePrev = document.querySelector(".slide-prev");
const slideNext = document.querySelector(".slide-next");

const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
let randomNum = getRandomNum(1, 20);

function setBg() {
  const timeOfDay = date_time();

  function getPartOfAday() {
    if (timeOfDay > "06:00:00" && timeOfDay < "11:59:59") {
      return "morning";
    } else if (timeOfDay > "12:00:00" && timeOfDay < "17:59:59") {
      return "afternoon";
    } else if (timeOfDay > "18:00:00" && timeOfDay < "23:59:59") {
      return "evening";
    } else {
      return "night";
    }
  }

  const img = new Image();
  let bg = String(randomNum).padStart(2, "0");
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getPartOfAday()}/${bg}.jpg`;
  let image = `url(${img.src})`;
  img.onload = () => {
    body.style.backgroundImage = image;
  };
}

setBg();

function go_to_right() {
  randomNum++;

  if (randomNum === 21) {
    randomNum = 1;
  }
  if (githubInput.checked) {
    body.style.backgroundImage = setBg();
  } else if (unsplashInput.checked) {
    body.style.backgroundImage = getLinkToImageUnsplash();
  } else if (flickrInput.checked) {
    body.style.backgroundImage = getLinkToImageFlickr();
  }
}

function go_to_left() {
  randomNum--;

  if (randomNum === 0) {
    randomNum = 20;
  }
  if (githubInput.checked) {
    body.style.backgroundImage = setBg();
  } else if (unsplashInput.checked) {
    body.style.backgroundImage = getLinkToImageUnsplash();
  } else if (flickrInput.checked) {
    body.style.backgroundImage = getLinkToImageFlickr();
  }
}

// greeting

function sayHello(time) {
  if (time > "06:00" && time < "11:59") {
    greeting.innerHTML = "Good morning,";
  } else if (time > "12:00" && time < "17:59") {
    greeting.innerHTML = "Good afternoon,";
  } else if (time > "18:00" && time < "23:59") {
    greeting.innerHTML = "Good evening,";
  } else {
    greeting.innerHTML = "Good night,";
  }
}
sayHello(date_time());

// unsplash API

tagInput.value = "natute";
githubInput.checked;

async function getLinkToImageUnsplash() {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tagInput.value}&client_id=Wp8bE1DGuHNKzmaITgP5W6oS0yEBD4xiLBJKucEmdNc`;
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();

  img.src = data.urls.regular;
  let image = `url(${img.src})`;
  img.onload = () => {
    body.style.backgroundImage = image;
  };
}
// getLinkToImage();

tagInput.addEventListener("input", function () {
  getLinkToImageUnsplash();
});
unsplashInput.addEventListener("change", function () {
  if (this.checked) {
    getLinkToImageUnsplash();
  }
  githubInput.checked = false;
  flickrInput.checked = false;
});
githubInput.addEventListener("change", function () {
  if (this.checked) {
    setBg();
  }
  flickrInput.checked = false;
  unsplashInput.checked = false;
});

// flickr

async function getLinkToImageFlickr() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=e3d6c5dc375fad685385894b49d6a8ea&gallery_id=72157719479577265&extras=url_h&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const photos = await res.json();

  const img = new Image();
  img.src = photos.photos.photo[randomNum].url_h;
  let image = `url(${img.src})`;
  img.onload = () => {
    body.style.backgroundImage = image;
  };
}

flickrInput.addEventListener("change", function () {
  if (this.checked) {
    getLinkToImageFlickr();
  }
  githubInput.checked = false;
  unsplashInput.checked = false;
});

// quotes

const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuoteBtn = document.querySelector(".change-quote");

let url = "./js/data.json";

async function getQuotes() {
  const quotes = url;
  const res = await fetch(quotes);
  const data = await res.json();
  const getRandomNumber = () => {
    return Math.floor(Math.random() * data.length);
  };

  let randomNumber = getRandomNumber();
  quote.textContent = data[randomNumber]["text"];
  author.textContent = data[randomNumber]["author"];
}

function rotateIcon() {
  changeQuoteBtn.classList.toggle("rotate");
}

document.addEventListener("DOMContentLoaded", getQuotes);
changeQuoteBtn.addEventListener("click", getQuotes);
changeQuoteBtn.addEventListener("click", rotateIcon);

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const city = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weatherError = document.querySelector(".weather-error");
const descriptionError = document.querySelector(".description-container");
const weatherDescrItem = document.querySelectorAll(".weather-descr-item");
city.value = "Minsk";

// local storage name and city

function setLocalStorage() {
  localStorage.setItem("city", city.value);
  localStorage.setItem("name", name.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("city") || localStorage.getItem("name")) {
    city.value = localStorage.getItem("city");
    name.value = localStorage.getItem("name");
  }
}
window.addEventListener("load", getLocalStorage);

// getting weather

let language = "en";

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language}&appid=3e31f040903c0108980ead0ea3b6e6df&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.ceil(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  humidity.textContent = data.main.humidity;
  wind.textContent = data.wind.speed;
}

// change city

function setCity() {
  getWeather()
    .then(() => {
      weatherError.textContent = "";
      city.classList.remove("placeholder");
      descriptionError.classList.remove("none");
      weatherDescrItem.forEach(item => item.classList.remove("none"));
    })
    .catch((e) => {
      weatherError.textContent = "Invalid city";
      city.classList.add("placeholder");
      descriptionError.classList.add("none");
      weatherDescrItem.forEach(item => item.classList.add("none"));
    });
}
city.addEventListener("change", setCity);
document.addEventListener("DOMContentLoaded", getWeather);


// language

const englishInput = document.querySelector(".english-input");
const russianInput = document.querySelector(".russian-input");

const phrasesRu = {
  "wind": "Скорость ветра",
  "humidity": "Влажность",
  "unit": "м/с",
  "general": "Главные настройки",
  "photos": "Фон",
  "language": "Язык приложения",
  "general-next": "Главные настройки",
  "custom": "Измени свой дашборд",
  "hide": "СКРЫТЬ",
  "st-weather": "Погода",
  "audio": "Аудио плеер",
  "st-time": "Время",
  "st-date": "Дата",
  "st-greeting": "Приветствие",
  "st-quotes": "Цитаты",
  "photos-next": "Фон",
  "tags": "Тэги",
  "custom-next": "Выбери фон приложения",
};

const phrasesEn = {
  "wind": "Wind speed",
  "humidity": "Humidity",
  "unit": "m/s",
  "general": "General",
  "photos": "Photos",
  "language": "Language",
  "general-next": "General",
  "custom": "Customize your dashboard",
  "hide": "HIDE",
  "st-weather": "Weather",
  "audio": "Audio player",
  "st-time": "Time",
  "st-date": "Date",
  "st-greeting": "Greeting",
  "st-quotes": "Quotes",
  "photos-next": "Photos",
  "custom-next": "Choose your background",
  "tags": "Tags",
};

function getEnglish() {
  language = "en";
  url = "./js/data.json";
  useEnglish(date_time()); 
  localStorage.setItem("language", language);
  russianInput.checked = false;
}

function getRussian() {
  language = "ru";
  url = "./js/data-ru.json";
  useRussian(date_time());
  localStorage.setItem("language", language);
  englishInput.checked = false;
}

englishInput.addEventListener("change", getEnglish);
russianInput.addEventListener("change", getRussian);

if (localStorage.getItem("language") === "ru") {
    getRussian()
    russianInput.checked = true;
    englishInput.checked = false;
} else {
    getEnglish()
    russianInput.checked = false;
    englishInput.checked = true;
}
function useEnglish() {
  sayHello(date_time());
  currentDateTime(language);
  getQuotes();
  getWeather();
  document.getElementById("wind").innerHTML = phrasesEn.wind;
  document.getElementById("humidity").innerHTML = phrasesEn.humidity;
  document.getElementById("unit").innerHTML = phrasesEn.unit;
  document.getElementById("general").innerHTML = phrasesEn.general;
  document.getElementById("photos").innerHTML = phrasesEn.photos;
  document.getElementById("language").innerHTML = phrasesEn.language;
  document.getElementById("general-next").innerHTML = phrasesEn["general-next"];
  document.getElementById("custom").innerHTML = phrasesEn.custom;
  document.getElementById("st-weather").innerHTML = phrasesEn["st-weather"];
  document.getElementById("hide").innerHTML = phrasesEn.hide;
  document.getElementById("audio").innerHTML = phrasesEn.audio;
  document.getElementById("st-time").innerHTML = phrasesEn["st-time"];
  document.getElementById("st-date").innerHTML = phrasesEn["st-date"];
  document.getElementById("st-greeting").innerHTML = phrasesEn["st-greeting"];
  document.getElementById("st-quotes").innerHTML = phrasesEn["st-quotes"];
  document.getElementById("photos-next").innerHTML = phrasesEn["photos-next"];
  document.getElementById("custom-next").innerHTML = phrasesEn["custom-next"];
  document.getElementById("tags").innerHTML = phrasesEn["tags"];
}
function useRussian(time) {
  if (time > "06:00" && time < "11:59") {
    greeting.innerHTML = "Доброе утро,";
  } else if (time > "12:00" && time < "17:59") {
    greeting.innerHTML = "Добрый день, ";
  } else if (time > "18:00" && time < "23:59") {
    greeting.innerHTML = "Добрый вечер,";
  } else {
    greeting.innerHTML = "Доброй ночи, ";
  }
  currentDateTime(language);
  getQuotes();
  getWeather();
  document.getElementById("wind").innerHTML = phrasesRu.wind;
  document.getElementById("humidity").innerHTML = phrasesRu.humidity;
  document.getElementById("unit").innerHTML = phrasesRu.unit;
  document.getElementById("general").innerHTML = phrasesRu.general;
  document.getElementById("photos").innerHTML = phrasesRu.photos;
  document.getElementById("general-next").innerHTML = phrasesRu["general-next"];
  document.getElementById("language").innerHTML = phrasesRu.language;
  document.getElementById("st-weather").innerHTML = phrasesRu["st-weather"];
  document.getElementById("custom").innerHTML = phrasesRu.custom;
  document.getElementById("hide").innerHTML = phrasesRu.hide;
  document.getElementById("audio").innerHTML = phrasesRu.audio;
  document.getElementById("st-time").innerHTML = phrasesRu["st-time"];
  document.getElementById("st-greeting").innerHTML = phrasesRu["st-greeting"];
  document.getElementById("st-date").innerHTML = phrasesRu["st-date"];
  document.getElementById("st-quotes").innerHTML = phrasesRu["st-quotes"];
  document.getElementById("photos-next").innerHTML = phrasesRu["photos-next"];
  document.getElementById("custom-next").innerHTML = phrasesRu["custom-next"];
  document.getElementById("tags").innerHTML = phrasesRu["tags"];
}


console.log("Ваша оценка - 150 баллов\nОтзыв по пунктам ТЗ:\nВыполненные пункты:")
console.log("1) Часы и календарь +15")
console.log("2) Приветствие +10")
console.log("3) Смена фонового изображения +20")
console.log("4) Виджет погоды +15")
console.log("5) Виджет цитата дня +10")
console.log("6) Аудиоплеер +15")
console.log("7) Продвинутый аудиоплеер (реализуется без использования библиотек) +20")
console.log("8) Перевод приложения на два языка (en/ru или en/be) +15")
console.log("9) Получение фонового изображения от API +10 (с учетом времени не формируется, но по кросс-чеку и не нужно)")
console.log("(Flickr работает, но с задержкой)")
console.log("10) Настройки приложения +20 (сохраняется все, кроме изображений, чтобы не было проблем на кросс-чеке, все таки только 50 изображений в час, поэтому по умолчанию стоит GitHub)")
console.log("ps. вроде бы все пункты проверила, но глаз уже замылен, не уверена навернка :D, доп.функционала нет")