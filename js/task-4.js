const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", event => {
  event.preventDefault();
  const email = loginForm.elements.email.value;
  const password = loginForm.elements.password.value;
  if (!email || !password) {
    alert("All form fields must be filled in");
  } else {
    const credentials = {
      email: email.trim(),
      password: password.trim(),
    };
    console.log(credentials);
    loginForm.reset();
  }
});
