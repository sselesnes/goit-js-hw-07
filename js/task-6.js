function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const inputField = document.querySelector("#controls input");
const createBtn = document.querySelector("[data-create]");
const destroyBtn = document.querySelector("[data-destroy]");
const boxes = document.querySelector("#boxes");

inputField.focus();
let previousValue = inputField.value;

inputField.addEventListener("input", event => {
  event.preventDefault();
  const value = inputField.value;
  if (value === "" || (value > 0 && inputField.value <= 100)) {
    previousValue = inputField.value;
  } else {
    inputField.value = previousValue;
  }
});

createBtn.addEventListener("mouseover", () => {
  previousValue && (createBtn.style.background = "#6C8Cff");
});

createBtn.addEventListener("mouseout", () => {
  createBtn.style.background = "#4E75FF";
});

createBtn.addEventListener("click", () => {
  previousValue && createBoxes(previousValue);
});

destroyBtn.addEventListener("click", () => {
  console.log(`destroy`);
});

const createBoxes = amount => {
  console.log(amount);
};
