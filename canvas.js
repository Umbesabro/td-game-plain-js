const canvas = document.getElementById("canvas1");
canvas.width = 800;
canvas.height = 500;
let canvasPosition = canvas.getBoundingClientRect();

canvas.position = canvasPosition;

export default canvas;