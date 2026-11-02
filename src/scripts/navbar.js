import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initHoverAnimations } from "./animations.js";

const navbar = document.querySelector("[data-navbar]");
const navButton = navbar.querySelector("[data-nav-button]");
const navOverlay = navbar.querySelector("[data-nav-overlay]");
const navMenu = navbar.querySelector(".nav-menu");

initHoverAnimations(navbar);

function setMenuOpen(isOpen) {
  navbar.classList.toggle("is-open", isOpen);
  navButton.classList.toggle("w--open", isOpen);
  navButton.setAttribute("aria-expanded", String(isOpen));
  navButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

  if (isOpen) {
    gsap.set(navOverlay, { display: "block" });
    gsap.fromTo(
      navOverlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power1.inOut" },
    );
    return;
  }

  gsap.to(navOverlay, {
    opacity: 0,
    duration: 0.3,
    ease: "power1.inOut",
    onComplete: () => gsap.set(navOverlay, { display: "none" }),
  });
}

navButton.addEventListener("click", () =>
  setMenuOpen(!navbar.classList.contains("is-open")),
);
navOverlay.addEventListener("click", () => setMenuOpen(false));
navMenu.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navbar.classList.contains("is-open")) {
    setMenuOpen(false);
    navButton.focus();
  }
});

/** Highlight the in-page anchor that crosses the vertical middle of the viewport. */
if (location.pathname === "/") {
  const sectionLinks = [
    ...navbar.querySelectorAll('.nav-links-wrapper a[href^="/#"]'),
  ]
    .map((link) => ({
      link,
      target: document.getElementById(link.getAttribute("href").slice(2)),
    }))
    .filter(({ target }) => target);

  let isTicking = false;

  const syncActiveLink = () => {
    isTicking = false;
    const viewportMiddle = window.innerHeight / 2;

    sectionLinks.forEach(({ link, target }) => {
      const rect = target.getBoundingClientRect();
      const isActive =
        rect.top <= viewportMiddle && rect.bottom > viewportMiddle;

      link.classList.toggle("w--current", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  window.addEventListener(
    "scroll",
    () => {
      if (isTicking) return;
      requestAnimationFrame(syncActiveLink);
      isTicking = true;
    },
    { passive: true },
  );
  window.addEventListener("resize", syncActiveLink);
  syncActiveLink();
}

const breakpoints = gsap.matchMedia();

breakpoints.add("(min-width: 992px)", () => {
  gsap.to(
    navbar.querySelectorAll(".brand, .nav-contact-social-links-wrapper"),
    {
      y: -200,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: () => ScrollTrigger.maxScroll(window) * 0.03,
        scrub: 0.5,
      },
    },
  );
});

breakpoints.add("(max-width: 991px)", () => {
  gsap.fromTo(
    navbar.querySelector(".nav-container"),
    { backgroundColor: "rgba(16, 16, 16, 0)" },
    {
      backgroundColor: "rgba(16, 16, 16, 1)",
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: () => ScrollTrigger.maxScroll(window) * 0.01,
        scrub: 0.3,
      },
    },
  );

  return () => setMenuOpen(false);
});
