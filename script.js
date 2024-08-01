let canvasSize = 360;
let rowNum;

const body = document.querySelector("body");
const defaultGrid = document.querySelector("#grid-size");
const gridResize = document.querySelector("#grid-size");
const gridSizeLable = document.querySelector("#grid-change");
const cells = document.querySelector("#grid");
const white = "#fff";
const red = "#e84d39";
const green = "#74cf70";
const blue = "#1865fa";
let currentColor = "#21242c";

function random(max) {
  return Math.floor(Math.random() * max);
}

function drawRainbow() {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.addEventListener("mouseover", (e) => {
      currentColor = `rgb(${random(256)}, ${random(256)}, ${random(256)})`;
      e.target.style.backgroundColor = currentColor;
    })
  })
}

const rainbowBtn = document.querySelector("#rainbow");
rainbowBtn.addEventListener("click", () => {
  drawRainbow();
});

const drawColor = () => {
  const gridContent = document.querySelector(".container");
  gridContent.addEventListener("mouseover", (e) => {
    e.target.style.backgroundColor = currentColor;
  })
}

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.style.backgroundColor = "#fff";
  });
})

const shade = document.querySelector("#shade");
shade.addEventListener("click", () => {
  const shaded = document.querySelectorAll(".pixel");
  shaded.forEach((pixel) => {
    let opacity = 0.1;
    pixel.addEventListener("mouseover", (e) => {
      e.target.style.opacity = opacity;
      e.target.style.backgroundColor = currentColor;
      opacity += 0.1;
    })
  })
})

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

window.addEventListener("load", () => {
  rowNum = 16;
  setupCanvas(rowNum);
  drawColor();
})

const value = document.querySelector("#size-value");
const input = document.querySelector("#size-input");
input.addEventListener("input", (e) => {
  const oldCanvas = document.querySelector(".container");
  cells.removeChild(oldCanvas);
  rowNum = e.target.value;
  setupCanvas(rowNum);
  value.textContent = `Grid: ${e.target.value} x ${e.target.value}`;
  coloring();
})

const colorPicker = document.querySelector("#color-picker");
colorPicker.addEventListener("change", () => {
  coloring();
})

function coloring() {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.addEventListener("mouseover", (e) => {
      currentColor = colorPicker.value;
      e.target.style.opacity = 1;
      pixel.style.backgroundColor = currentColor;
    })
  });
}

let defaultOpacity = 1;

function drawRainbow() {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.addEventListener("mouseover", (e) => {
      let randomRed = random(256);
      let randomGreen = random(256);
      let randomBlue = random(256);
      currentColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
      e.target.style.opacity = 1;
      e.target.style.backgroundColor = currentColor;
    })
  })
}

function erase() {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.addEventListener("mouseover", (e) => {
      currentColor = "#fff";
      e.target.style.backgroundColor = currentColor;
    })
  })
}

const eraseBtn = document.querySelector("#white");
eraseBtn.addEventListener("click", () => {
  erase();
});
