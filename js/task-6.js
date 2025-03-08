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
let boxesAmount = 0;
let isBoxesExists = false;

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
  isBoxesExists && (destroyBtn.style.background = "#ff7070");
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
      setTimeout(() => {
        createBtn.style.background = "#4E75FF";
      }, 100);
    }
  }
});

destroyBtn.addEventListener("click", () => {
  destroyBoxes();
});

const createBoxes = amount => {
  destroyBoxes();
  const boxes = [];
  for (let i = 0; i < amount; i++) {
    const box = document.createElement("div");
    box.style.width = `${30 + i * 10}px`;
    box.style.height = `${30 + i * 10}px`;
    box.style.backgroundColor = getRandomHexColor();
    boxes.push(box);
  }
  boxesDiv.innerHTML = "";
  boxesDiv.append(...boxes);
  isBoxesExists = true;
};

const destroyBoxes = () => {
  boxesDiv.innerHTML = "";
  isBoxesExists = false;
};
