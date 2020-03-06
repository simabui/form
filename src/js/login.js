"use script";

import axios from "axios";

const form = document.querySelector("#form-login");
const error = document.querySelector(".error-message");
form.addEventListener("submit", handleLogin);

function handleLogin(e) {
  e.preventDefault();
  verifyError();
  GetInfo()
    .then(user => postLogin(user))
    .catch(err => {
      error.textContent = err.response.data;
      error.classList.add("isShown");
    });
}

function GetInfo() {
  return new Promise(resolve => {
    const { userName, userPassword } = form.elements;
    resolve({
      login: userName.value,
      password: userPassword.value
    });
  });
}

function verifyError() {
  const elements = document.querySelectorAll("#form-login input");

  for (let i = 0, element; (element = elements[i++]); ) {
    if (element.value === "") {
      element.classList.add("error");
    } else {
      element.classList.remove("error");
    }
  }
}

function postLogin(obj) {
  const LINK = "https://venify.herokuapp.com/user/login";
  error.classList.remove("isShown");
  return axios.post(LINK, obj);
}
