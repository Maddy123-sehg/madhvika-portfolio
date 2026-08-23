import Image from "next/image";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
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

const resumePdf = "/Madhvika-Sehgal-Resume-2026.pdf";

const independentProjects = [
  {
    title: "Retail Medallion Analytics",
    eyebrow: "Analytics engineering · End-to-end build",
    description:
      "A reproducible Bronze-Silver-Gold retail pipeline that turns intentionally imperfect source data into tested, business-ready KPI marts and a Streamlit executive dashboard.",
    outcomes: [
      "23 raw orders → 22 deduplicated Silver records",
      "Four Gold marts with $2,913 revenue fully reconciled",
      "Automated quality tests and GitHub Actions CI",
    ],
    tools: ["Python", "SQL", "DuckDB", "Parquet", "Streamlit"],
    href: "https://github.com/Maddy123-sehg/retail-medallion-analytics",
    accent: "emerald",
  },
  {
    title: "Analytics Investigation Agent",
    eyebrow: "Agentic analytics · Root-cause investigation",
    description:
      "A transparent analytics agent that uses a visible decide-call-observe loop to investigate a revenue decline and produce an evidence-backed business conclusion.",
    outcomes: [
      "Explains a 15.2% daily revenue decline",
      "Identifies Pharmacy as the $12,305 primary driver",
      "Separates value/mix effects from order volume",
    ],
    tools: ["Python", "Agent Design", "KPI Decomposition", "Testing"],
    href: "https://github.com/Maddy123-sehg/analytics-investigation-agent",
    accent: "blue",
  },
];

const amazonProjects = [
  {
    code: "CP",
    title: "Monthly Cost Allocation & Profitability Reporting Framework",
    description:
      "Redesigned a 1,900+ line SQL allocation pipeline using operational drivers and time-clock actuals while preserving general-ledger and P&L reconciliation.",
    tools: ["SQL", "Athena", "Redshift", "Finance Analytics", "Cost Allocation"],
  },
  {
    code: "MEC",
    title: "Workforce Cost Allocation Automation",
    description:
      "Integrated payroll, warehouse metadata, operational flags, and configurable business rules in SQL, replacing manual Excel formulas and saving 7+ hours each month.",
    tools: ["SQL", "Excel Modeling", "Reconciliation", "Cost Centers", "P&L"],
  },
  {
    code: "GOV",
    title: "Data Platform Usage & Governance Dashboard",
    description:
      "Built a governance dashboard from 1M+ monthly audit events; enabled retirement of 14 stale jobs and optimization of the 4 highest-compute jobs.",
    tools: ["SQL", "QuickSight", "Audit Logs", "Governance", "Data Platform"],
  },
  {
    code: "AI",
    title: "AI-Assisted Financial Anomaly Investigation",
    description:
      "Used Claude to generate root-cause hypotheses and validation queries for month-end general-ledger and cost-allocation anomalies, then independently verified results through reconciliation and regression checks, cutting roughly 3 hours per issue.",
    tools: ["Claude", "Kiro", "SQL Debugging", "Documentation", "Analytics Acceleration"],
  },
  {
    code: "DOC",
    title: "Data Migration Quality & Validation Guardrails",
    description:
      "Remediated risk during a primary-key and schema migration by updating 4-5 downstream SQL jobs and adding validation guardrails across 10+ dependent datasets with zero material metric regression.",
    tools: ["Documentation", "Finance Analytics", "Cost Drivers", "Methodology"],
  },
  {
    code: "DQ",
    title: "Analytics On-Call & Root-Cause Operations",
    description:
      "Converted recurring analytics incidents into reusable procedures and an ownership/escalation map, reducing routing and triage overhead by roughly 4 hours per week.",
    tools: ["SQL", "Root Cause", "Reconciliation", "Finance Reporting"],
  },
];

