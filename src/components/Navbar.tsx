"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Sermons", href: "#sermons" },
  { label: "Ministries", href: "#ministries" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-navy/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-white font-bold text-lg tracking-wide">PEACEFUL REST</span>
          <span className="text-gold text-xs tracking-widest uppercase">Baptist Church</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-gray-300 hover:text-gold text-sm font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="#give"
            className="bg-gold text-navy text-sm font-semibold px-5 py-2 rounded-full hover:bg-gold/80 transition-colors"
          >
            Give
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy border-t border-white/10 px-6 pb-6 pt-2 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-gray-300 hover:text-gold text-base font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="#give"
            onClick={() => setOpen(false)}
            className="bg-gold text-navy font-semibold px-5 py-2 rounded-full text-center hover:bg-gold/80 transition-colors"
          >
            Give
          </Link>
        </div>
      )}
    </header>
  );
}
