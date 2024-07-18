"use client";

import { useEffect, useRef } from "react";
import styles from "../../styles/scroll.module.css";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

export default function TextScroll() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.2,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  };

  return (
    <section className={styles.scrollMain}>
      <div className={styles.sliderContainer}>
        <div className={styles.slider}>
          <p ref={firstText}>Scroll up & down -</p>
          <p ref={secondText}>Scroll up & down -</p>
        </div>
      </div>
    </section>
  );
}
