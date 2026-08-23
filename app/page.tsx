import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Code2,
  Database,
  ExternalLink,
  FileText,
  GitBranch,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { MobileNav } from "./mobile-nav";

const resumePdf = "/Madhvika-Sehgal-Resume-2026.pdf";

type ExperienceProject = {
  category: string;
  title: string;
  technical: string;
  impact: string;
  tools: string[];
};

const impactStats = [
  { category: "Finance operations", value: "7+ hrs", label: "of monthly allocation work automated" },
  { category: "Data governance", value: "1M+", label: "platform events classified each month" },
  { category: "BI modernization", value: "45+", label: "dashboards and reports validated" },
  { category: "Customer analytics", value: "5M+", label: "interactions analyzed each month" },
];

const amazonProjects: ExperienceProject[] = [
  {
    category: "Finance systems",
    title: "Cost Allocation and Profitability Platform",
    technical:
      "Redesigned a 1,900+ line SQL framework using operational drivers and time-clock actuals while preserving general-ledger and P&L reconciliation.",
    impact:
      "Improved explainability of cost-to-fill reporting and supported operational growth from 4 to 38 sites.",
    tools: ["SQL", "Athena", "Redshift"],
  },
  {
    category: "Analytics automation",
    title: "Workforce Allocation Automation",
    technical:
      "Integrated payroll, warehouse metadata, operational flags, and configurable business rules into a repeatable SQL workflow.",
    impact:
      "Replaced manual Excel formulas and saved more than 7 hours during each monthly reporting cycle.",
    tools: ["SQL", "Data Quality", "Reconciliation"],
  },
  {
    category: "Platform analytics",
    title: "Data Governance and Adoption Dashboard",
    technical:
      "Classified more than 1 million monthly audit events across datasets, users, and tools to create a prioritized governance view.",
    impact:
      "Enabled retirement of 14 stale jobs and optimization of the four highest-compute jobs.",
    tools: ["QuickSight", "SQL", "Audit Logs"],
  },
];

const amazonAdditional = [
  "Added validation guardrails across 10+ dependent datasets during a primary-key and schema migration, with zero material metric regression.",
  "Used Claude-assisted hypotheses and targeted SQL checks to reduce financial anomaly investigation by roughly 3 hours per issue.",
  "Converted recurring analytics incidents into reusable procedures and an ownership map, reducing triage overhead by roughly 4 hours per week.",
];

const barclaysProjects: ExperienceProject[] = [
  {
    category: "Cloud data migration",
    title: "Contact-Center Analytics Modernization",
    technical:
      "Reconciled Avaya and Oracle call schemas across S3, Athena, Redshift, and Oracle while standardizing containment and self-service KPIs.",
    impact:
      "Restored completeness from 2.5 million to 4.5 million monthly calls for more than 30 Tableau dashboards.",
    tools: ["AWS", "SQL", "Tableau"],
  },
  {
    category: "KPI design and experimentation",
    title: "Callback Analytics and Routing Experiment",
    technical:
      "Redesigned SLA logic, modified upstream SQL, and led a production A/B test across control and treatment call groups.",
    impact:
      "Validated 45+ reports, contributed to 12% higher retention and 8% fewer transfers, and helped eliminate roughly 8,000 transfers per month.",
    tools: ["Experimentation", "SQL", "Tableau"],
  },
  {
    category: "Enterprise GenAI",
    title: "AI-Assisted Reporting Documentation",
    technical:
      "Built a serverless workflow that transformed report metadata into lineage, KPI definitions, validation rules, and audit documentation.",
    impact:
      "Reduced a days-long documentation process to minutes while preserving structured review and validation.",
    tools: ["Bedrock", "Lambda", "Python"],
  },
];

const barclaysAdditional = [
  "Reconstructed customer journeys with SQL event sequencing across IVR, queue, callback, and servicing outcomes.",
  "Created a normalized agent-performance index combining sentiment, CSAT, and NPS to extend comparable scoring to the full agent base.",
];

const pipelineFlows = {
  amazon: [
    "Finance and operational sources",
    "Validated staging models",
    "Operational driver logic",
    "Cost allocation and reconciliation",
    "Profitability reporting",
  ],
  barclays: [
    "Contact-center source data",
    "Schema reconciliation",
    "Journey and KPI logic",
    "Semantic reporting layer",
    "Tableau dashboards",
  ],
};

