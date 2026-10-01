const menuToggle = document.querySelector(".menu-toggle");
const menuClose = document.querySelector(".menu-close");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".menu-overlay");

menuToggle.addEventListener("click", function () {
  sidebar.classList.add("is-open");
  overlay.hidden = false;
  document.body.classList.add("menu-open");
});

menuClose.addEventListener("click", function () {
  sidebar.classList.remove("is-open");
  overlay.hidden = true;
  document.body.classList.remove("menu-open");
});

overlay.addEventListener("click", function () {
  sidebar.classList.remove("is-open");
  overlay.hidden = true;
  document.body.classList.remove("menu-open");
});