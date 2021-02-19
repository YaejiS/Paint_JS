const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const INITIAL_COLOR = "black";
const CANVAS_SIZE = 700;
const saveBtn = document.getElementById("jsSave");

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

context.fillStyle = "white";
context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
context.strokeStyle = INITIAL_COLOR;
context.lineWidth = 5;

if (range) {
   range.addEventListener("input", handleRangeChange);
}

if (mode) {
   mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
   saveBtn.addEventListener("click", handleSaveClick);
}

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

function handleColorClick(event) {
   // console.log(color);
   const color = event.target.style.backgroundColor;
   context.strokeStyle = color;
   context.fillStyle = color;
}

function handleRangeChange(event) {
   // console.log(event.target.value);
   const size = event.target.value;
   context.lineWidth = size;
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

function handleCanvasClick() {
   if (filling) {
      context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
   }
}

function handleCM(event) {
   // console.log(event);
   event.preventDefault();
}

function handleSaveClick() {
   const image = canvas.toDataURL();
   // console.log(image);
   const link = document.createElement("a");
   link.href = image;
   link.download = "PaintImage"; 
   link.click();
}

if (canvas) {
   canvas.addEventListener("mousemove", onMouseMove);
   canvas.addEventListener("mousedown", startPainting);
   canvas.addEventListener("mouseup", stopPainting);
   canvas.addEventListener("mouseleave", stopPainting);
   canvas.addEventListener("click", handleCanvasClick);
   canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