const capabilityGroups = [
  {
    title: "Data and BI",
    description: "Trusted reporting layers from source data to executive decisions.",
    icon: Database,
    skills: ["SQL", "Dimensional Modeling", "ETL and ELT", "Data Marts", "Tableau", "QuickSight"],
  },
  {
    title: "Cloud and Engineering",
    description: "Reliable analytics workflows with validation, automation, and traceability.",
    icon: Code2,
    skills: ["AWS", "Athena", "Redshift", "S3 and Lambda", "Python and pandas", "DAG-Based Orchestration", "Data Quality", "Git"],
  },
  {
    title: "Analytics and Decisions",
    description: "Methods that connect business questions to measurable recommendations.",
    icon: BarChart3,
    skills: ["KPI Development", "A/B Testing", "Hypothesis Testing", "Funnel Analysis", "Customer Journeys", "Reconciliation", "Governance", "Stakeholder Storytelling"],
  },
];

const aiCapabilities = [
  {
    title: "AI-Assisted Analytics Engineering",
    tools: "ChatGPT / Codex · Claude Code · Kiro",
    description:
      "Accelerate Python and SQL development, repository analysis, debugging, testing, and documentation while independently validating every result.",
    evidence:
      "Applied to financial anomaly investigation, analytics procedures, and tested portfolio builds.",
  },
  {
    title: "Agentic Analytics",
    tools: "Tool calling · Decision loops · Guardrails",
    description:
      "Built a public investigation agent that chooses analysis tools, observes results, decomposes KPI movement, and produces an evidence-backed conclusion.",
    evidence: "Inspectable Python code, deterministic sample data, and automated tests.",
    href: "https://github.com/Maddy123-sehg/analytics-investigation-agent",
  },
  {
    title: "Enterprise GenAI Workflows",
    tools: "Amazon Bedrock · Claude · Lambda · S3",
    description:
      "Transform reporting metadata into lineage, KPI definitions, validation rules, audit documentation, and structured summaries.",
    evidence: "Reduced a days-long reporting-documentation workflow to minutes.",
  },
];