const barclaysProjects = [
  {
    code: "IVR",
    title: "Cloud Contact-Center Analytics Migration",
    description:
      "Reconciled Avaya and Oracle call schemas across AWS S3, Athena, Redshift, and Oracle; restored completeness from 2.5M to 4.5M calls per month for 30+ Tableau dashboards.",
    tools: ["Tableau", "ETL", "Oracle", "AWS", "IVR"],
  },
  {
    code: "CB",
    title: "Callback Feature Revamp & SLA Logic Redesign",
    description:
      "Led a 3-person analytics workstream, redefined service-level KPIs, modified upstream SQL, and validated 45+ dashboards and reports; contributed to 12% higher retention and 8% fewer transfers.",
    tools: ["Tableau", "SLA", "Callback Analytics", "Leadership"],
  },
  {
    code: "AWS",
    title: "Production Routing Experiment & Statistical Validation",
    description:
      "Designed a 2-month production A/B test with 5K control and 5K treatment calls; validated transfer reduction from 40% to 36% and helped eliminate roughly 8K transfers per month.",
    tools: ["A/B Testing", "Hypothesis Testing", "SQL", "Experimentation", "IVR"],
  },
  {
    code: "AI",
    title: "AI-Assisted Metadata & Reporting Summaries",
    description:
      "Engineered a serverless workflow using Python, Lambda, S3, Boto3, Bedrock, and Claude to turn report metadata into lineage, KPI definitions, validation rules, and audit documentation in minutes instead of days.",
    tools: ["Amazon Bedrock", "AWS Lambda", "S3", "Python", "pandas"],
  },
  {
    code: "AB",
    title: "Customer Journey & Agent Performance Analytics",
    description:
      "Reconstructed customer journeys with SQL event sequencing and created a Z-score-normalized agent index combining sentiment, CSAT, and NPS to extend comparable scoring from about 10% to the full agent base.",
    tools: ["A/B Testing", "Z-Score", "CSAT", "NPS", "Tableau"],
  },
];

const accentureProjects = [
  {
    code: "SAP",
    title: "SAP MM / Procure-to-Pay Workflow Support",
    description:
      "Supported requirements, documentation, UAT, and process understanding across enterprise procurement and SAP MM workflows.",
    tools: ["SAP MM", "UAT", "Requirements", "Documentation"],
  },
  {
    code: "BA",
    title: "Business Analysis & Stakeholder Coordination",
    description:
      "Built early foundation in stakeholder communication, process mapping, testing support, and cross-functional enterprise delivery.",
    tools: ["Business Analysis", "Testing", "Documentation", "Stakeholders"],
  },
];

const pipelineFlows = {
  amazon: {
    title: "Amazon Pharmacy Finance Analytics Pipeline",
    subtitle:
      "Mostly ELT: finance and operational data was loaded into analytics platforms first, then transformed, enriched, allocated, and served for reporting.",
    steps: [
      {
        label: "Extract / Load",
        title: "Finance & operational inputs",
        detail:
          "GL costs, operational cost inputs, pharmacy activity data, and source-aligned finance feeds.",
      },
      {
        label: "Staging",
        title: "Source-aligned base tables",
        detail:
          "Cleaned and organized source data into reusable base layers such as finance cost and operational activity tables.",
      },
      {
        label: "Transformation",
        title: "Work-unit driver logic",
        detail:
          "Created business drivers such as fulfillment, billing, customer service, and pharmacy work units used for allocation.",
      },
      {
        label: "Enrichment",
        title: "Business rules & mappings",
        detail:
          "Applied cost-center mappings, account mappings, attribution rules, segment logic, and finance definitions.",
      },
      {
        label: "Allocation",
        title: "MEC cost allocation",
        detail:
          "Distributed operational and finance costs across products, channels, facilities, and reporting segments using driver-based logic.",
      },
      {
        label: "Semantic / Reporting Layer",
        title: "Contribution Profit outputs",
        detail:
          "Prepared trusted reporting-ready tables for Contribution Profit, rate-card logic, reconciliation, and finance review.",
      },
      {
        label: "Consumption",
        title: "Finance dashboards",
        detail:
          "Served final metrics to QuickSight dashboards, month-end reviews, and stakeholder-facing finance reporting.",
      },
    ],
  },
  barclays: {
    title: "Barclays IVR Customer Journey Analytics Pipeline",
    subtitle:
      "Mostly ELT with Tableau Prep/SQL transformations: contact-center data was extracted and loaded, then standardized, modeled, and served into dashboards.",
    steps: [
      {
        label: "Extract / Load",
        title: "Call-center source data",
        detail:
          "Avaya IVR logs, AWS contact-center data, customer interaction records, and servicing outcome data.",
      },
      {
        label: "Staging",
        title: "Raw call records organized",
        detail:
          "Brought call-level data into structured reporting inputs while preserving key identifiers, timestamps, and journey fields.",
      },
      {
        label: "Standardization",
        title: "Deduplication & cleanup",
        detail:
          "Removed duplicate calls across systems, standardized fields, and aligned customer journey records across platforms.",
      },
      {
        label: "Transformation",
        title: "IVR metric logic",
        detail:
          "Built business logic for containment, transfers, self-service, callbacks, SLA performance, and routing outcomes.",
      },
      {
        label: "Enrichment",
        title: "Journey & outcome context",
        detail:
          "Added customer journey context, queue details, agent outcomes, callback indicators, and performance dimensions.",
      },
      {
        label: "Semantic / KPI Layer",
        title: "Operational metric layer",
        detail:
          "Created consistent KPI definitions for dashboards, scorecards, trend reporting, and operational analysis.",
      },
      {
        label: "Consumption",
        title: "Tableau dashboards",
        detail:
          "Delivered metrics into Tableau dashboards used by operations and contact-center stakeholders.",
      },
    ],
  },
};

