import Link from "next/link";
import { ArrowLeft, FileText, Download } from "lucide-react";

export default function ALESimulationPage() {
  return (
    <>
      <section className="bg-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/technology/ale"
            className="inline-flex items-center text-gray-400 hover:text-accent text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to ALE Overview
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-accent" />
            <p className="text-accent font-semibold tracking-wide uppercase text-sm">
              Technical Documentation
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            ALE Cl₂/Ar Process <span className="text-accent">Simulation</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            Detailed simulation of Atomic Layer Etching using Chlorine adsorption 
            and Argon ion bombardment for precise silicon etching.
          </p>
        </div>
      </section>

      <article className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Process Overview */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-dark mb-4">1. Process Overview</h2>
            <p className="text-gray-600 mb-4">
              Atomic Layer Etching (ALE) is a <strong>self-limiting</strong>, cyclic etch process 
              that removes material <strong>one atomic layer at a time</strong> (~0.5-2 Å per cycle). 
              The Cl₂/Ar ALE process is widely used for precise etching of:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Silicon (Si)</li>
              <li>Silicon Germanium (SiGe)</li>
              <li>III-V compounds (GaAs, InP)</li>
            </ul>
          </section>

          {/* ALE Cycle Diagram */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-dark mb-6">2. ALE Cycle Steps</h2>
            <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm text-green-400 overflow-x-auto">
              <pre>{`┌─────────────────────────────────────────────────────────────────────┐
│                        ALE CYCLE DIAGRAM                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   STEP A: Adsorption          STEP B: Removal                       │
│   (Cl₂ Exposure)              (Ar⁺ Bombardment)                     │
│                                                                     │
│   Cl₂ → Cl• + Cl•                    Ar⁺                           │
│         ↓   ↓                         ↓                             │
│   ┌─────────────────┐          ┌─────────────────┐                  │
│   │ Cl  Cl  Cl  Cl  │          │    ↓  ↓  ↓      │                  │
│   │  ╲  │   │  ╱    │    →     │ ─────────────── │   → SiClₓ ↑     │
│   │   Si─Si─Si─Si   │          │   Si─Si─Si─Si   │     (volatile)   │
│   │   │  │  │  │    │          │   │  │  │  │    │                  │
│   │   Si─Si─Si─Si   │          │   Si─Si─Si─Si   │                  │
│   └─────────────────┘          └─────────────────┘                  │
│   Surface Chlorination         Ion-Assisted Desorption              │
│   (Self-Limiting)              (Energy < Sputter Threshold)         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘`}</pre>
            </div>
          </section>

          {/* Step A Parameters */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-dark mb-4">3. Step A: Surface Modification (Cl₂ Adsorption)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-700">Parameter</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Typical Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-4 py-3">Gas</td><td className="px-4 py-3 font-mono">Cl₂</td></tr>
                  <tr><td className="px-4 py-3">Pressure</td><td className="px-4 py-3 font-mono">5-50 mTorr</td></tr>
                  <tr><td className="px-4 py-3">Flow Rate</td><td className="px-4 py-3 font-mono">50-200 sccm</td></tr>
                  <tr><td className="px-4 py-3">Exposure Time</td><td className="px-4 py-3 font-mono">1-5 seconds</td></tr>
                  <tr><td className="px-4 py-3">Plasma</td><td className="px-4 py-3 font-mono">Optional (for Cl• generation)</td></tr>
                  <tr><td className="px-4 py-3">Temperature</td><td className="px-4 py-3 font-mono">25-100°C</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <p className="font-semibold text-blue-800 mb-2">Chemical Reactions:</p>
              <code className="block text-blue-700 font-mono text-sm">
                Cl₂ (g) → 2Cl• (adsorbed)  [Dissociation]<br/>
                Si (surface) + Cl• → Si-Clₓ  [Chemisorption]
              </code>
            </div>
          </section>

          {/* Step B Parameters */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-dark mb-4">4. Step B: Material Removal (Ar⁺ Bombardment)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-700">Parameter</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Typical Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-4 py-3">Gas</td><td className="px-4 py-3 font-mono">Ar</td></tr>
                  <tr><td className="px-4 py-3">Pressure</td><td className="px-4 py-3 font-mono">5-20 mTorr</td></tr>
                  <tr><td className="px-4 py-3">RF Bias Power</td><td className="px-4 py-3 font-mono">10-50 W</td></tr>
                  <tr><td className="px-4 py-3">Ion Energy</td><td className="px-4 py-3 font-mono text-accent font-bold">20-50 eV</td></tr>
                  <tr><td className="px-4 py-3">Bombardment Time</td><td className="px-4 py-3 font-mono">5-15 seconds</td></tr>
                  <tr><td className="px-4 py-3">Ion Flux</td><td className="px-4 py-3 font-mono">10¹⁵ - 10¹⁶ ions/cm²·s</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Synergy Window */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-dark mb-6">5. Ion Energy Synergy Window</h2>
            <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm text-green-400 overflow-x-auto">
              <pre>{`EPC (Å/cycle)
    3.0 │                                    xxxxxx  ← Sputter Regime
        │                                xxxx
    2.5 │                             xxx
        │                           xx
    2.0 │         ┌─────────────────xx
        │         │  ALE Window   xx│
    1.5 │    xxxxx├───────────────┤ │
        │  xx     │               │ │
    1.0 │xx       │               │ │
        │         │               │ │
    0.5 │         │               │ │
        │         └───────────────┘ │
    0.0 │─────────────────────────────────────────────────────────→
        0    10    20    30    40    50    60    70    80
                        Ion Energy (eV)
        
        └──────┘  └─────────────────┘  └──────────────────┘
         No Etch      ALE Regime           Sputtering`}</pre>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-gray-400">&lt; 20 eV</p>
                <p className="text-sm text-gray-600">No removal (below threshold)</p>
              </div>
              <div className="bg-accent/10 rounded-lg p-4 text-center border-2 border-accent">
                <p className="text-2xl font-bold text-accent">20-50 eV</p>
                <p className="text-sm text-gray-700 font-semibold">ALE Regime ✓</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-red-500">&gt; 50 eV</p>
                <p className="text-sm text-gray-600">Physical sputtering (damage)</p>
              </div>
            </div>
          </section>

          {/* Simulation Results */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-dark mb-6">6. Simulation Results (12 Cycles)</h2>
            <div className="bg-gray-900 rounded-xl p-6 font-mono text-xs text-green-400 overflow-x-auto">
              <pre>{`═══════════════════════════════════════════════════════════════════════
                      ALE PROCESS SIMULATION RESULTS
═══════════════════════════════════════════════════════════════════════

Material: Silicon <100>    |    Process: Cl₂/Ar ALE    |    Temp: 50°C

───────────────────────────────────────────────────────────────────────
CYCLE SUMMARY
───────────────────────────────────────────────────────────────────────

  Cycle │ EPC (Å) │ Thickness (Å) │ Roughness (Å RMS) │ Uniformity (%)
────────┼─────────┼───────────────┼───────────────────┼───────────────
    1   │   1.8   │     98.2      │       0.3         │     99.2
    2   │   1.7   │     96.5      │       0.3         │     99.1
    3   │   1.8   │     94.7      │       0.4         │     99.0
    4   │   1.7   │     93.0      │       0.4         │     98.9
    5   │   1.8   │     91.2      │       0.4         │     99.1
    6   │   1.7   │     89.5      │       0.5         │     98.8
    7   │   1.8   │     87.7      │       0.5         │     99.0
    8   │   1.7   │     86.0      │       0.5         │     98.9
    9   │   1.8   │     84.2      │       0.5         │     99.1
   10   │   1.7   │     82.5      │       0.6         │     98.8
   11   │   1.8   │     80.7      │       0.6         │     99.0
   12   │   1.7   │     79.0      │       0.6         │     98.9
────────┴─────────┴───────────────┴───────────────────┴───────────────

═══════════════════════════════════════════════════════════════════════`}</pre>
            </div>
            
            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-4 mt-6">
              <div className="bg-accent/5 rounded-xl p-5 text-center border border-accent/20">
                <p className="text-3xl font-bold text-accent">1.75 Å</p>
                <p className="text-sm text-gray-600 mt-1">Avg EPC/cycle</p>
              </div>
              <div className="bg-accent/5 rounded-xl p-5 text-center border border-accent/20">
                <p className="text-3xl font-bold text-accent">2.9%</p>
                <p className="text-sm text-gray-600 mt-1">EPC σ Deviation</p>
              </div>
              <div className="bg-accent/5 rounded-xl p-5 text-center border border-accent/20">
                <p className="text-3xl font-bold text-accent">&gt;100:1</p>
                <p className="text-sm text-gray-600 mt-1">Si:SiO₂ Selectivity</p>
              </div>
              <div className="bg-accent/5 rounded-xl p-5 text-center border border-accent/20">
                <p className="text-3xl font-bold text-accent">0.6 Å</p>
                <p className="text-sm text-gray-600 mt-1">Final Roughness RMS</p>
              </div>
            </div>
          </section>

          {/* Etch Profile Chart */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-dark mb-6">7. Etch Profile</h2>
            <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm text-green-400 overflow-x-auto">
              <pre>{`Thickness (Å)
    100 │████████████████████████████████████████████████████████████
        │
     95 │██████████████████████████████████████████████████████
        │
     90 │███████████████████████████████████████████████
        │
     85 │██████████████████████████████████████████
        │
     80 │███████████████████████████████████████ ← Final: 79.0 Å
        │
     75 │
        └───────────────────────────────────────────────────────────→
          1   2   3   4   5   6   7   8   9  10  11  12   Cycle`}</pre>
            </div>
          </section>

          {/* Applications */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-dark mb-4">8. Applications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "FinFET Fabrication", desc: "Fin height trimming" },
                { title: "Gate-All-Around (GAA)", desc: "Nanowire/nanosheet release" },
                { title: "DRAM Capacitor", desc: "High aspect ratio etching" },
                { title: "3D NAND", desc: "Channel hole smoothing" },
                { title: "Advanced Patterning", desc: "Spacer etch-back" },
              ].map((app, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="font-semibold text-dark">{app.title}</p>
                  <p className="text-sm text-gray-600">{app.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Advantages */}
          <section className="bg-gradient-to-br from-accent to-blue-700 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Advantages of Cl₂/Ar ALE</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Atomic Precision", desc: "1-2 Å per cycle control" },
                { title: "Self-Limiting", desc: "No over-etch risk" },
                { title: "Low Damage", desc: "Sub-sputter threshold ions" },
                { title: "High Selectivity", desc: ">100:1 vs oxide" },
                { title: "Smooth Surface", desc: "< 1 Å RMS roughness" },
                { title: "Conformal", desc: "Uniform on 3D structures" },
              ].map((adv, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold">{adv.title}</p>
                    <p className="text-white/80 text-sm">{adv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>Document generated: 2026-02-10 | AAT Technology Documentation</p>
          </div>

        </div>
      </article>
    </>
  );
}
