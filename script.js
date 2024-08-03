const colorPicker = document.querySelector("#colorPicker");
const eraseBtn = document.querySelector("#eraseBtn");
const rainbowBtn = document.querySelector("#rainbowBtn");
const grayscaleBtn = document.querySelector("#grayscaleBtn");
const shadingBtn = document.querySelector("#shadingBtn");
const clearBtn = document.querySelector("#clearBtn");
const grid = document.querySelector("#grid");
const settings = document.querySelector("#settings");
const outputSize = document.querySelector("#outputSize");
const inputSize = document.querySelector("#inputSize");
const gridBtn = document.querySelector("#gridBtn");
const themeBtn = document.querySelector("#themeBtn");

let canvasSize = 360;
let pixelSize = inputSize.value;
let isGrid = true;

function setupCanvas(pixelSize) {
  settings.style.width = canvasSize + "px";
  grid.style.width = canvasSize + "px";
  grid.style.height = canvasSize + "px";
  outputSize.textContent = `${pixelSize} x ${pixelSize}`;
  const container = document.createElement("div");
  container.classList.add("container");
  grid.appendChild(container);
  for (let i = 0; i < pixelSize; i++) {
    const row = document.createElement("div");
    container.appendChild(row);
    row.classList.add("row");
    for (let j = 0; j < pixelSize; j++) {
      const pixel = document.createElement("div");
      pixel.classList.add("pixel");
      pixel.style.backgroundColor = "#fff";
      pixel.style.width = canvasSize / pixelSize + "px";
      pixel.style.height = canvasSize / pixelSize + "px";
      row.appendChild(pixel);
    }
  }
}

function resizeCanvas() {
  inputSize.addEventListener("input", () => {
    pixelSize = inputSize.value;
    outputSize.textContent = `${pixelSize} x ${pixelSize}`;
    clearCanvas();
    setupCanvas(pixelSize);
  });
  drawPixel(colorPicker.value);
}

function clearCanvas() {
  const oldCanvas = document.querySelector(".container");
  grid.removeChild(oldCanvas);
}

function getRandomColor(...range) {
  let min, max;
  if (range.length === 2) {
    min = range[0];
    max = range[1];
  } else if (range.length === 1) {
    if (range[0] > 0) {
      min = 0;
      max = range[0];
    } else if (range[0] <= 0) {
      let c = Math.round(Math.random() * 255);
      return `rgb(${c}, ${c}, ${c})`;
    }
  } else if (!(range.length === 2)) {
    return `rgb(255, 255, 255)`;
  }
  let r = Math.round(Math.random() * (max - min)) + min;
  let g = Math.round(Math.random() * (max - min)) + min;
  let b = Math.round(Math.random() * (max - min)) + min;
  return `rgb(${r}, ${g}, ${b})`;
}

function drawPixel(color) {
  grid.addEventListener("mouseover", (e) => {
    e.target.style.backgroundColor = color;
  });
}

function rainbowMode() {
  grid.addEventListener("mouseover", (e) => {
    e.target.style.backgroundColor = getRandomColor(0, 255);
  });
}

function grayscaleMode() {
  grid.addEventListener("mouseover", (e) => {
    e.target.style.backgroundColor = getRandomColor(0);
  });
}

function shadingMode() {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    let opacity = 0.1;
    pixel.addEventListener("mouseover", () => {
      pixel.style.backgroundColor = "#fff";
      pixel.style.opacity = opacity;
      opacity += 0.1;
    });
  });
}

function toggleGrid() {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.classList.toggle("pixel-grid");
  });
}

function toggleTheme() {
  const themeSwitch = document.body;
  themeSwitch.classList.toggle("dark");
}

window.onload = () => {
  setupCanvas(pixelSize);
  resizeCanvas();
  toggleGrid();
  drawPixel(colorPicker.value);
}

colorPicker.onclick = () => {
  colorPicker.addEventListener("change", () => {
    drawPixel(colorPicker.value);
  });
}

eraseBtn.onclick = () => {
  drawPixel("#fff");
}

clearBtn.onclick = () => {
  clearCanvas();
  setupCanvas(pixelSize);
  if (isGrid === true) {
    toggleGrid();
  }
}

rainbowBtn.onclick = () => rainbowMode();
grayscaleBtn.onclick = () => grayscaleMode();
shadingBtn.onclick = () => shadingMode();
themeBtn.onclick = () => toggleTheme();
gridBtn.onclick = () => {
  toggleGrid();
  isGrid = !isGrid;
}
