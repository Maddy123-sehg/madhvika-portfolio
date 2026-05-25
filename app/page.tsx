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
      "Data platform stakeholders needed visibility into dataset usage, access patterns, adoption, and unused data assets.",
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

const amazonProjects = [
  {
    code: "CP",
    title: "MEC Cost Allocation & Contribution Profit Framework",
    description:
      "Analyzed, debugged, enhanced, and validated a 1,900+ line SQL-based cost allocation pipeline powering Pharmacy Finance reporting.",
    tools: ["SQL", "Athena", "Redshift", "Finance Analytics", "Cost Allocation"],
  },
  {
    code: "MEC",
    title: "Cost Allocation Redesign During Cost Center Restructuring",
    description:
      "Redesigned allocation logic during cost center restructuring and validated downstream impacts through reconciliation checks and structured allocation models.",
    tools: ["SQL", "Excel Modeling", "Reconciliation", "Cost Centers", "P&L"],
  },
  {
    code: "GOV",
    title: "Data Platform Usage & Governance Dashboard",
    description:
      "Built a governance dashboard for an internal healthcare finance data platform using audit log events to measure dataset adoption, platform usage, user access patterns, and unused assets.",
    tools: ["SQL", "QuickSight", "Audit Logs", "Governance", "Data Platform"],
  },
  {
    code: "DOC",
    title: "Business-Facing Cost Allocation Documentation",
    description:
      "Authored a business-facing cost allocation framework explaining methodology, cost drivers, manual adjustments, current-month logic, and rate-card concepts.",
    tools: ["Documentation", "Finance Analytics", "Cost Drivers", "Methodology"],
  },
  {
    code: "DQ",
    title: "Finance Data Quality & Root-Cause Investigations",
    description:
      "Investigated P&L discrepancies by tracing metrics across dashboards, Contribution Profit outputs, allocation logic, upstream GL mappings, and source data.",
    tools: ["SQL", "Root Cause", "Reconciliation", "Finance Reporting"],
  },
  {
    code: "AI",
    title: "GenAI-Assisted Variance Explanation Concepts",
    description:
      "Explored GenAI-assisted workflows to summarize cost allocation anomalies and month-end variance drivers from structured finance outputs.",
    tools: ["Amazon Bedrock", "Claude", "Python", "GenAI", "Variance Analysis"],
  },
];

const barclaysProjects = [
  {
    code: "IVR",
    title: "IVR Customer Journey Analytics & ETL Framework",
    description:
      "Built and managed ETL processes powering 30+ IVR Tableau dashboards and analyzed 5M+ interactions across call logs and servicing data.",
    tools: ["Tableau", "ETL", "Oracle", "AWS", "IVR"],
  },
  {
    code: "CB",
    title: "Callback Feature Revamp & SLA Logic Redesign",
    description:
      "Led a 3-member team to redesign SLA logic and integrate callback features into contact-center workflows, enhancing 45+ dashboards and reports.",
    tools: ["Tableau", "SLA", "Callback Analytics", "Leadership"],
  },
  {
    code: "AWS",
    title: "Cloud Migration & Reporting Data Lake Setup",
    description:
      "Supported migration of operational contact-center datasets from Oracle to AWS S3/Athena/Redshift, improving reporting scalability for downstream analytics.",
    tools: ["AWS S3", "Athena", "Redshift", "Oracle", "Migration"],
  },
  {
    code: "AB",
    title: "Queue Optimization, A/B Testing & Agent Performance Analytics",
    description:
      "Designed queue-performance analyses and agent scoring logic using customer experience signals such as sentiment, CSAT, NPS, and standardized metrics.",
    tools: ["A/B Testing", "Z-Score", "CSAT", "NPS", "Tableau"],
  },
];

