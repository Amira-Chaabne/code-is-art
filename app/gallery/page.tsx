"use client";

import styles from "@/styles/gallery.module.css";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import {
  img_2,
  img_3,
  img_4,
  img_5,
  img_6,
  img_7,
  img_8,
} from "../../data/gallery_imgs_data";

export default function GAllery() {
  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  let requestAnimationFrameId: number | null = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const manageMouseMove = (e: React.MouseEvent) => {
    const { movementX, movementY } = e;
    xForce += movementX * speed;
    yForce += movementY * speed;

    if (requestAnimationFrameId === null) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  };

  const lerp = (start: number, target: number, amount: number) =>
    start * (1 - amount) + target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` });
    gsap.set(plane2.current, {
      x: `+=${xForce * 0.5}`,
      y: `+=${yForce * 0.5}`,
    });
    gsap.set(plane3.current, {
      x: `+=${xForce * 0.25}`,
      y: `+=${yForce * 0.25}`,
    });

    if (Math.abs(xForce) < 0.01) xForce = 0;
    if (Math.abs(yForce) < 0.01) yForce = 0;

    if (xForce !== 0 || yForce !== 0) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestAnimationFrameId!);
      requestAnimationFrameId = null;
    }
  };

  return (
    <section
      onMouseMove={(e) => {
        manageMouseMove(e);
      }}
      className={styles.gallery_wrapper}
    >
      <div ref={plane1} className={styles.plane}>
        <Image src={img_2} alt="placeholder image" width={300} />
        <Image src={img_7} alt="placeholder image" width={225} />
      </div>
      <div ref={plane2} className={styles.plane}>
        <Image src={img_4} alt="placeholder image" width={250} />
        <Image src={img_6} alt="placeholder image" width={200} />
        <Image src={img_8} alt="placeholder image" width={225} />
      </div>
      <div ref={plane3} className={styles.plane}>
        <Image src={img_3} alt="placeholder image" width={150} />
        <Image src={img_5} alt="placeholder image" width={200} />
      </div>
      <div className={styles.title}>
        <h1>Floating images gallery</h1>
        <p>Move the cursor</p>
      </div>
    </section>
  );
}
