import "./main.css";
import "react";
import "react-dom";

function component(text: string) {
  const element: HTMLElement = document.createElement("div");
  element.innerHTML = text;
  return element;
}

document.body.appendChild(
  component("dssd sss Camila Cabello’s birthday 🥳")
);
