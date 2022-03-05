import "./main.css";
import "./iss";
function component(text) {
  const element = document.createElement("div");
  element.innerHTML = text;
  return element;
}

document.body.appendChild(
  component("asdas Fans celebrate Camila Cabello’s birthday 🥳")
);
