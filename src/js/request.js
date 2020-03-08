"use strict";
import axios from "axios";
import { error } from "./login";

export function postLogin(obj) {
  const LINK = "https://venify.herokuapp.com/user/login";
  error.classList.remove("isShown");
  return axios.post(LINK, obj);
}

export function getMatched(key) {
  const LINK = "https://venify.herokuapp.com/user/mathchedList";
  return axios.get(LINK, {
    headers: {
      Authorization: ` ${key}`
    }
  });
}

export function registerUser(user) {
  const link = "https://venify.herokuapp.com/user/register";
  return axios.post(link, user);
}
