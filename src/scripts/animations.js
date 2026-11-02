import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REVEAL_DEFAULT_DELAY_MS = 200;
const REVEAL_DEFAULT_OFFSET_PERCENT = 10;
const HOVER_DURATION = 0.3;
const HOVER_EASE = "power1.inOut";

/** Elements that already received a one-shot animation, so re-running an
 *  initializer (global pass + section pass) never stacks duplicates. */
const initializedElements = new WeakSet();

/** True when the visitor asked the OS to reduce motion. */
export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Recalculate ScrollTrigger positions after the page settles — layout of the
 *  section grid can shift once fonts, posters and videos report their size. */
let refreshTimeout;
new ResizeObserver(() => {
  clearTimeout(refreshTimeout);
  refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);
}).observe(document.body);

function hoverIn({ arrows, lines, backgrounds }) {
  if (arrows.length) {
    gsap.to(arrows, {
      rotation: 45,
      duration: HOVER_DURATION,
      ease: HOVER_EASE,
      overwrite: true,
    });
  }
  if (lines.length) {
    gsap.to(lines, {
      xPercent: 0,
      duration: HOVER_DURATION,
      ease: HOVER_EASE,
      overwrite: true,
    });
  }
  if (backgrounds.length) {
    gsap.to(backgrounds, {
      scaleY: 1,
      duration: HOVER_DURATION,
      ease: HOVER_EASE,
      overwrite: true,
    });
  }
}

function hoverOut({ arrows, lines, backgrounds }) {
  if (arrows.length) {
    gsap.to(arrows, {
      rotation: 0,
      duration: HOVER_DURATION,
      ease: HOVER_EASE,
      overwrite: true,
    });
  }
  if (lines.length) {
    gsap.to(lines, {
      xPercent: 100,
      duration: HOVER_DURATION,
      ease: HOVER_EASE,
      overwrite: true,
      onComplete: () => gsap.set(lines, { xPercent: -100 }),
    });
  }
  if (backgrounds.length) {
    gsap.to(backgrounds, {
      scaleY: 0,
      duration: HOVER_DURATION,
      ease: HOVER_EASE,
      overwrite: true,
    });
  }
}

/**
 * Hover/focus feedback for any `[data-hover]` element.
 * The attribute value is a space separated list of effects:
 * `arrow` rotates `.target-arrow`, `line` sweeps `.animated-line`,
 * `bg` grows `.bg` upwards from its bottom edge.
 */
export function initHoverAnimations(root = document) {
  root.querySelectorAll("[data-hover]").forEach((element) => {
    if (initializedElements.has(element)) return;
    initializedElements.add(element);

    const effects = element.dataset.hover.split(/\s+/);
    const targets = {
      arrows: effects.includes("arrow")
        ? element.querySelectorAll(".target-arrow")
        : [],
      lines: effects.includes("line")
        ? element.querySelectorAll(".animated-line")
        : [],
      backgrounds: effects.includes("bg")
        ? element.querySelectorAll(".bg")
        : [],
    };

    if (targets.lines.length) gsap.set(targets.lines, { x: 0, xPercent: -100 });
    if (targets.backgrounds.length) {
      gsap.set(targets.backgrounds, { scaleY: 0, transformOrigin: "50% 100%" });
    }

    const playIn = () => hoverIn(targets);
    const playOut = () => hoverOut(targets);

    element.addEventListener("mouseenter", playIn);
    element.addEventListener("mouseleave", playOut);
    element.addEventListener("focusin", playIn);
    element.addEventListener("focusout", playOut);
  });
}

/**
 * Fade/slide in every `[data-reveal]` element once it enters the viewport.
 * `data-reveal-delay` (ms, default 200) and `data-reveal-offset`
 * (percentage of the viewport, default 10) tune the trigger.
 */
export function initRevealAnimations(root = document) {
  root.querySelectorAll("[data-reveal]").forEach((element) => {
    if (initializedElements.has(element)) return;
    initializedElements.add(element);

    if (prefersReducedMotion()) {
      gsap.set(element, { opacity: 1 });
      return;
    }

    const delay =
      Number(element.dataset.revealDelay ?? REVEAL_DEFAULT_DELAY_MS) / 1000;
    const offset = Number(
      element.dataset.revealOffset ?? REVEAL_DEFAULT_OFFSET_PERCENT,
    );

    gsap.fromTo(
      element,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: `top ${100 - offset}%`,
          once: true,
        },
      },
    );
  });
}

/** Wipe the `.mask` overlay off every `.mask-animation-trigger` once. */
export function initMaskAnimations(root = document) {
  root.querySelectorAll(".mask-animation-trigger").forEach((element) => {
    if (initializedElements.has(element)) return;
    initializedElements.add(element);

    const mask = element.querySelector(".mask");
    if (!mask || prefersReducedMotion()) return;

    gsap.fromTo(
      mask,
      { x: 0, xPercent: 0 },
      {
        xPercent: 100,
        duration: 0.6,
        ease: "power1.inOut",
        scrollTrigger: { trigger: element, start: "top 80%", once: true },
      },
    );
  });
}

/**
 * Float a `.link-movement-target` label inside `element` with the pointer and
 * fade it in on hover — used by the "View" badge on project cards.
 */
export function initLinkMovement(element) {
  if (!element || initializedElements.has(element)) return;
  initializedElements.add(element);

  const label = element.querySelector(".link-movement-target");
  if (!label) return;

  gsap.set(label, { opacity: 0 });

  const moveX = gsap.quickTo(label, "x", { duration: 0.6, ease: "power3.out" });
  const moveY = gsap.quickTo(label, "y", { duration: 0.6, ease: "power3.out" });

  element.addEventListener("mouseenter", () => {
    gsap.to(label, {
      opacity: 1,
      duration: 0.5,
      ease: "power1.inOut",
      overwrite: "auto",
    });
  });

  element.addEventListener("mouseleave", () => {
    gsap.to(label, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.inOut",
      overwrite: "auto",
    });
    moveX(0);
    moveY(0);
  });

  element.addEventListener("mousemove", (event) => {
    const bounds = element.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5;

    moveX(relativeX * window.innerWidth);
    moveY(relativeY * window.innerHeight);
  });
}
