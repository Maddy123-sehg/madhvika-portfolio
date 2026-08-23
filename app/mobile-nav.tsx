"use client";

import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Portfolio", href: "#index" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills & AI", href: "#skills", ai: true },
  { label: "Contact", href: "#contact" },
];

export function MobileNav({ resumePdf }: { resumePdf: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative xl:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2.5 text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen ? (
        <nav
          id="mobile-navigation"
          className="absolute right-0 top-12 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-1.5 rounded-lg px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600"
            >
              {link.ai ? <Sparkles aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-blue-500" /> : null}{link.label}
            </a>
          ))}
          <a
            href={resumePdf}
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsOpen(false)}
            className="mt-1 block rounded-lg bg-blue-600 px-4 py-3 text-sm font-black text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
          >
            Resume PDF
          </a>
        </nav>
      ) : null}
    </div>
  );
}
