"use client";
import React from "react";
import Container from "@/components/ui/Container";

type Props = {
  title: string;
  country: string;
  heroUrl?: string;
  summary?: string;
};
export default function Header({ title, country, heroUrl, summary }: Props) {
  return (
    <div
      className="relative isolate"
      style={{
        background:
          "linear-gradient(180deg, rgba(37,99,235,0.9) 0%, rgba(37,99,235,0.75) 40%, rgba(37,99,235,0.65) 100%)",
      }}
    >
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${heroUrl || "/images/university/hero-placeholder.jpg"})` }}
      />
      <Container className="py-10 sm:py-14 text-white">
        <div className="flex flex-col gap-4">
          <span className="inline-flex w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            {country}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">{title}</h1>
          {summary && <p className="max-w-3xl text-sm sm:text-base text-white/90">{summary}</p>}
        </div>
      </Container>
    </div>
  );
}
