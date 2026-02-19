const earth = document.getElementById("earth");
const carWheel = document.getElementsByClassName("car-wheel");
let rotation = 0;

function rotate() {
    rotation -= 0.25;
    earth.style.transform = `rotate(${rotation}deg)`;
    for (let i = 0; i < carWheel.length; i++) {
        carWheel[i].style.transform = `rotate(${-rotation * 4}deg)`;
    }
}



setInterval(rotate, 10);
