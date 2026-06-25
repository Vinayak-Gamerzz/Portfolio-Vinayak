const themeToggle = document.querySelector(".theme-toggle");

const savedTheme = localStorage.getItem("vinayak-theme");
if (savedTheme) {
  root.dataset.theme = savedTheme;
} else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
  root.dataset.theme = "light";
}