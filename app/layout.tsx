import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Applied Angstrom Technology | Precision Meets Innovation",
  description:
    "Leading semiconductor equipment manufacturer specializing in atomic layer etching, gas delivery systems, and remote plasma sources for advanced semiconductor nodes.",
  keywords: [
    "atomic layer etching",
    "ALE",
    "semiconductor equipment",
    "3D NAND",
    "FinFET",
    "GAA",
    "gas delivery",
    "remote plasma source",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
