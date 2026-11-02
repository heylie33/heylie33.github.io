import { gsap } from "gsap";
import { prefersReducedMotion } from "./animations.js";

if (!prefersReducedMotion()) {
  gsap.fromTo(
    "[data-logo-track]",
    { xPercent: 0 },
    { xPercent: 50, duration: 20, ease: "none", repeat: -1 },
  );
}
