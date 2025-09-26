"use client";

import React from "react";

export type Stat = {
  label: string;           // e.g., "Professors"
  value: string | number;  // e.g., "688+"
  tooltip?: string;        // optional for accessibility
  icon?: React.ReactNode;  // optional icon
};

type Props = {
  items: Stat[];
};

export default function Stats({ items }: Props) {
  return (
    <section className="py-6 sm:py-8">
      {/* Container with fixed max width of 80rem */}
      <div className="container mx-auto max-w-[80rem] px-4 sm:px-6">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {items.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl border border-blue-400 px-5 py-4 bg-white hover:shadow-md transition-shadow"
              title={s.tooltip}
            >
              {/* Value */}
              <div className="mx-2 grow text-xl sm:text-2xl font-bold text-blue-600">
                {s.value}
              </div>

              {/* Label */}
              <div className="ml-3 text-right">
                <div className="text-sm font-semibold text-gray-900">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