const skillGroups = [
  {
    title: "Analytics Engineering",
    skills: ["SQL", "ETL/ELT", "Data Modeling", "Data Validation"],
  },
  {
    title: "Cloud + Data Platforms",
    skills: ["AWS S3", "Athena", "Redshift", "Glue/Lambda"],
  },
  {
    title: "BI + Product Analytics",
    skills: ["Tableau", "QuickSight", "KPI Design", "Funnel Analysis"],
  },
  {
    title: "Finance Analytics",
    skills: ["Cost Allocation", "CP Reporting", "Reconciliation", "Variance Analysis"],
  },
];

const allSkills = [
  "SQL",
  "Python",
  "Pandas",
  "AWS S3",
  "Athena",
  "Glue",
  "Lambda",
  "Redshift",
  "Oracle",
  "Tableau",
  "QuickSight",
  "Tableau Prep",
  "Alteryx",
  "Data Modeling",
  "ETL/ELT",
  "KPI Development",
  "Cost Allocation",
  "Finance Analytics",
  "Data Validation",
  "Root Cause Analysis",
  "JIRA",
  "Confluence",
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
          <a href="#about" className="hover:text-blue-600">
            About
          </a>
          <a href="#featured" className="hover:text-blue-600">
            Featured
          </a>
          <a href="#case-studies" className="hover:text-blue-600">
            Case Studies
          </a>
          <a href="#debugging" className="hover:text-blue-600">
            Debugging
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
          Analytics Engineer with 4+ years across Amazon Pharmacy Finance, Barclays,
          and Accenture — specializing in SQL-heavy data pipelines, cost allocation,
          BI dashboards, cloud analytics, reconciliation workflows, and stakeholder-ready
          decision systems.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#case-studies"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
          >
            View Case Studies <ArrowRight className="ml-2 h-4 w-4" />
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
          <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-600">
                Core skills
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                What I bring to the table
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Data systems thinking, business logic translation, metric debugging,
              and finance-focused BI delivery.
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-4"
              >
                <h3 className="text-sm font-black text-slate-950">{group.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
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
          Core strength: tracing metrics from dashboard symptoms back through SQL,
          upstream data, finance logic, and stakeholder definitions.
        </p>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white to-blue-50/50 p-8 shadow-lg shadow-slate-200/60 md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-600">
            About
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            Finance logic, data pipelines, and BI storytelling — tied together.
          </h2>

          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-600 md:text-lg">
            I’m a Business Intelligence Engineer focused on finance analytics,
            SQL-heavy data pipelines, and stakeholder-ready reporting. My work sits at
            the intersection of analytics engineering, finance operations, cloud data
            platforms, and business storytelling.
          </p>

          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600 md:text-lg">
            I like the messy middle of analytics — the part where the dashboard number
            looks wrong, the upstream table changed silently, the SQL has twelve joins,
            and Finance needs an answer before month-end close. That is usually where
            I’m most useful.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Analytics Engineering",
                text: "SQL transformation logic, data modeling, validation checks, ETL/ELT workflows, and metric definition.",
              },
              {
                title: "Finance Analytics",
                text: "Cost allocation, contribution profit reporting, reconciliation, variance analysis, and month-end close support.",
              },
              {
                title: "BI Storytelling",
                text: "Tableau, QuickSight, dashboard redesign, KPI logic, executive summaries, and stakeholder-ready documentation.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-blue-100 bg-white p-5">
                <h3 className="font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  return (
    <section id="featured" className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-600">
            Featured case studies
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            The work I’d want recruiters and hiring managers to notice first.
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            A tighter view of my strongest analytics engineering, finance analytics,
            data platform governance, and BI reporting work.
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

function ArchitectureSection() {
  const flows = [
    {
      title: "Amazon Pharmacy Finance: Cost Allocation to Contribution Profit",
      subtitle: "How finance source data became reporting-ready business metrics.",
      steps: [
        "GL / finance cost inputs",
        "COGNOS_BASE and source-aligned staging",
        "Work-unit driver tables",
        "MEC cost allocation logic",
        "Rate-card and allocation outputs",
        "Contribution Profit reporting tables",
        "QuickSight / Finance reporting",
      ],
    },
    {
      title: "Barclays IVR Analytics: Contact-Center Journey Reporting",
      subtitle: "How call logs turned into operational KPIs and dashboard insights.",
      steps: [
        "Avaya and AWS contact-center logs",
        "Deduplication and standardization",
        "Tableau Prep / SQL transformations",
        "IVR metric layer",
        "Containment, transfer, SLA, and self-service KPIs",
        "Tableau dashboards",
        "Operational decision support",
      ],
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-600">
            Architecture thinking
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            I think in data flows, not just dashboards.
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            These are sanitized, simplified versions of the systems I worked across.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {flows.map((flow) => (
            <div key={flow.title} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-xl font-black text-slate-950">{flow.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{flow.subtitle}</p>

              <div className="mt-6 space-y-3">
                {flow.steps.map((step, index) => (
                  <div key={step}>
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
                        {index + 1}
                      </div>
                      <p className="text-sm font-semibold text-slate-800">{step}</p>
                    </div>
                    {index < flow.steps.length - 1 && (
                      <div className="ml-4 h-4 w-px bg-slate-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudiesSection() {
  return (
    <section id="case-studies" className="bg-slate-950 py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-300">
            Deep-dive case studies
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
            More than resume bullets: how I actually approached the work.
          </h2>
          <p className="mt-3 leading-7 text-slate-300">
            Sanitized, public-safe summaries that show the problem-solving layer behind
            the projects.
          </p>
        </div>

        <div className="grid gap-8">
          <article className="rounded-[2rem] border border-slate-700 bg-white/5 p-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-300">
              Amazon Pharmacy Finance
            </p>
            <h3 className="mt-3 text-3xl font-black">
              MEC Cost Allocation & Contribution Profit Framework
            </h3>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div>
                <h4 className="font-black text-white">Business problem</h4>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Finance reporting depended on complex cost allocation logic across
                  fulfillment, customer service, pharmacist, billing, and operational
                  cost domains. The challenge was not just producing numbers — it was
                  making the numbers explainable and traceable.
                </p>
              </div>
              <div>
                <h4 className="font-black text-white">Technical approach</h4>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  I worked through upstream cost inputs, cost-center mappings, work-unit
                  drivers, allocation rules, reconciliation checks, and reporting outputs
                  to understand how source costs became Contribution Profit metrics.
                </p>
              </div>
              <div>
                <h4 className="font-black text-white">Stakeholder value</h4>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  The work helped translate dense finance and SQL logic into a clearer
                  framework that business stakeholders could review, validate, and use
                  during month-end analysis.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-5">
              <h4 className="font-black text-white">Before vs After</h4>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-red-950/30 p-4">
                  <p className="text-sm font-black text-red-200">Before</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Cost allocation outputs were difficult to explain without tracing
                    multiple upstream tables, drivers, and business rules.
                  </p>
                </div>
                <div className="rounded-2xl bg-emerald-950/30 p-4">
                  <p className="text-sm font-black text-emerald-200">After</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Allocation logic, cost drivers, reconciliation steps, and finance
                    definitions became easier to review and communicate.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-700 bg-white/5 p-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-300">
              Amazon Pharmacy · Internal Data Platform
            </p>
            <h3 className="mt-3 text-3xl font-black">
              Data Platform Usage & Governance Dashboard
            </h3>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div>
                <h4 className="font-black text-white">Business problem</h4>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Platform stakeholders needed to understand which datasets were used,
                  which tools accessed them, where adoption was growing, and which assets
                  appeared underused.
                </p>
              </div>
              <div>
                <h4 className="font-black text-white">Technical approach</h4>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  I analyzed high-volume audit log events and classified access patterns
                  across platforms, users, datasets, and roles to create governance-ready
                  usage views.
                </p>
              </div>
              <div>
                <h4 className="font-black text-white">Stakeholder value</h4>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  The dashboard gave teams a clearer view of dataset adoption, platform
                  behavior, unused assets, and capacity-planning signals.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function DebuggingSection() {
  const steps = [
    "Confirm the metric definition with the business owner.",
    "Reproduce the dashboard number using the same filters and grain.",
    "Trace the metric back to the reporting table or semantic layer.",
    "Inspect joins, deduplication logic, date filters, and aggregation level.",
    "Compare transformed outputs against source-aligned tables.",
    "Build reconciliation checks for expected vs actual totals.",
    "Document the root cause, business impact, and prevention check.",
  ];

  return (
    <section id="debugging" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-600">
              Debugging methodology
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              How I investigate broken metrics.
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              My strongest pattern is tracing a suspicious number from dashboard symptom
              to source data, transformation logic, business definition, and final
              stakeholder explanation.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-6 text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardThinkingSection() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-600">
            Dashboard thinking
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            I design dashboards around decision-making, not just charts.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Executive Summary",
              items: [
                "Current month performance",
                "Variance vs prior month",
                "Top cost or metric drivers",
                "High-level risk flags",
              ],
            },
            {
              title: "Operational Drilldown",
              items: [
                "Cost center",
                "Facility or business segment",
                "Work type or driver",
                "Payment / customer / channel dimensions",
              ],
            },
            {
              title: "Validation Layer",
              items: [
                "Source vs reporting totals",
                "Missing or unmapped categories",
                "Unexpected month-over-month movement",
                "Data freshness and completeness checks",
              ],
            },
          ].map((block) => (
            <div key={block.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-black text-slate-950">{block.title}</h3>
              <ul className="mt-5 space-y-3">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GlossarySection() {
  const terms = [
    {
      term: "Contribution Profit",
      meaning:
        "A finance metric that connects revenue, cost, and operational expense logic into a profitability view.",
    },
    {
      term: "Cost Allocation",
      meaning:
        "The process of distributing shared operational costs across products, teams, facilities, or business segments using defined drivers.",
    },
    {
      term: "Work Units",
      meaning:
        "Operational activity measures used as allocation drivers, such as fulfilled orders, claims, shipments, or handling effort.",
    },
    {
      term: "Rate Card",
      meaning:
        "A standardized cost-per-unit framework used to apply allocation logic consistently across reporting outputs.",
    },
    {
      term: "Containment Rate",
      meaning:
        "The share of customer interactions resolved within IVR/self-service without needing agent transfer.",
    },
    {
      term: "Transfer Rate",
      meaning:
        "The share of customer interactions routed from one service stage or agent group to another.",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-600">
            Business glossary
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            I translate technical logic into business language.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {terms.map((item) => (
            <div key={item.term} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-black text-slate-950">{item.term}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.meaning}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoleFitSection() {
  return (
    <section className="bg-slate-950 py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-300">
              Role fit
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              Best-fit roles
            </h2>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                "Analytics Engineer",
                "Business Intelligence Engineer",
                "Finance Data Analyst",
                "Product / Operations Data Analyst",
                "Data Platform Analytics Analyst",
                "BI Developer",
              ].map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-slate-700 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-700 bg-white/5 p-6">
            <h3 className="text-xl font-black">Where I add the most value</h3>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              <li>• SQL-heavy finance and operations reporting pipelines</li>
              <li>• Broken metric debugging across dashboard, semantic, and source layers</li>
              <li>• Cost allocation, reconciliation, and month-end reporting workflows</li>
              <li>• BI dashboards with complicated business logic behind simple KPIs</li>
              <li>• Data platform usage analytics, governance, and adoption reporting</li>
              <li>• Translating technical data logic into stakeholder-ready narratives</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectSection({
  id,
  company,
  logo,
  eyebrow,
  title,
  description,
  projects,
  theme,
}: {
  id: string;
  company: string;
  logo: string;
  eyebrow: string;
  title: string;
  description: string;
  projects: {
    code: string;
    title: string;
    description: string;
    tools: string[];
  }[];
  theme: "orange" | "sky";
}) {
  const themes = {
    orange: {
      section: "bg-gradient-to-br from-orange-50 via-white to-teal-50 border-orange-100",
      pill: "bg-orange-100 text-orange-800 border-orange-200",
      bar: "from-orange-400 to-teal-500",
      icon: "bg-slate-950 text-white",
      tag: "bg-orange-50 text-orange-800 border-orange-100",
    },
    sky: {
      section: "bg-gradient-to-br from-sky-50 via-white to-blue-50 border-sky-100",
      pill: "bg-sky-100 text-sky-800 border-sky-200",
      bar: "from-sky-400 to-blue-600",
      icon: "bg-sky-500 text-white",
      tag: "bg-sky-50 text-sky-800 border-sky-100",
    },
  };

  const t = themes[theme];

  return (
    <section id={id} className={`border-y py-16 ${t.section}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <div className="mb-4 flex h-20 w-[360px] items-center">
            <Image
              src={logo}
              alt={`${company} logo`}
              width={360}
              height={120}
              className="max-h-20 max-w-[320px] object-contain"
            />
          </div>

          <p className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] ${t.pill}`}>
            {eyebrow}
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            {title}
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">{description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="h-full overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className={`h-2 bg-gradient-to-r ${t.bar}`} />

              <div className="p-6">
                <div className="flex gap-4">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xs font-black ${t.icon}`}
                  >
                    {project.code}
                  </div>

                  <div>
                    <h3 className="text-lg font-black leading-snug text-slate-950">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-slate-600">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${t.tag}`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolDepthSection() {
  const tools = [
    {
      tool: "SQL",
      use: "Transformation logic, allocation rules, reconciliation checks, window functions, and metric validation.",
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
          {tools.map((item) => (
            <div key={item.tool} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-black text-slate-950">{item.tool}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.use}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {allSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function EarlierFoundationSection() {
  return (
    <section className="bg-slate-50 py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8">
          <div className="mb-5 flex h-14 w-[260px] items-center">
            <Image
              src="/logos/Accenture.svg"
              alt="Accenture logo"
              width={260}
              height={90}
              className="max-h-14 max-w-[220px] object-contain"
            />
          </div>

          <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-700">
            Earlier foundation · Consulting · SAP · UAT
          </p>

          <h2 className="mt-3 text-2xl font-black text-slate-950">
            Accenture Foundation
          </h2>

          <p className="mt-3 max-w-4xl leading-7 text-slate-600">
            Enterprise consulting experience that built my foundation in stakeholder
            communication, requirements gathering, documentation, UAT support, SAP MM /
            procure-to-pay workflows, and cross-functional delivery.
          </p>
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
                Best fit: roles where business ambiguity, SQL-heavy pipelines,
                finance logic, and stakeholder communication all meet.
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
        <AboutSection />
        <FeaturedProjects />
        <ArchitectureSection />
        <CaseStudiesSection />
        <DebuggingSection />
        <DashboardThinkingSection />
        <GlossarySection />
        <RoleFitSection />

        <ProjectSection
          id="amazon"
          company="Amazon"
          logo="/logos/Amazon.png"
          eyebrow="Pharmacy Finance · Cost Allocation · Contribution Profit"
          title="Amazon Projects"
          description="Finance analytics and data engineering-adjacent work across MEC cost allocation, Contribution Profit reporting, data platform governance, reconciliation, business documentation, and variance-analysis concepts."
          projects={amazonProjects}
          theme="orange"
        />

        <ProjectSection
          id="barclays"
          company="Barclays"
          logo="/logos/Barclays.svg"
          eyebrow="Fintech · IVR · Contact Center Analytics"
          title="Barclays Projects"
          description="Customer journey and contact-center analytics across IVR funnels, callback workflows, reporting data migration, SLA logic, A/B testing, and performance scoring."
          projects={barclaysProjects}
          theme="sky"
        />

        <EarlierFoundationSection />
        <ToolDepthSection />
        <ContactSection />
      </main>
    </div>
  );
}