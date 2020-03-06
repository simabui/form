"use script";

const form = document.querySelector("#form-login");

form.addEventListener("submit", handleLogin);

function handleLogin(e) {
  e.preventDefault();
  verifyError();
  GetInfo()
    .then(user => postLogin(user))
    .catch(err => console.log(err.response.data));
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

  return axios.post(LINK, obj);
}
