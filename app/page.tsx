import Image from "next/image";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Database,
  Download,
  FileText,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

const resumePdf = "/Madhvika_Sehgal_Analytics_Engineer_May_2026.pdf";
const resumeDocx = "/Madhvika_Sehgal_Analytics_Engineer_May_2026.docx";

const featuredProjects = [
  {
    title: "MEC Cost Allocation & Contribution Profit Framework",
    company: "Amazon Pharmacy Finance",
    problem:
      "Finance teams needed a more reliable way to understand how operational costs flowed into Contribution Profit reporting.",
    approach:
      "Worked across SQL allocation logic, upstream cost-center mappings, work-unit drivers, reconciliation checks, and business-facing documentation.",
    impact:
      "Improved transparency around month-end cost allocation logic and made complex finance methodology easier for stakeholders to review.",
    tools: ["SQL", "Athena", "Redshift", "Excel Modeling", "Finance Analytics"],
  },
  {
    title: "Data Platform Usage & Governance Dashboard",
    company: "Amazon Pharmacy · Internal Data Platform",
    problem:
      "Platform stakeholders needed visibility into dataset usage, access patterns, adoption, and unused data assets.",
    approach:
      "Analyzed audit log events, classified platform access patterns, and designed dashboard views for governance and capacity planning.",
    impact:
      "Enabled better understanding of platform adoption, dataset utilization, team-level usage, and underused assets.",
    tools: ["SQL", "QuickSight", "Audit Logs", "Governance", "Data Platform"],
  },
  {
    title: "IVR Customer Journey Analytics & ETL Framework",
    company: "Barclays",
    problem:
      "Contact-center teams needed reliable IVR journey metrics across call containment, transfers, self-service, and customer outcomes.",
    approach:
      "Built and maintained ETL/reporting logic across call logs, IVR outcomes, dashboard calculations, and operational KPI definitions.",
    impact:
      "Supported 30+ Tableau dashboards and enabled analysis across millions of customer interactions.",
    tools: ["SQL", "Tableau", "Tableau Prep", "Oracle", "AWS"],
  },
];

const experience = [
  {
    company: "Amazon Pharmacy Finance",
    logo: "/logos/Amazon.png",
    eyebrow: "Finance Analytics · Cost Allocation · Contribution Profit",
    color: "orange",
    summary:
      "Worked across MEC cost allocation, Contribution Profit reporting, data quality investigations, platform governance dashboards, reconciliation workflows, and business-facing finance documentation.",
    highlights: [
      "Analyzed, debugged, enhanced, and validated a 1,900+ line SQL-based cost allocation pipeline.",
      "Supported cost-center restructuring by validating allocation logic, downstream impacts, and reconciliation checks.",
      "Built governance views using audit log events to understand dataset adoption, access patterns, and underused assets.",
      "Investigated P&L discrepancies by tracing metrics across dashboards, CP outputs, allocation logic, and upstream source mappings.",
    ],
  },
  {
    company: "Barclays",
    logo: "/logos/Barclays.svg",
    eyebrow: "Fintech · IVR · Contact Center Analytics",
    color: "sky",
    summary:
      "Built and supported customer journey analytics across IVR funnels, callback workflows, Tableau dashboards, SLA reporting, cloud migration support, and operational KPI design.",
    highlights: [
      "Managed ETL/reporting logic powering 30+ IVR Tableau dashboards.",
      "Analyzed 5M+ customer interactions across call logs, IVR outcomes, and servicing data.",
      "Supported callback feature reporting, SLA logic redesign, and dashboard enhancements.",
      "Worked across Oracle, AWS, Tableau Prep, SQL transformations, and Tableau reporting layers.",
    ],
  },
  {
    company: "Accenture",
    logo: "/logos/Accenture.svg",
    eyebrow: "Earlier Foundation · Consulting · SAP · UAT",
    color: "purple",
    summary:
      "Enterprise consulting foundation across stakeholder communication, requirements gathering, documentation, UAT support, SAP MM / procure-to-pay workflows, and cross-functional delivery.",
    highlights: [
      "Supported business requirements, functional documentation, testing, and stakeholder coordination.",
      "Built early foundation in enterprise systems, process thinking, and client-facing delivery.",
    ],
  },
];

