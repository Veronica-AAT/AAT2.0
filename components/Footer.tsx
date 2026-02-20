import Link from "next/link";
import { MapPin, Mail, Linkedin } from "lucide-react";

const offices = [
  { city: "Singapore", role: "Headquarters" },
  { city: "United States", role: "Business Development" },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-sm">
                AA
              </div>
              <span className="text-white font-bold">Applied Angstrom Technology</span>
            </div>
            <p className="text-sm mb-4">
              Precision Meets Innovation. Your strategic partner in semiconductor
              manufacturing at the atomic scale.
            </p>
            <div className="flex gap-3">
              <a href="mailto:info@aatech.sg" className="hover:text-accent transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/aatechsg" className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Technology</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/technology/ale" className="hover:text-accent transition-colors">Atomic Layer Etching</Link></li>
              <li><Link href="/products" className="hover:text-accent transition-colors">Gas Delivery System</Link></li>
              <li><Link href="/products" className="hover:text-accent transition-colors">Remote Plasma Source</Link></li>
              <li><Link href="/products" className="hover:text-accent transition-colors">Plasma-in-Liquid Coating</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-accent transition-colors">Careers</Link></li>
              <li><Link href="/about#contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Global Offices */}
          <div>
            <h4 className="text-white font-semibold mb-4">Global Presence</h4>
            <ul className="space-y-2 text-sm">
              {offices.map((office) => (
                <li key={office.city} className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 text-accent flex-shrink-0" />
                  <div>
                    <span className="text-white">{office.city}</span>
                    <span className="text-gray-500 ml-1">— {office.role}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Applied Angstrom Technology Pte. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