const toolSections = [
  {
    category: "Data Analytics & BI Core",
    description:
      "How I structure, validate, and productionize business logic into trusted reporting layers.",
    items: [
      {
        tool: "SQL",
        use: "Transformation logic, allocation rules, reconciliation checks, window functions, metric validation, and pipeline debugging.",
      },
      {
        tool: "dbt-style Modeling",
        use: "Applied staging-to-transformation-to-reporting patterns, even when the internal stack did not explicitly use dbt naming.",
      },
      {
        tool: "Airflow-style Orchestration",
        use: "Worked with dependency-based internal scheduling concepts similar to Airflow DAGs, including upstream/downstream job sequencing.",
      },
    ],
  },
  {
    category: "Cloud, BI & Business Analytics",
    description:
      "Tools used to query, validate, model, and present financial, operational, customer, and platform data.",
    items: [
      {
        tool: "AWS Athena / Redshift",
        use: "Querying warehouse and data-lake layers, validating transformed outputs, and supporting reporting pipelines.",
      },
      {
        tool: "QuickSight / Tableau",
        use: "Executive dashboards, KPI design, filters, drilldowns, dashboard performance, and stakeholder-ready reporting.",
      },
      {
        tool: "Experimentation & Journey Analytics",
        use: "A/B testing, hypothesis testing, funnel analysis, event sequencing, KPI design, and customer journey reconstruction.",
      },
    ],
  },
];

const experienceIndex = [
  {
    number: "01",
    title: "Amazon",
    subtitle: "Finance analytics and data platforms",
    summary: "Cost allocation, profitability reporting, governance, data quality, and AI-assisted operations.",
    href: "#amazon",
    metric: "1M+ monthly audit events",
  },
  {
    number: "02",
    title: "Barclays",
    subtitle: "Customer and contact-center analytics",
    summary: "Cloud migration, KPI redesign, experimentation, journey analysis, and GenAI documentation.",
    href: "#barclays",
    metric: "4.5M calls per month",
  },
  {
    number: "03",
    title: "Independent portfolio",
    subtitle: "Public, tested analytics systems",
    summary: "A medallion data pipeline and an analytics investigation agent with inspectable code and CI.",
    href: "#portfolio",
    metric: "2 working GitHub projects",
  },
  {
    number: "04",
    title: "AI engineering",
    subtitle: "Coding, agents, and automation",
    summary: "ChatGPT/Codex, Claude Code, Bedrock, Python automation, tool use, and validation workflows.",
    href: "#ai",
    metric: "Code + agents + workflows",
  },
];

