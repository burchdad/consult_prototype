import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  ChevronDown,
  CircuitBoard,
  Handshake,
  Quote,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { AnimatedCounter } from "@/components/public/animated-counter";
import { Reveal } from "@/components/public/reveal";
import { HomepageCinematicScene } from "@/components/public/homepage-cinematic-scene";
import { getPublishedData } from "@/lib/site-data";

const timeline = [
  {
    year: "2012",
    title: "Company Founded",
    detail:
      "Launched with a focus on secure federal mission support and accountable delivery governance.",
  },
  {
    year: "2015",
    title: "First Prime Award",
    detail:
      "Secured initial prime contract for enterprise operations modernization.",
  },
  {
    year: "2018",
    title: "Technical Expansion",
    detail:
      "Built dedicated engineering and cyber practice for mission-critical systems.",
  },
  {
    year: "2021",
    title: "National Footprint",
    detail:
      "Scaled teams across multiple U.S. regions with partner-backed execution.",
  },
  {
    year: "2026",
    title: "Enterprise Scale",
    detail:
      "Supporting civilian and defense portfolios with integrated delivery teams.",
  },
];

const metricItems = [
  { label: "Prime Contracts Awarded", value: 47, suffix: "", meta: "Since Inception" },
  { label: "Employee Retention", value: 96, suffix: "%", meta: "Rolling 12-Month" },
  { label: "Team Members", value: 320, suffix: "+", meta: "National Workforce" },
  { label: "Contract Value", value: 180, prefix: "$", suffix: "M", meta: "FY 2026" },
  { label: "Satisfaction", value: 99, suffix: "%", meta: "Client Surveys" },
  { label: "Years in Business", value: 14, suffix: "", meta: "Continuously Operating" },
];

const fallbackServices = [
  {
    id: "fallback-service-1",
    category: "Professional Services",
    title: "Program and Acquisition Support",
    description:
      "Enterprise program oversight, acquisition planning, and performance management support for complex federal portfolios.",
    bulletItems: [
      "PMO governance",
      "Acquisition support",
      "Performance analytics",
      "Compliance management",
    ],
  },
  {
    id: "fallback-service-2",
    category: "Engineering & Technology Services",
    title: "Mission Engineering and Cyber",
    description:
      "Secure architecture, DevSecOps, and data modernization services aligned to federal mission risk and resilience requirements.",
    bulletItems: [
      "Cloud modernization",
      "DevSecOps pipelines",
      "Zero-trust security",
      "Data interoperability",
    ],
  },
  {
    id: "fallback-service-3",
    category: "Mission Support & Logistics",
    title: "Readiness and Sustainment",
    description:
      "Operational sustainment capabilities across planning, supply chain readiness, and field support operations.",
    bulletItems: [
      "Readiness analytics",
      "Supply chain support",
      "Field logistics",
      "Lifecycle sustainment",
    ],
  },
];

const fallbackPartners = [
  "Federal Partner Alpha",
  "Federal Partner Bravo",
  "Federal Partner Charlie",
  "Federal Partner Delta",
  "Federal Partner Echo",
  "Federal Partner Foxtrot",
];

function categoryIcon(category: string) {
  const normalized = category.toLowerCase();
  if (normalized.includes("engineering") || normalized.includes("technology")) {
    return <CircuitBoard size={18} />;
  }
  if (normalized.includes("mission") || normalized.includes("logistics")) {
    return <Truck size={18} />;
  }
  return <BriefcaseBusiness size={18} />;
}

function contractTags(contractType: string) {
  const normalized = contractType.toLowerCase();
  const tags = [normalized.includes("prime") ? "Prime" : "Sub"];

  if (normalized.includes("idiq")) tags.push("IDIQ");
  if (normalized.includes("bpa")) tags.push("BPA");
  if (normalized.includes("gwac")) tags.push("GWAC");

  return tags;
}

function caseOutcomeBadge(study: { metrics: unknown; results: string }) {
  if (study.metrics && typeof study.metrics === "object" && !Array.isArray(study.metrics)) {
    const [firstKey] = Object.keys(study.metrics as Record<string, unknown>);
    if (firstKey) {
      return firstKey;
    }
  }

  const trimmed = study.results.split(".")[0]?.trim();
  return trimmed.length > 48 ? "Documented Outcomes" : trimmed || "Documented Outcomes";
}

