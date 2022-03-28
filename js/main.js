
let songContainer = document.querySelector(".song-container");

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


let musicIndex = 1;

let play = document.querySelectorAll(".song .song-img .play-button");
let playAudio = document.querySelector(".progress-bar #play-audio");

for(let i=0; i<play.length; i++){
    play[i].addEventListener("click", function(){
    playAudio.src = `./music/${allMusic[i].src}.mp3`;
    playAudio.play();
    });
}