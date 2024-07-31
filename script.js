const grid = document.querySelector("#grid");

let gridSize = 16;
const canvasSize = 320;

for (let i = 0; i < gridSize ** 2; i++) {
  const pixel = document.createElement("div");
  pixel.classList.add("defaultColor");
  pixel.classList.add("pixel");
  pixel.style.width = canvasSize / gridSize + "px";
  pixel.style.height = canvasSize / gridSize + "px";
  grid.appendChild(pixel);
}

const pixel = document.querySelector(".pixel");

grid.addEventListener("mouseover", e => {
  e.target.classList.add("currColor");
  console.log(e.target);
})
