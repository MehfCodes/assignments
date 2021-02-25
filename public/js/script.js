const menu = document.querySelector("#left");
const header = document.querySelector(".wrapper");
const nav = document.querySelector(".app-navbar");
const close = document.querySelector(".close");
const cardText = document.querySelectorAll(".card-text");
let flag = false;
menu.onclick = () => {
  flag = true;
  nav.style.display = "flex";
  header.style.display = "none";
};
close.onclick = () => {
  flag = false;
  nav.style.display = "none";
  header.style.display = "flex";
};
window.onresize = () => {
  if (window.screen.width > 800) {
    nav.style.display = "flex";
    header.style.display = "none";
  } else {
    nav.style.display = "none";
    header.style.display = "flex";
  }
};
cardText.forEach((p) => {
  p.textContent = p.textContent.substring(0, 100);
});
