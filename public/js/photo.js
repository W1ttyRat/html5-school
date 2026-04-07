let photoTerm = 1;

window.onload = function () {
    document.getElementById("brightnessInput").addEventListener("input", setFilter);
    document.getElementById("contrastInput").addEventListener("input", setFilter);
    document.getElementById("saturationInput").addEventListener("input", setFilter);
    document.getElementById("hueRotateInput").addEventListener("input", setFilter);
    document.getElementById("blurInput").addEventListener("input", setFilter);
    document.getElementById("photos").addEventListener("click", changePhoto);
}

function setFilter() {
    let filter = "brightness(" + document.getElementById("brightnessInput").value + "%)";
    filter += " contrast(" + document.getElementById("contrastInput").value + "%)";
    filter += " saturate(" + document.getElementById("saturationInput").value + "%)";
    filter += " hue-rotate(" + document.getElementById("hueRotateInput").value + "deg)";
    filter += " blur(" + document.getElementById("blurInput").value + "px)";
    document.getElementById("photo1").style.filter = filter;
    document.getElementById("photo2").style.filter = filter;
}

function changePhoto() {
    if (photoTerm == 1) {
        document.getElementById("photo1").style.opacity = 0;
        document.getElementById("photo1").style.transition = "opacity 0.5s";
        document.getElementById("photo2").style.opacity = 1;
        document.getElementById("photo2").style.transition = "opacity 0.5s";
        photoTerm = 2;
    } else {
        document.getElementById("photo1").style.opacity = 1;
        document.getElementById("photo1").style.transition = "opacity 0.5s";
        document.getElementById("photo2").style.opacity = 0;
        document.getElementById("photo2").style.transition = "opacity 0.5s";
        photoTerm = 1;
    }

}