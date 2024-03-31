const canvas = document.getElementById("myCanvas");
const reset = document.querySelector(".reset");
const ctx = canvas.getContext("2d");
let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  canvas.classList.add("pen");
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }
});

canvas.addEventListener("mouseup", () => {
  canvas.classList.remove("pen");

  isDrawing = false;
});
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  isDrawing = true;
  [lastX, lastY] = [e.clientX, e.clientY];
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();

  if (isDrawing) {
    canvas.classList.add("pen");
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    [lastX, lastY] = [e.clientX, e.clientY];
  }
});

canvas.addEventListener("touchend", (e) => {
  e.preventDefault();

  canvas.classList.remove("pen");

  isDrawing = false;
});

reset.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
