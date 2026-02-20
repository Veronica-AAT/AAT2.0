import Link from "next/link";
import { Atom, Wind, Zap, Droplets, CheckCircle, ArrowRight } from "lucide-react";
import { loadContent } from "@/lib/content";

const iconMap: Record<string, typeof Atom> = { Atom, Wind, Zap, Droplets };

type ProductsContent = {
  hero: { tagline: string; title_prefix: string; title_highlight: string; description: string };
  products: {
    id: string; icon: string; name: string; tagline: string; description: string;
    features: string[];
    specs: { label: string; value: string }[];
  }[];
};

export default function ProductsPage() {
  const c = loadContent<ProductsContent>("products.yaml");

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

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {c.products.map((product, index) => {
            const Icon = iconMap[product.icon] || Atom;
            return (
              <div
                key={product.id}
                id={product.id}
                className={`grid md:grid-cols-2 gap-12 items-start ${
                  index % 2 === 1 ? "md:direction-rtl" : ""
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{product.name}</h2>
                      <p className="text-gray-500 text-sm">{product.tagline}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
                  <ul className="space-y-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-bold text-lg mb-4 text-dark">Technical Specifications</h3>
                  <div className="space-y-3">
                    {product.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex justify-between items-center border-b border-gray-200 pb-2"
                      >
                        <span className="text-gray-500 text-sm">{spec.label}</span>
                        <span className="font-semibold text-sm text-dark">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/about#contact"
                    className="btn-primary w-full justify-center mt-6 !text-sm"
                  >
                    Request Detailed Specifications <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
