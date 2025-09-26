"use client";
import React from "react";

type Props = React.PropsWithChildren<{
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}>;

export default function Section({ id, title, subtitle, className = "", children }: Props) {
  return (
    <section id={id} className={`scroll-mt-24 py-10 sm:py-14 ${className}`}>
      <div className="mb-6">
        {title && <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>}
        {subtitle && <p className="mt-2 text-sm sm:text-base text-gray-600">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
