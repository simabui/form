"use script";
import verifyError from "./verify";
import { postLogin, getMatched } from "./request";

const form = document.querySelector("#form-login");
export const error = document.querySelector(".error-message");

form.addEventListener("submit", handleLogin);

function handleLogin(e) {
  e.preventDefault();
  verifyError();
  showMatch();
}

export async function showMatch() {
  //login in form
  const user = await GetInfo();
  //send login
  const { data } = await postLogin(user);
  const TOKEN = data.token;
  // get login data
  const matches = await getMatched(TOKEN);

  document.location.replace("/form/dist/swiper.html");
  return matches;
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
