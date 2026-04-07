const musicURL = "assets/valss_orn_kevade_orig.mp3";
let music = new Audio();

let movie;
let titleMode = "showing"; // hidden, showing, disabled
let titleNum = 0;

window.onload = function () {
    initMusic();
    initVideo();
}

function initVideo() {
    movie = document.getElementById("ifiVideo");
    movie.textTracks[titleNum].mode = titleMode;
    movie.textTracks[titleNum].addEventListener("cuechange", displaySubtitle);
    document.getElementById("titleBtn").addEventListener("click", changeSubtitleLang);
}

function changeSubtitleLang() {
    movie.textTracks[titleNum].mode = "disabled";
    titleNum++;
    titleNum = titleNum % movie.textTracks.length;
    movie.textTracks[titleNum].mode = titleMode;
}

function initMusic() {
    music.addEventListener("durationchange", musicInfo);
    music.addEventListener("canplaythrough", preparePlay);
    music.src = musicURL;
    document.getElementById("volBtn").addEventListener("input", setVol);
    document.getElementById("speedBtn").addEventListener("input", setSpeed);
}

function displaySubtitle() {
    let currentSubtitle = "";
    if (movie.textTracks[titleNum].activeCues.length > 0) {
        for (let i = 0; i < movie.textTracks[titleNum].activeCues.length; i++) {
            currentSubtitle += movie.textTracks[titleNum].activeCues[i].id + ": " +
            movie.textTracks[titleNum].activeCues[i].text + "<br>";
        }
    }
    document.getElementById("subtitlePlace").innerHTML = currentSubtitle;
}

function preparePlay() {
    music.removeEventListener("canplaythrough", preparePlay);
    document.getElementById("musicBtn").innerHTML = "Mängi muusikat!";
    document.getElementById("musicBtn").addEventListener("click", toggleMusic);
    //music.addEventListener("timeupdate", musicInfo);
}
    
function musicInfo(e) {
    if (e.type == "durationchange") {
        music.removeEventListener("durationchange", musicInfo);
        document.getElementById("musicPosBtn").max = e.target.duration;
        document.getElementById("musicPosBtn").addEventListener("input", setPos);
        music.addEventListener("timeupdate", musicInfo);
    } else if (e.type == "timeupdate") {
        document.getElementById("musicPos").innerHTML = e.target.currentTime.toFixed(3);
        document.getElementById("musicPosBtn").value = e.target.currentTime;
    }
}

function toggleMusic() {
    if(music.paused) {
        music.play();
        document.getElementById("musicBtn").innerHTML = "Peata muusika!";
    } else {
        music.pause();
        document.getElementById("musicBtn").innerHTML = "Jätka muusika mängimist!";
    }
}

function setPos(e) {
    music.currentTime = e.target.value;
}

function setVol(e) {
    music.volume = e.target.value;
}

function setSpeed(e) {
    music.playbackRate = e.target.value;
}