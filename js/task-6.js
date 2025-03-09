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

const createBoxes = amount => {
  const boxesHTML = Array.from({ length: amount }, (_, index) => {
    const size = 30 + index * 10;
    return `<div style="width: ${size}px; height: ${size}px; background-color: ${getRandomHexColor()};"></div>`;
  }).join("");
  boxesDiv.innerHTML = boxesHTML;
};

["click", "mouseover", "mouseout"].forEach(eventType => {
  createBtn.addEventListener(eventType, () => {
    if (eventType === "click") boxesAmount && createBoxes(boxesAmount);
    if (eventType === "mouseover") boxesAmount && (createBtn.style.background = "#6C8Cff");
    if (eventType === "mouseout") createBtn.style.background = "#4E75FF";
  });
});

["click", "mouseover", "mouseout"].forEach(eventType => {
  destroyBtn.addEventListener(eventType, () => {
    if (eventType === "click")
      createBoxes(), setTimeout(() => (destroyBtn.style.background = "#ff4e4e"), 100);
    if (eventType === "mouseover")
      boxesDiv.innerHTML && (destroyBtn.style.background = "#ff7070");
    if (eventType === "mouseout") destroyBtn.style.background = "#ff4e4e";
  });
});

inputField.addEventListener("input", () => {
  const value = Number(inputField.value);
  if (value >= 0 && value <= 100) {
    boxesAmount = value;
  } else {
    inputField.value = String(boxesAmount);
  }
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
