import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowDown,
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
  challenge: string;
  built: string;
  impact: string;
  tools: string[];
  ai?: boolean;
};

type PipelineStep = {
  label: string;
  title: string;
  detail: string;
};

type PipelineFlow = {
  title: string;
  subtitle: string;
  theme: "orange" | "sky";
  steps: PipelineStep[];
};

const portfolioIndexItems = [
  { number: "01", title: "Amazon projects", summary: "Finance systems, automation, and governance", href: "#amazon" },
  { number: "02", title: "Barclays projects", summary: "Cloud migration, experiments, and customer analytics", href: "#barclays" },
  { number: "03", title: "Accenture work", summary: "Business analysis, SAP, and enterprise delivery", href: "#accenture" },
  { number: "04", title: "AI projects", summary: "Agentic analytics and generative AI workflows", href: "#ai", ai: true },
  { number: "05", title: "Personal projects", summary: "Public pipelines, dashboards, and tested code", href: "#projects" },
  { number: "06", title: "Skills overview", summary: "SQL, cloud engineering, BI, and decision methods", href: "#skills" },
];

const amazonProjects: ExperienceProject[] = [
  {
    category: "Finance systems",
    title: "Cost Allocation and Profitability Platform",
    challenge:
      "Rapid site growth made legacy allocation logic difficult to explain and reconcile.",
    built:
      "Redesigned a 1,900+ line SQL framework with operational drivers, time-clock actuals, and general-ledger controls.",
    impact:
      "Improved explainability of cost-to-fill reporting and supported operational growth from 4 to 38 sites.",
    tools: ["SQL", "Athena", "Redshift"],
  },
  {
    category: "Analytics automation",
    title: "Workforce Allocation Automation",
    challenge:
      "Monthly labor allocation depended on repetitive Excel formulas across disconnected sources.",
    built:
      "Integrated payroll, warehouse metadata, operational flags, and configurable business rules into a repeatable SQL workflow.",
    impact:
      "Replaced manual Excel formulas and saved more than 7 hours during each monthly reporting cycle.",
    tools: ["SQL", "Data Quality", "Reconciliation"],
  },
  {
    category: "Platform analytics",
    title: "Data Governance and Adoption Dashboard",
    challenge:
      "More than 1 million monthly audit events obscured which data assets were useful, stale, or expensive.",
    built:
      "Classified activity by dataset, user, and tool and surfaced priorities in a QuickSight governance dashboard.",
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
    challenge:
      "A contact-center migration left gaps between legacy and cloud call records used by more than 30 dashboards.",
    built:
      "Reconciled Avaya and Oracle schemas across S3, Athena, Redshift, and Oracle and standardized containment and self-service metrics.",
    impact:
      "Restored completeness from 2.5 million to 4.5 million monthly calls for more than 30 Tableau dashboards.",
    tools: ["AWS", "SQL", "Tableau"],
  },
  {
    category: "KPI design and experimentation",
    title: "Callback Analytics and Routing Experiment",
    challenge:
      "Legacy service-level logic and routing rules limited comparable journey and agent insights.",
    built:
      "Built a normalized agent-performance metric from scratch using sentiment, customer satisfaction, and Net Promoter Score, extending comparable scoring to the full agent base; also redesigned service-level logic and led a production A/B test.",
    impact:
      "Validated 45+ reports, contributed to 12% higher retention and 8% fewer transfers, and helped eliminate roughly 8,000 transfers per month.",
    tools: ["Experimentation", "SQL", "Tableau"],
  },
  {
    category: "Enterprise generative AI",
    title: "AI-Assisted Reporting Documentation",
    challenge:
      "Report lineage, metric definitions, and audit documentation took days to assemble manually.",
    built:
      "Created a serverless workflow that transformed report metadata into lineage, definitions, validation rules, and audit documentation.",
    impact:
      "Reduced a days-long documentation process to minutes while preserving structured review and validation.",
    tools: ["Bedrock", "Lambda", "Python"],
    ai: true,
  },
];

const barclaysAdditional = [
  "Reconstructed customer journeys with SQL event sequencing across interactive voice response, queue, callback, and servicing outcomes.",
];