function Header() {
  const links = [
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills & AI", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-6">
        <a href="#top" className="min-w-0">
          <span className="block text-xl font-black tracking-tight text-slate-950 sm:text-2xl">Madhvika Sehgal</span>
          <span className="mt-0.5 block text-xs text-slate-500 sm:hidden">
            BI Engineer · Analytics · Applied AI
          </span>
          <span className="mt-0.5 hidden text-sm text-slate-500 sm:block">
            Business Intelligence Engineer · Analytics Engineering · Applied AI
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-700 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-blue-600">{link.label}</a>
          ))}
          <a href={resumePdf} target="_blank" rel="noreferrer" className="rounded-lg bg-blue-600 px-4 py-2.5 font-black text-white hover:bg-blue-700">
            Resume
          </a>
        </nav>

        <MobileNav resumePdf={resumePdf} />
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section id="top" className="mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-6 lg:pb-14 lg:pt-20">
      <div className="max-w-5xl">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-blue-600">Business intelligence engineering portfolio</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.03] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          I build <span className="text-blue-600">reliable data systems</span> for financial, operational, and customer decisions.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Business Intelligence Engineer with 4+ years across Amazon, Barclays, and Accenture, building SQL data models, cloud pipelines, BI systems, experiments, and AI-assisted analytics workflows.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#experience" className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700">
            View experience <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <a href={resumePdf} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-5 py-3.5 text-sm font-black text-slate-900 hover:bg-slate-50">
            <FileText className="mr-2 h-4 w-4" /> Resume
          </a>
          <a href="https://github.com/Maddy123-sehg" target="_blank" rel="noreferrer" className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-5 py-3.5 text-sm font-black text-slate-900 hover:bg-slate-50">
            <GitBranch className="mr-2 h-4 w-4" /> GitHub
          </a>
        </div>
      </div>

      <div className="mt-12 grid border-y border-slate-200 md:grid-cols-[1.35fr_.65fr] md:divide-x md:divide-slate-200">
        <div className="flex flex-col gap-5 py-6 md:pr-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Experience across</p>
          <div className="grid grid-cols-3 items-center gap-7">
            <Image src="/logos/Amazon.png" alt="Amazon" width={180} height={60} className="h-10 w-full object-contain" priority />
            <Image src="/logos/Barclays.svg" alt="Barclays" width={190} height={60} className="h-9 w-full object-contain" priority />
            <Image src="/logos/Accenture.svg" alt="Accenture" width={190} height={60} className="h-9 w-full object-contain" priority />
          </div>
        </div>
        <div className="flex items-center gap-4 py-6 md:pl-8">
          <Image src="/logos/Eller.png" alt="University of Arizona Eller College" width={150} height={55} className="h-12 w-28 shrink-0 object-contain" priority />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Education</p>
            <p className="mt-1 text-sm font-bold leading-5 text-slate-800">MS, Management Information Systems</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section className="bg-slate-950 py-10 text-white" aria-labelledby="impact-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <h2 id="impact-title" className="text-xl font-black tracking-tight sm:text-2xl">Selected impact</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-slate-700">
          {impactStats.map((stat) => (
            <div key={stat.category} className="lg:px-6 lg:first:pl-0 lg:last:pr-0">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-300">{stat.category}</p>
              <p className="mt-2 text-4xl font-black tracking-tight">{stat.value}</p>
              <p className="mt-2 max-w-56 text-sm leading-6 text-slate-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      </div>
      <p className="max-w-3xl leading-7 text-slate-600">{description}</p>
    </div>
  );
}

function ExperienceProjectCard({ project }: { project: ExperienceProject }) {
  return (
    <article className="flex h-full flex-col border-t-2 border-blue-600 bg-white p-6 ring-1 ring-slate-200">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">{project.category}</p>
      <h3 className="mt-3 text-xl font-black leading-snug text-slate-950">{project.title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-600">{project.technical}</p>
      <div className="mt-5 flex gap-3 border-t border-slate-100 pt-5 text-sm leading-6 text-slate-800">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
        <p><span className="font-black">Impact:</span> {project.impact}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tools.map((tool) => (
          <span key={tool} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">{tool}</span>
        ))}
      </div>
    </article>
  );
}

function PipelineDetails({ title, steps }: { title: string; steps: string[] }) {
  return (
    <details className="group">
      <summary className="inline-flex cursor-pointer list-none items-center rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-800 hover:border-blue-200 hover:text-blue-700">
        <Workflow className="mr-2 h-4 w-4" />{title}<ChevronDown className="ml-2 h-4 w-4 transition group-open:rotate-180" />
      </summary>
      <div className="mt-4 grid gap-2 sm:grid-cols-5">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-700 sm:block">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">{index + 1}</span>
            <p className="sm:mt-3">{step}</p>
          </div>
        ))}
      </div>
    </details>
  );
}

function AdditionalContributions({ items }: { items: string[] }) {
  return (
    <details className="group">
      <summary className="inline-flex cursor-pointer list-none items-center rounded-lg px-3 py-2.5 text-sm font-black text-blue-700 hover:bg-blue-50">
        Additional contributions<ChevronDown className="ml-2 h-4 w-4 transition group-open:rotate-180" />
      </summary>
      <div className="mt-3 max-w-4xl space-y-3 rounded-lg border border-slate-200 bg-white p-5">
        {items.map((item) => (
          <p key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />{item}
          </p>
        ))}
      </div>
    </details>
  );
}

