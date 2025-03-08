function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const inputField = document.querySelector("#controls input");
const createBtn = document.querySelector("[data-create]");
const destroyBtn = document.querySelector("[data-destroy]");
const boxesDiv = document.querySelector("#boxes");

inputField.focus();
destroyBtn.style.background = "#ff4e4e";
let boxesAmount = 0;

inputField.addEventListener("input", event => {
  event.preventDefault();
  const value = Number(inputField.value);
  if (value >= 0 && value <= 100) {
    boxesAmount = value;
  } else {
    inputField.value = String(boxesAmount);
  }
});

destroyBtn.addEventListener("mouseover", () => {
  boxesDiv.innerHTML && (destroyBtn.style.background = "#ff7070");
});

destroyBtn.addEventListener("mouseout", () => {
  destroyBtn.style.background = "#ff4e4e";
});

createBtn.addEventListener("mouseover", () => {
  boxesAmount && (createBtn.style.background = "#6C8Cff");
});

createBtn.addEventListener("mouseout", () => {
  createBtn.style.background = "#4E75FF";
});

createBtn.addEventListener("click", () => {
  boxesAmount && createBoxes(boxesAmount);
});

inputField.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    if (boxesAmount) {
      createBoxes(boxesAmount);
      createBtn.style.background = "#6C8Cff";
      setTimeout(() => (createBtn.style.background = "#4E75FF"), 100);
    }
  }
});

destroyBtn.addEventListener("click", () => {
  createBoxes();
  setTimeout(() => (destroyBtn.style.background = "#ff4e4e"), 100);
});

const createBoxes = amount => {
  const boxesHTML = Array.from({ length: amount }, (_, index) => {
    const size = 30 + index * 10;
    return `<div style="width: ${size}px; height: ${size}px; background-color: ${getRandomHexColor()};"></div>`;
  }).join("");
  boxesDiv.innerHTML = boxesHTML;
};
