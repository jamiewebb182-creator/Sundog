"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GlassArt } from "@/lib/glassArt";

// Above this width the hero is a two-column layout (text | image) and we want
// the image to match the text block's height. Below it, the two stack and the
// image just uses a fixed aspect ratio instead — keep in sync with the
// `@media (max-width: 860px)` breakpoint in globals.css.
const STACK_BREAKPOINT = 860;

export function Hero({
  eyebrow,
  tagline,
  bio,
  heroImage,
  heroCaption,
}: {
  eyebrow: string;
  tagline: string;
  bio: string;
  heroImage: string | null;
  heroCaption: string;
}) {
  const textRef = useRef<HTMLDivElement>(null);
  const [frameHeight, setFrameHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const textEl = textRef.current;
    if (!textEl) return;

    const update = () => {
      if (window.innerWidth <= STACK_BREAKPOINT) {
        // Stacked layout — let the CSS aspect-ratio fallback handle it.
        setFrameHeight(undefined);
      } else {
        setFrameHeight(textEl.offsetHeight);
      }
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(textEl);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="block hero">
      <div ref={textRef} className="hero-text">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{tagline}</h1>
        <p className="bio">{bio}</p>
      </div>
      <div className="hero-art">
        <div
          className="frame art-frame"
          style={frameHeight ? { height: frameHeight } : undefined}
        >
          {heroImage ? (
            <Image src={heroImage} alt={heroCaption} width={1000} height={1333} priority />
          ) : (
            <GlassArt seed="hero1" palette={3} cols={7} rows={5} />
          )}
        </div>
        <p className="hero-cap">{heroCaption}</p>
      </div>
    </section>
  );
}
