const earth = document.getElementById("earth");
const carWheel = document.getElementsByClassName("car-wheel");
const moon = document.getElementById("moon");
const moonBox = document.getElementById("moon-box");
let rotationEarth = 0;
let rotationMoon = 0;
let rotation = 0;

function rotateEarth() {
    rotationEarth -= 0.125;
    earth.style.transform = `rotate(${rotationEarth}deg)`;
}

function rotateCarWheel() {
    rotation += 0.25;
    for (let i = 0; i < carWheel.length; i++) {
        carWheel[i].style.transform = `rotate(${-rotation * 4}deg)`;
    }
}

function rotateMoon() {
    rotationMoon += 0.125;
    moonBox.style.transform = `rotate(${rotationMoon}deg)`;
    moon.style.transform = `rotate(${-rotationMoon * 0.5}deg)`;
}

setInterval(rotateEarth, 10);
setInterval(rotateCarWheel, 10);
setInterval(rotateMoon, 10);