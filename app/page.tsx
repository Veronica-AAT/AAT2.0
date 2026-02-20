import Link from "next/link";
import { ArrowRight, Atom, Wind, Zap, Droplets, ChevronRight, Factory, Cpu, MemoryStick, CircuitBoard } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedALEProcess from "@/components/AnimatedALEProcess";
import { loadContent } from "@/lib/content";

const productIconMap: Record<string, typeof Atom> = { Atom, Wind, Zap, Droplets };
const appIconMap: Record<string, typeof Cpu> = { MemoryStick, Cpu, CircuitBoard, Factory };

type HomepageContent = {
  hero: {
    tagline: string; title_prefix: string; title_highlight: string; title_suffix: string;
    description: string;
    cta_primary: { label: string; href: string };
    cta_secondary: { label: string; href: string };
  };
  stats: { value: string; label: string }[];
  products: {
    section_title: string; section_title_highlight: string; section_subtitle: string;
    items: { name: string; icon: string; description: string; href: string; highlight?: boolean }[];
  };
  ale_animation: { section_title: string; section_title_highlight: string; section_title_suffix: string; section_subtitle: string };
  why_ale: {
    tagline: string; title_prefix: string; title_highlight: string; title_suffix: string;
    paragraphs: string[];
    cta: { label: string; href: string };
    comparison: { title: string; rows: { metric: string; rie: string; ale: string }[] };
  };
  applications: {
    section_title: string; section_title_highlight: string; section_subtitle: string;
    items: { name: string; icon: string; detail: string }[];
  };
  cta: {
    title_prefix: string; title_highlight: string; title_suffix: string;
    description: string;
    cta_primary: { label: string; href: string };
    cta_secondary: { label: string; href: string };
  };
};

export default function HomePage() {
  const c = loadContent<HomepageContent>("homepage.yaml");

  return (
    <>
      {/* Hero */}
      <section className="relative bg-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-primary-500/20" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(0,134,224,0.15) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-3xl">
            <p className="text-accent font-semibold mb-4 tracking-wide uppercase text-sm">
              {c.hero.tagline}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              {c.hero.title_prefix}{" "}
              <span className="text-accent">{c.hero.title_highlight}</span> {c.hero.title_suffix}
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {c.hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={c.hero.cta_primary.href} className="btn-primary">
                {c.hero.cta_primary.label}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href={c.hero.cta_secondary.href} className="btn-outline !border-white/30 !text-white hover:!bg-white/10">
                {c.hero.cta_secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {c.stats.map((stat) => (
              <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="section-heading">
              {c.products.section_title} <span>{c.products.section_title_highlight}</span>
            </h2>
            <p className="section-subheading">{c.products.section_subtitle}</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {c.products.items.map((product, i) => {
              const Icon = productIconMap[product.icon] || Atom;
              return (
                <ScrollReveal key={product.name} delay={i * 150}>
                  <Link
                    href={product.href}
                    className={`card group flex gap-4 h-full ${
                      product.highlight ? "ring-2 ring-accent/20 bg-accent/5" : ""
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        product.highlight
                          ? "bg-accent text-white"
                          : "bg-primary-100 text-primary-500"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {product.description}
                      </p>
                      <span className="inline-flex items-center text-accent text-sm font-medium mt-3">
                        Learn more <ChevronRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Animated ALE Process */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="section-heading">
              {c.ale_animation.section_title} <span>{c.ale_animation.section_title_highlight}</span> {c.ale_animation.section_title_suffix}
            </h2>
            <p className="section-subheading">{c.ale_animation.section_subtitle}</p>
          </ScrollReveal>
          <AnimatedALEProcess />
        </div>
      </section>

      {/* Why ALE */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <p className="text-accent font-semibold mb-2 tracking-wide uppercase text-sm">
                {c.why_ale.tagline}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {c.why_ale.title_prefix} <span className="text-accent">{c.why_ale.title_highlight}</span> {c.why_ale.title_suffix}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                {c.why_ale.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <Link href={c.why_ale.cta.href} className="btn-primary mt-6">
                {c.why_ale.cta.label} <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </ScrollReveal>
            <ScrollReveal direction="right">
            <div className="bg-dark rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6 text-accent">{c.why_ale.comparison.title}</h3>
              <div className="space-y-4">
                {c.why_ale.comparison.rows.map((row, i) => (
                  <div key={row.metric} className={`flex justify-between items-center ${i < c.why_ale.comparison.rows.length - 1 ? "border-b border-white/10 pb-3" : ""}`}>
                    <span className="text-gray-400">{row.metric}</span>
                    <div className="text-right">
                      <span className="text-red-400 text-sm block">RIE: {row.rie}</span>
                      <span className="text-accent text-sm block">ALE: {row.ale}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="section-heading">
              {c.applications.section_title} <span>{c.applications.section_title_highlight}</span>
            </h2>
            <p className="section-subheading !text-gray-400">{c.applications.section_subtitle}</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.applications.items.map((app, i) => {
              const Icon = appIconMap[app.icon] || Cpu;
              return (
                <ScrollReveal key={app.name} delay={i * 100}>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors h-full">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{app.name}</h3>
                    <p className="text-gray-400 text-sm">{app.detail}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {c.cta.title_prefix} <span className="text-accent">{c.cta.title_highlight}</span>{c.cta.title_suffix}
          </h2>
          <p className="text-gray-600 text-lg mb-8">{c.cta.description}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={c.cta.cta_primary.href} className="btn-primary">
              {c.cta.cta_primary.label} <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href={c.cta.cta_secondary.href} className="btn-outline">
              {c.cta.cta_secondary.label}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