const aiCapabilities = [
  {
    title: "AI-assisted software development",
    tools: "ChatGPT / Codex · Claude Code · Kiro",
    detail:
      "Build and improve Python, SQL, and web projects; inspect repositories; debug failures; write tests; document systems; and verify changes through builds and browser checks.",
  },
  {
    title: "Agentic analytics",
    tools: "Tool calling · Decision loops · Guardrails",
    detail:
      "Designed a public analytics investigation agent that chooses analysis tools, observes results, decomposes KPI movement, and produces an evidence-backed conclusion.",
    href: "https://github.com/Maddy123-sehg/analytics-investigation-agent",
  },
  {
    title: "Enterprise GenAI workflows",
    tools: "Amazon Bedrock · Claude · AWS Lambda · S3",
    detail:
      "Built serverless workflows that turn reporting metadata into lineage, KPI definitions, validation rules, audit documentation, and structured business summaries.",
  },
  {
    title: "AI-supported analytics operations",
    tools: "SQL investigation · Python · pandas · SOP automation",
    detail:
      "Use AI to generate hypotheses, targeted validation queries, documentation drafts, and incident playbooks, then independently verify every result through reconciliation and regression checks.",
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
          <p className="mt-1 text-sm text-slate-500">Business intelligence · Analytics engineering · Decision systems</p>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 lg:flex">
          <a href="#top" className="border-b-2 border-blue-600 pb-2 text-blue-600">
            Home
          </a>
          <a href="#start" className="hover:text-blue-600">
            Start here
          </a>
          <a href="#portfolio" className="hover:text-blue-600">
            Portfolio
          </a>
          <a href="#amazon" className="hover:text-blue-600">
            Amazon
          </a>
          <a href="#barclays" className="hover:text-blue-600">
            Barclays
          </a>
          <a href="#ai" className="hover:text-blue-600">
            AI
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
          Business Intelligence · Analytics Engineering · Decision Support · Applied AI
        </div>

        <h1 className="mt-7 text-5xl font-black leading-[1.03] tracking-tight text-slate-950 md:text-7xl">
          I turn complex business data into trusted decisions for{" "}
          <span className="text-blue-600">leaders, operators, and customer teams.</span>
        </h1>

        <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">
          Across pharmacy, contact centers, finance, workforce, product, and data platforms,
          I build reliable datasets, KPIs, dashboards, experiments, and automation.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#start"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
          >
            Explore projects <ArrowRight className="ml-2 h-4 w-4" />
          </a>

          <a
            href="#ai"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-4 text-base font-bold text-slate-900 hover:bg-slate-50"
          >
            <Bot className="mr-2 h-4 w-4" />
            AI capabilities
          </a>

          <a
            href={resumePdf}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-4 text-base font-bold text-slate-900 hover:bg-slate-50"
          >
            <FileText className="mr-2 h-4 w-4" />
            Resume PDF
          </a>

          <a
            href="https://github.com/Maddy123-sehg"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-4 text-base font-bold text-slate-900 hover:bg-slate-50"
          >
            <GitBranch className="mr-2 h-4 w-4" />
            GitHub Portfolio
          </a>
        </div>
      </div>

      <div>
        <LogoGrid />
        <PortfolioSnapshot />
      </div>
    </section>
  );
}

