export default function() {
  const elements = document.querySelectorAll("#form-login input");

  for (let i = 0, element; (element = elements[i++]); ) {
    if (element.value === "") {
      element.classList.add("error");
    } else {
      element.classList.remove("error");
    }
  }
}
