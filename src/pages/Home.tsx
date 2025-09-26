import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import AboutSection from "./AboutSection";
import Accreditation from "./AccreditationSection";
import Journey from "@/components/home/Journey";
import TrustSection from "@/components/home/TrustSection";
import CertificateSlider from "@/components/home/CertificateSlider";
import VideoSection from "@/components/VideoSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

type Slide = {
  img: string;
  title: React.ReactNode;
  alt: string;
  subtitle: string;
  cta: { href: string; label: string };
};

const slides: Slide[] = [
  {
    img: "/images/hero1.jpg",
    title: (
      <>
        Study <span className="text-red-600">MBBS</span> Abroad
      </>
    ),
    alt: "Study MBBS Abroad",
    subtitle: "Top universities • Transparent guidance • End-to-end support",
    cta: { href: "/contact", label: "Get Counselling" },
  },
  {
    img: "/images/hero2.jpg",
    title: (
      <>
        MBBS in <span className="text-red-600">Georgia </span> &amp;{" "}
        <span className="text-red-600">Russia</span>
      </>
    ),
    alt: "MBBS in Georgia & Russia",
    subtitle: "Affordable tuition • International exposure",
    cta: { href: "/mbbs-abroad/georgia", label: "Explore Georgia" },
  },
  {
    img: "/images/hero3.jpg",
    title: (
      <>
        Prefix <span className="text-red-600">Your Name</span> With{" "}
        <span className="text-red-600">Doctor</span>
      </>
    ),
    alt: "Prefix Your Name With Doctor",
    subtitle: "18+ years • 100,000+ enrolled students",
    cta: { href: "/about", label: "Why VSource" },
  },
];

function Home() {
  const [idx, setIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(0);
  const [isNextLoaded, setIsNextLoaded] = useState(true); // true for initial render
  const prefersReducedMotion = useReducedMotion();
  const timerRef = useRef<number | null>(null);
  const loadedRef = useRef<{ [key: number]: boolean }>({});

  const start = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      goTo((i) => (i + 1) % slides.length);
    }, 5000);
  }, []);

  const stop = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const onVis = () => (document.hidden ? stop() : start());
      start();
      document.addEventListener("visibilitychange", onVis);
      return () => {
        stop();
        document.removeEventListener("visibilitychange", onVis);
      };
    }
  }, [start, stop]);

  const goTo = (updater: (i: number) => number) => {
    setPrevIdx((p) => {
      const current = idx;
      const next = updater(current);
      setIsNextLoaded(!!loadedRef.current[next]);
      setIdx(next);
      return current;
    });
  };

  // touch swipe
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;
    if (delta > threshold) goTo((i) => (i - 1 + slides.length) % slides.length);
    else if (delta < -threshold) goTo((i) => (i + 1) % slides.length);
    touchStartX.current = null;
  };

  const fadeDur = prefersReducedMotion ? 0 : 0.9;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative w-full overflow-hidden bg-black" // black base stops white flash
        aria-roledescription="carousel"
        onMouseEnter={stop}
        onMouseLeave={start}
      >
        <div
          className="relative w-full h-[70svh] md:h-[85svh] lg:h-[90svh] min-h-[420px] max-h-[900px]"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Layer 1: previous slide stays until the next fully loads */}
          <motion.div
            key={`prev-${prevIdx}-${idx}`}
            initial={{ opacity: 1 }}
            animate={{ opacity: isNextLoaded ? 0 : 1 }}
            transition={{ duration: fadeDur, ease: "easeInOut" }}
            className="absolute inset-0"
            aria-hidden // decorative during transition
          >
            <div className="absolute inset-0">
              <img
                src={slides[prevIdx].img}
                alt="" // prev layer is decorative during transition
                className="object-cover object-center w-full h-full"
              />
            </div>
            <div className="absolute inset-0 bg-black/55" />
          </motion.div>

          {/* Layer 2: next/current slide (fades in only after loaded) */}
          <motion.div
            key={`cur-${idx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: fadeDur, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0">
              <img
                src={slides[idx].img}
                alt={slides[idx].alt}
                className="object-cover object-center w-full h-full"
                onLoad={() => {
                  loadedRef.current[idx] = true;
                  setIsNextLoaded(true); // triggers fade-out of prev layer
                }}
              />
            </div>
            <div className="absolute inset-0 bg-black/55" />
          </motion.div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full mx-auto max-w-screen-xl px-4 sm:px-6 text-white">
              <motion.h1
                key={`title-${idx}`}
                initial={{ y: prefersReducedMotion ? 0 : 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
                className="font-bold text-balance text-[clamp(24px,6vw,52px)] leading-[1.1] max-w-[92vw] sm:max-w-3xl"
              >
                {slides[idx].title}
              </motion.h1>

              <motion.p
                key={`subtitle-${idx}`}
                initial={{ y: prefersReducedMotion ? 0 : 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.7,
                  delay: 0.05,
                }}
                className="mt-3 text-white/90 text-[clamp(14px,3.8vw,20px)] max-w-[92vw] sm:max-w-2xl"
              >
                {slides[idx].subtitle}
              </motion.p>

              <motion.div
                key={`cta-${idx}`}
                initial={{ y: prefersReducedMotion ? 0 : 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.7,
                  delay: 0.1,
                }}
                className="mt-6 flex flex-wrap gap-3"
              >
                <RouterLink
                  to={slides[idx].cta.href}
                  className="inline-flex items-center justify-center px-5 py-2 rounded-[6px] bg-red-600 text-white text-sm md:text-base hover:bg-white hover:text-red-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  {slides[idx].cta.label}
                </RouterLink>
                <a
                  href="#gallery"
                  className="inline-flex items-center justify-center px-5 py-2 rounded-[6px] border border-white/80 bg-transparent text-white text-sm md:text-base hover:bg-red-600 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  Gallery
                </a>
              </motion.div>
            </div>
          </div>

          {/* Arrows */}
          <div className="absolute left-4 bottom-6 sm:left-6 sm:bottom-8 z-10 flex gap-3">
            <button
              aria-label="Previous Slide"
              onClick={() =>
                goTo((i) => (i - 1 + slides.length) % slides.length)
              }
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white shadow transition backdrop-blur-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              aria-label="Next Slide"
              onClick={() => goTo((i) => (i + 1) % slides.length)}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white shadow transition backdrop-blur-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Preload neighbors invisibly to avoid future flashes */}
        <div aria-hidden className="hidden">
          {slides.map((s, i) => (
            <img
              key={`preload-${i}`}
              src={s.img}
              alt=""
              width={1}
              height={1}
              onLoad={() => (loadedRef.current[i] = true)}
            />
          ))}
        </div>
      </section>

      <AboutSection />

      <Accreditation />

      <Journey />

      <TrustSection />

      {/* <CertificateSlider /> */}

      <VideoSection />

      <TestimonialsSection />
    </div>
  );
}

export default Home;