export default async function HomePage() {
  const {
    settings,
    services,
    partners,
    contracts,
    cases,
    leadership,
    testimonials,
    jobs,
  } = await getPublishedData();

  const servicesToRender = services.length ? services : fallbackServices;
  const partnersToRender = partners.length
    ? partners
    : fallbackPartners.map((name, index) => ({
        id: `fallback-partner-${index + 1}`,
        name,
        logoUrl: null,
        websiteUrl: "#",
      }));

  return (
    <HomepageCinematicScene>
      <section className="relative isolate border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/48 via-black/70 to-black/32" />
        <Section className="relative z-10 py-20 lg:py-24">
          <Reveal>
            <div className="hero-parallax-group max-w-5xl">
              <div className="hero-hud-grid" />
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-red-400">
              Enterprise Mission Delivery
              </p>
              <h1 className="mt-4 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                {settings?.heroHeadline ?? "Engineered for National Mission Outcomes"}
              </h1>
              <p className="mt-5 max-w-3xl text-base text-zinc-200 sm:text-lg">
                {settings?.heroSubheadline ??
                  "Integrated professional services, engineering delivery, and mission support logistics for agencies requiring precision, speed, and accountability."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="premium-button rounded-md bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/case-studies"
                  className="premium-button rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:border-red-500/70 hover:text-red-300"
                >
                  Explore Capabilities
                </Link>
              </div>

              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs text-zinc-200">
                <BadgeCheck size={14} className="text-red-400" />
                Procurement-ready delivery teams trusted by federal mission stakeholders
              </div>

              <div className="mt-10 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-zinc-400">
                <ChevronDown size={14} className="animate-bounce text-red-400" />
                Scroll to explore
              </div>
            </div>
          </Reveal>
        </Section>
      </section>

      <Section className="py-10 lg:py-12">
        <Reveal staggerChildren>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
            {metricItems.map((item) => (
              <article
                key={item.label}
                className="kpi-card group rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-red-500/40 hover:shadow-[0_0_24px_rgba(255,43,43,0.12)]"
              >
                <span className="kpi-sweep" />
                <p className="text-[11px] uppercase tracking-[0.14em] text-zinc-400">
                  {item.label}
                </p>
                <p className="mt-3 text-4xl font-black tracking-tight text-white">
                  <AnimatedCounter
                    value={item.value}
                    prefix={item.prefix}
                    suffix={item.suffix}
                  />
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  {item.meta}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section className="grid gap-8 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.03] to-transparent py-12 lg:grid-cols-2 lg:py-14">
        <Reveal className="h-full">
          <p className="text-xs uppercase tracking-[0.2em] text-red-400">
            Global Impact
          </p>
          <h2 className="mt-3 text-4xl font-black uppercase leading-tight">
            Operational Reach Across High-Consequence Environments
          </h2>
          <p className="mt-4 max-w-xl text-zinc-300">
            Our teams support federal operations across multi-location programs,
            integrating local execution with centralized controls and contract-level
            transparency.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ["Countries", "22"],
              ["Operating Sites", "64"],
              ["Mission Programs", "35"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-white/10 bg-black/40 p-3"
              >
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-xs uppercase tracking-[0.12em] text-zinc-400">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.05} className="h-full">
          <div className="relative h-full min-h-72 rounded-2xl border border-red-500/25 bg-[#080808] p-5">
            <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_70%_20%,rgba(255,43,43,0.22),transparent_36%)]" />
            <svg viewBox="0 0 600 320" className="relative h-full w-full">
              <circle cx="130" cy="120" r="6" fill="#ff2b2b" />
              <circle cx="250" cy="90" r="6" fill="#ff2b2b" />
              <circle cx="380" cy="130" r="6" fill="#ff2b2b" />
              <circle cx="460" cy="200" r="6" fill="#ff2b2b" />
              <circle cx="310" cy="230" r="6" fill="#ff2b2b" />
              <path
                d="M130 120 L250 90 L380 130 L460 200"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="1.4"
                fill="none"
              />
              <path
                d="M250 90 L310 230 L460 200"
                stroke="rgba(255,43,43,0.55)"
                strokeWidth="1.2"
                fill="none"
                strokeDasharray="4 4"
              />
              <ellipse
                cx="300"
                cy="165"
                rx="220"
                ry="95"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>
        </Reveal>
      </Section>

      <Section className="relative py-12 lg:py-14">
        <div className="absolute inset-0 rounded-2xl border border-white/5 bg-[linear-gradient(120deg,rgba(255,43,43,0.08),transparent_35%)]" />
        <Reveal>
          <p className="relative text-xs uppercase tracking-[0.25em] text-red-400">
            Who We Are
          </p>
          <h2 className="relative mt-3 max-w-5xl text-4xl font-black uppercase leading-tight sm:text-5xl">
            A High-Trust Enterprise Delivery Partner for Federal Programs
          </h2>
          <p className="relative mt-5 max-w-4xl text-zinc-300">
            We combine enterprise program leadership, secure engineering execution,
            and mission logistics capabilities into one accountable operating model.
            Every engagement is built around measurable outcomes, contract
            confidence, and mission continuity.
          </p>
          <Link
            href="/about"
            className="relative mt-7 inline-flex items-center gap-2 text-sm font-semibold text-red-300 hover:text-red-200"
          >
            Learn More About Us <ArrowRight size={16} />
          </Link>
        </Reveal>
      </Section>

      <Section className="section-divider py-12 lg:py-14">
        <Reveal>
          <h2 className="text-4xl font-black uppercase">Company Growth Timeline</h2>
          <div className="timeline-rail relative mt-8 hidden grid-cols-5 gap-4 lg:grid">
            {timeline.map((item) => (
              <article
                key={item.year}
                className="timeline-card group relative rounded-xl border border-white/10 bg-white/[0.02] p-5"
              >
                <div className="timeline-marker" />
                <p className="text-sm font-bold tracking-[0.08em] text-red-400">{item.year}</p>
                <h3 className="mt-2 text-xl font-bold uppercase">{item.title}</h3>
                <p className="mt-3 text-sm text-zinc-300">{item.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 space-y-3 lg:hidden">
            {timeline.map((item) => (
              <article
                key={item.year}
                className="timeline-card rounded-xl border border-white/10 bg-white/[0.02] p-4"
              >
                <p className="text-sm font-bold text-red-400">{item.year}</p>
                <h3 className="mt-1 text-lg font-bold uppercase">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-300">{item.detail}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section className="py-12 lg:py-14">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-4xl font-black uppercase">Leadership Preview</h2>
            <Link
              href="/about"
              className="text-sm font-semibold text-red-300 hover:text-red-200"
            >
              Meet Leadership
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.slice(0, 4).map((leader) => (
              <article
                key={leader.id}
                className="leadership-card group overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] transition hover:border-red-500/50"
              >
                <div
                  className="h-64 bg-cover bg-center grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                  style={{
                    backgroundImage: `url(${leader.photoUrl || "https://images.unsplash.com/photo-1521119989659-a83eee488004"})`,
                  }}
                />
                <div className="leadership-panel p-4">
                  <p className="text-xl font-bold uppercase text-white">
                    {leader.name}
                  </p>
                  <p className="text-sm text-zinc-400">{leader.title}</p>
                  <p className="mt-2 text-sm text-zinc-300 transition group-hover:text-white">
                    {leader.shortBio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section
        id="services"
        className="rounded-2xl border border-white/10 bg-white/[0.02] py-12 lg:py-14"
      >
        <Reveal>
          <h2 className="text-4xl font-black uppercase">Core Services</h2>
          <div className="mt-8 space-y-4">
            {servicesToRender.map((service) => (
              <article
                key={service.id}
                className="service-module relative grid gap-7 border-t border-white/10 pt-7 lg:grid-cols-[360px_1fr]"
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-zinc-200">
                    {categoryIcon(service.category)}
                    {service.category}
                  </div>
                  <h3 className="text-3xl font-black uppercase leading-tight lg:text-4xl">{service.title}</h3>
                </div>
                <div>
                  <p className="text-zinc-300">{service.description}</p>
                  <ul className="mt-4 grid gap-2 text-sm text-zinc-300 sm:grid-cols-2">
                    {(service.bulletItems as string[]).map((item) => (
                      <li
                        key={item}
                        className="service-capability rounded-md border border-white/10 bg-black/30 px-3 py-2"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section className="py-12 lg:py-14">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em] text-red-400">Trusted Execution Ecosystem</p>
          <h2 className="mt-2 text-4xl font-black uppercase">Mission Partners</h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-300">
            Alliance-backed delivery network supporting federal modernization, sustainment, and mission continuity.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {partnersToRender.map((partner) => (
              <a
                key={partner.id}
                href={partner.websiteUrl || "#"}
                className="partner-card group flex h-24 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-zinc-300 transition hover:border-red-500/50"
              >
                {partner.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="h-10 w-auto grayscale brightness-75 transition group-hover:grayscale-0 group-hover:brightness-100"
                  />
                ) : (
                  <span className="uppercase tracking-[0.08em] text-zinc-400 transition group-hover:text-zinc-200">
                    {partner.name}
                  </span>
                )}
              </a>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section className="py-12 lg:py-14">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-4xl font-black uppercase">Contract Vehicles</h2>
            <Link
              href="/contracts"
              className="text-sm font-semibold text-red-300 hover:text-red-200"
            >
              View All Contracts
            </Link>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {contracts.slice(0, 3).map((contract) => (
              <article
                key={contract.id}
                className="contract-card rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5"
              >
                <div className="flex flex-wrap gap-2">
                  {contractTags(contract.contractType).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-black/35 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mt-4 text-xl font-bold uppercase">{contract.name}</h3>
                <p className="mt-1 text-sm text-zinc-300">{contract.agency}</p>
                <dl className="mt-4 space-y-2 text-xs text-zinc-300">
                  <div className="flex justify-between gap-3 border-b border-white/10 pb-2">
                    <dt className="uppercase tracking-[0.14em] text-zinc-500">Contract #</dt>
                    <dd className="text-right text-zinc-200">{contract.contractNumber}</dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-white/10 pb-2">
                    <dt className="uppercase tracking-[0.14em] text-zinc-500">Vehicle</dt>
                    <dd className="text-right text-zinc-200">{contract.contractType}</dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-white/10 pb-2">
                    <dt className="uppercase tracking-[0.14em] text-zinc-500">Period</dt>
                    <dd className="text-right text-zinc-200">{contract.period}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-sm text-zinc-300">{contract.summary}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section className="py-12 lg:py-14">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-4xl font-black uppercase">Case Studies</h2>
            <Link
              href="/case-studies"
              className="text-sm font-semibold text-red-300 hover:text-red-200"
            >
              Explore All Case Studies
            </Link>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {cases.slice(0, 3).map((study) => (
              <article
                key={study.id}
                className="case-card group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:-translate-y-0.5 hover:border-red-500/40"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="rounded-full border border-white/15 bg-black/35 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-zinc-300">
                    Program Outcome
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-red-300">
                    {caseOutcomeBadge(study)}
                  </span>
                </div>
                <h3 className="text-xl font-bold uppercase">{study.title}</h3>
                <p className="mt-3 text-sm text-zinc-300">{study.summary}</p>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-300 transition group-hover:text-red-200"
                >
                  Read Case <ArrowRight size={14} />
                </Link>
              </article>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section className="py-12 lg:py-14">
        <Reveal>
          <div className="flex items-center gap-3 text-zinc-300">
            <ShieldCheck size={18} className="text-red-400" />
            <p className="text-xs uppercase tracking-[0.24em]">Trust and Performance</p>
          </div>
          <h2 className="mt-2 text-4xl font-black uppercase">Client Perspectives</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <article
                key={item.id}
                className="testimonial-card rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-5"
              >
                <Quote size={18} className="text-red-400" />
                <p className="text-zinc-100">“{item.quote}”</p>
                <p className="mt-4 text-sm font-semibold text-red-300">{item.authorName}</p>
                <p className="text-xs text-zinc-400">
                  {item.authorTitle} • {item.organization}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section className="py-12 lg:py-14">
        <Reveal>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.04] to-transparent p-8">
            <div className="flex items-center gap-3 text-zinc-300">
              <Handshake size={18} className="text-red-400" />
              <p className="text-xs uppercase tracking-[0.22em]">Careers</p>
            </div>
            <h2 className="mt-2 text-4xl font-black uppercase">
              Build Your Career Around Mission Impact
            </h2>
            <p className="mt-3 max-w-3xl text-zinc-300">
              Join multidisciplinary teams supporting programs that matter to
              national mission outcomes.
            </p>
            <div className="mt-5 grid gap-3 text-sm text-zinc-300 sm:grid-cols-3">
              {jobs.slice(0, 3).map((job) => (
                <span
                  key={job.id}
                  className="rounded-md border border-white/15 bg-black/30 px-3 py-3 text-center"
                >
                  {job.title}
                </span>
              ))}
            </div>
            <Link
              href="/careers"
              className="mt-6 inline-flex text-sm font-semibold text-red-300 hover:text-red-200"
            >
              Explore Open Roles
            </Link>
          </div>
        </Reveal>
      </Section>

      <Section className="py-12 lg:py-14">
        <Reveal>
          <div className="rounded-2xl border border-red-500/30 bg-[linear-gradient(125deg,rgba(255,43,43,0.28),rgba(255,43,43,0.04)_45%,rgba(255,255,255,0.02)_100%)] p-8 text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-red-200">
              Start the Conversation
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase sm:text-5xl">
              Let&apos;s Build the Future Together
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-zinc-200">
              Partner with a delivery organization designed for mission continuity,
              enterprise rigor, and measurable outcomes.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex rounded-md bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
            >
              Contact Our Team
            </Link>
          </div>
        </Reveal>
      </Section>
    </HomepageCinematicScene>
  );
}
