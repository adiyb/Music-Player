/* DOM Elements */

let disk = document.getElementById("disk");
let poster = document.getElementById("poster");
let title = document.querySelectorAll(".title");
let author = document.querySelectorAll(".author");
let progressInner = document.getElementById("progress-inner");
let totalTime = document.getElementById("total-time");
let playedTime = document.getElementById("played-time");
let play_pause = document.querySelector("#play-pause");
let play_stop = document.querySelector(".fa-circle-stop");
let backwardStep = document.querySelector(".fa-backward-step");
let backward = document.querySelector(".fa-backward");
let forward = document.querySelector(".fa-forward");
let forwardStep = document.querySelector(".fa-forward-step");
let shuffle = document.querySelector(".fa-shuffle");
let loop = document.querySelector(".fa-repeat");
let up = document.getElementById("up-button");
let down = document.getElementById("down-button");
let cover = document.getElementById("cover");
let playlistPoster = document.getElementById("playlist-poster");
let playlist = document.getElementById("playlist");
let audios = document.querySelectorAll("audio");
let songs = document.querySelectorAll(".audio-wrapper");
let songDetails = document.querySelectorAll(".song-details");

/* Variables */

let timeInterval,progressInterval;
let songTitle,songAuthor;
let totalSeconds , totalMinutes , playedSeconds , playedMinutes;
let progress_inner_width;
let playing = false;
let playingSongIndex ;
let isLooped = false;
let isShuffled = false;

/* Functions */

function playController1(a){
    if(play_pause.classList.contains("fa-circle-play")){
        play_pause.setAttribute("class","fa-solid fa-circle-pause");
        disk.style.animationPlayState = "running";
        playing = true;
        if(typeof playingSongIndex==="number" && a !== playingSongIndex){
            audios[playingSongIndex].currentTime=0;
            audios[playingSongIndex].pause();
        }
        audios[a].play();
    }else{
        play_pause.setAttribute("class","fa-solid fa-circle-play");
        disk.style.animationPlayState = "paused";
        playing =false;
        audios[playingSongIndex].pause();
    }
};

/* -------------------- */

function playController2(a){
    if(a === playingSongIndex){
        playController1();
    }else{
        audios[playingSongIndex].currentTime = 0;
        audios[playingSongIndex].pause();
        audios[a].play();
    }
};

/* --------------------- */

function skipController(a){
    audios[a].play();
    timeCalculation(a);
    progressbarController(a);
    titleChanger(a);
    posterChanger(a)
    playingSongIndex = a;
};

/* ------------------- */
function timeCalculation(a){
    totalSeconds = Math.round(audios[a].duration) % 60;
    totalMinutes = (Math.round(audios[a].duration)-totalSeconds)/60;
    if(totalSeconds<10){
        totalSeconds = "0"+totalSeconds;
    }
    if(totalMinutes<10){
        totalMinutes = "0"+totalMinutes;
    }
    totalTime.textContent = `${totalMinutes}:${totalSeconds}`;
    clearInterval(timeInterval);
    timeInterval = setInterval(function(){
        playedSeconds = Math.round(audios[a].currentTime) % 60;
        playedMinutes = (Math.round(audios[a].currentTime)-playedSeconds)/60;
        if(playedSeconds<10){
            playedSeconds = "0"+playedSeconds;
        }
        if(playedMinutes<10){
            playedMinutes = "0"+playedMinutes;
        }
        playedTime.textContent = `${playedMinutes}:${playedSeconds}`;
    },1000)
};

/* ------------------------- */

function posterChanger(a){
    poster.style.backgroundImage = `url(./assets/images/${a+1}.jpg)`;
    playlistPoster.style.backgroundImage = `url(./assets/images/${a+1}.jpg)`;
    cover.style.backgroundImage = `url(./assets/images/${a+1}.jpg)`;
};

/* ------------------------ */
function progressbarController(a){
    clearInterval(progressInterval);
    progressInterval = setInterval(function(){
        progress_inner_width = ((audios[a].currentTime / audios[a].duration)*100).toFixed(2);
        progressInner.style.width = progress_inner_width + "%";
    },100);
};

/* ----------------- */
function titleChanger(a){
    songTitle = songDetails[a].children[0].textContent;
    songAuthor = songDetails[a].children[1].textContent;
    title.forEach(function(elm){
        elm.textContent = songTitle;
    });
    author.forEach(function(elm){
        elm.textContent = songAuthor;
    });
};


/* switch to playlist */

up.onclick = ()=>{playlist.style.top = "0"};
down.onclick = ()=>{playlist.style.top = "100%"};

/* song selection */

songs.forEach(function(elm,index){
    elm.onclick = ()=>{
        playing?playController2(index):playController1(index);
        playingSongIndex = index;
        posterChanger(playingSongIndex);
        timeCalculation(playingSongIndex);
        progressbarController(playingSongIndex);
        titleChanger(playingSongIndex);
        playlist.style.top = "100%";

    };
});
/* disk rotation */

play_pause.onclick = ()=>{
    if(typeof playingSongIndex === "number"){
        playController1(playingSongIndex);
    }
};

/* stop the song */

play_stop.onclick = ()=>{
    audios[playingSongIndex].currentTime = 0;
    audios[playingSongIndex].pause();
    disk.style.animationPlayState = "paused";
    play_pause.setAttribute("class","fa-solid fa-circle-play");
    playing=false;
};

/* forward step */

forwardStep.onclick = function(){
    if(typeof playingSongIndex == "number" && !isLooped && !isShuffled){
        audios[playingSongIndex].currentTime=0;
        audios[playingSongIndex].pause();
        skipController(playingSongIndex+1);
        if(!playing){playController1(playingSongIndex)};
    }else if(typeof playingSongIndex == "number" && isLooped ){
        audios[playingSongIndex].currentTime=0;
        audios[playingSongIndex].play();
    }else if(typeof playingSongIndex == "number" && isShuffled ){
        audios[playingSongIndex].currentTime=0;
        audios[playingSongIndex].pause();
        let rand = Math.round((Math.random())*6);
        skipController(rand);
        if(!playing){playController1(playingSongIndex)};
    }
};

/* backward step */

backwardStep.onclick = function(){
    if(typeof playingSongIndex == "number"){
        audios[playingSongIndex].currentTime=0;
        audios[playingSongIndex].pause();
        skipController(playingSongIndex-1);
        if(!playing){playController1(playingSongIndex)};
    }
};

/* forward  */

forward.onclick = function(){
    audios[playingSongIndex].currentTime += 10;
};

/* backward */

backward.onclick = function(){
    audios[playingSongIndex].currentTime -= 10;
};

/* automatic next song playing */

setInterval(function(){
    if(typeof playingSongIndex == "number" && audios[playingSongIndex].currentTime == audios[playingSongIndex].duration){
        forwardStep.click();
    }
},1000);

/* loop */

loop.onclick = function(){
    this.classList.toggle("active");
    if(loop.classList.contains("active")){
        isLooped = true;
    }else{
        isLooped = false;
    }
};

/* shuffle */

shuffle.onclick = function(){
    this.classList.toggle("active");
    if(shuffle.classList.contains("active")){
        isShuffled = true;
    }else{
        isShuffled = false;
    }
};