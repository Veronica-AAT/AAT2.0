import { MapPin, Clock, ArrowRight, Users, Lightbulb, Target, HeartHandshake } from "lucide-react";
import { loadContent } from "@/lib/content";

const iconMap: Record<string, typeof Lightbulb> = { Lightbulb, Target, HeartHandshake, Users };

type CareersContent = {
  hero: { tagline: string; title_prefix: string; title_highlight: string; description: string };
  values: { section_title: string; items: { icon: string; name: string; description: string }[] };
  positions: {
    section_title: string;
    fallback_message: string;
    apply_email: string;
    jobs: {
      title: string; department: string; location: string; type: string;
      description: string; requirements: string[];
    }[];
  };
  chat_cta: { title: string; description: string };
};

export default function CareersPage() {
  const c = loadContent<CareersContent>("careers.yaml");

  return (
    <>
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

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading">Our <span>DNA</span></h2>
          <div className="grid md:grid-cols-4 gap-6 mt-10">
            {c.values.items.map((v) => {
              const Icon = iconMap[v.icon] || Lightbulb;
              return (
                <div key={v.name} className="text-center">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{v.name}</h3>
                  <p className="text-gray-600 text-sm">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading">Open <span>Positions</span></h2>
          <p className="section-subheading">{c.positions.fallback_message}</p>

          <div className="space-y-6">
            {c.positions.jobs.map((job) => (
              <details key={job.title} className="card group cursor-pointer">
                <summary className="flex items-start justify-between list-none">
                  <div>
                    <h3 className="font-bold text-lg group-open:text-accent transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" /> {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" /> {job.type}
                      </span>
                      <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">
                        {job.department}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0 mt-1" />
                </summary>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-gray-600 text-sm mb-4">{job.description}</p>
                  <h4 className="font-semibold text-sm mb-2">Requirements:</h4>
                  <ul className="space-y-1 mb-4">
                    {job.requirements.map((req) => (
                      <li key={req} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-accent mt-1">-</span> {req}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`mailto:${c.positions.apply_email}?subject=Application: ${job.title}`}
                    className="btn-primary !text-sm"
                  >
                    Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Chat CTA */}
      <section className="py-16 bg-accent">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">{c.chat_cta.title}</h2>
          <p className="text-lg text-white/80 mb-4">{c.chat_cta.description}</p>
        </div>
      </section>
    </>
  );
}
