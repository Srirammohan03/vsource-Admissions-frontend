"use client";

import React, { useMemo, useState } from "react";
import Container from "@/components/ui/Container";

/** Row type (unchanged) */
export type FeeRow = { year: string; semester: string; usd: number; inr: string };

/** Extras (unchanged) */
export type FeesExtras = {
  heading?: string;
  subheading?: string;
  servicesTitle?: string;
  services?: string[];
  disclaimers?: string[];
};

type Props = {
  rows: FeeRow[];
  note?: string;
  extras?: FeesExtras;
};

export default function FeesTable({ rows, note, extras }: Props) {
  const sample = rows?.[0];

  /** ---- Color tokens (inline so they always win) ---- */
  const COLORS = {
    headerBg: "#dc2626",      // red-600
    headerText: "#ffffff",
    border: "#e5e7eb",        // gray-200
    badgeBg: "#f1f5f9",       // slate-100
    badgeText: "#334155",     // slate-700
    stripeGray: "#f9fafb",    // gray-50
    stripeRed: "#fff1f2",     // rose-50 (soft red)
    hover: "#ffe4e6",         // rose-100
    yearCell: "#fff7ed",      // amber-50 (distinct for year column)
    pillRed: "#f87171",       // red-400
    pillText: "#000000",
    textDark: "#0f172a",      // slate-900
    subText: "#475569",       // slate-600
    cardBg: "#ffffff",
    sectionBg: "#f8fafc",     // slate-50
  } as const;

  /** track row hover (so hover color overrides stripe) */
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  /** Group rows by year and order semesters */
  const grouped = useMemo(() => {
    const m = new Map<string, FeeRow[]>();
    for (const r of rows) {
      if (!m.has(r.year)) m.set(r.year, []);
      m.get(r.year)!.push(r);
    }
    const num = (s: string) => {
      const m2 = s.match(/\d+/);
      return m2 ? parseInt(m2[0], 10) : Number.POSITIVE_INFINITY;
    };
    return new Map(
      [...m.entries()]
        .sort((a, b) => num(a[0]) - num(b[0]) || a[0].localeCompare(b[0]))
        .map(([year, list]) => [year, list.sort((a, b) => num(a.semester) - num(b.semester))])
    );
  }, [rows]);

  /** Flatten with rowSpan for the first row of each year */
  const flat = useMemo(() => {
    const out: Array<FeeRow & { isYearFirst: boolean; rowSpan: number }> = [];
    for (const [, list] of grouped.entries()) {
      list.forEach((r, idx) =>
        out.push({ ...r, isYearFirst: idx === 0, rowSpan: idx === 0 ? list.length : 0 })
      );
    }
    return out;
  }, [grouped]);

  /** Reusable inline paddings for cells (≈ px-5 py-4) */
  const cellPad: React.CSSProperties = { padding: "16px 20px" };

  const LeftTable = (
    <div
      className="rounded-2xl border shadow-sm bg-white"
      style={{ borderColor: COLORS.border, backgroundColor: COLORS.cardBg }}
    >
      {/* header + chips */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-5 sm:p-6">
        <div>
          <h4 className="text-xl sm:text-2xl font-extrabold" style={{ color: COLORS.textDark }}>
            {extras?.heading ?? "Fees (2025–26) Structure"}
          </h4>
          {extras?.subheading ? (
            <p className="text-sm" style={{ color: COLORS.subText }}>
              {extras.subheading}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* USD chip */}
          <span
            className="inline-flex items-baseline rounded-full px-4 py-2 shadow-sm font-extrabold"
            style={{
              background: "linear-gradient(to right, #34d399, #10b981)",
              color: COLORS.pillText,
            }}
          >
            <span className="text-sm opacity-90 mr-1">$</span>
            <span className="text-lg">{sample ? sample.usd.toLocaleString() : "—"}</span>
            <span className="ml-2 text-xs opacity-90">per sem</span>
          </span>

          {/* INR chip */}
          <span
            className="inline-flex items-baseline rounded-full px-4 py-2 shadow-sm font-extrabold"
            style={{
              background: "linear-gradient(to right, #f59e0b, #f97316)",
              color: COLORS.pillText,
            }}
          >
            <span className="text-lg">{sample ? sample.inr : "—"}</span>
            <span className="ml-2 text-xs opacity-90">per sem</span>
          </span>
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b border-dashed"
              style={{ backgroundColor: COLORS.headerBg, color: COLORS.headerText, borderColor: COLORS.border }}
            >
              {["Year", "Semester", "USD", "INR"].map((label) => (
                <th key={label} className="text-left" style={cellPad}>
                  <span
                    className="inline-flex  px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
                    
                  >
                    {label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {flat.map((r, i) => {
              const rowBg =
                hoverIndex === i ? COLORS.hover : i % 2 === 0 ? COLORS.stripeGray : COLORS.stripeRed;

              return (
                <tr
                  key={`${r.year}-${r.semester}-${i}`}
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  {r.isYearFirst && (
                    <td
                      rowSpan={r.rowSpan}
                      className="font-semibold text-slate-900 whitespace-nowrap align-top"
                      style={{
                        ...cellPad,
                        backgroundColor: hoverIndex === i ? COLORS.hover : COLORS.yearCell,
                        borderRight: `1px solid ${COLORS.border}`,
                        borderBottom: `1px dashed ${COLORS.border}`,
                      }}
                    >
                      {r.year}
                    </td>
                  )}

                  <td
                    className=""
                    style={{
                      ...cellPad,
                      backgroundColor: rowBg,
                      borderBottom: `1px dashed ${COLORS.border}`,
                    }}
                  >
                    <span
                      className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ backgroundColor: COLORS.badgeBg, color: COLORS.badgeText }}
                    >
                      {r.semester}
                    </span>
                  </td>

                  <td
                    className=""
                    style={{
                      ...cellPad,
                      backgroundColor: rowBg,
                      borderBottom: `1px dashed ${COLORS.border}`,
                    }}
                  >
                    <span
                      className="inline-flex items-baseline  px-3 py-1 font-bold"
                      style={{ color: COLORS.pillText }}
                    >
                      ${r.usd.toLocaleString()}
                    </span>
                  </td>

                  <td
                    className=""
                    style={{
                      ...cellPad,
                      backgroundColor: rowBg,
                      borderBottom: `1px dashed ${COLORS.border}`,
                    }}
                  >
                    <span
                      className="inline-flex items-baseline  px-3 py-1 font-bold"
                      style={{  color: COLORS.pillText }}
                    >
                      {r.inr}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {(note || extras?.disclaimers?.length) && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-4">
          <div
            className="rounded-xl px-4 py-3 text-xs border border-dashed space-y-1"
            style={{ backgroundColor: COLORS.sectionBg, color: COLORS.subText, borderColor: "#e2e8f0" }}
          >
            {note && <p className="m-0">{note}</p>}
            {extras?.disclaimers?.map((d, i) => (
              <p key={i} className="m-0">
                {d}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const RightServices =
    extras?.services?.length ? (
      <div
        className="rounded-2xl border shadow-sm p-5 sm:p-6 h-fit"
        style={{ backgroundColor: COLORS.cardBg, borderColor: COLORS.border }}
      >
        <h5 className="text-base sm:text-lg font-extrabold mb-2" style={{ color: COLORS.textDark }}>
          {extras.servicesTitle ?? "List of Services Included"}
        </h5>
        <ul className="space-y-3">
          {extras.services!.map((s, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl px-4 py-3 border border-dashed"
              style={{
                backgroundColor: i % 2 === 0 ? COLORS.sectionBg : COLORS.stripeRed,
                borderColor: COLORS.border,
              }}
            >
              <span
                className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border shadow-sm"
                style={{ backgroundColor: "#fff", color: "#e11d48", borderColor: "#fecdd3" }}
              >
                ✓
              </span>
              <span className="text-sm" style={{ color: COLORS.textDark }}>
                {s}
              </span>
            </li>
          ))}
        </ul>
      </div>
    ) : null;

  return (
    <Container>
      {/* section wrapper */}
      <div className="rounded-2xl p-4 sm:p-6" style={{ backgroundColor: COLORS.sectionBg }}>
        {/* ✅ 2-column layout from md+ */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>{LeftTable}</div>
          <div>{RightServices}</div>
        </div>
      </div>
    </Container>
  );
}
