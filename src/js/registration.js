import { registerUser } from "./request";

export function register() {
  if (!document.querySelector("#REGISTRATION")) {
    return;
  }
  const form = document.querySelector("#form-register");
  form.addEventListener("submit", handleReg);

  let isValid = false;

  function handleReg(e) {
    e.preventDefault();
    verifyError();
    passVerify();
    postUser();
  }

  async function postUser() {
    const { name, gender, age, phone, pass, pname } = form.elements;
    // check if empty input
    if (
      name.value === "" ||
      pname.value === "" ||
      age.value === "" ||
      phone.value === "" ||
      !isValid
    ) {
      return;
    }

    const coordsObj = await getGeoLocation();
    const userData = setUser(
      age.value,
      pass.value,
      name.value,
      gender.value,
      phone.value,
      coordsObj
    );
    registerUser(userData).catch(err => console.log(err));
    document.location.replace("/form/dist/index.html");
  }

  function passVerify() {
    const pass = document.querySelector("#pwd");
    const errorMessage = document.querySelector(".pass-error");
    const value = pass.value;
    isValid = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g.test(value);
    if (!isValid) {
      errorMessage.style.display = "block";
    } else {
      errorMessage.style.display = "none";
    }
  }
}

//geo of user
export async function getGeoLocation() {
  const coords = await new Promise(resolve => {
    navigator.geolocation.watchPosition(({ coords }) => resolve(coords));
  });
  return {
    lat: coords.latitude,
    lng: coords.longitude
  };
}

//set user object
function setUser(age, pass, login, sex, phone, location) {
  return {
    age: age,
    phone_number: phone,
    password: pass,
    login: login,
    gender: sex,
    geo_location: location
  };
}

//verify form input
function verifyError() {
  const elements = document.querySelectorAll("#form-register input");

  for (let i = 0, element; (element = elements[i++]); ) {
    if (element.value === "") {
      element.classList.add("error-form");
    } else {
      element.classList.remove("error-form");
    }
  }
}
