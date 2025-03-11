const inputField = document.querySelector("#controls input");
const createBtn = document.querySelector("[data-create]");
const destroyBtn = document.querySelector("[data-destroy]");
const boxesDiv = document.querySelector("#boxes");

inputField.focus();
let boxesAmount;

const getRandomHexColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;

const createBoxes = amount => {
  const boxesHTML = Array.from({ length: amount }, (_, index) => {
    const size = 30 + index * 10;
    return `<div style="width: ${size}px; height: ${size}px; background-color: ${getRandomHexColor()};"></div>`;
  }).join("");
  boxesDiv.innerHTML = boxesHTML;
};

["click", "pointerover", "pointerout"].forEach(eventType => {
  createBtn.addEventListener(eventType, () => {
    if (eventType === "click") boxesAmount && createBoxes(boxesAmount);
    if (eventType === "pointerover") boxesAmount && (createBtn.style.background = "#6C8Cff");
    if (eventType === "pointerout")
      setTimeout(() => (createBtn.style.background = "#4E75FF"), 100);
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

inputField.addEventListener("blur", () => {
  inputField.focus();
});

// post hw
// finds element number from div array by click
// includes external tinycolor library
boxesDiv.addEventListener("click", event => {
  if (event.target !== event.currentTarget) {
    const currentDiv = event.target.innerHTML;
    const currentColor = event.target.style.backgroundColor;
    const currentIndex = Array.from(boxesDiv.querySelectorAll("div")).indexOf(event.target);

    event.target.insertAdjacentHTML(
      "afterbegin",
      `<p style="display: flex; justify-content: center; align-items: center; height: 100%; margin: 0;">${currentIndex}</p><p style="text-align: center; font-size: 8px;">${currentColor}</p>`
    );

    event.target.style.backgroundColor = tinycolor(currentColor).lighten(10).toString();
    setTimeout(
      () => (
        (event.target.innerHTML = currentDiv),
        (event.target.style.backgroundColor = currentColor)
      ),
      250
    );
  }
});