const toolDepth = [
  {
    tool: "SQL",
    use: "Transformation logic, allocation rules, reconciliation checks, window functions, metric validation, and pipeline debugging.",
  },
  {
    tool: "AWS Athena / Redshift",
    use: "Querying warehouse and data-lake layers, validating transformed outputs, and supporting reporting pipelines.",
  },
  {
    tool: "QuickSight / Tableau",
    use: "Executive dashboards, KPI design, filters, drilldowns, dashboard performance, and stakeholder-ready reporting.",
  },
  {
    tool: "Python",
    use: "Data validation, automation prototypes, file handling, metadata processing, and analytics support workflows.",
  },
  {
    tool: "Excel",
    use: "Finance allocation modeling, reconciliation frameworks, driver review, and stakeholder-friendly validation.",
  },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div>
          <a href="#top" className="text-2xl font-black tracking-tight text-slate-950">
            Madhvika Sehgal
          </a>
          <p className="mt-1 text-sm text-slate-500">Analytics Engineer</p>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 lg:flex">
          <a href="#top" className="border-b-2 border-blue-600 pb-2 text-blue-600">
            Home
          </a>
          <a href="#featured" className="hover:text-blue-600">
            Work
          </a>
          <a href="#how" className="hover:text-blue-600">
            How I Work
          </a>
          <a href="#experience" className="hover:text-blue-600">
            Experience
          </a>
          <a href="#skills" className="hover:text-blue-600">
            Skills
          </a>
          <a href="#contact" className="hover:text-blue-600">
            Contact
          </a>
        </nav>

        <a
          href={resumePdf}
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 md:inline-flex"
        >
          Resume PDF
        </a>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-12 pt-16 lg:grid-cols-[1.05fr_.95fr]">
      <div className="self-start">
        <div className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
          <Sparkles className="h-4 w-4" />
          BI Engineering · Finance Analytics · Cloud Data Platforms
        </div>

        <h1 className="mt-7 text-5xl font-black leading-[1.03] tracking-tight text-slate-950 md:text-7xl">
          I build trusted analytics layers for messy finance, operations, and{" "}
          <span className="text-blue-600">customer journey data.</span>
        </h1>

        <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">
          Analytics Engineer focused on SQL-heavy finance and operations data —
          building trusted reporting layers, debugging complex metrics, and translating
          messy business logic into decision-ready dashboards.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#featured"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
          >
            View Featured Work <ArrowRight className="ml-2 h-4 w-4" />
          </a>

          <a
            href={resumePdf}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-4 text-base font-bold text-slate-900 hover:bg-slate-50"
          >
            <FileText className="mr-2 h-4 w-4" />
            View Resume PDF
          </a>

          <a
            href={resumeDocx}
            download
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-4 text-base font-bold text-slate-900 hover:bg-slate-50"
          >
            <Download className="mr-2 h-4 w-4" />
            Download DOCX
          </a>
        </div>

        <div className="mt-8 rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-lg shadow-slate-200/70">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-600">
            Core strengths
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              "SQL-heavy data transformation and validation",
              "Finance analytics, cost allocation, and reconciliation",
              "BI dashboard logic, KPI design, and stakeholder storytelling",
              "Metric debugging across dashboard, semantic, and source layers",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <p className="text-sm font-semibold leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <LogoGrid />
        <PortfolioSnapshot />
      </div>
    </section>
  );
}

