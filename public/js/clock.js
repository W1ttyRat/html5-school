let timeSpeaker = new Audio();
const speakURL = "assets/valss_orn_kevade_orig.mp3";
let wordsToSay = [];

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

function tellTime() {
    document.getElementById("speakBtn").disabled = true;
    const timeNow = new Date();
    wordsToSay.push("kell on");
    numToWords(timeNow.getHours());
    wordsToSay.push("ja");
    numToWords(timeNow.getMinutes());
    // console.log(wordsToSay);
    timeSpeaker.addEventListener("ended", speak);
}

function numToWords(num) {
    if(num <= 10) {
        wordsToSay.push(num);
    } else {
        if(num < 20) {
            wordsToSay.push(num%10);
            wordsToSay.push("teist");
        } else {
            wordsToSay.push(Math.floor(num/10));
            wordsToSay.push("kymmend");
            if(num%10 > 0) {
                wordsToSay.push(num%10);
            }
        }
    }
}

function speak() {
    console.log(wordsToSay);
    if (wordsToSay.length > 0) {
        timeSpeaker.src = speakURL + wordsToSay[0] + ".mp3";
        timeSpeaker.play();
        wordsToSay.shift();
    } else {
        timeSpeaker.removeEventListener("ended", speak);
        document.getElementById("speakBtn").disabled = false;
    }
}

window.onload = function() {
    updateClock();
    document.getElementById("speakBtn").addEventListener("click", tellTime);
};
setInterval(updateClock, 1000);