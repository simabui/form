"use strict";
import "./../sass/styles.scss";
import { initSwiper } from "./swiper";
import { logUser } from "./login";
import { register } from "./registration";
register();
logUser();
initSwiper();