function LogoGrid() {
  const logos = [
    { src: "/logos/Amazon.png", alt: "Amazon", className: "h-[80px] w-[260px]" },
    { src: "/logos/Barclays.svg", alt: "Barclays", className: "h-[80px] w-[270px]" },
    { src: "/logos/Accenture.svg", alt: "Accenture", className: "h-[80px] w-[310px]" },
    { src: "/logos/Eller.png", alt: "University of Arizona", className: "h-[80px] w-[250px]" },
  ];

  return (
    <div className="mb-8 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-lg">
      <div className="grid grid-cols-2 divide-x divide-y divide-slate-200 md:grid-cols-4 md:divide-y-0">
        {logos.map((logo) => (
          <div key={logo.alt} className="flex h-[125px] items-center justify-center bg-white px-5">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={320}
              height={100}
              className={`${logo.className} max-w-full object-contain`}
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioSnapshot() {
  const stats = [
    { value: "1,900+", label: "line finance SQL pipeline analyzed and enhanced", icon: Database },
    { value: "1M+", label: "monthly audit log events classified for usage analytics", icon: CheckCircle2 },
    { value: "45+", label: "dashboards and reports enhanced", icon: BriefcaseBusiness },
    { value: "5M+", label: "IVR interactions analyzed", icon: Database },
  ];

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-2xl shadow-slate-200/70">
      <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-600">
        Portfolio Snapshot
      </p>

      <h2 className="mt-4 text-2xl font-black text-slate-950 md:text-3xl">
        Scale, complexity, and business impact.
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/60 p-5 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <Icon className="h-7 w-7 text-blue-600" />
                <div className="text-3xl font-black text-blue-600">{stat.value}</div>
              </div>
              <div className="mt-2 pl-11 text-sm text-slate-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-emerald-600" />
        <p className="text-sm leading-7 text-slate-700">
          Core strength: tracing broken metrics from dashboard → SQL logic → source data →
          business definition.
        </p>
      </div>
    </div>
  );
}

function FeaturedWorkSection() {
  return (
    <section id="featured" className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-600">
            Featured work
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            Selected projects that show how I solve messy data problems.
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            A focused view of my strongest work across finance analytics, data platform
            governance, customer journey reporting, and BI decision systems.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <article
              key={project.title}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
                {project.company}
              </p>

              <h3 className="mt-3 text-xl font-black leading-snug text-slate-950">
                {project.title}
              </h3>

              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                <div>
                  <p className="font-black text-slate-950">Problem</p>
                  <p>{project.problem}</p>
                </div>

                <div>
                  <p className="font-black text-slate-950">Approach</p>
                  <p>{project.approach}</p>
                </div>

                <div>
                  <p className="font-black text-slate-950">Impact</p>
                  <p>{project.impact}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowIWorkSection() {
  const cards = [
    {
      title: "Trace the metric",
      description:
        "When a dashboard number looks wrong, I trace it from dashboard filters to reporting tables, transformation logic, source data, and business definition.",
      steps: [
        "Dashboard number",
        "Reporting / semantic layer",
        "Transformation logic",
        "Source data",
        "Business definition",
      ],
    },
    {
      title: "Model the flow",
      description:
        "I simplify complex data systems into clear flows so stakeholders can understand where inputs, rules, and reporting outputs connect.",
      steps: [
        "Source systems",
        "Staging / cleaned tables",
        "Business transformations",
        "Reporting layer",
        "BI dashboard",
      ],
    },
    {
      title: "Design for decisions",
      description:
        "I design dashboards around the question the business needs answered, not just around the charts available in the BI tool.",
      steps: [
        "Executive summary",
        "Driver breakdown",
        "Operational drilldown",
        "Validation checks",
        "Stakeholder explanation",
      ],
    },
  ];

  return (
    <section id="how" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-600">
            How I work
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            Systems thinking without making the reader work too hard.
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            My work usually sits in the messy middle: unclear metrics, long SQL logic,
            upstream data changes, and stakeholders who need a clean answer.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6"
            >
              <h3 className="text-xl font-black text-slate-950">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>

              <div className="mt-6 space-y-3">
                {card.steps.map((step, index) => (
                  <div key={step}>
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
                        {index + 1}
                      </div>
                      <p className="text-sm font-semibold text-slate-800">{step}</p>
                    </div>
                    {index < card.steps.length - 1 && (
                      <div className="ml-3 h-3 w-px bg-slate-300" />
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSnapshotSection() {
  return (
    <section id="experience" className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-600">
            Experience snapshot
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            The environments where I built this skill set.
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            A compact view of the domains, systems, and business problems behind the
            project work.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {experience.map((item) => (
            <article
              key={item.company}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-5 flex h-16 items-center">
                <Image
                  src={item.logo}
                  alt={`${item.company} logo`}
                  width={280}
                  height={90}
                  className="max-h-14 max-w-[220px] object-contain"
                />
              </div>

              <p
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${
                  item.color === "orange"
                    ? "border-orange-200 bg-orange-100 text-orange-800"
                    : item.color === "sky"
                    ? "border-sky-200 bg-sky-100 text-sky-800"
                    : "border-purple-200 bg-purple-100 text-purple-800"
                }`}
              >
                {item.eyebrow}
              </p>

              <h3 className="mt-4 text-xl font-black text-slate-950">{item.company}</h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">{item.summary}</p>

              <ul className="mt-5 space-y-3">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-6 text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolDepthSection() {
  return (
    <section id="skills" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-600">
            Tool depth
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            Not just tools I list — how I use them.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {toolDepth.map((item) => (
            <div
              key={item.tool}
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
            >
              <h3 className="font-black text-slate-950">{item.tool}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.use}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-2xl shadow-slate-400/20 md:p-10">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-300">
                Open to roles
              </p>

              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                Analytics Engineer · BI Engineer · Finance Analytics
              </h2>

              <p className="mt-4 max-w-3xl leading-7 text-slate-300">
                Best fit: roles where business ambiguity, SQL-heavy pipelines, finance
                logic, and stakeholder communication all meet.
              </p>

              <div className="mt-6 grid gap-4 text-sm text-slate-200 sm:grid-cols-3">
                <a
                  className="flex items-center gap-2 hover:underline"
                  href="mailto:madhvika.sehgal@gmail.com?subject=Portfolio%20Inquiry%20-%20Madhvika%20Sehgal"
                >
                  <Mail className="h-4 w-4" />
                  madhvika.sehgal@gmail.com
                </a>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Seattle, WA
                </div>

                <a
                  className="flex items-center gap-2 hover:underline"
                  href="https://www.linkedin.com/in/madhvika-sehgal/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BriefcaseBusiness className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:madhvika.sehgal@gmail.com?subject=Portfolio%20Inquiry%20-%20Madhvika%20Sehgal"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-4 font-bold text-slate-950 hover:bg-slate-100"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </a>

              <a
                href={resumePdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-4 font-bold text-slate-950 hover:bg-slate-100"
              >
                <FileText className="mr-2 h-4 w-4" />
                Resume PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 [font-family:Inter,Segoe_UI,Arial,sans-serif]">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,#dbeafe,transparent_35%),radial-gradient(circle_at_bottom_left,#fff7ed,transparent_30%)]" />

      <Header />

      <main id="top">
        <HeroSection />
        <FeaturedWorkSection />
        <HowIWorkSection />
        <ExperienceSnapshotSection />
        <ToolDepthSection />
        <ContactSection />
      </main>
    </div>
  );
}