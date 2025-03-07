const inputBox = document.querySelector("#name-input");
const userName = document.querySelector("#name-output");

inputBox.addEventListener("input", event => {
  userName.textContent = event.target.value.trim() || "Anonymous";
});
