let canvasSize = 360;
let defaultPixelSize = 16;

const body = document.querySelector("body");
const defaultGrid = document.querySelector("#grid-size");
const gridResize = document.querySelector("#grid-size");
const gridSizeLable = document.querySelector("#grid-change");
const cells = document.querySelector("#grid");

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
      pixel.classList.add("defaultColor");
      pixel.style.width = canvasSize / rowNum + "px";
      pixel.style.height = canvasSize / rowNum + "px";
      row.appendChild(pixel);
    }
  }
}

window.addEventListener("load", () => {
  gridResize.value = defaultPixelSize;
  let rowNum = gridResize.value;
  setupCanvas(rowNum);
})

cells.addEventListener("mouseover", (e) => {
  e.target.classList.add("currColor");
})

gridResize.addEventListener("change", (e) => {
  console.log(e);
  const oldCanvas = document.querySelector(".container");
  grid.removeChild(oldCanvas);
  rowNum = e.target.value;
  console.log(rowNum);
  gridSizeLable.textContent = `Grid: ${rowNum} x ${rowNum}`;
  setupCanvas(rowNum);
})
