const inputField = document.querySelector("#controls input");
const createBtn = document.querySelector("[data-create]");
const destroyBtn = document.querySelector("[data-destroy]");
let exploreBtn = document.querySelector("[data-explore]");
const boxesDiv = document.querySelector("#boxes");

inputField.focus();
let boxesAmount;
let boxesArray = [];
updateSessionStorage();

const getRandomHexColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;

const createBoxes = amount => {
  const boxesHTML = Array.from({ length: amount }, (_, index) => {
    const size = 30 + index * 10;
    const randomColor = getRandomHexColor();
    boxesArray.push(randomColor);
    return `<div style="width: ${size}px; height: ${size}px; background-color: ${randomColor};"></div>`;
  }).join("");
  boxesDiv.innerHTML = boxesHTML;
};

["click", "pointerover", "pointerout"].forEach(eventType => {
  createBtn.addEventListener(eventType, () => {
    if (eventType === "click") {
      if (boxesAmount) {
        createBoxes(boxesAmount);
        updateSessionStorage();
      }
    }
    if (eventType === "pointerover")
      boxesAmount &&
        (createBtn.style.background = tinycolor(getComputedStyle(createBtn).backgroundColor)
          .lighten(9)
          .toString());
    if (eventType === "pointerout")
      setTimeout(() => (createBtn.style.background = "#4E75FF"), 100);
  });
});

["click", "mouseover", "mouseout"].forEach(eventType => {
  destroyBtn.addEventListener(eventType, () => {
    if (eventType === "click") {
      boxesArray.length = 0;
      createBoxes(), setTimeout(() => (destroyBtn.style.background = "#ff4e4e"), 100);
    }
    if (eventType === "mouseover")
      boxesDiv.innerHTML &&
        (destroyBtn.style.background = tinycolor(getComputedStyle(destroyBtn).backgroundColor)
          .lighten(9)
          .toString());
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
      updateSessionStorage();
      createBtn.style.background = tinycolor(getComputedStyle(createBtn).backgroundColor)
        .lighten(9)
        .toString();
      setTimeout(() => (createBtn.style.background = "#4E75FF"), 100);
    }
  }
});

document.querySelector("body").addEventListener("keydown", () => {
  inputField.focus();
});

// post home work
// finds element number from div array by click
// shows history by session storage
// includes external tinycolor library

boxesDiv.addEventListener("click", event => {
  if (event.target !== event.currentTarget && event.target.nodeName !== "TD") {
    const currentColor = event.target.style.backgroundColor;
    const currentIndex = Array.from(boxesDiv.querySelectorAll("div")).indexOf(event.target);

    event.target.insertAdjacentHTML(
      "afterbegin",
      `<p style="display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          margin: 0;">
        ${currentIndex}</p>
       <p style="text-align: center;
          margin: 0;
          font-size: 8px;">
        ${currentColor}</p>`
    );

    event.target.style.backgroundColor = tinycolor(currentColor).lighten(9).toString();
    setTimeout(() => {
      event.target.style.backgroundColor = currentColor;
      event.target.querySelectorAll("p").forEach(p => p.remove());
    }, 250);
  }
});

function updateSessionStorage() {
  boxesArray.length &&
    sessionStorage.setItem(sessionStorage.length, JSON.stringify(boxesArray));
  boxesArray.length = 0;

  if (sessionStorage.length > 1 && !exploreBtn) {
    exploreBtn = document.createElement("button");
    exploreBtn.type = "button";
    exploreBtn.dataset.explore = "";
    exploreBtn.textContent = "Results";
    destroyBtn.insertAdjacentElement("afterend", exploreBtn);

    ["click", "pointerover", "pointerout"].forEach(eventType => {
      exploreBtn.addEventListener(eventType, () => {
        const isTableRendered = !!document.querySelector("#boxes table");
        if (eventType === "click" && !isTableRendered) exploreSessionStorage();
        if (eventType === "pointerover" && !isTableRendered)
          exploreBtn.style.background = tinycolor(getComputedStyle(exploreBtn).backgroundColor)
            .lighten(9)
            .toString();
        if (eventType === "pointerout")
          setTimeout(() => (exploreBtn.style.background = "#69A7BC"), 100);
      });
    });
  }
}

const exploreSessionStorage = () => {
  if (sessionStorage.length > 1) {
    boxesDiv.innerHTML = "";
    const keys = Object.keys(sessionStorage);
    const values = Object.values(sessionStorage);
    let keyValuePairs = keys.map((key, index) => ({
      key: key.toString().padStart(5, "0"),
      value: values[index],
    }));
    keyValuePairs = keyValuePairs
      .filter(pair => pair.key !== "IsThisFirstTime_Log_From_LiveServer")
      .sort((a, b) => a.key.localeCompare(b.key));

    const table = document.createElement("table");
    table.border = 1;

    const header = table.createTHead();
    const row = header.insertRow(0);
    row.insertCell(0).outerHTML = "<th>Key</th>";
    row.insertCell(1).outerHTML = "<th>Value</th>";

    const body = table.createTBody();
    keyValuePairs.forEach((pair, index) => {
      const row = body.insertRow(index);
      row.insertCell(0).innerText = `boxes ${Number(pair.key)}`;
      row.insertCell(1).innerText = pair.value.slice(1, -1).replace(/["",]/g, " ");
    });

    boxesDiv.appendChild(table);
  }
};
