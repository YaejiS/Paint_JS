const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

canvas.width = 700;
canvas.height = 700;

context.strokeStyle = "black";
context.lineWidth = 5;

let painting = false;
let filling = false;

function stopPainting() {
   painting = false;
}

function startPainting() {
   painting = true;
}

function onMouseMove(event) {
   const x = event.offsetX;
   const y = event.offsetY;
   if (!painting) {
      context.beginPath();
      context.moveTo(x, y);
   } else {
      context.lineTo(x, y);
      context.stroke();
   }
}

// function onMouseDown(event) {
//    painting = true;
// }

// function onMouseUp(evnet) {
//    stopPainting();
// }

function handleColorClick(event) {
   // console.log(event.target.style);
   const color = event.target.style.backgroundColor;
   // console.log(color);
   context.strokeStyle = color;
}

function handleRangeChange(event) {
   const size = event.target.value;
   context.lineWidth = size;
   // console.log(event.target.value);
}

function handleModeClick(event) {
   if (filling === true) {
      filling = false;
      mode.innerText = "Fill";
   } else {
      filling = true;
      mode.innerText = "Paint";
   }
}

if (canvas) {
   canvas.addEventListener("mousemove", onMouseMove);
   canvas.addEventListener("mousedown", startPainting);
   canvas.addEventListener("mouseup", stopPainting);
   canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
// console.log(Array.from(colors));

if (range) {
   range.addEventListener("input", handleRangeChange);
}

if (mode) {
   mode.addEventListener("click", handleModeClick);
}