function CompanyExperience({ id, logo, logoAlt, role, dates, summary, projects, additional, pipeline, background = "white" }: {
  id: string;
  logo: string;
  logoAlt: string;
  role: string;
  dates: string;
  summary: string;
  projects: ExperienceProject[];
  additional: string[];
  pipeline: string[];
  background?: "white" | "slate";
}) {
  return (
    <section id={id} className={`py-14 lg:py-16 ${background === "slate" ? "bg-slate-50" : "bg-white"}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-col gap-6 border-b border-slate-200 pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <Image src={logo} alt={logoAlt} width={210} height={70} className="h-12 w-auto object-contain" />
            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{role}</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">{summary}</p>
          </div>
          <p className="shrink-0 text-sm font-black text-slate-500">{dates}</p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {projects.map((project) => <ExperienceProjectCard key={project.title} project={project} />)}
        </div>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
          <PipelineDetails title="View analytics pipeline" steps={pipeline} />
          <AdditionalContributions items={additional} />
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <div id="experience">
      <section className="bg-white pt-14 lg:pt-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionIntro
            eyebrow="Enterprise experience"
            title="Analytics systems built at scale."
            description="Selected work across financial reporting, data platforms, cloud migration, customer analytics, experimentation, and AI-assisted operations. Each example connects technical delivery to a measurable business result."
          />
        </div>
      </section>
      <CompanyExperience
        id="amazon"
        logo="/logos/Amazon.png"
        logoAlt="Amazon"
        role="Business Intelligence Engineer · Pharmacy Finance & Analytics"
        dates="Aug 2025 - Present"
        summary="Finance and data-platform work across profitability reporting, allocation automation, governance, data quality, and AI-assisted investigation."
        projects={amazonProjects}
        additional={amazonAdditional}
        pipeline={pipelineFlows.amazon}
      />
      <CompanyExperience
        id="barclays"
        logo="/logos/Barclays.svg"
        logoAlt="Barclays"
        role="Business Intelligence Analyst · Credit Card & Contact Center Analytics"
        dates="Jan 2021 - Jul 2025"
        summary="Analytics engineering and decision support across cloud migration, KPI design, experimentation, customer journeys, and enterprise GenAI workflows."
        projects={barclaysProjects}
        additional={barclaysAdditional}
        pipeline={pipelineFlows.barclays}
        background="slate"
      />
    </div>
  );
}

function IndependentProjectsSection() {
  return (
    <section id="projects" className="bg-white py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionIntro
          eyebrow="Independent projects"
          title="Built and tested independently."
          description="Two public repositories demonstrate reproducible analytics engineering and agentic investigation outside proprietary enterprise systems."
        />
        <div className="mt-9 grid gap-6 lg:grid-cols-2">
          <article className="overflow-hidden border border-slate-200 bg-white">
            <div className="relative aspect-[2.5/1] overflow-hidden bg-slate-100">
              <Image
                src="/retail-dashboard.png"
                alt="Retail Sales Performance dashboard with monthly and regional revenue charts"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
            <div className="p-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Analytics engineering</p>
              <h3 className="mt-3 text-2xl font-black text-slate-950">Retail Medallion Analytics</h3>
              <p className="mt-3 leading-7 text-slate-600">
                A Bronze-Silver-Gold pipeline that converts imperfect retail source data into tested dimensional marts and an executive Streamlit dashboard.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {["Tested data layers", "Automated reconciliation", "GitHub Actions CI"].map((item) => (
                  <p key={item} className="flex gap-2 text-sm font-semibold text-slate-700"><ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />{item}</p>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs font-bold text-slate-500">Python · SQL · DuckDB · Streamlit</p>
                <a href="https://github.com/Maddy123-sehg/retail-medallion-analytics" target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-black text-blue-700 hover:underline">
                  View GitHub project <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </article>

          <article className="flex flex-col border border-slate-200 bg-slate-950 p-6 text-white">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300">Agentic analytics</p>
              <h3 className="mt-3 text-2xl font-black">Analytics Investigation Agent</h3>
              <p className="mt-3 leading-7 text-slate-300">
                A transparent Python agent that chooses tools, investigates KPI movement, and returns an evidence-backed business conclusion with visible reasoning steps.
              </p>
            </div>
            <div className="my-7 grid gap-2 rounded-lg border border-slate-700 bg-slate-900 p-4 sm:grid-cols-5">
              {["Question", "Inspect", "Query", "Validate", "Conclude"].map((step, index) => (
                <div key={step} className="flex items-center gap-2 sm:block">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-black">{index + 1}</span>
                  <p className="text-xs font-bold text-slate-300 sm:mt-2">{step}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {["Deterministic data", "Tool-call guardrails", "Automated tests"].map((item) => (
                <p key={item} className="flex gap-2 text-sm font-semibold text-slate-200"><ShieldCheck className="h-4 w-4 shrink-0 text-blue-300" />{item}</p>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-7">
              <p className="text-xs font-bold text-slate-400">Python · Tool Calling · KPI Decomposition</p>
              <a href="https://github.com/Maddy123-sehg/analytics-investigation-agent" target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-black text-blue-300 hover:text-white">
                View GitHub project <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function SkillsAndAiSection() {
  return (
    <section id="skills" className="border-y border-slate-200 bg-slate-50 py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionIntro
          eyebrow="Skills and applied AI"
          title="Capabilities built through delivery."
          description="A concise view of the technical and analytical skills demonstrated across the experience and project evidence above."
        />
        <div className="mt-9 grid gap-5 lg:grid-cols-3">
          {capabilityGroups.map((group) => {
            const Icon = group.icon;
            return (
              <article key={group.title} className="border border-slate-200 bg-white p-6">
                <Icon className="h-6 w-6 text-blue-600" />
                <h3 className="mt-4 text-xl font-black text-slate-950">{group.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{group.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-bold text-slate-700">{skill}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <div id="ai" className="mt-12 border-t border-slate-300 pt-10">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">Applied AI</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">AI used with evidence and guardrails.</h2>
            <p className="mt-3 leading-7 text-slate-600">
              AI accelerates development and investigation. Tested code, reconciled data, clear business rules, and human review remain the final controls.
            </p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {aiCapabilities.map((capability) => (
              <article key={capability.title} className="flex h-full flex-col border border-slate-800 bg-slate-950 p-6 text-white">
                <Sparkles className="h-5 w-5 text-blue-300" />
                <p className="mt-4 text-xs font-black uppercase tracking-[0.15em] text-blue-300">{capability.tools}</p>
                <h3 className="mt-3 text-xl font-black">{capability.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{capability.description}</p>
                <p className="mt-5 border-t border-slate-800 pt-4 text-sm leading-6 text-slate-200"><span className="font-black text-white">Evidence:</span> {capability.evidence}</p>
                {capability.href ? (
                  <a href={capability.href} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center pt-5 text-sm font-black text-blue-300 hover:text-white">
                    View public agent <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CareerFoundationSection() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid items-center gap-6 border-y border-slate-200 py-7 md:grid-cols-[0.3fr_1.7fr]">
          <Image src="/logos/Accenture.svg" alt="Accenture" width={190} height={60} className="h-12 w-auto object-contain" />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Career foundation</p>
            <h2 className="mt-2 text-xl font-black text-slate-950">Business Analysis and SAP MM</h2>
            <p className="mt-2 leading-7 text-slate-600">
              Earlier enterprise consulting experience across requirements, process mapping, UAT, stakeholder coordination, and procure-to-pay workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="bg-white pb-12 pt-4">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-8 bg-slate-950 p-7 text-white sm:p-9 lg:grid-cols-[1.25fr_.75fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-300">Open to mid-level BIE opportunities</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Business Intelligence Engineer</h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-300">
              Interested in roles focused on SQL, cloud data systems, BI delivery, experimentation, financial and operational analytics, and applied AI.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-200">
              <a href="mailto:madhvika.sehgal@gmail.com?subject=Portfolio%20Inquiry%20-%20Madhvika%20Sehgal" className="inline-flex items-center hover:text-white"><Mail className="mr-2 h-4 w-4" />madhvika.sehgal@gmail.com</a>
              <span className="inline-flex items-center"><MapPin className="mr-2 h-4 w-4" />Seattle, WA</span>
              <a href="https://www.linkedin.com/in/madhvika-sehgal/" target="_blank" rel="noreferrer" className="inline-flex items-center hover:text-white"><BriefcaseBusiness className="mr-2 h-4 w-4" />LinkedIn</a>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a href="mailto:madhvika.sehgal@gmail.com?subject=Portfolio%20Inquiry%20-%20Madhvika%20Sehgal" className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3.5 text-sm font-black text-white hover:bg-blue-500"><Mail className="mr-2 h-4 w-4" />Contact</a>
            <a href={resumePdf} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-lg bg-white px-5 py-3.5 text-sm font-black text-slate-950 hover:bg-blue-50"><FileText className="mr-2 h-4 w-4" />Resume PDF</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 [font-family:Inter,Segoe_UI,Arial,sans-serif]">
      <Header />
      <main>
        <HeroSection />
        <ImpactSection />
        <ExperienceSection />
        <IndependentProjectsSection />
        <SkillsAndAiSection />
        <CareerFoundationSection />
        <ContactSection />
      </main>
    </div>
  );
}
