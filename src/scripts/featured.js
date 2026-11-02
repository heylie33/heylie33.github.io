import { gsap } from "gsap";
import { initLinkMovement, prefersReducedMotion } from "./animations.js";

const featuredSection = document.querySelector(".featured-section");

initLinkMovement(featuredSection.querySelector("[data-link-area]"));

const slides = [...featuredSection.querySelectorAll("[data-featured-slide]")];

if (slides.length > 1) {
  const deck = [...slides];
  const poses = [
    { y: 0, scale: 1 },
    { y: 40, scale: 0.84 },
    { y: 70, scale: 0.7 },
  ];

  const arrange = () => {
    deck.forEach((slide, index) => {
      gsap.set(slide, {
        ...poses[index],
        zIndex: deck.length - index,
        transformOrigin: "50% 100%",
      });
    });
  };

  arrange();

  if (!prefersReducedMotion()) {
    const cycle = () => {
      const front = deck[0];
      const timeline = gsap.timeline({
        onComplete: () => gsap.delayedCall(1.8, cycle),
      });

      timeline.to(front, {
        y: -360,
        duration: 0.65,
        ease: "power2.inOut",
      });
      timeline.add(() => {
        deck.push(deck.shift());
        deck.forEach((slide, index) => {
          gsap.set(slide, { zIndex: deck.length - index });
        });
        gsap.set(front, { ...poses[2] });
      });
      timeline.to(
        deck[1],
        { ...poses[0], duration: 0.55, ease: "power2.inOut" },
        0.25,
      );
      timeline.to(
        deck[2],
        { ...poses[1], duration: 0.55, ease: "power2.inOut" },
        0.25,
      );
    };

    gsap.delayedCall(1.8, cycle);
  }
}


if (!prefersReducedMotion()) {
  gsap.matchMedia().add("(min-width: 768px)", () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: featuredSection,
          start: "top 80%",
          end: "top top",
          scrub: 0.8,
        },
      })
      .fromTo(
        "[data-featured-left]",
        { x: "-10vw" },
        { x: 0, duration: 0.35, ease: "power1.inOut" },
        0,
      )
      .fromTo(
        "[data-featured-right]",
        { x: "10vw" },
        { x: 0, duration: 0.35, ease: "power1.inOut" },
        0,
      )
      .to({}, { duration: 0.65 });
  });
}
