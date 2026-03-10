let canvas;
let ctx;

window.onload = function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    testDraw();
}

function testDraw() {
    ctx.fillStyle = "red";
    ctx.fillRect(10, 10, 50, 100);

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 5;
    ctx.strokeRect(55, 60, 150, 50);

    ctx.fillStyle = "green";
    ctx.strokeStyle = "black";
    ctx.rect(200, 10, 50, 100);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(500, 10);
    ctx.lineTo(350, 110);
    ctx.lineTo(250, 110);
    ctx.closePath();
    ctx.fillStyle = "purple";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(500, 10);
    ctx.lineTo(700, 110);
    ctx.lineTo(600, 110);
    ctx.closePath();
    ctx.fillStyle = "purple";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(200, 200, 50, 0, 2 * Math.PI);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();

    ctx.clearRect(20, 20, 30, 30);
}