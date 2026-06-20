"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/images/red-fort.jpg",
  "/images/qutub-minar1.jpg",
  "/images/lotus-temple.jpg",
  "/images/india-gate1.jpg",
];

export default function DelhiCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[450px] w-full rounded-3xl overflow-hidden shadow-xl">

      <Image
        src={images[index]}
        alt="Delhi"
        fill
        className="object-cover"
      />

    </div>
  );
}