const navLinks = document.querySelector(".nav-links");
const menuBtn = document.querySelector(".menu-btn");
const themeBtn = document.querySelector(".theme-btn");
const themeLabel = document.querySelector(".theme-label");
const topBtn = document.querySelector(".top-btn");
const scrollLine = document.querySelector(".scroll-line");
const typingText = document.querySelector("#typing-text");
const year = document.querySelector("#year");

const words = ["Student", "Frontend Developer", "Open Source Enthusiast", "Problem Solver"];
let wordIndex = 0;
let letterIndex = 0;
let removing = false;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
}

function updateThemeButton() {
  const isLight = document.documentElement.dataset.theme === "light";
  themeLabel.textContent = isLight ? "Dark" : "Light";
}

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

themeBtn.addEventListener("click", () => {
  const isLight = document.documentElement.dataset.theme === "light";
  const nextTheme = isLight ? "dark" : "light";

  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
  updateThemeButton();
});

updateThemeButton();

function updateTyping() {
  const currentWord = words[wordIndex];
  typingText.textContent = currentWord.slice(0, letterIndex);

  if (!removing && letterIndex < currentWord.length) {
    letterIndex++;
    setTimeout(updateTyping, 90);
    return;
  }

  if (!removing && letterIndex === currentWord.length) {
    removing = true;
    setTimeout(updateTyping, 900);
    return;
  }

  if (removing && letterIndex > 0) {
    letterIndex--;
    setTimeout(updateTyping, 45);
    return;
  }

  removing = false;
  wordIndex = (wordIndex + 1) % words.length;
  setTimeout(updateTyping, 200);
}

updateTyping();

document.querySelectorAll(".filter-buttons button").forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    document.querySelectorAll(".filter-buttons button").forEach(item => {
      item.classList.remove("active");
    });
    button.classList.add("active");

    document.querySelectorAll(".project").forEach(project => {
      const tags = project.dataset.tags.split(" ");
      project.classList.toggle("hide", filter !== "all" && !tags.includes(filter));
    });
  });
});

function setSkillBars() {
  document.querySelectorAll(".skill").forEach(skill => {
    const bar = skill.querySelector(".bar span");
    bar.style.width = skill.dataset.level + "%";
  });
}

function updateScroll() {
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0;

  scrollLine.style.width = progress + "%";
  topBtn.classList.toggle("show", window.scrollY > 500);

  document.querySelectorAll("section[id]").forEach(section => {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    const link = document.querySelector(`.nav-links a[href="#${section.id}"]`);

    if (window.scrollY >= top && window.scrollY < bottom) {
      document.querySelectorAll(".nav-links a").forEach(item => item.classList.remove("active"));
      link?.classList.add("active");
    }
  });
}

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

window.addEventListener("scroll", updateScroll);
window.addEventListener("load", () => {
  setSkillBars();
  updateScroll();
});

year.textContent = new Date().getFullYear();
