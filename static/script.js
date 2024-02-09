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

/*==================== PRELOADER ====================*/

const loader = document.getElementById("preloader");

window.addEventListener("load", () => {
  loader.style.display = "none";
});

/*==================== MOUSE TRAILER ====================*/

const trailer = document.getElementById('trailer')

animateTrailer = (e, interacting) => {
  const x = e.clientX - trailer.offsetWidth / 2,
        y = e.clientY - trailer.offsetHeight / 2;

  const keyframes = {
    transform: `translate(${x}px, ${y}px) scale(${interacting ? 7 : 1})`
  }

  trailer.animate(keyframes, {
    duration: 800,
    fill: 'forwards'
  })
}

window.onmousemove = e => {
  const interactable = e.target.closest('a, .interactable, .project:not(.projects-header)'),
        interacting = interactable !== null;

  animateTrailer(e, interacting)
}

/*==================== COPY ====================*/

const copyLinks = document.querySelectorAll('.copy')

copyLinks.forEach((el) => {
  el.addEventListener('click', () => {
    navigator.clipboard.writeText(el.innerHTML);

    el.classList.add('copied')

  })
  el.addEventListener('mouseout', () => {
    setTimeout(() => {
      el.classList.remove('copied')
    }, 300);
  })
})

/*==================== OPEN PROJECTS ====================*/

const projectBtns = document.querySelectorAll('.project')
const main = document.querySelector('.main')
const closeCardBtns = document.querySelectorAll('#close-project')

projectBtns.forEach((el) => {
  el.addEventListener('click', () => {
    const projectId = el.dataset.projectId
    const projectCard = document.querySelector(`.info[data-project-id="${projectId}"]`)
    const closeCardBtn = projectCard.getElementsByClassName('close-project')[0]

    projectCard.classList.add('active-slide')
    main.classList.add('inactive')

    closeCardBtn.addEventListener('click', () => {
      projectCard.classList.remove('active-slide')
      main.classList.remove('inactive')
    })
  })
})


