const colorPicker = document.querySelector("#colorPicker");
const eraseBtn = document.querySelector("#eraseBtn");
const randomColorBtn = document.querySelector("#randomColorBtn");
const rainbowBtn = document.querySelector("#rainbowBtn");
const shadingBtn = document.querySelector("#shadingBtn");
const clearBtn = document.querySelector("#clearBtn");
const canvas = document.querySelector("#canvas");
const settings = document.querySelector("#settings");
const outputSize = document.querySelector("#outputSize");
const inputSize = document.querySelector("#inputSize");
const gridBtn = document.querySelector("#gridBtn");
const themeBtn = document.querySelector("#themeBtn");
const buttons = document.querySelectorAll("button");
const clickSound = document.querySelector("#clickSound");

let canvasSize = 360;
let pixelSize = inputSize.value;
let isGrid = true;
let isShading = false;

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

function setupCanvas(pixelSize) {
  settings.style.width = canvasSize + "px";
  canvas.style.width = canvasSize + "px";
  canvas.style.height = canvasSize + "px";
  outputSize.textContent = `${pixelSize} x ${pixelSize}`;
  const container = document.createElement("div");
  container.classList.add("container");
  canvas.appendChild(container);
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

function clearCanvas() {
  const oldCanvas = document.querySelector(".container");
  canvas.removeChild(oldCanvas);
}

function resizeCanvas() {
  inputSize.addEventListener("input", () => {
    pixelSize = inputSize.value;
    outputSize.textContent = `${pixelSize} x ${pixelSize}`;
    createCanvas();
  });
  pickRandomColor();
}

function createCanvas() {
  clearCanvas();
  setupCanvas(pixelSize);
  if (isGrid === true) {
    toggleGrid();
  }
}

function coloring(color) {
  canvas.addEventListener("mouseover", (e) => {
    if (!(e.target === canvas)) {
      e.target.style.backgroundColor = color;
    }
  });
}

function pickRandomColor() {
  randomColorBtn.style.backgroundColor = getRandomColor(0, 255);
  coloring(randomColorBtn.style.backgroundColor);
}

function rainbowMode() {
  canvas.addEventListener("mouseover", (e) => {
    if (!(e.target === canvas)) {
      e.target.style.backgroundColor = getRandomColor(50, 255);
    }
  });
}

function shadingMode() {
  const pixels = document.querySelectorAll(".pixel");
  if (!isShading) {
    pixels.forEach((pixel) => {
      let opacity = 0.1;
      pixel.addEventListener("mouseover", () => {
        pixel.style.backgroundColor = "#fff";
        pixel.style.opacity = opacity;
        opacity += 0.1;
      });
    });
  }
  if (isShading) {
    pixels.forEach((pixel) => {
      pixel.addEventListener("mouseover", () => {
        pixel.style.opacity = 1;
      });
    });
  }
  shadingBtn.classList.toggle("indicator");
  isShading = !isShading;
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
  pickRandomColor();
}

colorPicker.onclick = () => {
  clickSound.play();
  colorPicker.addEventListener("change", () => {
    coloring(colorPicker.value);
  });
}

clearBtn.onclick = () => {
  createCanvas();
}

eraseBtn.onclick = () => coloring("#fff");
rainbowBtn.onclick = () => rainbowMode();
randomColorBtn.onclick = () => pickRandomColor();
shadingBtn.onclick = () => shadingMode();
themeBtn.onclick = () => toggleTheme();
gridBtn.onclick = () => {
  toggleGrid();
  isGrid = !isGrid;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
  })
})
