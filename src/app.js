//Import Class
import { Letter } from "./letter.js";

// Get DOM elements
const btn = document.querySelector(".btn");
const input = document.querySelector(".text");
const div = document.querySelector(".userData");
const loader = document.querySelector(".loader");

//Execute Search OnClick
btn.addEventListener("click", async () => {
  const value = input.value;
  if (value > 0) {
    loader.style.display = "block";
    div.innerHTML = "";
    const userData = await new Letter(value).get();
    loader.style.display = "none";
    div.innerHTML = JSON.stringify(userData, undefined, 2);
  }
});
