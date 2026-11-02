import { gsap } from "gsap";
import { prefersReducedMotion } from "./animations.js";

if (!prefersReducedMotion()) {
  gsap.to("[data-rotate]", {
    rotation: 360,
    duration: 10,
    ease: "none",
    repeat: -1,
  });
}
