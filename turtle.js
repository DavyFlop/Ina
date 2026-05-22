const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let anim = null;
let step = 0;

// ================= RESET =================
function resetCanvas() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);
}

resetCanvas();

// ================= COEUR =================
function corazon(n) {
    let x = 16 * Math.pow(Math.sin(n), 3);
    let y = 13 * Math.cos(n)
        - 5 * Math.cos(2 * n)
        - 2 * Math.cos(3 * n)
        - Math.cos(4 * n);

    return { x, y };
}

// ================= DRAW HEART =================
function drawHeart(scale) {

    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1.5;

    let first = true;

    // ⚠️ toujours complet (plus de dépendance à progress)
    for (let i = 0; i < 100; i += 0.4) {

        let p = corazon(i / 10);

        let x = p.x * scale;
        let y = -p.y * scale;

        if (first) {
            ctx.moveTo(x, y);
            first = false;
        } else {
            ctx.lineTo(x, y);
        }
    }

    ctx.stroke();
}

// ================= COEURS EN SÉQUENCE =================
function drawHearts(progress) {

    // nombre de cœurs débloqués
    let maxHearts = Math.floor(progress / 15);

    if (maxHearts > 8) maxHearts = 8;

    const baseScale = 2.25; // espacement réduit (comme demandé)

    for (let i = 1; i <= maxHearts; i++) {

        let scale = i * baseScale;

        ctx.strokeStyle = `rgba(255,0,0,${1 - i * 0.1})`;

        drawHeart(scale); // ✔ plus de "progress" ici
    }
}

// ================= INA CENTRÉ =================
function drawINA() {

    ctx.strokeStyle = "hotpink";
    ctx.lineWidth = 5;

    const spacing = 110;

    const I = -spacing;
    const N = 0;
    const A = spacing;

    // I
    line(I, -80, I, 80);

    // N (corrigé + propre)
    line(N - 30, 80, N - 30, -80);
    line(N - 30, -80, N + 30, 80);
    line(N + 30, 80, N + 30, -80);

    // A
    line(A - 25, 80, A, -80);
    line(A, -80, A + 25, 80);
    line(A - 15, 10, A + 15, 10);
}

// ================= LINE =================
function line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// ================= FRAME =================
function drawFrame() {
    resetCanvas();

    drawHearts(step);
    drawINA();
}

// ================= ANIMATION =================
function animate() {

    step += 1.2; // 🔥 plus lent + fluide

    drawFrame();

    if (step < 120) {
        anim = requestAnimationFrame(animate);
    }
}

// ================= CONTROLS =================
function startDrawing() {
    cancelAnimationFrame(anim);
    step = 0;
    animate();
}

function resetDrawing() {
    cancelAnimationFrame(anim);
    step = 0;
    resetCanvas();
}