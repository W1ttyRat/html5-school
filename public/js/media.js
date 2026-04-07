const musicURL = "assets/valss_orn_kevade_orig.mp3";
let music = new Audio();

window.onload = function () {
    initMusic();
}

function initMusic() {
    music.addEventListener("durationchange", musicInfo);
    music.addEventListener("canplaythrough", preparePlay);
    music.src = musicURL;
    document.getElementById("volBtn").addEventListener("input", setVol);
    document.getElementById("speedBtn").addEventListener("input", setSpeed);
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