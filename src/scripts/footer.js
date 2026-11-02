import { gsap } from "gsap";
import { initHoverAnimations } from "./animations.js";

const footerWrapper = document.querySelector(".footer-wrapper");

initHoverAnimations(footerWrapper);

/* The footer is sticky, so an anchor jump lands on its static position instead
   of the visible panel — scroll to the end of the document instead. Pinned
   sections keep growing the page during the scroll, hence the repeated nudges. */
document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href="#contact"], a[href="/#contact"]');
  if (!link) return;

  event.preventDefault();
  history.replaceState(null, "", "#contact");

  let attempts = 0;

  const scrollToFooter = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });

    if (++attempts < 4) setTimeout(scrollToFooter, 800);
  };

  scrollToFooter();
});
