// components/university/HeroBanner.tsx
"use client";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  summary?: string;
  ctaText?: string;
  ctaHref?: string;
  bgImage: string;
  mobileObjectPosition?: string;
  desktopObjectPosition?: string;
  highlights?: string[];
  /** set to true if the page is wrapped in a container and you need edge-to-edge */
  fullBleed?: boolean;
  /** set to true for full viewport height on lg+ */
  fullHeight?: boolean;
};

export default function HeroBanner({
  title,
  summary,
  ctaText = "Apply Now",
  ctaHref = "/contact",
  bgImage,
  mobileObjectPosition = "center 25%",
  desktopObjectPosition = "center",
  highlights = [],
  fullBleed = false,
  fullHeight = true,
}: Props) {
  return (
    <section
      className={[
        // full-bleed escape if needed
        fullBleed
          ? "relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen"
          : "w-full",
        // height controls
        fullHeight
          ? "min-h-[60svh] h-[70svh] lg:h-screen"
          : "min-h-[320px] sm:min-h-[380px] h-[65svh] md:h-[80svh]",
        "relative overflow-x-clip overflow-y-hidden",
      ].join(" ")}
      aria-label={title}
    >
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="
          absolute inset-0 w-full h-full object-cover
          [object-position:var(--mob-pos)] md:[object-position:var(--desk-pos)]
          select-none pointer-events-none
        "
        style={
          {
            ["--mob-pos" as any]: mobileObjectPosition,
            ["--desk-pos" as any]: desktopObjectPosition,
          } as React.CSSProperties
        }
      />

      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      <div className="relative z-10 flex h-full w-full items-center justify-center px-6 text-center">
        <div className="max-w-5xl">
          <h1 className="text-white text-4xl md:text-6xl font-semibold tracking-tight">
            {title}
          </h1>

          <div className="mt-6">
            <Link
              to={ctaHref}
              className="inline-block rounded-md bg-red-600 px-6 py-3 text-white font-medium text-base md:text-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
