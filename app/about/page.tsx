import { MapPin, Mail, Globe } from "lucide-react";
import EmbeddedChat from "@/components/EmbeddedChat";
import { loadContent } from "@/lib/content";

type AboutContent = {
  hero: { tagline: string; title_prefix: string; title_highlight: string; description: string };
  mission: { title: string; text: string };
  vision: { title: string; text: string };
  milestones: { year: string; event: string }[];
  values: { section_title: string; items: { letter: string; name: string; description: string }[] };
  offices: { section_title: string; section_subtitle: string; items: { city: string; role: string; detail: string }[] };
  contact: {
    section_title: string; section_subtitle: string;
    sales: { title: string; email: string };
    careers: { title: string; email: string };
    website: { title: string; url: string; label: string };
  };
};

export default function AboutPage() {
  const c = loadContent<AboutContent>("about.yaml");

  return (
    <>
      <section className="bg-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent font-semibold mb-4 tracking-wide uppercase text-sm">
            {c.hero.tagline}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {c.hero.title_prefix}{" "}
            <span className="text-accent">{c.hero.title_highlight}</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            {c.hero.description}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {c.mission.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-accent">{c.mission.title.split(" ").pop()}</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">{c.mission.text}</p>
              <h2 className="text-2xl font-bold mb-4">
                {c.vision.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-accent">{c.vision.title.split(" ").pop()}</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">{c.vision.text}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="font-bold text-lg mb-6">Company Timeline</h3>
              <div className="space-y-6">
                {c.milestones.map((m, i) => (
                  <div key={m.year} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-accent rounded-full" />
                      {i < c.milestones.length - 1 && (
                        <div className="w-0.5 flex-1 bg-gray-200 mt-1" />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="font-bold text-accent text-sm">{m.year}</p>
                      <p className="text-gray-600 text-sm">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12">
            The <span className="text-accent">AAT</span> Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {c.values.items.map((v) => (
              <div key={v.name} className="bg-white/5 border border-white/10 rounded-xl p-8">
                <p className="text-4xl font-bold text-accent mb-3">{v.letter}</p>
                <h3 className="font-bold text-xl mb-2">{v.name}</h3>
                <p className="text-gray-400 text-sm">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading">
            Global <span>Presence</span>
          </h2>
          <p className="section-subheading">{c.offices.section_subtitle}</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {c.offices.items.map((office) => (
              <div key={office.city} className="card text-center">
                <MapPin className="w-6 h-6 text-accent mx-auto mb-3" />
                <h3 className="font-bold">{office.city}</h3>
                <p className="text-accent text-sm font-medium">{office.role}</p>
                <p className="text-gray-500 text-xs mt-2">{office.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading">
            Get in <span>Touch</span>
          </h2>
          <p className="section-subheading">{c.contact.section_subtitle}</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="card">
                <h3 className="font-bold mb-2">{c.contact.sales.title}</h3>
                <a href={`mailto:${c.contact.sales.email}`} className="flex items-center gap-2 text-accent hover:underline">
                  <Mail className="w-4 h-4" /> {c.contact.sales.email}
                </a>
              </div>
              <div className="card">
                <h3 className="font-bold mb-2">{c.contact.careers.title}</h3>
                <a href={`mailto:${c.contact.careers.email}`} className="flex items-center gap-2 text-accent hover:underline">
                  <Mail className="w-4 h-4" /> {c.contact.careers.email}
                </a>
              </div>
              <div className="card">
                <h3 className="font-bold mb-2">{c.contact.website.title}</h3>
                <a href={c.contact.website.url} className="flex items-center gap-2 text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                  <Globe className="w-4 h-4" /> {c.contact.website.label}
                </a>
              </div>
            </div>
            <EmbeddedChat />
          </div>
        </div>
      </section>
    </>
  );
}
