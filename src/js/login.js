"use script";
import verifyError from "./verify";
import showMatch from "./showMatch";

export const error = document.querySelector(".error-message");

export function logUser() {
  if (!document.querySelector("#LOGIN")) {
    return;
  }
  const form = document.querySelector("#form-login");

  form.addEventListener("submit", handleLogin);

  function handleLogin(e) {
    e.preventDefault();
    verifyError();
    showMatch().catch(err => {
      error.textContent = err.response.data;
      error.classList.add("isShown");
    });
  }
}
