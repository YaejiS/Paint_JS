const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");

canvas.width = 700;
canvas.height = 700;
context.strokeStyle = "black";
context.luneWidth = 2.5;

let painting = false;

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

if (canvas) {
   canvas.addEventListener("mousemove", onMouseMove);
   canvas.addEventListener("mousedown", startPainting);
   canvas.addEventListener("mouseup", stopPainting);
   canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
// console.log(Array.from(colors));