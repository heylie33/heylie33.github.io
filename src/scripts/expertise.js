import { gsap } from "gsap";
import { initHoverAnimations } from "./animations.js";

const colorWash = document.querySelector("[data-color-wash]");

initHoverAnimations(colorWash);

/* The section itself is transparent — only this wrapper carries the colour that
   scrolls from pink to green to yellow. */
gsap.set(colorWash.querySelectorAll(":scope > section"), {
  backgroundColor: "transparent",
});

gsap
  .timeline({
    scrollTrigger: {
      trigger: colorWash,
      start: "top top",
      end: "bottom top",
      scrub: 0.8,
    },
  })
  .fromTo(
    colorWash,
    { backgroundColor: "#ffa9e0" },
    { backgroundColor: "#bff4a2", duration: 0.4, ease: "power1.inOut" },
  )
  .to(colorWash, {
    backgroundColor: "#ffe88e",
    duration: 0.4,
    ease: "power1.inOut",
  })
  .to({}, { duration: 0.2 });

/* --- services accordion --- */

const toggles = [...colorWash.querySelectorAll("[data-accordion-toggle]")];

const partsOf = (toggle) => ({
  panel: toggle.querySelector("[data-accordion-panel]"),
  plusVerticalStroke: toggle.querySelector(".accordion-toggle-vertical-line"),
  background: toggle.querySelector(".accordion-toggle-bg-open"),
});

toggles.forEach((toggle) => {
  const { panel, plusVerticalStroke, background } = partsOf(toggle);

  gsap.set(panel, { height: 0 });
  gsap.set(plusVerticalStroke, { scaleY: 1, transformOrigin: "50% 50%" });
  gsap.set(background, { scaleY: 0, transformOrigin: "50% 100%" });
});

function setAccordionOpen(toggle, isOpen) {
  const { panel, plusVerticalStroke, background } = partsOf(toggle);
  const duration = isOpen ? 0.4 : 0.3;

  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.closest(".accordion").classList.toggle("w--open", isOpen);

  gsap.to(panel, {
    height: isOpen ? "auto" : 0,
    duration,
    ease: "power1.inOut",
    overwrite: true,
  });
  gsap.to(plusVerticalStroke, {
    scaleY: isOpen ? 0 : 1,
    duration,
    ease: "power1.inOut",
    overwrite: true,
  });
  gsap.to(background, {
    scaleY: Number(isOpen),
    duration: isOpen ? 0.4 : 0.2,
    ease: "power1.inOut",
    overwrite: true,
  });
}

function toggleAccordion(toggle) {
  const shouldOpen = toggle.getAttribute("aria-expanded") !== "true";

  toggles.forEach((other) => {
    if (other !== toggle && other.getAttribute("aria-expanded") === "true") {
      setAccordionOpen(other, false);
    }
  });

  setAccordionOpen(toggle, shouldOpen);
}

toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => toggleAccordion(toggle));
  toggle.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleAccordion(toggle);
    }
  });
});

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-accordion-toggle]")) return;

  toggles.forEach((toggle) => {
    if (toggle.getAttribute("aria-expanded") === "true")
      setAccordionOpen(toggle, false);
  });
});
