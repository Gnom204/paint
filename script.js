const canvas = document.getElementById("canvas");
const resetBtn = document.querySelector(".reset");
const ctx = canvas.getContext("2d");
let drawing = false;
let lastTime = true;
let isDraw = false;

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
canvas.addEventListener(
  "touchmove",
  function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX + 10,
      clientY: touch.clientY + 10,
    });
    canvas.dispatchEvent(mouseEvent);
  },
  false
);

function startDrawing(e) {
  drawing = true;
  if (!isDraw) {
    setTimeout(() => {
      lastTime = false;
    }, 3000);
  }
  draw(e);
}

function draw(e) {
  e.preventDefault();
  e.stopPropagation();
  if (!drawing) return;
  if (!lastTime) return;
  isDraw = true;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = "black";

  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function stopDrawing() {
  drawing = false;
  ctx.beginPath();
}

function reset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lastTime = true;
  isDraw = false;
}

resetBtn.addEventListener("click", reset);
