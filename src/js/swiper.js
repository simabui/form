import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import { getUser } from "./localStorage";
import slideTemplate from "../templates/slide.hbs";
import { getGeoLocation } from "./registration";
import darkTheme from "../templates/darkTheme.json";

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
      },
      // Pagination
      pagination: {
        el: ".swiper-pagination",
        type: "bullets"
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

  //google map
  window.onload = async function() {
    let myLatLng = await getGeoLocation();
    var styledMapType = new google.maps.StyledMapType(darkTheme, {
      name: "Styled Map"
    });
    let map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: myLatLng
    });

    // set marker
    let marker = new google.maps.Marker({
      position: myLatLng,
      map: map
    });

    //set dark theme
    map.mapTypes.set("styled_map", styledMapType);
    map.setMapTypeId("styled_map");
  };
}
