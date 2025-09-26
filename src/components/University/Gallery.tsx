"use client";

import React, { useState } from "react";
import Container from "@/components/ui/Container";

/** Reusable types */
export type HospitalImage = { src: string; name: string };
export type GalleryData = {
  university: string[];
  hostels: string[];
  hospitals: HospitalImage[];
};

type Props = { data: GalleryData };

const ACTIVE = "bg-red-600 text-white shadow-sm";
const INACTIVE = "bg-gray-100 text-gray-700 hover:bg-gray-200";

export default function Gallery({ data }: Props) {
  if (!data) return null;

  const [tab, setTab] = useState<"university" | "hostels" | "hospitals">(
    "university"
  );

  const university = data.university ?? [];
  const hostels = data.hostels ?? [];
  const hospitals = data.hospitals ?? [];

  const showEmpty =
    (tab === "university" && university.length === 0) ||
    (tab === "hostels" && hostels.length === 0) ||
    (tab === "hospitals" && hospitals.length === 0);

  // Wrapper class for HOSTELS: if only 1–2 items, center the grid by shrinking the max width
  const hostelsWrapper =
    hostels.length <= 2
      ? "mx-auto max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-4"
      : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4";

  // Shared image height (uniform across categories)
  const IMG_CLASS =
    "w-full object-cover h-48 sm:h-56 lg:h-60 transition-transform duration-300 hover:scale-105";

  return (
    <section className="py-4 sm:py-6">
      <Container>
        {/* Pills */}
        <div className="flex justify-center">
          <div className="inline-flex gap-2 rounded-full p-1 bg-gray-100">
            <button
              type="button"
              onClick={() => setTab("university")}
              className={`px-4 sm:px-5 py-2 rounded-full text-sm font-semibold transition ${tab === "university" ? ACTIVE : INACTIVE}`}
            >
              University
            </button>
            <button
              type="button"
              onClick={() => setTab("hostels")}
              className={`px-4 sm:px-5 py-2 rounded-full text-sm font-semibold transition ${tab === "hostels" ? ACTIVE : INACTIVE}`}
            >
              Hostels
            </button>
            <button
              type="button"
              onClick={() => setTab("hospitals")}
              className={`px-4 sm:px-5 py-2 rounded-full text-sm font-semibold transition ${tab === "hospitals" ? ACTIVE : INACTIVE}`}
            >
              Affiliated Hospitals
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6 sm:mt-8">
          {showEmpty ? (
            <div className="text-center text-gray-500 text-sm">
              No images available in this category.
            </div>
          ) : null}

          {/* UNIVERSITY — responsive 2/3/4 grid */}
          {tab === "university" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {university.map((src, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl border border-gray-200 shadow-sm"
                >
                  <img src={src} alt={`university-${i}`} loading="lazy" className={IMG_CLASS} />
                </div>
              ))}
            </div>
          )}

          {/* HOSTELS — center if only 1–2 photos */}
          {tab === "hostels" && (
            <div className={hostelsWrapper}>
              {hostels.map((src, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl border border-gray-200 shadow-sm"
                >
                  <img src={src} alt={`hostel-${i}`} loading="lazy" className={IMG_CLASS} />
                </div>
              ))}
            </div>
          )}

          {/* HOSPITALS — grid with uniform image height + captions */}
          {tab === "hospitals" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {hospitals.map((h, i) => (
                <figure
                  key={i}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                >
                  <img
                    src={h.src}
                    alt={h.name}
                    loading="lazy"
                    className={IMG_CLASS}
                  />
                  <figcaption className="border-t px-4 py-3 text-sm font-semibold text-gray-900 text-center">
                    {h.name}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
