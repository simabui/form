import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import { getUser } from "./localStorage";
import slideTemplate from "../templates/slide.hbs";

export function initSwiper() {
  if (!document.querySelector("#SWIPER")) return;

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

  //async recieving object of user with matched imgs list
  async function userMatches() {
    //take user from local
    const user = getUser();

    const { data } = user;
    const imgArr = data.map(({ image_list }) => image_list[0]);
    const temps = slideTemplate(imgArr);

    swiper.innerHTML = temps;
    swiperInit();
  }

  userMatches();
}
