"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Technology",
    href: "/technology",
    children: [
      { name: "Overview", href: "/technology" },
      { name: "Atomic Layer Etching", href: "/technology/ale" },
    ],
  },
  { name: "Products", href: "/products" },
  { name: "Careers", href: "/careers" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
               src="/bluelogo.png"
               alt="AAT Logo"
               width={50}
               height={50}
             className="object-contain"
           />
           <div>
             <span className="text-white font-bold text-lg">Applied Angstrom Technology</span>
           </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) =>
              item.children ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                    <ChevronDown className="w-3 h-3" />
                  </Link>
                  {openDropdown === item.name && (
                    <div className="absolute top-full left-0 bg-dark/95 backdrop-blur-sm border border-white/10 rounded-lg py-2 min-w-[200px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              )
            )}
            <Link href="/about#contact" className="btn-primary ml-4 !py-2 !px-4 !text-sm">
              Contact Us
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dark border-t border-white/10">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block px-4 py-2 text-gray-300 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.name}
                    href={child.href}
                    className="block px-8 py-2 text-sm text-gray-400 hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
