import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ALEPage() {
  return (
    <>
      <section className="bg-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/technology"
            className="inline-flex items-center text-gray-400 hover:text-accent text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Technology
          </Link>
          <p className="text-accent font-semibold mb-4 tracking-wide uppercase text-sm">
            Technology Deep Dive
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Atomic Layer Etching (<span className="text-accent">ALE</span>)
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            A comprehensive guide to ALE mechanisms, materials, cryogenic processes,
            and production applications in advanced semiconductor manufacturing.
          </p>
        </div>
      </section>

      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg prose-gray max-w-none">

          <h2 className="text-2xl font-bold text-dark border-b-2 border-accent pb-2 mt-12">
            1. Fundamentals of Atomic Layer Etching
          </h2>

          <p>
            Atomic layer etching (ALE) is a technique that removes material one atomic
            layer at a time using sequential, self-limiting chemical reactions. First
            conceptualized in the late 1980s and developed as a practical manufacturing
            tool over the past decade, ALE has become essential for semiconductor nodes
            where angstrom-level precision determines device performance.
          </p>

          <p>
            The defining characteristic of ALE is <strong>self-limitation</strong>. Each
            cycle consists of two half-reactions:
          </p>

          <ol className="space-y-3">
            <li>
              <strong>Surface modification:</strong> A reactive species modifies only the
              topmost atomic layer of the target material. Once the surface is fully
              reacted, the modification stops regardless of additional exposure time. This
              is analogous to the self-limiting adsorption in atomic layer deposition (ALD).
            </li>
            <li>
              <strong>Modified layer removal:</strong> The modified surface layer is
              selectively removed while leaving the underlying material intact. This can
              be achieved through low-energy ion bombardment (plasma ALE) or through a
              second chemical reaction that volatilizes the modified layer (thermal ALE).
            </li>
          </ol>

          <p>
            The etch per cycle (EPC) is determined by the thickness of the modified layer
            — typically 0.3 to 1.0 nanometers per cycle depending on the material and
            chemistry. Total etch depth is controlled digitally by the number of cycles,
            providing deterministic depth control at the atomic scale.
          </p>

          <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-lg my-8">
            <p className="font-semibold text-accent mb-2">Key Insight</p>
            <p className="text-gray-700 m-0">
              Because ALE relies on dose (cumulative exposure) rather than flux
              (instantaneous delivery rate), it eliminates aspect ratio dependent etching
              (ARDE). A feature bottom receiving 1% of the surface flux still achieves the
              same etch per cycle — it simply requires longer exposure to saturate.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-dark border-b-2 border-accent pb-2 mt-12">
            2. Thermal ALE vs. Plasma ALE
          </h2>

          <h3 className="text-xl font-bold mt-8">Thermal ALE</h3>
          <p>
            In thermal ALE, both half-reactions are purely chemical — no plasma or ions
            are involved. The most established approach is <strong>fluorination/ligand
            exchange</strong>: HF fluorinates the surface, then a metal-organic precursor
            (such as dimethylaluminum chloride, DMAC, or trimethylaluminum, TMA) reacts
            with the fluorinated layer through ligand exchange, forming volatile products
            that desorb from the surface.
          </p>

          <p>
            Thermal ALE is inherently isotropic (etches equally in all directions), making
            it ideal for:
          </p>
          <ul>
            <li>Conformal etching in 3D structures</li>
            <li>Selective removal from complex topographies</li>
            <li>Damage-free processing of sensitive materials</li>
            <li>Gate-all-around nanosheet channel release (SiGe selective ALE)</li>
          </ul>

          <h3 className="text-xl font-bold mt-8">Plasma ALE (Directional)</h3>
          <p>
            Plasma ALE uses a chemical modification step followed by removal via
            low-energy ion bombardment (typically Ar+ at 10-50 eV). The ion energy is
            carefully tuned: high enough to remove the modified layer but below the
            sputtering threshold of the unmodified material. This creates a natural
            selectivity between modified and unmodified surfaces.
          </p>

          <p>
            Because ion bombardment is directional (normal to the substrate), plasma ALE
            is inherently anisotropic — it etches vertically but not laterally. This
            makes it the method of choice for:
          </p>
          <ul>
            <li>Pattern transfer and feature definition</li>
            <li>High aspect ratio etching (3D NAND, DRAM capacitors)</li>
            <li>Precise depth control in multilayer stacks</li>
            <li>Sidewall smoothing and profile correction</li>
          </ul>

          <h2 className="text-2xl font-bold text-dark border-b-2 border-accent pb-2 mt-12">
            3. Cryogenic ALE
          </h2>

          <p>
            Cryogenic ALE represents one of the most significant recent advances in etch
            technology. At substrate temperatures of -60 to -110°C, the physics of
            surface adsorption changes dramatically. Reactive gases such as C₄F₈
            physisorb onto surfaces in self-limiting monolayers rather than chemisorbing
            — creating a modification step that is inherently self-limiting by the
            physics of physisorption.
          </p>

          <p>
            When combined with pulsed plasma for the removal step, cryogenic ALE achieves
            remarkable results:
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <p className="text-3xl font-bold text-accent">&lt;0.1%</p>
              <p className="text-gray-600 text-sm mt-1">
                CD deviation in 10µm deep 3D NAND channel holes
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <p className="text-3xl font-bold text-accent">84%</p>
              <p className="text-gray-600 text-sm mt-1">
                Reduction in global warming potential vs. conventional processes
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <p className="text-3xl font-bold text-accent">100:1+</p>
              <p className="text-gray-600 text-sm mt-1">
                Demonstrated aspect ratio capability
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <p className="text-3xl font-bold text-accent">1,000+</p>
              <p className="text-gray-600 text-sm mt-1">
                Layer 3D NAND scaling pathway enabled
              </p>
            </div>
          </div>

          <p>
            The cryogenic approach also offers sustainability benefits. Lower-GWP etch
            gases can be used because the physisorption mechanism is less dependent on
            specific gas chemistry. Combined with reduced process times, cryogenic ALE
            can achieve substantial reductions in carbon emissions per wafer.
          </p>

          <h2 className="text-2xl font-bold text-dark border-b-2 border-accent pb-2 mt-12">
            4. Overcoming ARDE in High Aspect Ratio Features
          </h2>

          <p>
            Aspect ratio dependent etching (ARDE) is the single biggest challenge in
            advanced semiconductor etching. As features become deeper and narrower,
            the transport of reactive species to the feature bottom is governed by
            Knudsen diffusion — molecular flow where the mean free path exceeds the
            feature width.
          </p>

          <p>
            Recent modeling by Joubert and colleagues quantified the severity: at an
            aspect ratio of 100:1, the neutral radical flux at the feature bottom is just
            1.3% of the incoming flux. For conventional RIE, where etch rate is
            proportional to flux, this means a 98.7% reduction in etch rate at the bottom
            compared to the top.
          </p>

          <p>
            ALE overcomes ARDE through a fundamental mechanism change. Because both
            half-reactions are self-limiting, the etch per cycle depends on whether the
            surface reaches saturation — a question of <em>dose</em> (flux × time) rather
            than <em>instantaneous flux</em>. By extending the exposure time for each
            half-cycle, even feature bottoms receiving 1% of the surface flux can reach
            full saturation and achieve the same etch per cycle as the feature top.
          </p>

          <p>
            Huard, Kanarik, and Kushner at Lam Research and the University of Michigan
            confirmed this through computational modeling of Cl₂/Ar ALE in 3D silicon
            structures: when both steps reach complete saturation, the etch per cycle is
            truly independent of aspect ratio.
          </p>

          <h2 className="text-2xl font-bold text-dark border-b-2 border-accent pb-2 mt-12">
            5. Applications in Advanced Semiconductor Manufacturing
          </h2>

          <h3 className="text-xl font-bold mt-8">3D NAND Flash Memory</h3>
          <p>
            3D NAND is the primary driver for ALE adoption. Current 400+ layer devices
            require channel holes with aspect ratios exceeding 60:1, and 1,000-layer
            architectures on industry roadmaps will push toward 100:1. ALE — particularly
            cryogenic ALE — is the enabling technology for these extreme geometries,
            providing the profile uniformity and CD control that conventional RIE cannot
            achieve.
          </p>

          <h3 className="text-xl font-bold mt-8">Gate-All-Around (GAA) Transistors</h3>
          <p>
            The semiconductor industry&apos;s transition from FinFET to GAA architecture
            at sub-3nm nodes requires the selective removal of SiGe sacrificial layers
            from Si/SiGe superlattices to release nanosheet channels. Thermal ALE with
            high SiGe-to-Si selectivity (&gt;100:1) is essential for this step, removing
            the SiGe without damaging the atomically thin Si channels.
          </p>

          <h3 className="text-xl font-bold mt-8">DRAM</h3>
          <p>
            Advanced DRAM requires deep, narrow capacitor structures and contact holes.
            ALE addresses the ARDE challenges in these high aspect ratio features while
            maintaining the sidewall verticality and bottom CD uniformity needed for
            reliable capacitor formation.
          </p>

          <h3 className="text-xl font-bold mt-8">Advanced Packaging</h3>
          <p>
            Through-silicon via (TSV) etching for 3D integration and hybrid bonding
            surface preparation both benefit from ALE&apos;s precision. As chiplet
            architectures and heterogeneous integration become standard, the demand for
            precise, damage-free etching in packaging applications continues to grow.
          </p>

          <h2 className="text-2xl font-bold text-dark border-b-2 border-accent pb-2 mt-12">
            6. The Market Opportunity
          </h2>

          <p>
            The ALE equipment market was valued at approximately $1.36 billion in 2025
            and is projected to reach $2.74 billion by 2033, growing at a CAGR of over
            9%. This growth is driven by three converging trends:
          </p>

          <ul>
            <li>
              <strong>3D NAND scaling</strong> beyond 400 layers to 1,000+, requiring
              extreme aspect ratio etching
            </li>
            <li>
              <strong>GAA transistor adoption</strong> at sub-3nm nodes by all major
              logic foundries
            </li>
            <li>
              <strong>Advanced packaging</strong> for AI/HPC chiplets requiring precise
              TSV and bonding processes
            </li>
          </ul>

          <p>
            Applied Angstrom Technology is positioned at the center of this transition,
            delivering ALE solutions that bridge the gap between atomic-scale precision
            and production throughput.
          </p>

          <div className="bg-dark rounded-2xl p-8 text-white my-12 not-prose">
            <h3 className="text-xl font-bold mb-4 text-accent">
              Learn More About Our ALE Solutions
            </h3>
            <p className="text-gray-300 mb-6">
              Talk to our AI assistant for quick answers, or contact our engineering team
              for detailed technical discussions about your specific etch challenges.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/about#contact"
                className="btn-primary"
              >
                Contact Engineering Team
              </Link>
              <Link
                href="/products"
                className="btn-outline !border-white/30 !text-white hover:!bg-white/10"
              >
                View Products
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-dark border-b-2 border-accent pb-2 mt-12">
            References
          </h2>

          <ol className="text-sm space-y-2 text-gray-600">
            <li>Kanarik, K. J. et al. (2018). Atomic layer etching: Rethinking the art of etch. <em>J. Phys. Chem. Lett.</em>, 9(16), 4814-4821.</li>
            <li>George, S. M. &amp; Lee, Y. (2016). Prospects for thermal atomic layer etching using sequential, self-limiting fluorination and ligand-exchange reactions. <em>ACS Nano</em>, 10(5), 4889-4894.</li>
            <li>Huard, C. M. et al. (2017). Atomic layer etching of 3D structures in silicon. <em>J. Vac. Sci. Technol. A</em>, 35(3), 031306.</li>
            <li>Fischer, A. et al. (2022). Control of etch profiles in HAR holes via precise reactant dosing in thermal ALE. <em>J. Vac. Sci. Technol. A</em>, 40(2), 022603.</li>
            <li>Antoun, G. et al. (2021). Mechanism understanding in cryo atomic layer etching of SiO₂. <em>Scientific Reports</em>, 11, 22579.</li>
            <li>Joubert, O. et al. (2023). Neutral transport during etching of high aspect ratio features. <em>J. Vac. Sci. Technol. A</em>, 41(3), 033006.</li>
            <li>Kim, S. J. et al. (2023). Asynchronously pulsed plasma for HAR nanoscale Si trench etch. <em>ACS Appl. Nano Mater.</em>, 6(12), 10602-10611.</li>
          </ol>
        </div>
      </article>
    </>
  );
}
