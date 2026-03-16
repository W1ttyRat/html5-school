const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let centerX = canvas.width / 2;

let trunkHeight = 100; // tüve kõrgus, ehk esimese haru pikkus
let branchLengthRatio = 0.75; // harude pikkuse ja eelkäija pikkuse suhe
let branchAngleDifference = 0.27; // harude nurga vahekaugus (radianites), mida kasutatakse harude joonistamisel
let branchingDepth = 10; // harude sügavus, ehk mitu korda harud jagunevad


// rekursiivne funktsioon, mis joonistab enda ja lapsharu, kuni "depth" on 0
function drawTree(x1, y1, x2, y2, branchLength, branchAngle, depth) {
    if (depth == 0)
        return;
    else {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.stroke();

        branchLength *= branchLengthRatio;

        function branch(angle) {
            let branchX2 = x2 + branchLength * Math.cos(angle);
            let branchY2 = y2 + branchLength * Math.sin(angle);
            drawTree(x2, y2, branchX2, branchY2, branchLength, angle, depth - 1);
        }

        // Right branch
        branch(branchAngle + branchAngleDifference);

        // Left branch
        branch(branchAngle - branchAngleDifference);
    }
}
// puhastab canvase ja joonistab puu uuesti alumisest keskpunktist
function redrawTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let x1 = centerX;
    let y1 = canvas.height;
    let x2 = centerX;
    let y2 = canvas.height - trunkHeight;
    drawTree(x1, y1, x2, y2, trunkHeight, -Math.PI / 2, branchingDepth);
}

// kuulab hiire liikumist canvasel ja uuendab harude pikkuse ja nurga vahekauguse suhteid vastavalt hiire asukohale
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();

    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    const nx = x / canvas.width;
    const ny = y / canvas.height;

    branchLengthRatio = 0.55 + nx * 0.30;
    branchAngleDifference = 0.15 + ny * 0.90;
    redrawTree();
});

redrawTree();