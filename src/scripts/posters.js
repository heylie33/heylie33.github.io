import { gsap } from "gsap";
import { prefersReducedMotion } from "./animations.js";

const track = document.querySelector("[data-poster-track]");

/* The track holds two copies of the set, so shifting it by exactly half its
   width loops without a seam. */
if (track && !prefersReducedMotion()) {
  gsap.to(track, {
    xPercent: -50,
    ease: "none",
    repeat: -1,
    duration: 36,
  });
}
