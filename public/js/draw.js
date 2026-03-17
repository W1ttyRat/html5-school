let canvas, ctx;

window.onload = function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    //canvas.addEventListener("click", addSpot);
    canvas.addEventListener("pointerdown", startDraw);
    canvas.addEventListener("pointerup", stopDraw);
    canvas.addEventListener("pointerout", stopDraw);
    document.getElementById("lwInput").addEventListener("input", setLW);
    document.getElementById("lwInput2").addEventListener("input", setLW2);
    document.getElementById("saveBtn").disabled = true;
}

function setLW(e) {
    document.getElementById("lwInput2").value = e.target.value;
}

function setLW2(e) {
    document.getElementById("lwInput").value = e.target.value;
}

function startDraw(e) {
    ctx.lineWidth = document.getElementById("lwInput").value;
    ctx.strokeStyle = HEXtoRGBa();
    ctx.linecap = "round";
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    canvas.addEventListener("pointermove", doDraw);
}

function stopDraw() {
    ctx.closePath();
    canvas.removeEventListener("pointermove", doDraw);
    document.getElementById("saveBtn").disabled = false;
    document.getElementById("saveBtn").style.backgroundColor = "green";
    document.getElementById("saveBtn").addEventListener("click", savePic);
}

function doDraw(e) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    if (document.getElementById("saveBtn").disabled) {
        document.getElementById("saveBtn").disabled = false;
        document.getElementById("saveBtn").addEventListener("click", savePic);
    }
}

function savePic() {
    const canvasUrl = canvas.toDataURL();
    let saveLink = document.createElement("a");
    saveLink.href = canvasUrl;
    saveLink.download = "joonistus.png";
    saveLink.click();
}

function addSpot(e) {
    //const x = e.clientX - e.target.offsetLeft + window.scrollX;
    //const y = e.clientY - e.target.offsetTop + window.scrollY;
    //const x = e.offsetX;
    //const y = e.offsetY;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function HEXtoRGBa() {
    let hex = document.getElementById("lColor").value;
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    let a = document.getElementById("laInput").value;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}