function ExperienceIndexSection() {
  return (
    <section id="start" className="border-y border-slate-200 bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-600">
              Portfolio overview
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              Explore my work.
            </h2>
          </div>
          <p className="max-w-3xl leading-7 text-slate-600">
            Browse by company, independent project, or applied AI. Each section highlights
            the work, tools, and outcomes, with optional pipeline details.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {experienceIndex.map((item) => (
            <a
              key={item.number}
              href={item.href}
              className="group flex h-full flex-col rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-blue-600">{item.number}</span>
                <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600" />
              </div>
              <h3 className="mt-5 text-xl font-black text-slate-950">{item.title}</h3>
              <p className="mt-1 text-sm font-bold text-blue-700">{item.subtitle}</p>
              <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{item.summary}</p>
              <p className="mt-5 border-t border-slate-100 pt-4 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                {item.metric}
              </p>
            </a>
          ))}
        </div>
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

function IndependentPortfolioSection() {
  return (
    <section id="portfolio" className="border-y border-slate-200 bg-slate-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-300">
              Independent proof of work
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              Working systems recruiters can inspect.
            </h2>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-slate-300">
            These public projects complement my enterprise experience with reproducible code,
            documented business logic, quantified findings, and passing automated tests.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {independentProjects.map((project) => {
            const isEmerald = project.accent === "emerald";
            return (
              <article
                key={project.title}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl backdrop-blur transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.09]"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className={`text-xs font-black uppercase tracking-[0.22em] ${isEmerald ? "text-emerald-300" : "text-blue-300"}`}>
                      {project.eyebrow}
                    </p>
                    <h3 className="mt-3 text-2xl font-black">{project.title}</h3>
                  </div>
                  <div className={`rounded-2xl p-3 ${isEmerald ? "bg-emerald-400/15 text-emerald-300" : "bg-blue-400/15 text-blue-300"}`}>
                    <GitBranch className="h-6 w-6" />
                  </div>
                </div>

                <p className="mt-5 leading-7 text-slate-300">{project.description}</p>

                <div className="mt-6 space-y-3">
                  {project.outcomes.map((outcome) => (
                    <div key={outcome} className="flex gap-3 text-sm leading-6 text-slate-200">
                      <ShieldCheck className={`mt-0.5 h-5 w-5 shrink-0 ${isEmerald ? "text-emerald-300" : "text-blue-300"}`} />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="rounded-lg border border-white/10 bg-white/[0.07] px-3 py-1.5 text-xs font-semibold text-slate-200">
                      {tool}
                    </span>
                  ))}
                </div>

                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex items-center gap-2 font-black text-white hover:underline"
                >
                  View code and test results <ExternalLink className="h-4 w-4" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PipelineCard({
  flow,
  theme,
}: {
  flow: {
    title: string;
    subtitle: string;
    steps: {
      label: string;
      title: string;
      detail: string;
    }[];
  };
  theme: "orange" | "sky";
}) {
  const buttonClasses =
    theme === "orange"
      ? "border-orange-200 bg-orange-50 text-orange-800 hover:bg-orange-100"
      : "border-sky-200 bg-sky-50 text-sky-800 hover:bg-sky-100";

  const panelClasses =
    theme === "orange"
      ? "border-orange-200 bg-gradient-to-br from-orange-50 via-white to-teal-50"
      : "border-sky-200 bg-gradient-to-br from-sky-50 via-white to-blue-50";

  const badgeClasses =
    theme === "orange"
      ? "border-orange-200 bg-orange-100 text-orange-800"
      : "border-sky-200 bg-sky-100 text-sky-800";

  const iconClasses = theme === "orange" ? "bg-orange-600" : "bg-sky-600";

  return (
    <details className="group mt-6">
      <summary
        className={`inline-flex cursor-pointer list-none items-center gap-3 rounded-xl border px-5 py-3 text-sm font-black shadow-sm transition ${buttonClasses}`}
      >
        <Workflow className="h-5 w-5" />
        View ELT pipeline flow
        <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
      </summary>

      <div className={`mt-5 rounded-[2rem] border p-6 shadow-sm ${panelClasses}`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white ${iconClasses}`}
            >
              <Workflow className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500">
                Pipeline view
              </p>
              <h3 className="mt-1 text-xl font-black text-slate-950">{flow.title}</h3>
              <p className="mt-1 max-w-4xl text-sm leading-6 text-slate-600">
                {flow.subtitle}
              </p>
            </div>
          </div>

          <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${badgeClasses}`}>
            ELT-style analytics pipeline
          </span>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-7">
          {flow.steps.map((step, index) => (
            <div
              key={`${step.label}-${step.title}`}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">
                  {index + 1}
                </div>

                <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">
                  {step.label}
                </span>
              </div>

              <h4 className="text-sm font-black leading-5 text-slate-950">{step.title}</h4>
              <p className="mt-2 text-xs leading-5 text-slate-600">{step.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm leading-6 text-slate-600">
          <span className="font-black text-slate-950">How to read this:</span>{" "}
          Extract/Load brings data into the analytics environment, staging organizes it,
          transformation applies repeatable logic, enrichment adds business context, and
          the semantic/reporting layer makes the data usable for dashboards and decisions.
        </div>
      </div>
    </details>
  );
}

function CompanyProjectSection({
  id,
  company,
  logo,
  eyebrow,
  title,
  description,
  projects,
  theme,
  pipeline,
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
  theme: "orange" | "sky" | "purple";
  pipeline?: {
  title: string;
  subtitle: string;
  steps: {
    label: string;
    title: string;
    detail: string;
  }[];
};
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
    purple: {
      section: "bg-gradient-to-br from-purple-50 via-white to-slate-50 border-purple-100",
      pill: "bg-purple-100 text-purple-800 border-purple-200",
      bar: "from-purple-400 to-slate-600",
      icon: "bg-purple-600 text-white",
      tag: "bg-purple-50 text-purple-800 border-purple-100",
    },
  };

  const t = themes[theme];

  return (
    <section id={id} className={`border-y py-16 ${t.section}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <div className="mb-4 flex h-16 items-center">
            <Image
              src={logo}
              alt={`${company} logo`}
              width={260}
              height={80}
              className={
                company === "Barclays"
                  ? "h-16 w-auto object-contain"
                  : company === "Amazon"
                  ? "h-14 w-auto object-contain"
                  : "h-12 w-auto object-contain"
              }
            />
          </div>

          <p className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] ${t.pill}`}>
            {eyebrow}
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            {title}
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">{description}</p>

          {pipeline && theme !== "purple" && (
            <PipelineCard flow={pipeline} theme={theme === "orange" ? "orange" : "sky"} />
          )}
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
  return (
    <section id="skills" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-600">
            Analytics toolkit
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            Core business intelligence and analytics capabilities.
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            I use these capabilities to turn complex business rules into reliable data models,
            decision-ready dashboards, and measurable operational insights across domains.
          </p>
        </div>

        <div className="space-y-8">
          {toolSections.map((section) => (
            <div
              key={section.category}
              className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 p-6 shadow-sm"
            >
              <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-600">
                    {section.category}
                  </p>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {section.items.map((item) => {
                  return (
                    <div
                      key={item.tool}
                      className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-[2.5rem] bg-slate-100 opacity-70" />

                      <div className="relative">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-xs font-black text-white">
                            BI
                          </div>
                        </div>

                        <h3 className="text-lg font-black text-slate-950">{item.tool}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{item.use}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AiCapabilitiesSection() {
  return (
    <section id="ai" className="bg-slate-950 py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-300">
              Applied AI
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              AI skills applied to real analytics work.
            </h2>
          </div>
          <p className="max-w-3xl leading-7 text-slate-300">
            I use AI to accelerate development, investigation, and documentation. The work
            remains grounded in tested code, reconciled data, clear business rules, and human review.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {aiCapabilities.map((capability) => (
            <article key={capability.title} className="rounded-[1.5rem] border border-slate-700 bg-slate-900 p-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300">
                {capability.tools}
              </p>
              <h3 className="mt-3 text-xl font-black">{capability.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{capability.detail}</p>
              {capability.href && (
                <a
                  href={capability.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-300 hover:text-white"
                >
                  View public agent <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </article>
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
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-300">
                Open to data analytics and business intelligence roles
              </p>

              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                Business Intelligence Engineer | Data Analyst
              </h2>

              <p className="mt-4 max-w-3xl leading-7 text-slate-300">
                Best fit: roles where SQL-heavy data modeling, BI systems, finance or
                operations logic, AI-assisted analysis, and stakeholder-ready storytelling
                come together.
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

            <div className="grid w-full gap-3 sm:w-auto sm:grid-cols-2">
              <a
                href="mailto:madhvika.sehgal@gmail.com?subject=Portfolio%20Inquiry%20-%20Madhvika%20Sehgal"
                className="group inline-flex min-w-[190px] items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-black text-slate-950 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:bg-blue-50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Mail className="h-5 w-5" />
                </span>
                Contact Me
              </a>

              <a
                href={resumePdf}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-w-[190px] items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-black text-slate-950 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:bg-blue-50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                  <FileText className="h-5 w-5" />
                </span>
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
        <ExperienceIndexSection />
        <IndependentPortfolioSection />

        <CompanyProjectSection
          id="amazon"
          company="Amazon"
          logo="/logos/Amazon.png"
          eyebrow="Pharmacy Finance · Cost Allocation · Profitability Reporting"
          title="Business Intelligence Engineer | Amazon Health - Pharmacy Finance & Analytics"
          description="Finance analytics and data-platform work spanning operational cost allocation, profitability reporting, workforce automation, schema-migration quality, platform governance, and AI-assisted anomaly investigation. Aug 2025 - Present."
          projects={amazonProjects}
          theme="orange"
          pipeline={pipelineFlows.amazon}
        />

        <CompanyProjectSection
          id="barclays"
          company="Barclays"
          logo="/logos/Barclays.svg"
          eyebrow="Fintech · IVR · Contact Center Analytics"
          title="Business Intelligence Analyst | Barclays - Credit Card & Contact Center Analytics"
          description="Analytics engineering and decision-support work across cloud contact-center migration, customer journeys, callback operations, KPI redesign, production experimentation, GenAI documentation, and agent-performance scoring. Jan 2021 - Jul 2025."
          projects={barclaysProjects}
          theme="sky"
          pipeline={pipelineFlows.barclays}
        />

        <CompanyProjectSection
          id="accenture"
          company="Accenture"
          logo="/logos/Accenture.svg"
          eyebrow="Earlier Foundation · Consulting · SAP · UAT"
          title="Accenture Projects"
          description="Enterprise consulting foundation across stakeholder communication, requirements gathering, documentation, UAT support, SAP MM / procure-to-pay workflows, and cross-functional delivery."
          projects={accentureProjects}
          theme="purple"
        />

        <ToolDepthSection />
        <AiCapabilitiesSection />
        <ContactSection />
      </main>
    </div>
  );
}
