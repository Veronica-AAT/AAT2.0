import Link from "next/link";
import { ArrowRight, Atom, Layers, Thermometer, Zap, Target, Shield } from "lucide-react";
import { loadContent } from "@/lib/content";

const iconMap: Record<string, typeof Atom> = { Layers, Thermometer, Atom, Target, Shield, Zap };

type TechContent = {
  hero: { tagline: string; title_prefix: string; title_highlight: string; description: string };
  capabilities: { section_title: string; section_subtitle: string; items: { icon: string; title: string; description: string }[] };
  ale_steps: { section_title: string; steps: { number: number; title: string; color: string; description: string }[] };
  materials: {
    section_title: string; section_subtitle: string; note: string;
    table: { material: string; mode: string; chemistry: string; epc: string }[];
  };
  cta: { title: string; description: string; label: string; href: string };
};

export default function TechnologyPage() {
  const c = loadContent<TechContent>("technology.yaml");

  return (
    <>
      {/* Hero */}
      <section className="bg-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent font-semibold mb-4 tracking-wide uppercase text-sm">
            {c.hero.tagline}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {c.hero.title_prefix} <span className="text-accent">{c.hero.title_highlight}</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            {c.hero.description}
          </p>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading">
            Core <span>Capabilities</span>
          </h2>
          <p className="section-subheading">{c.capabilities.section_subtitle}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {c.capabilities.items.map((cap) => {
              const Icon = iconMap[cap.icon] || Atom;
              return (
                <div key={cap.title} className="card">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">{cap.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{cap.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ALE Process Explanation */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading">
            How Atomic Layer Etching <span>Works</span>
          </h2>
          <div className="max-w-4xl mx-auto mt-12">
            <div className="grid md:grid-cols-2 gap-8">
              {c.ale_steps.steps.map((step) => (
                <div key={step.number} className={`bg-white rounded-xl p-6 border-l-4 ${step.color === "accent" ? "border-accent" : "border-primary-500"}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 ${step.color === "accent" ? "bg-accent" : "bg-primary-500"} text-white rounded-full flex items-center justify-center font-bold text-sm`}>
                      {step.number}
                    </div>
                    <h3 className="font-bold">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Materials Table */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading">
            Supported <span>Materials</span>
          </h2>
          <p className="section-subheading">{c.materials.section_subtitle}</p>
          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto text-sm">
              <thead>
                <tr className="border-b-2 border-accent">
                  <th className="text-left py-3 px-4 font-bold">Material</th>
                  <th className="text-left py-3 px-4 font-bold">ALE Mode</th>
                  <th className="text-left py-3 px-4 font-bold">Chemistry</th>
                  <th className="text-left py-3 px-4 font-bold">EPC (nm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {c.materials.table.map((row) => (
                  <tr key={row.material} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{row.material}</td>
                    <td className="py-3 px-4">{row.mode}</td>
                    <td className="py-3 px-4">{row.chemistry}</td>
                    <td className="py-3 px-4">{row.epc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">{c.materials.note}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">{c.cta.title}</h2>
          <p className="text-lg mb-6 text-white/80">{c.cta.description}</p>
          <Link
            href={c.cta.href}
            className="inline-flex items-center px-6 py-3 bg-white text-accent font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            {c.cta.label} <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
}
