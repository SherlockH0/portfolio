/*==================== MODE SWITCH ====================*/
let lightMode = localStorage.getItem("lightMode");
const lightModeToggle = document.querySelector(".mode-toggle");
const lightModeToggleIcon = document.getElementById("light-mode-toggle");

const enableLightMode = () => {
  document.body.classList.add("light");

  lightModeToggleIcon.classList.add("nf-oct-moon");
  lightModeToggleIcon.classList.remove("nf-oct-sun");
};

const disableLightMode = () => {
  document.body.classList.remove("light");

  lightModeToggleIcon.classList.add("nf-oct-sun");
  lightModeToggleIcon.classList.remove("nf-oct-moon");
};

if (lightMode === "enabled") {
  enableLightMode();
  localStorage.setItem("lightMode", "enabled");
}

lightModeToggle.addEventListener("click", () => {
  lightMode = localStorage.getItem("lightMode");
  if (lightMode !== "enabled") {
    enableLightMode();
    localStorage.setItem("lightMode", "enabled");
  } else {
    disableLightMode();
    localStorage.setItem("lightMode", "disabled");
  }
});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    console.log("changed!!");
    if (lightMode === null) {
      if (event.matches) {
        disableLightMode();
      } else {
        enableLightMode();
      }
    }
  });

/*==================== SCROOL ANIMATIONS ====================*/

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");

/*==================== PRELOADER ====================*/

const loader = document.getElementById("preloader");

window.addEventListener("load", () => {
  loader.style.display = "none";
  hiddenElements.forEach((el) => observer.observe(el));
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;
  const halfScreenHeight = window.innerHeight / 2;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute("id");

    if (
      scrollY > sectionTop - halfScreenHeight &&
      scrollY <= sectionTop + sectionHeight - halfScreenHeight
    ) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);
