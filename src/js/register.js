const form = document.querySelector("#form");
form.addEventListener("submit", handleReg);

let isValid = false;
axios.defaults.baseURL = "https://venify.herokuapp.com/user/register";
function getGeoLocation() {
  return new Promise(resolve => {
    navigator.geolocation.watchPosition(({ coords }) => resolve(coords));
  });
}

function handleReg(e) {
  e.preventDefault();
  verifyError();
  passVerify();
  postUser();
}

function postUser() {
  const { name, gender, age, phone, pass } = form.elements;
  // if (name.value === '' || pname.value === '' || age.value === '' || phone.value === '' || !isValid) {
  //     return;
  // }
  return getGeoLocation()
    .then(coords => {
      return {
        latitude: coords.latitude,
        longitude: coords.longitude
      };
    })
    .then(coords =>
      setUser(
        age.value,
        pass.value,
        name.value,
        gender.value,
        phone.value,
        coords
      )
    )
    .then(user => postAxios(user))
    .catch(error => console.log(error.response.data));
}

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

function postAxios(user) {
  const link = "https://venify.herokuapp.com/user/register";
  return axios.post(link, user);
}

function verifyError() {
  const elements = document.querySelectorAll("#form input");

  for (let i = 0, element; (element = elements[i++]); ) {
    if (element.value === "") {
      element.classList.add("error");
    } else {
      element.classList.remove("error");
    }
  }
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
