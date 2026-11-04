import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal(
  scope: RefObject<HTMLElement | null>,
  reduced: boolean,
) {
  useLayoutEffect(() => {
    const root = scope.current;

    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      // 1. Standard reveal
      const revealElements =
        root.querySelectorAll<HTMLElement>("[data-reveal]");

      revealElements.forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 10,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });

      // 2. Staggered reveal
      const staggerElements = root.querySelectorAll<HTMLElement>(
        "[data-reveal-stagger]",
      );

      staggerElements.forEach((el) => {
        const children = Array.from(el.children);

        if (!children.length) return;

        gsap.from(children, {
          autoAlpha: 0,
          y: 10,
          duration: 0.75,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });

      // 3. Masked text reveal
      const maskElements = root.querySelectorAll<HTMLElement>("[data-mask]");

      maskElements.forEach((el) => {
        const inner = el.querySelectorAll<HTMLElement>(".mask__inner");

        if (!inner.length) return;

        gsap.from(inner, {
          yPercent: 100,
          duration: 0.85,
          stagger: 0.06,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, [scope, reduced]);
}

export { gsap, ScrollTrigger };
