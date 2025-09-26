"use client";

import React from "react";
import Container from "@/components/ui/Container";

// ===== types =====
export type FeatureCard = { title: string; body: string; icon?: string };

export type CalloutContent = {
  // SECTION 1 – Why Vsource (left text + bullets + CTA) + right feature cards
  why: {
    heading: string;
    paragraph: string;
    bullets: string[];
    cta?: { label: string; href?: string };
    features: FeatureCard[]; // right-side cards (2-up)
  };

  // SECTION 2 – About University (left text + highlight pills) + right image
  about: {
    heading: string;
    paragraphs: string[];
    highlights: string[];
    image?: { src: string; alt?: string };
  };

  // SECTION 3 – Split: left (Why Medicine @ Univ)  +  right (What the University Offers)
  medicine: {
    heading: string;
    bullets: string[];
    partners: string[];
  };
  offers: string[]; // right column list/cards

  // SECTION 4 – News/card: left image + right heading/paras/link
  news?: {
    heading: string;
    paragraphs: string[];
    link?: { href: string; label?: string };
    image?: { src: string; alt?: string };
  };

  // Optional small note/info box at the bottom
  note?: string;
};

// ===== UI tokens =====
const ACCENT_RED = "#E3000F";

type Props =
  | { /** legacy usage */ title: string; body: React.ReactNode; content?: never }
  | { /** structured usage */ title?: never; body?: never; content: CalloutContent };

/**
 * Callout – supports two modes:
 * 1) Legacy: <Callout title body> simple block.
 * 2) Structured: <Callout content={...}> renders the 4-section layout.
 */
export default function Callout(props: Props) {
  if ("content" in props && props.content) {
    const { why, about, medicine, offers, news, note } = props.content;

    return (
      <section className="py-0 sm:py-1 bg-white -mt-14 sm:-mt-16 md:-mt-20 lg:-mt-24">
        <Container>
          {/* ====== SECTION 1: Why Vsource + Feature cards (Right 2-up) ====== */}
          <div className="grid gap-6 md:grid-cols-2 items-start">
            {/* Left */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                {why.heading}
              </h2>

              <p className="mt-3 text-gray-700 leading-relaxed">{why.paragraph}</p>

              <div
                className="mt-2 h-1.5 w-24 rounded-full"
                style={{ backgroundColor: ACCENT_RED }}
                aria-hidden
              />

              <ul className="mt-6 mb-6 space-y-3">
                {why.bullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-2 inline-block h-3 w-3 rounded-full"
                      style={{ backgroundColor: ACCENT_RED }}
                      aria-hidden
                    />
                    <span className="text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>

              {why.cta && (
                <a
                  href={why.cta.href ?? "#"}
                  className="mt-7 inline-flex items-center justify-center rounded-xl px-5 py-3 text-white font-semibold shadow-sm hover:shadow transition"
                  style={{ backgroundColor: ACCENT_RED }}
                >
                  {why.cta.label}
                </a>
              )}
            </div>

            {/* Right feature cards — 2 columns on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {why.features.map((f, i) => (
                <FeatureCard key={i} title={f.title} body={f.body} icon={f.icon} />
              ))}
            </div>
          </div>

          {/* ====== SECTION 2: About University (Left text + Right image) ====== */}
          <div className="mt-12 sm:mt-16 grid gap-6 md:grid-cols-2 items-stretch  bg-gray-50">
            {/* Left text */}
            <div className="  p-6 sm:p-8 shadow-sm">
              <h3 className="text-3xl sm:text-3xl font-bold text-gray-900">
                {about.heading}
              </h3>
              {about.paragraphs.map((p, i) => (
                <p key={i} className="mt-3 text-gray-700 leading-relaxed">
                  {p}
                </p>
              ))}

              <div className="mt-6 flex flex-wrap gap-2">
                {about.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-800"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Right image */}
            <div>
              <div className="h-full overflow-hidden shadow-sm p-2">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl">
                  {about.image?.src ? (
                    <img
                      src={about.image.src}
                      alt={about.image.alt ?? "University image"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ====== SECTION 3: Why Medicine (Left) + Offers (Right) ====== */}
          <div className="mt-12 sm:mt-16 grid gap-6 md:grid-cols-2">
            {/* Left – Why Medicine */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                {medicine.heading}
              </h3>
              <div
                className="mt-3 h-1.5 w-20 rounded-full"
                style={{ backgroundColor: ACCENT_RED }}
              />
              <ul className="mt-5 space-y-3">
                {medicine.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-2 inline-block h-3 w-3 rounded-full"
                      style={{ backgroundColor: ACCENT_RED }}
                      aria-hidden
                    />
                    <span className="text-gray-800">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 text-sm text-gray-700">
                <p className="font-semibold">Academic Collaborations:</p>
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  {medicine.partners.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right – Offers list */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              <h4 className="text-lg sm:text-xl font-extrabold text-gray-900">
                What the University Offers
              </h4>
              <div className="mt-3 grid gap-3">
                {offers.map((t, i) => (
                  <div key={i} className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                    <p className="text-gray-800 text-sm">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ====== SECTION 4: News card (Left image + Right text) ====== */}
          {news && (
            <div className="mt-12 sm:mt-16 grid gap-6 md:grid-cols-2 items-stretch py-8 sm:py-12" style={{ backgroundColor: '#F7F8FA' }}>
              {/* Left image */}
              <div>
                <div className="h-full overflow-hidden shadow-lg">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl">
                    {news.image?.src ? (
                      <img
                        src={news.image.src}
                        alt={news.image.alt ?? "India–Georgia relations"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-400">
                        Image
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right text */}
              <div className="p-6 sm:p-8 ">
                <h3 className="text-3xl sm:text-2xl bold text-gray-900">
                  {news.heading}
                </h3>
                {news.paragraphs.map((p, i) => (
                  <p key={i} className="mt-3 text-gray-700 leading-relaxed">
                    {p}
                  </p>
                ))}
                {news.link?.href && (
                  <a
                    className="mt-5 inline-flex items-center font-semibold text-blue-600 hover:underline"
                    href={news.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {news.link.label ?? "Read more"}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* {note && (
            <div className="mt-12 sm:mt-16 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
              <p className="text-sm text-gray-600 leading-relaxed">{note}</p>
            </div>
          )} */}
        </Container>
      </section>
    );
  }

  // ===== Legacy fallback (title + body) =====
  const { title, body } = props as { title: string; body: React.ReactNode };
    return (
      <section className="py-10 sm:py-14" style={{ backgroundColor: '#F7F8FA' }}>
      <Container>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">{title}</h3>
          <div className="mt-3 text-gray-700">{body}</div>
        </div>
      </Container>
    </section>
  );
}

// Small card used on the right side of Section 1
function FeatureCard({ title, body, icon }: FeatureCard) {
  return (
    <div className="h-full rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm flex flex-col">
      <div className="flex items-center gap-3">
        {icon && <span className="text-xl">{icon}</span>}
        <h4 className="text-lg sm:text-xl font-extrabold text-gray-900">{title}</h4>
      </div>
      <p className="mt-2 text-sm sm:text-base text-gray-700 flex-1">{body}</p>
      <div
        className="mt-4 h-1 w-14 rounded-full"
        style={{ backgroundColor: ACCENT_RED }}
        aria-hidden
      />
    </div>
  );
}
