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
let boxesAmount = inputField.value;
let isBoxesExists = false;

inputField.addEventListener("input", event => {
  event.preventDefault();
  const value = inputField.value;
  if (value === "" || (value > 0 && inputField.value <= 100)) {
    boxesAmount = inputField.value;
  } else {
    inputField.value = boxesAmount;
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
    boxesAmount && createBoxes(boxesAmount);
    createBtn.style.background = "#6C8Cff";
    setTimeout(() => {
      createBtn.style.background = "#4E75FF";
    }, 100);
  }
});

destroyBtn.addEventListener("click", () => {
  destroyBoxes();
});

const createBoxes = amount => {
  destroyBoxes();
  isBoxesExists = true;
  for (let i = 0; i < amount; i++) {
    const box = document.createElement("div");
    box.style.width = `${30 + i * 10}px`;
    box.style.height = `${30 + i * 10}px`;
    box.style.backgroundColor = getRandomHexColor();
    boxesDiv.appendChild(box);
  }
};

const destroyBoxes = () => {
  isBoxesExists = false;
  boxesDiv.innerHTML = "";
};
