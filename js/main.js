let musicPlayer = document.querySelector(".music-player-container");
let togglePlayer = document.querySelector(".toggle-player");

let trackInfo = document.querySelector(".track-info");
let trackName= document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");
let trackNav = document.querySelector(".track-nav");


let playPauseBtn = document.querySelector(".playpause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");

let trackIndex = 0;
let isPlaying = false;
let isHidden = true;

let currentTrack = document.createElement("audio");
let soundBars = document.querySelector(".sound-bars");

togglePlayer.addEventListener("click", function () {
    isHidden = !isHidden;
    if(isHidden) {
        musicPlayer.classList.remove("hide");
        togglePlayer.innerHTML = '<ion-icon name="remove-outline"></ion-icon>';
        trackInfo.style.transitionDelay = "0.4s";
        trackNav.style.transitionDelay = "0.4s";
    } else {
        musicPlayer.classList.add("hide");
        togglePlayer.innerHTML = '<ion-icon name="add-outline"></ion-icon>';
        trackInfo.style.transitionDelay = "0s";
        trackNav.style.transitionDelay = "0s";
    }
})

let soundBarsLottie = bodymovin.loadAnimation({
    container: soundBars,
    renderer: "svg",
    loop: true,
    autoPlay: false,
    path: "https://assets5.lottiefiles.com/packages/lf20_jJJl6i.json",
})

let trackList = [
    {
        name: "nature1",
        artist: "Nature",
        path: "./music/nature1.mp3",
    },
    {
        name: "nature2",
        artist: "Nature",
        path: "./music/nature2.mp3",
    },
    {
        name: "nature3",
        artist: "Nature",
        path: "./music/nature3.mp3",
    },
]

function loadTrack(trackIndex) {
    currentTrack.src = trackList[trackIndex].path;
    currentTrack.load();
    trackName.textContent = trackList[trackIndex].name;
    trackArtist.textContent = trackList[trackIndex].artist;
    currentTrack.addEventListener("ended", nextTrack);
}

loadTrack(trackIndex);

function playPauseTrack() {
    if(!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    currentTrack.play();
    isPlaying = true;
    playPauseBtn.innerHTML = '<ion-icon name="pause-sharp"></ion-icon>';
    soundBarsLottie.playSegments([0, 120], true);

}

function pauseTrack() {
    currentTrack.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<ion-icon name="play-sharp"></ion-icon>';
    soundBarsLottie.stop();
}

function nextTrack() {
    if (trackIndex < trackList.length - 1) trackIndex += 1;
    else trackIndex = 0;
    loadTrack(trackIndex);
    playTrack();
}

function prevTrack() {
    if (trackIndex > 0) trackIndex -= 1;
    else trackIndex = trackList.length - 1;
    loadTrack(trackIndex);
    playTrack();
}

playPauseBtn.addEventListener("click", playPauseTrack);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);