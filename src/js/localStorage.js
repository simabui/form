export function setUser(data) {
  const userJSON = JSON.stringify(data);
  localStorage.setItem("user", userJSON);
}

export function getUser() {
  const user = localStorage.getItem("user");
  console.log(JSON.parse(user));
}
