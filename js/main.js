// ADDING ALL THE SONGS TO THE LIST

let songContainer = document.querySelector(".mid .song-container");

for(let i=0; i<allMusic.length; i++){
    let songCard = document.createElement("div");
    songCard.classList.add("song");

    let songDetails =`  <div class="song">
                            <div class="song-img">
                                <img src=${allMusic[i].img} alt="${allMusic[i].name}">
                                <div class="play-button">
                                    <i class="fas fa-play"></i>
                                </div>
                            </div>
                            <div class="song-name">${allMusic[i].name}</div>
                            <div class="song-artist">${allMusic[i].artist}</div>
                        </div>
                    `;
                        
    songCard.innerHTML = songDetails;
    songContainer.appendChild(songCard);
}

// MENU SELECTION

let menuItems = document.querySelectorAll(".left .menu .l-item");
let currentItem = 0;

for(let i=0; i<menuItems.length; i++){
    menuItems[i].addEventListener("click",function(){
        menuItems[currentItem].classList.remove("l-active");
        currentItem = i;
        menuItems[currentItem].classList.add("l-active");
    });
}


// MUSIC PLAYER WORKING

let play = document.querySelectorAll(".song .song-img .play-button");
let playAudio = document.querySelector(".right .music-player .progress-area .progress-bar #play-audio");

let musicIndex = 0, check=0;
playAudio.src = `./music/${allMusic[musicIndex].src}.mp3`;
nowPlaying(musicIndex);


let prev = document.querySelector(".right .music-player .controls .prev")
let playButton = document.querySelector(".right .music-player .controls .play")
let next = document.querySelector(".right .music-player .controls .next")

for(let i=0; i<play.length; i++){
    play[i].addEventListener("click", function(){
        check=1;
        musicIndex=i;
        nowPlaying();
        playAudio.src = `./music/${allMusic[musicIndex].src}.mp3`;
        playButton.innerHTML = `<i class="fas fa-pause"></i>`;
        playAudio.play();
    });
}

function nowPlaying(){
    document.querySelector(".right .music-player .play-name").innerHTML = allMusic[musicIndex].name;
    document.querySelector(".right .music-player .play-artist").innerHTML = allMusic[musicIndex].artist;
    document.querySelector(".right .music-player .play-img img").src = allMusic[musicIndex].img;
}

playButton.addEventListener("click", function(){
    if(check===1){
        check=0;
        playButton.innerHTML = `<i class="fas fa-play"></i>`;
        playAudio.pause();
    }
    else{
        check=1;
        playButton.innerHTML = `<i class="fas fa-pause"></i>`;
        playAudio.play();
    }
});

prev.addEventListener("click",function(){
    if(musicIndex===0){
        musicIndex=allMusic.length-1;
    }
    else{
        musicIndex-=1;
    }
    nowPlaying(musicIndex);
    playAudio.src = `./music/${allMusic[musicIndex].src}.mp3`;
    playButton.innerHTML = `<i class="fas fa-pause"></i>`;
    playAudio.play();
});

next.addEventListener("click",function(){
    if(musicIndex===allMusic.length-1){
        musicIndex=0;
    }
    else{
        musicIndex+=1;
    }
    nowPlaying(musicIndex);
    playAudio.src = `./music/${allMusic[musicIndex].src}.mp3`;
    playButton.innerHTML = `<i class="fas fa-pause"></i>`;
    playAudio.play();
});



progressArea = document.querySelector(".right .music-player .progress-area"),
progressBar = progressArea.querySelector(".right .music-player .progress-area .progress-bar"),

// update progress bar width according to music current time
playAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime; //getting playing song currentTime
    const duration = e.target.duration; //getting playing song total duration
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    let musicCurrentTime = progressArea.querySelector(".song-timer .current-time"),
    musicDuartion = progressArea.querySelector(".song-timer .max-duration");
    playAudio.addEventListener("loadeddata", ()=>{
      // update song total duration
      let mainAdDuration = playAudio.duration;
      let totalMin = Math.floor(mainAdDuration / 60);
      let totalSec = Math.floor(mainAdDuration % 60);
      if(totalSec < 10){ //if sec is less than 10 then add 0 before it
        totalSec = `0${totalSec}`;
      }
      musicDuartion.innerText = `${totalMin}:${totalSec}`;
    });
    // update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){ //if sec is less than 10 then add 0 before it
      currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
  });
  // update playing song currentTime on according to the progress bar width
  progressArea.addEventListener("click", (e)=>{
    let progressWidth = progressArea.clientWidth; //getting width of progress bar
    let clickedOffsetX = e.offsetX; //getting offset x value
    let songDuration = playAudio.duration; //getting song total duration
    
    playAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playAudio.play();
  });


  //code for what to do after song ended
playAudio.addEventListener("ended", ()=>{
    next.click();
});
