"use client";
import React, { useState } from "react";
import Container from "@/components/ui/Container";

export default function EnquiryForm() {
  const [sent, setSent] = useState(false);

  return (
    <Container>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="grid grid-cols-1 gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input name="name" label="Name" required />
          <Input name="whatsapp" label="WhatsApp No" required />
          <Input name="email" label="Email" type="email" required />
          <Input name="city" label="City" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" required className="h-4 w-4" /> Kindly send me all details on my WhatsApp & Email
        </label>
        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Send
        </button>
        {sent && <p className="text-sm text-green-600">Thanks! We’ll get back to you shortly.</p>}
      </form>
    </Container>
  );
}

function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="text-sm">
      <span className="mb-1 block font-medium">{label}</span>
      <input
        {...props}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>
  );
}
