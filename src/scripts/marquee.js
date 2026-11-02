import { gsap } from "gsap";
import { prefersReducedMotion } from "./animations.js";

if (!prefersReducedMotion()) {
  document.querySelectorAll(".transform-right-to-left").forEach((track) => {
    gsap.fromTo(
      track,
      { xPercent: 0 },
      { xPercent: -50, duration: 30, ease: "none", repeat: -1 },
    );
  });
}
