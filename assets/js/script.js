/* Day printing function start */

function updateDay(){
  const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  
  let nowDay = new Date();
  
  let day = days[nowDay.getDay()];
  
  whatDay.innerHTML = `<b>${day}</b>`;
};
setInterval(updateDay, 1000);

/* Day printing function end */

/* ordinal date count function start */

function ordinal(n) {
  var s = ["TH", "ST", "ND", "RD"];
  var v = n%100;
  return n + (s[(v-20)%10] || s[v] || s[0]);
};

function updateDate(){
  let nowDate = new Date();
  
  let date = ordinal(nowDate.getDate());
  
  whatDate.innerHTML = `<b>${date}</b>`;
};
setInterval(updateDate, 1000);

/* ordinal date count function end */

/* Month printing function start */

function updateMonth(){
  months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  
  let nowMonth = new Date();
  
  let month = months[nowMonth.getMonth()];
  
  whatMonth.innerHTML = `<b>${month}</b>`;
};
setInterval(updateMonth, 1000);

/* Month printing function end */


function addZeroToTime(n){
  return n < 10 ? `0${n}` : n;
};

function updateTime(){
  let nowTime = new Date();
  let hours = addZeroToTime(nowTime.getHours());
  let minutes = addZeroToTime(nowTime.getMinutes());
  
  let getTime = `${hours}:${minutes}`
  
  whatTime.innerHTML = `<b>${getTime}</b>`;
};
setInterval(updateTime, 1000);

// media player

// document.getElementById("media-button").firstElementChild.setAttribute('href', '#play');

const audio = document.querySelector("audio");
const sound_button = document.getElementById("media-button").firstElementChild;
const song_name = document.querySelector(".song_name");
const song_name_container = document.querySelector(".song_name_container");
const progress = document.querySelector(".progress");
const progress_bar = document.querySelector(".progress_bar");
const current_time = document.querySelector(".current_time");
const song_duration = document.querySelector(".song_duration");
const song_card = document.querySelectorAll(".song_card");

let play_now = false;
const playMusic = () => {
  play_now = true;
  audio.play();
  sound_button.setAttribute('href', '#pause');
};

const pauseMusic = () => {
  play_now = false;
  audio.pause();
  sound_button.setAttribute('href', '#play');
};

const loadSong = (currSong) => {
  song_name.textContent = `${currSong.songName}`;
  audio.setAttribute("src", `./audio/${currSong.songName}.mp3`);
};



// for progress bar and song duration

//  here we get to know current music playing
audio.addEventListener("playing", (e) => {
  // checking the overflow
  if (song_name.offsetHeight > song_name_container.offsetHeight) {
    song_name_container.innerHTML = `<marquee direction="left" class="song_name">${song_name.textContent}</marquee>`;
  }
});

audio.addEventListener("timeupdate", (e) => {
  let { currentTime, duration } = e.srcElement;

  // Progress Bar
  let progressTime = (currentTime / duration) * 100;
  progress.style.width = `${progressTime}%`;
  // let min_duration, sec_duration;

  // Song Duration
  if (duration) {
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    if (min_duration < 10) {
      min_duration = `0${min_duration}`;
    }
    if (sec_duration < 10) {
      sec_duration = `0${sec_duration}`;
    }
    song_duration.textContent = `${min_duration} : ${sec_duration}`;
  }

  // Current Duration
  let min_currentTime = Math.floor(currentTime / 60);
  let sec_currentTime = Math.floor(currentTime % 60);
  if (min_currentTime < 10) {
    min_currentTime = `0${min_currentTime}`;
  }
  if (sec_currentTime < 10) {
    sec_currentTime = `0${sec_currentTime}`;
  }
  current_time.textContent = `${min_currentTime} : ${sec_currentTime}`;
  
  if (currentTime=duration) {
    audio.setAttribute("loop", "loop");
  }
});


//for skipping music
progress_bar.addEventListener("click", (e) => {
  // console.log(e);
  const { duration } = audio;
  let progress_move = (e.offsetX / e.srcElement.clientWidth) * duration;
  audio.currentTime = progress_move;
  // progress.style.width = progress_move
  // console.log(progress_move);
});

sound_button.addEventListener("click", () => {
  play_now ? pauseMusic() : playMusic();
});