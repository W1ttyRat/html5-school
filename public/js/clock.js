function updateClock() {

    const hourHand = document.querySelector('#hourHand');
    const minuteHand = document.querySelector('#minuteHand');
    const secondHand = document.querySelector('#secondHand');

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

    document.querySelector('.hours').innerHTML = hours.toString().padStart(2, '0');
    document.querySelector('.minutes').innerHTML = minutes.toString().padStart(2, '0');
    document.querySelector('.seconds').innerHTML = seconds.toString().padStart(2, '0');

    // console.log(`Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`);
}

window.onload = updateClock;
setInterval(updateClock, 1000);