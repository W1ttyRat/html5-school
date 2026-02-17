
const hourHand = document.querySelector('#hourHand');
const minuteHand = document.querySelector('#minuteHand');
const secondHand = document.querySelector('#secondHand');


function updateHands() {

    const date = new Date();

    
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const hourDegrees = (hours / 12) * 360 + (minutes / 60) * 30;
    const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
    const secondDegrees = (seconds / 60) * 360;

    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;

    console.log(`Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`);
}

setInterval(updateHands, 1000);