const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".pause");
const nextBtn = document.querySelector(".play-next");
const prevBtn = document.querySelector(".play-prev");
const audio = document.querySelector("audio");
const playListContainer = document.querySelector(".play-list");
const progress = document.querySelector(".audio-progress");
const volumeRange = document.querySelector(".audio-volume");
const currentTimeBox = document.querySelector(".current-time-box");
const playItemName = document.querySelector(".play-item-name");
const ranges = document.querySelectorAll("input[type=range]");
const sound = document.querySelector(".sound-on-btn");

const playList = [
  {
    title: "Fly",
    src: "../assets/sounds/Ludovico Einaudi - Fly.mp3",
    duration: "99",
  },
  {
    title: "Ennio Morricone",
    src: "../assets/sounds/Ennio Morricone.mp3",
    duration: "99",
  },
  {
    title: "Moonlight Sonata",
    src: "../assets/sounds/Moonlight Sonata.mp3",
    duration: "99",
  },
  {
    title: "River Flows In You",
    src: "../assets/sounds/River Flows In You.mp3",
    duration: "99",
  },
];

let isPlay = false;
let playNum = 0;
let itemCur = 0;
let volume = audio.volume;
playItemName.textContent = playList[playNum].title;

playList.forEach((el) => {
  const div = document.createElement("div");
  div.classList.add("song-wrapper");
  const li = document.createElement("li");
  playListContainer.append(div);
  li.classList.add("play-item");
  div.append(li);
  li.textContent = el.title;
  const button = document.createElement("button");
  button.classList.add("play");
  button.classList.add("player-icon");
  button.classList.add("small");
  li.before(button);
});

const playItems = document.querySelectorAll(".play-item");
const playBtnsSmall = document.querySelectorAll(".small");
const arrayOfPlayItems = Array.from(playItems);

currentTimeBox.textContent = `00:${progress.value.padStart(2, "0")} / ${getTimeCodeFromNum(Number(playList[playNum].duration))}`;

const activeSong = n => {
    for(let smallBtn of playBtnsSmall) {
        smallBtn.classList.remove('pause');
    }
    playBtnsSmall[n].classList.toggle('pause');
    if (playBtn.classList.contains("pause")) {
        playBtnsSmall[n].classList.add('pause');
    } else {
        playBtnsSmall[n].classList.remove('pause');
    }
}

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `0${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `0${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

function playAudio() {
  audio.src = playList[playNum].src;
  if (!isPlay) {
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
  } else {
    audio.pause();
    isPlay = false;
  }
    arrayOfPlayItems[itemCur].classList.add("item-active");
    playBtnsSmall[itemCur].classList.add('pause');
  playItemName.textContent = playList[playNum].title;
}

function playNext() {
  arrayOfPlayItems[itemCur].classList.remove("item-active");
  playNum++;
  itemCur++;
  if (playNum === Object.keys(playList).length) {
    playNum = 0;
    itemCur = 0;
  }
  isPlay = false;
  playAudio();
    toggleBtn();
    activeSong(itemCur);
}

function playPrev() {
  arrayOfPlayItems[itemCur].classList.remove("item-active");
  if (playNum === 0) {
    playNum = Object.keys(playList).length;
    itemCur = Object.keys(playList).length;
  }
  playNum--;
  itemCur--;

  isPlay = false;
  playAudio();
    toggleBtn();
    activeSong(itemCur);
}

function toggleBtn() {
    if (isPlay) {
        playBtn.classList.add("pause");
    } else {
        playBtn.classList.remove("pause");
    }
}

function toggleSoundBtn() {
  sound.classList.toggle("none");
}

function volumeChange() {
  if (sound.classList.contains("none")) {
    audio.volume = 0;
  } else {
    audio.volume = volume;
  }
}

function hundleRangeUpdate() {
  audio[this.name] == this.value;
}

function hundleProgress() {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = (100 * audio.currentTime) / audio.duration;
  progress.style.background = `linear-gradient(to right, #C5B358 0%, #C5B358 ${percent}%, #C4C4C4 ${percent}%, #C4C4C4 100%)`;
  currentTimeBox.textContent = `00:${progress.value.padStart(
    2,
    "0"
  )} / ${getTimeCodeFromNum(Number(playList[playNum].duration))}`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * audio.duration;
  audio.currentTime = scrubTime;
}

playBtn.addEventListener("click", playAudio);
playBtn.addEventListener("click", toggleBtn);
nextBtn.addEventListener("click", playNext);
prevBtn.addEventListener("click", playPrev);
sound.addEventListener("click", toggleSoundBtn);
sound.addEventListener("click", volumeChange);
audio.addEventListener("ended", playNext);
audio.addEventListener("timeupdate", hundleProgress);
ranges.forEach((range) => {
  range.addEventListener("change", hundleRangeUpdate);
});
ranges.forEach((range) => {
  range.addEventListener("mousemove", hundleRangeUpdate);
});
progress.addEventListener("click", scrub);
volumeRange.addEventListener("input", function () {
  const value = this.value;
  audio.volume = this.value / 100;
  this.style.background = `linear-gradient(to right, #C5B358 0%, #C5B358 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
  if (audio.volume === 0) sound.classList.add("none");
  if (audio.volume !== 0) sound.classList.remove("none");
});
playBtnsSmall.forEach((smallBtn, index) => {
    smallBtn.addEventListener("click", () => {
        smallBtn.classList.remove("pause");
        playNum = index;
        playAudio();
        toggleBtn();
        activeSong(index);
        arrayOfPlayItems.forEach(item => item.classList.remove("item-active"));
        arrayOfPlayItems[index].classList.add("item-active");
    });
})
