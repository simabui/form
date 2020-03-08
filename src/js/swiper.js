import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import { showMatch } from "./login";
import slideTemplate from "../templates/slide.hbs";

const swiper = document.querySelector(".swiper-wrapper");

function swiperInit() {
  let mySwiper = new Swiper(".swiper-container", {
    // Optional parameters
    direction: "horizontal",
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });
}

// async function userTest() {
//   const user = {
//     login: "bui",
//     password: "Test123"
//   };
//   const { data } = await postLogin(user);
//   const TOKEN = data.token;
//   // get login data
//   const matches = await getMatched(TOKEN);

//   return matches;
// }
//async recieving object of user with matched imgs list
async function userMatches() {
  const { data } = await showMatch();
  const imgArr = data.map(({ image_list }) => image_list[0]);
  const temps = slideTemplate(imgArr);

  swiper.innerHTML = temps;
  swiperInit();
}

userMatches();
