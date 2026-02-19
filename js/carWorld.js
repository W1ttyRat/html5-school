const earth = document.getElementById("earth");
const carWheel = document.getElementsByClassName("car-wheel");
const moon = document.getElementById("moon");
const moonBox = document.getElementById("moon-box");
let rotationEarth = 0;
let rotation = 0;
let rotationMoon = 0;

let rotationEarthDegree = 0.125;
let rotationMoonDegree = 0.125;

let isMoonReversed = false;
let isEarthReversed = true;


function rotateEarth() {
    rotationEarth -= rotationEarthDegree;
    earth.style.transform = `rotate(${rotationEarth}deg)`;
}

function rotateCarWheel() {
    rotation += 0.25;
    for (let i = 0; i < carWheel.length; i++) {
        carWheel[i].style.transform = `rotate(${-rotation * 4}deg)`;
    }
}

function rotateMoon() {
    rotationMoon += rotationMoonDegree;
    moonBox.style.transform = `rotate(${rotationMoon}deg)`;
    moon.style.transform = `rotate(${-rotationMoon * 0.5}deg)`;
}

function moveMoonFaster() {
    rotationMoonDegree += 0.125;
}

function moveMoonSlower() {
    rotationMoonDegree -= 0.125;
}



function turnMoonAround() {
    rotationMoonDegree = -rotationMoonDegree;
    isMoonReversed = !isMoonReversed;
    
    // Swap the button functionality
    const fasterBtn = document.getElementById("fasterMoon");
    const slowerBtn = document.getElementById("slowerMoon");
    
    if (isMoonReversed) {
        fasterBtn.removeEventListener("click", moveMoonFaster);
        slowerBtn.removeEventListener("click", moveMoonSlower);
        fasterBtn.addEventListener("click", moveMoonSlower);
        slowerBtn.addEventListener("click", moveMoonFaster);
    } else {
        fasterBtn.removeEventListener("click", moveMoonSlower);
        slowerBtn.removeEventListener("click", moveMoonFaster);
        fasterBtn.addEventListener("click", moveMoonFaster);
        slowerBtn.addEventListener("click", moveMoonSlower);
    }
}

function moveEarthFaster() {
    rotationEarthDegree += 0.125;
}

function moveEarthSlower() {
    rotationEarthDegree -= 0.125;
}

function turnEarthAround() {
    rotationEarthDegree = -rotationEarthDegree;
    isEarthReversed = !isEarthReversed;
    
    // Swap the button functionality
    const fasterBtn = document.getElementById("fasterEarth");
    const slowerBtn = document.getElementById("slowerEarth");
    
    if (isEarthReversed) {
        fasterBtn.removeEventListener("click", moveEarthFaster);
        slowerBtn.removeEventListener("click", moveEarthSlower);
        fasterBtn.addEventListener("click", moveEarthSlower);
        slowerBtn.addEventListener("click", moveEarthFaster);
    } else {
        fasterBtn.removeEventListener("click", moveEarthSlower);
        slowerBtn.removeEventListener("click", moveEarthFaster);
        fasterBtn.addEventListener("click", moveEarthFaster);
        slowerBtn.addEventListener("click", moveEarthSlower);
    }
}


setInterval(rotateEarth, 10);
setInterval(rotateCarWheel, 10);
setInterval(rotateMoon, 10);

document.getElementById("fasterMoon").addEventListener("click", moveMoonFaster);
document.getElementById("slowerMoon").addEventListener("click", moveMoonSlower);
document.getElementById("rotateMoon").addEventListener("click", turnMoonAround);

document.getElementById("fasterEarth").addEventListener("click", moveEarthFaster);
document.getElementById("slowerEarth").addEventListener("click", moveEarthSlower);
document.getElementById("rotateEarth").addEventListener("click", turnEarthAround);