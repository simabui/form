import { postLogin, getMatched } from "./request";
import { setUser } from "./localStorage";

const form = document.querySelector("#form-login");

export default async function() {
  //login in form
  const user = await GetInfo();
  //send login
  const { data } = await postLogin(user);
  const TOKEN = data.token;
  // get login data
  const matches = await getMatched(TOKEN);
  //add to local
  setUser(matches);
  // go to another layout
  document.location.replace("/form/dist/swiper.html");
}

//get user from form
function GetInfo() {
  //promise object
  return new Promise(resolve => {
    const { userName, userPassword } = form.elements;
    resolve({
      login: userName.value,
      password: userPassword.value
    });
  });
}