const accentureWork = [
  {
    title: "Business analysis",
    description: "Gathered requirements, mapped business processes, maintained documentation, and coordinated decisions across technical and business stakeholders.",
  },
  {
    title: "SAP materials management",
    description: "Supported procure-to-pay, purchasing, inventory, and master-data workflows within an enterprise SAP environment.",
  },
  {
    title: "Testing and delivery",
    description: "Supported user acceptance testing, defect triage, release readiness, and cross-functional delivery across enterprise workstreams.",
  },
];

const pipelineFlows = {
  amazon: {
    title: "Amazon Pharmacy Finance Analytics Pipeline",
    subtitle: "Mostly ELT: finance and operational data was loaded into analytics platforms first, then transformed, enriched, allocated, and served for reporting.",
    theme: "orange",
    steps: [
      {
        label: "Extract / Load",
        title: "Finance & operational inputs",
        detail: "GL costs, operational cost inputs, pharmacy activity data, and source-aligned finance feeds.",
      },
      {
        label: "Staging",
        title: "Source-aligned base tables",
        detail: "Cleaned and organized source data into reusable base layers such as finance cost and operational activity tables.",
      },
      {
        label: "Transformation",
        title: "Work-unit driver logic",
        detail: "Created business drivers such as fulfillment, billing, customer service, and pharmacy work units used for allocation.",
      },
      {
        label: "Enrichment",
        title: "Business rules & mappings",
        detail: "Applied cost-center mappings, account mappings, attribution rules, segment logic, and finance definitions.",
      },
      {
        label: "Allocation",
        title: "MEC cost allocation",
        detail: "Distributed operational and finance costs across products, channels, facilities, and reporting segments using driver-based logic.",
      },
      {
        label: "Semantic / Reporting Layer",
        title: "Contribution Profit outputs",
        detail: "Prepared trusted reporting-ready tables for Contribution Profit, rate-card logic, reconciliation, and finance review.",
      },
      {
        label: "Consumption",
        title: "Finance dashboards",
        detail: "Served final metrics to QuickSight dashboards, month-end reviews, and stakeholder-facing finance reporting.",
      },
    ],
  },
  barclays: {
    title: "Barclays IVR Customer Journey Analytics Pipeline",
    subtitle: "Mostly ELT with Tableau Prep and SQL transformations: contact-center data was extracted and loaded, then standardized, modeled, and served into dashboards.",
    theme: "sky",
    steps: [
      {
        label: "Extract / Load",
        title: "Call-center source data",
        detail: "Avaya IVR logs, AWS contact-center data, customer interaction records, and servicing outcome data.",
      },
      {
        label: "Staging",
        title: "Raw call records organized",
        detail: "Brought call-level data into structured reporting inputs while preserving key identifiers, timestamps, and journey fields.",
      },
      {
        label: "Standardization",
        title: "Deduplication & cleanup",
        detail: "Removed duplicate calls across systems, standardized fields, and aligned customer journey records across platforms.",
      },
      {
        label: "Transformation",
        title: "IVR metric logic",
        detail: "Built business logic for containment, transfers, self-service, callbacks, SLA performance, and routing outcomes.",
      },
      {
        label: "Enrichment",
        title: "Journey & outcome context",
        detail: "Added customer journey context, queue details, agent outcomes, callback indicators, and performance dimensions.",
      },
      {
        label: "Semantic / KPI Layer",
        title: "Operational metric layer",
        detail: "Created consistent KPI definitions for dashboards, scorecards, trend reporting, and operational analysis.",
      },
      {
        label: "Consumption",
        title: "Tableau dashboards",
        detail: "Delivered metrics into Tableau dashboards used by operations and contact-center stakeholders.",
      },
    ],
  },
} satisfies Record<string, PipelineFlow>;

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
    skills: ["AWS", "Athena", "Redshift", "S3 and Lambda", "Python and pandas", "Workflow Orchestration", "Data Quality", "Git"],
  },
  {
    title: "Analytics and Decisions",
    description: "Methods that connect business questions to measurable recommendations.",
    icon: BarChart3,
    skills: ["KPI Development", "Composite Metric Design", "A/B Testing", "Hypothesis Testing", "Funnel Analysis", "Customer Journeys", "Reconciliation", "Governance", "Stakeholder Storytelling"],
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
    title: "Enterprise Generative AI Workflows",
    tools: "Amazon Bedrock · Claude · Lambda · S3",
    description:
      "Transform reporting metadata into lineage, KPI definitions, validation rules, audit documentation, and structured summaries.",
    evidence: "Reduced a days-long reporting-documentation workflow to minutes.",
  },
];

