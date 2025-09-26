"use client";
import React from "react";
import Container from "@/components/ui/Container";

export default function TwoCol({
  left,
  right,
  reverse = false,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <Container>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-start ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div>{left}</div>
        <div>{right}</div>
      </div>
    </Container>
  );
}
