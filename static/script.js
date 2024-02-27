/*==================== MODE SWITCH ====================*/
let lightMode = localStorage.getItem("lightMode");
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

const toggleMode = () => {
  lightMode = localStorage.getItem("lightMode");
  if (lightMode !== "enabled") {
    enableLightMode();
    localStorage.setItem("lightMode", "enabled");
  } else {
    disableLightMode();
    localStorage.setItem("lightMode", "disabled");
  }
};

window
.matchMedia("(prefers-color-scheme: dark)")
.addEventListener("change", (event) => {
  if (lightMode === null) {
    if (event.matches) {
      disableLightMode();
    } else {
      enableLightMode();
    }
  }
});
/*==================== PRELOADER ====================*/

const preloader = document.getElementById('preloader'),
  preloaderText = document.getElementById('preloader__text')


history.scrollRestoration = 'manual'
window.scroll({
  top: 0,
  behavior: 'instant'
});

Pace.on('progress', (progress) => {
  console.log(progress)
  preloaderText.innerHTML = ((progress) / 100).toFixed(2)
});

Pace.on("done", () => {
  const tl = gsap.timeline();
  tl
    .to('#preloader__text', {
      y: 100,
      ease: 'power2.in',
      onComplete() {
        preloader.classList.add('preloader--hide')
      }
    }, 0.5)
    .to('.header', {
      y: 0,
      ease: 'power1.out',
    }, '<')
    .to('.hero .slide-out span', {
      y: 0,
      stagger: 0.05,
      ease: 'power4.out',
      duration: 1,
      opacity: 1
    })
    .to('.hero h2, .blob-container', {
      y: 0,
      ease: 'power1.out',
      opacity: 1
    }, '<0.2')
    .to('body', {
      overflowY: 'auto'
    }, '<')
})

/*==================== MOUSE TRAILER ====================*/

const touchDevice = (navigator.maxTouchPoints & 0xFF || 'ontouchstart' in document.documentElement);

const trailer = document.getElementById('trailer');
trailer.dataset.type = "";
let big = false;
let x = 0,
    y = 0

trailer.style.display = touchDevice ? 'none' : 'revert'

animateTrailer = (e, interacting) => {
  x = e.clientX - trailer.offsetWidth / 2;
  y = e.clientY - trailer.offsetHeight / 2;
  const keyframes = {
    transform: `translate(${x}px, ${y}px) scale(${interacting ? 6 : 1})`
  }

  trailer.animate(keyframes, {
    duration: 800,
    fill: 'forwards'
  })
}

scaleTrailer = () => {
  const keyframes = {
    transform: `translate(${x}px, ${y}px) scale(6)`
  }

  trailer.animate(keyframes, {
    duration: 800,
    fill: 'forwards'
  })
}

window.onmousemove = touchDevice ? null : (e) => {
  const interactable = e.target.closest("a, .interactable, button"),
  interacting = interactable !== null || big;

  animateTrailer(e, interacting);

  trailer.dataset.type = big
  ? trailer.dataset.type
  : interacting
  ? interactable.dataset.type
  : "";
};

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

/*==================== GSAP ====================*/

gsap.utils.toArray('.scroll-animate').forEach((element, i) => {
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: '70% 70%',
      markers: true
    },
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: 'power4.out'
  })
})

gsap.utils.toArray('.scroll-fade-in').forEach((element, i) => {
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: 'bottom bottom'
    },
    opacity: 1,
    ease: 'power4.in',
  })
})

gsap.utils.toArray('.slide-out h1').forEach((element) => {
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: 'bottom 80%',
    },
    delay: 0.2,
    opacity: 1,
    y: 0,
    ease: 'power4.out',
    duration: 1,
  })
})


/*==================== MOBILE MENU ====================*/
menuButton = document.querySelector(".hamburger");
mobileNav = document.querySelector(".mobile-nav");

const toggleNav = () => {
  const toExpand = (mobileNav.dataset.visible == "false")
  mobileNav.dataset.visible = toExpand
  menuButton.setAttribute('aria-expanded', toExpand)
  gsap.to('main', {
    filter: `blur(${toExpand ? '10px' : '0px'})`
  })
}

menuButton.addEventListener("click", toggleNav);

document.getElementById('mobile-contact')
.addEventListener('click', toggleNav)
