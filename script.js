let canvasSize = 360;
// let currentColor = "#21242c";

const colorPicker = document.querySelector("#color-picker");
const eraseBtn = document.querySelector("#white");
const rainbowBtn = document.querySelector("#rainbow");
const grayscaleBtn = document.querySelector("#grayscale");
const clearBtn = document.querySelector("#clear");
const themeBtn = document.querySelector("#content");
const grid = document.querySelector("#grid");

function drawRainbow() {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.addEventListener("mouseover", (e) => {
      currentColor = `rgb(${random(256)}, ${random(256)}, ${random(256)})`;
      e.target.style.backgroundColor = currentColor;
    })
  })
}

function setupCanvas(rowNum) {
  const container = document.createElement("div");
  container.classList.add("container");
  grid.appendChild(container);
  for (let i = 0; i < rowNum; i++) {
    const row = document.createElement("div");
    container.appendChild(row);
    row.classList.add("row");
    for (let j = 0; j < rowNum; j++) {
      const pixel = document.createElement("div");
      pixel.classList.add("pixel");
      pixel.style.backgroundColor = "#fff";
      pixel.style.width = canvasSize / rowNum + "px";
      pixel.style.height = canvasSize / rowNum + "px";
      row.appendChild(pixel);
    }
  }
}

const input = document.querySelector("#size-input");
const value = document.querySelector("#size-value");

window.addEventListener("load", () => {
  setTheme();
  setupCanvas(input.value);
  value.textContent = `${input.value} x ${input.value}`
  resizeCanvas();
  drawPixel(colorPicker.value);
})

function clearCanvas() {
  const oldCanvas = document.querySelector(".container");
  grid.removeChild(oldCanvas);
}

function resizeCanvas() {
  input.addEventListener("input", () => {
    value.textContent = `${input.value} x ${input.value}`;
    clearCanvas();
    setupCanvas(input.value);
  })
  drawPixel(colorPicker.value);
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
      return `rgb(${c}, ${c}, ${c})`
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
  })
}

colorPicker.onclick = () => {
  colorPicker.addEventListener("change", () => {
    currentColor = colorPicker.value;
    drawPixel(currentColor);
  })
}

eraseBtn.onclick = () => {
  currentColor = "#fff";
  drawPixel(currentColor);
}

rainbowBtn.onclick = () => {
  grid.addEventListener("mouseover", (e) => {
    e.target.style.backgroundColor = getRandomColor(0, 255);
  })
}

clearBtn.onclick = () => {
  // const pixels = document.querySelectorAll(".pixel");
  // pixels.forEach((pixel) => {
  //   pixel.style.backgroundColor = "#fff";
  // })

  clearCanvas();
  setupCanvas(input.value);
}

grayscaleBtn.onclick = () => {
  // grid.addEventListener("mouseover", (e) => {
  //   e.target.style.backgroundColor = getRandomColor(0);
  // })

  drawGrayscale();
}

function drawGrayscale() {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    let opacity = 0.1;
    pixel.addEventListener("mouseover", () => {
      pixel.style.opacity = opacity;
      opacity += 0.1;
    });
  })
}

let isDarkTheme = true;

const toggleTheme = document.querySelector("#theme");
toggleTheme.onclick = () => {
  setTheme();
}

function setTheme() {
  if (isDarkTheme) {
    themeBtn.classList.toggle("dark");
    isDarkTheme = false;
  } else if (isDarkTheme === false) {
    themeBtn.classList.toggle("dark");
  }
}
