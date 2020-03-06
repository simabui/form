"use script";
import verifyError from "./veryfy";
import { postLogin, getMatched } from "./request";

const form = document.querySelector("#form-login");
export const error = document.querySelector(".error-message");

form.addEventListener("submit", handleLogin);

function handleLogin(e) {
  e.preventDefault();
  verifyError();
  showMatch();
}

async function showMatch() {
  //login in form
  const user = await GetInfo();
  //send login
  const { data } = await postLogin(user);
  const TOKEN = data.token;
  // get login data
  const matches = await getMatched(TOKEN);
  console.log(matches);
  document.location.replace("/form/dist/swiper.html");
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
