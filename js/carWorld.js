const earth = document.getElementById("earth");
const car = document.getElementById("car");
let rotation = 0;

function rotateEarth() {
    rotation -= 0.25;
    earth.style.transform = `rotate(${rotation}deg)`;
}



setInterval(rotateEarth, 10);
