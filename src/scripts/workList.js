import { initLinkMovement } from "./animations.js";

document
  .querySelectorAll(".work-elements-wrapper[data-link-area]")
  .forEach((workCard) => initLinkMovement(workCard));
