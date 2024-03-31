const canvas = document.getElementById("canvas");
const resetBtn = document.querySelector(".reset");
const timer = document.querySelector(".timer");
const second = document.querySelector(".second");
const milSecond = document.querySelector(".milsecond");
const ctx = canvas.getContext("2d");

let times = [500, 1000, 1500, 2000, 2500, 3000];
let drawing = false;
let lastTime = true;
let isDraw = false;
let timerInterval, timerset, time;

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

time = randomTime(times);
let endTime = Date.now() + time;
let remainingTime = endTime - Date.now();
let futseconds = Math.floor(remainingTime / 1000);
let futmilliseconds = remainingTime % 1000;

second.textContent = `0${futseconds}`;
milSecond.textContent = futmilliseconds;

function isInteger(num) {
  return (num ^ 0) === num;
}

function calc(sec, msec) {
  milSecond.textContent = msec.toString();
  second.textContent = sec;
  while (sec === 0) {
    if (msec <= 0) {
      sec--;
      msec = 99;
      milSecond.textContent = msec;
      second.textContent = sec;
    } else {
      msec--;
      milSecond.textContent = msec;
      second.textContent = sec;
    }
    clearInterval();
  }
}

function startDrawing(e) {
  drawing = true;

  if (!isDraw) {
    countdownTimer(time);
    timerset = setTimeout(() => {
      lastTime = false;
    }, time);
  }
  draw(e);
}

function countdownTimer(milliseconds) {
  let endTime = Date.now() + milliseconds;

  timerInterval = setInterval(() => {
    let remainingTime = endTime - Date.now();
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      second.textContent = "00";
      milSecond.textContent = "00";
    } else {
      let seconds = Math.floor(remainingTime / 1000);
      let milliseconds = remainingTime % 1000;
      second.textContent = seconds;
      milSecond.textContent = milliseconds;
    }
  }, 1); // Проверяем каждую миллисекунду
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
  time = randomTime(times);

  let endTime = Date.now() + time;
  let remainingTime = endTime - Date.now();
  let futseconds = Math.floor(remainingTime / 1000);
  let futmilliseconds = remainingTime % 1000;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lastTime = true;
  isDraw = false;
  clearInterval(timerInterval);
  clearTimeout(timerset);
  second.textContent = `0${futseconds}`;
  milSecond.textContent = futmilliseconds;
}

function randomTime(items) {
  let item = items[Math.floor(Math.random() * items.length)];
  return item;
}

resetBtn.addEventListener("click", reset);