function CompanyLogo({ src, alt, priority = false, compact = false }: { src: string; alt: string; priority?: boolean; compact?: boolean }) {
  const needsArtworkCrop = alt === "Barclays";

  return (
    <div className="relative h-14 w-full max-w-56 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="224px"
        priority={priority}
        className={`object-contain ${needsArtworkCrop ? (compact ? "scale-[1.55] sm:scale-[3]" : "scale-[3]") : ""}`}
      />
    </div>
  );
}

function AiMark({ className = "text-blue-500" }: { className?: string }) {
  return <Sparkles aria-hidden="true" className={`h-3.5 w-3.5 shrink-0 ${className}`} />;
}

function AiPhrase({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center gap-1 whitespace-nowrap font-semibold text-slate-700"><AiMark />{children}</span>;
}

function Header() {
  const links = [
    { label: "Index", href: "#index" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills & AI", href: "#skills", ai: true },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-6">
        <a href="#top" className="min-w-0 max-w-2xl pr-2">
          <span className="block text-xl font-black tracking-tight text-slate-950 sm:text-2xl">Madhvika Sehgal</span>
          <span className="mt-1 block text-[11px] font-black tracking-[0.06em] text-slate-700 sm:text-xs">
            DAGs <span className="text-blue-600">·</span> DataFrames <span className="text-blue-600">·</span> Dashboards
          </span>
          <span className="mt-0.5 block text-[10px] leading-4 text-slate-500 sm:text-[11px]">
            Business Intelligence and Analytics · Applied AI
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-700 xl:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="inline-flex items-center gap-1 transition hover:text-blue-600">
              {link.ai ? <AiMark /> : null}{link.label}
            </a>
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
          I turn complex data into <span className="text-blue-600">trusted metrics and scalable analytics</span> that teams can act on.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Business Intelligence Engineer with 4+ years across Amazon, Barclays, and Accenture, combining SQL, cloud data modeling, dashboards, experimentation, and <AiPhrase>applied AI</AiPhrase> to solve financial, operational, and customer problems.
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
          <div className="grid grid-cols-3 divide-x divide-slate-200">
            <div className="flex h-20 items-center justify-center px-2 sm:px-4">
              <CompanyLogo src="/logos/Amazon.svg" alt="Amazon" priority compact />
            </div>
            <div className="flex h-20 items-center justify-center px-2 sm:px-4">
              <CompanyLogo src="/logos/Barclays.svg" alt="Barclays" priority compact />
            </div>
            <div className="flex h-20 items-center justify-center px-2 sm:px-4">
              <CompanyLogo src="/logos/Accenture.svg" alt="Accenture" priority compact />
            </div>
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

function PortfolioIndexSection() {
  return (
    <section id="index" className="bg-slate-950 py-12 text-white" aria-labelledby="index-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-300">Portfolio index</p>
            <h2 id="index-title" className="mt-2 text-3xl font-black tracking-tight text-white">Explore the work.</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-300">Jump to a section or continue scrolling for the complete story.</p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden border border-slate-700 bg-slate-700 sm:grid-cols-3 xl:grid-cols-6">
          {portfolioIndexItems.map((item) => (
            <a key={item.href} href={item.href} className="group flex min-h-44 flex-col bg-slate-900 p-4 transition hover:bg-slate-800 sm:p-5">
              <span className="text-xs font-black text-blue-300">{item.number}</span>
              <h3 className="mt-5 flex items-center gap-1.5 text-base font-black text-white group-hover:text-blue-200">
                {item.ai ? <AiMark className="text-blue-300" /> : null}{item.title}
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-400">{item.summary}</p>
              <ArrowRight className="mt-auto h-5 w-5 text-blue-300 transition group-hover:translate-x-0.5 group-hover:text-white" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, description, ai = false }: { eyebrow: string; title: string; description: ReactNode; ai?: boolean }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
      <div>
        <p className="flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.22em] text-blue-600">
          {ai ? <AiMark /> : null}{eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      </div>
      <p className="max-w-3xl leading-7 text-slate-600">{description}</p>
    </div>
  );
}

function ExperienceProjectCard({ project }: { project: ExperienceProject }) {
  return (
    <article className="flex h-full flex-col border-t-2 border-blue-600 bg-white p-6 ring-1 ring-slate-200">
      <p className="flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.16em] text-blue-600">
        {project.ai ? <AiMark /> : null}{project.category}
      </p>
      <h3 className="mt-3 text-xl font-black leading-snug text-slate-950">{project.title}</h3>
      <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
        <p><span className="font-black text-slate-800">Challenge:</span> {project.challenge}</p>
        <p><span className="font-black text-slate-800">Built:</span> {project.built}</p>
      </div>
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

function PipelineDetails({ flow }: { flow: PipelineFlow }) {
  const theme = flow.theme === "orange"
    ? {
        summary: "border-orange-200 bg-orange-50 text-orange-950 hover:bg-orange-100",
        panel: "border-orange-200 bg-gradient-to-br from-orange-50 via-white to-amber-50",
        accent: "bg-orange-500",
        label: "text-orange-700",
        arrow: "text-orange-400",
      }
    : {
        summary: "border-sky-200 bg-sky-50 text-sky-950 hover:bg-sky-100",
        panel: "border-sky-200 bg-gradient-to-br from-sky-50 via-white to-blue-50",
        accent: "bg-sky-600",
        label: "text-sky-700",
        arrow: "text-sky-400",
      };

  return (
    <details className="group mt-8 border-t border-slate-200 pt-7">
      <summary className={`flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl border px-4 py-3.5 transition sm:px-5 [&::-webkit-details-marker]:hidden ${theme.summary}`}>
        <span className="flex min-w-0 items-center gap-3">
          <Workflow className="h-5 w-5 shrink-0" />
          <span className="text-sm font-black sm:text-base">View detailed analytics pipeline</span>
          <span className="hidden rounded-full bg-white/80 px-2.5 py-1 text-xs font-black sm:inline">7 stages</span>
        </span>
        <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
      </summary>

      <div className={`mt-4 rounded-2xl border p-4 sm:p-6 ${theme.panel}`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">{flow.title}</h3>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">{flow.subtitle}</p>
          </div>
          <span className="w-fit shrink-0 rounded-full border border-white bg-white/90 px-3 py-1.5 text-xs font-black text-slate-600 shadow-sm">7-stage ELT flow</span>
        </div>

        <div className="mt-6 flex flex-col xl:flex-row xl:items-stretch">
          {flow.steps.map((step, index) => (
            <div key={step.title} className="contents">
              <article className="min-w-0 flex-1 rounded-xl border border-white bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
                <div className="flex min-h-14 items-start gap-2 border-b border-slate-100 pb-3">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-black tracking-tight text-white ${theme.accent}`} aria-label={`Stage ${index + 1}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={`min-w-0 pt-0.5 text-[9px] font-black uppercase leading-4 tracking-[0.06em] ${theme.label}`}>{step.label}</span>
                </div>
                <h4 className="mt-4 text-sm font-black leading-5 text-slate-950 xl:min-h-[3.75rem]">{step.title}</h4>
                <p className="mt-2 text-xs leading-5 text-slate-600">{step.detail}</p>
              </article>
              {index < flow.steps.length - 1 ? (
                <div className={`flex shrink-0 items-center justify-center py-2 xl:px-1.5 xl:py-0 ${theme.arrow}`} aria-hidden="true">
                  <ArrowDown className="h-5 w-5 xl:hidden" />
                  <ArrowRight className="hidden h-5 w-5 xl:block" />
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <p className="mt-6 rounded-xl border border-white bg-white/80 p-4 text-xs leading-5 text-slate-600 shadow-sm sm:text-sm sm:leading-6">
          <span className="font-black text-slate-800">How to read this:</span> Extract and load brings data into the analytics environment, staging organizes it, transformation applies repeatable logic, enrichment adds business context, and the semantic and reporting layers make the data usable for dashboards and decisions.
        </p>
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
  summary: ReactNode;
  projects: ExperienceProject[];
  additional: string[];
  pipeline: PipelineFlow;
  background?: "white" | "slate";
}) {
  return (
    <section id={id} className={`py-14 lg:py-16 ${background === "slate" ? "bg-slate-50" : "bg-white"}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-col gap-6 border-b border-slate-200 pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <CompanyLogo src={logo} alt={logoAlt} />
            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{role}</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">{summary}</p>
          </div>
          <p className="shrink-0 text-sm font-black text-slate-500">{dates}</p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {projects.map((project) => <ExperienceProjectCard key={project.title} project={project} />)}
        </div>
        <PipelineDetails flow={pipeline} />
        <div className="mt-5"><AdditionalContributions items={additional} /></div>
      </div>
    </section>
  );
}

function AccentureExperienceSection() {
  return (
    <section id="accenture" className="bg-white py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="border-b border-slate-200 pb-7">
          <CompanyLogo src="/logos/Accenture.svg" alt="Accenture" />
          <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-blue-600">Earlier professional experience</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Business Analyst · SAP Materials Management</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Enterprise consulting experience across requirements, process design, testing, stakeholder coordination, and procure-to-pay operations.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {accentureWork.map((item, index) => (
            <article key={item.title} className="border-t-2 border-violet-500 bg-slate-50 p-6 ring-1 ring-slate-200">
              <p className="text-xs font-black text-violet-700">0{index + 1}</p>
              <h3 className="mt-4 text-xl font-black text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <div id="experience">
      <section className="border-y border-blue-100 bg-blue-50 py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionIntro
            eyebrow="Professional experience"
            title="Experience across Amazon, Barclays, and Accenture."
            description="Selected work spanning financial reporting, data platforms, cloud migration, customer analytics, experimentation, and AI-assisted operations. Each example connects technical delivery to a measurable business result."
          />
        </div>
      </section>
      <CompanyExperience
        id="amazon"
        logo="/logos/Amazon.svg"
        logoAlt="Amazon"
        role="Business Intelligence Engineer · Pharmacy Finance & Analytics"
        dates="Aug 2025 - Present"
        summary={<>Finance and data-platform work across profitability reporting, allocation automation, governance, data quality, and <AiPhrase>AI-assisted investigation</AiPhrase>.</>}
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
        summary={<>Analytics engineering and decision support across cloud migration, KPI design, experimentation, customer journeys, and <AiPhrase>enterprise generative AI workflows</AiPhrase>.</>}
        projects={barclaysProjects}
        additional={barclaysAdditional}
        pipeline={pipelineFlows.barclays}
        background="slate"
      />
      <AccentureExperienceSection />
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
            <div className="relative aspect-[2.5/1] overflow-hidden border-b border-slate-200 bg-white">
              <Image
                src="/retail-dashboard.png?preview=2"
                alt="Retail Sales Performance dashboard with monthly and regional revenue charts"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
                className="origin-top-left scale-[1.67] object-cover object-left-top"
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
              <p className="flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.18em] text-blue-300"><AiMark className="text-blue-300" />Agentic analytics</p>
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
          ai
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
            <p className="flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.22em] text-blue-600"><AiMark />Applied AI</p>
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

function ContactSection() {
  return (
    <section id="contact" className="bg-white pb-12 pt-4">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-8 bg-slate-950 p-7 text-white sm:p-9 lg:grid-cols-[1.25fr_.75fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-300">Open to mid-level business intelligence opportunities</p>
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
        <PortfolioIndexSection />
        <ExperienceSection />
        <IndependentProjectsSection />
        <SkillsAndAiSection />
        <ContactSection />
      </main>
    </div>
  );
}
