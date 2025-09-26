"use client";
import React from "react";
import Container from "@/components/ui/Container";

type LinkItem = { label: string; target: string };

export default function QuickLinks({ items }: { items: LinkItem[] }) {
  // exactly 8 links expected: first 4 + last 4
  const firstRow = items.slice(0, 4);
  const secondRow = items.slice(4, 8);

  return (
    <div className="bg-[var(--blue-600)]/0 py-4">
      <Container>
        {/* hard width cap + center */}
        <div className="mx-auto w-full max-w-[80rem]">
          {/* Row 1 */}
          <div
            className="gap-4 py-2"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            }}
          >
            {firstRow.map((it) => (
              <a
                key={it.target}
                href={`#${it.target}`}
                className="block rounded-xl bg-blue-600 text-white font-semibold px-6 py-6 text-center hover:-translate-y-px hover:shadow-md transition"
              >
                {it.label}
              </a>
            ))}
          </div>

          {/* Row 2 */}
          <div
            className="gap-4 py-2"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            }}
          >
            {secondRow.map((it) => (
              <a
                key={it.target}
                href={`#${it.target}`}
                className="block rounded-xl bg-blue-600 text-white font-semibold px-6 py-6 text-center hover:-translate-y-px hover:shadow-md transition"
              >
                {it.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
