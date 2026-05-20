"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Cloud,
  Database,
  Download,
  ExternalLink,
  FileText,
  Layers3,
  LineChart,
  Mail,
  MapPin,
  Sparkles,
  X,
  CalendarDays,
  Workflow,
  Eye,
  GitBranch,
  Network,
} from "lucide-react";

const resumeUrl = "/Madhvika-Sehgal-Resume-2026.pdf";
const emailUrl =
  "mailto:madhvika.sehgal@gmail.com?subject=Portfolio%20Inquiry%20-%20Madhvika%20Sehgal";
const linkedInUrl = "https://www.linkedin.com/in/madhvika-sehgal/";

// IMPORTANT: these paths must match the exact filenames in public/logos.
// Based on your Windows folder screenshot, these are the correct names.
const logos = {
  amazon: "/logos/Amazon.png",
  barclays: "/logos/Barclays.svg",
  accenture: "/logos/Accenture.webp",
  eller: "/logos/Eller.png",
};

type Theme = "amazon" | "barclays" | "accenture";
type PipelineKey = "amazonMec" | "barclaysIvr";

type Project = {
  company: string;
  theme: Theme;
  title: string;
  subtitle: string;
  text: string;
  problem: string;
  complexity: string[];
  actions: string[];
  impact: string[];
  tags: string[];
  icon: string;
  pipeline?: PipelineKey;
};

const metrics = [
  { value: "1,900+", label: "line finance SQL pipeline", icon: Database },
  { value: "1M+", label: "monthly audit log events", icon: CalendarDays },
  { value: "45+", label: "dashboards and reports enhanced", icon: BarChart3 },
  { value: "5M+", label: "IVR interactions analyzed", icon: LineChart },
];

const pipelineDefinitions: Record<PipelineKey, string[]> = {
  amazonMec: [
    "Finance + ops inputs",
    "Work-unit derivation",
    "Cost center mapping",
    "MEC allocation logic",
    "Rate cards + adjustments",
    "Contribution Profit",
    "Finance review layer",
  ],
  barclaysIvr: [
    "Oracle + AWS sources",
    "IVR / call logs",
    "ETL + Tableau Prep",
    "Unified KPI layer",
    "SLA + funnel metrics",
    "Tableau dashboards",
    "Ops decision layer",
  ],
};

const projects: Project[] = [
  {
    company: "Amazon Pharmacy",
    theme: "amazon",
    title: "MEC Cost Allocation & Contribution Profit Framework",
    subtitle:
      "Core Pharmacy Finance allocation engine supporting Contribution Profit reporting",
    text: "Led analysis, debugging, enhancement, and validation of a 1,900+ line SQL-based cost allocation pipeline powering Pharmacy Finance reporting.",
    problem:
      "Pharmacy Finance needed reliable allocation of fulfillment, customer service, pharmacist, billing, and operational costs into Contribution Profit reporting during month-end close.",
    complexity: [
      "Pipeline logic spanned finance facts, operational work units, cost centers, warehouse mappings, manual inputs, and downstream CP reporting.",
      "Small mapping, sign, or allocation-driver issues could materially change P&L interpretation.",
      "Multiple stakeholders needed both SQL-level accuracy and business-readable explanations.",
    ],
    actions: [
      "Analyzed and validated staged SQL transformations across allocation drivers and downstream finance outputs.",
      "Debugged discrepancies across QuickSight, Contribution Profit, MEC allocation, and upstream finance inputs.",
      "Created reconciliation checks and business-facing explanations to make month-end results easier to trust.",
    ],
    impact: [
      "Improved traceability of cost allocation logic across Pharmacy Finance reporting layers.",
      "Supported more reliable month-end financial attribution and stakeholder reviews.",
      "Built SME-level understanding of a complex finance analytics ecosystem.",
    ],
    tags: ["SQL", "Athena", "Redshift", "Finance Analytics", "Cost Allocation"],
    icon: "CP",
    pipeline: "amazonMec",
  },
  {
    company: "Amazon Pharmacy",
    theme: "amazon",
    title: "Cost Allocation Redesign During Cost Center Restructuring",
    subtitle:
      "Allocation logic redesign with structured validation and SQL reconciliation",
    text: "Redesigned allocation logic during cost center restructuring and validated downstream impacts through SQL reconciliation and structured allocation models.",
    problem:
      "Cost center restructuring created risk that existing allocation logic would misattribute costs across warehouses, services, and finance reporting categories.",
    complexity: [
      "Restructuring affected downstream allocation percentages, rate-card logic, and CP reporting outputs.",
      "Validation required connecting SQL outputs with structured Excel allocation models and finance expectations.",
      "The work needed to be technically precise and explainable to non-technical finance stakeholders.",
    ],
    actions: [
      "Mapped old vs. new cost center allocation behavior and identified downstream dependencies.",
      "Built structured allocation models to validate new split logic before SQL changes flowed downstream.",
      "Partnered with stakeholders to align on methodology, assumptions, and expected finance outcomes.",
    ],
    impact: [
      "Reduced risk of inaccurate financial attribution during restructuring.",
      "Improved confidence in updated MEC allocation outputs.",
      "Created a reusable validation pattern for future allocation changes.",
    ],
    tags: ["SQL", "Excel Modeling", "Reconciliation", "Cost Centers", "P&L"],
    icon: "MEC",
    pipeline: "amazonMec",
  },
  {
    company: "Amazon Pharmacy",
    theme: "amazon",
    title: "Automated Labor Allocation for Month-End Close",
    subtitle: "Payroll + warehouse metadata automation feeding MEC inputs",
    text: "Built an automated labor allocation solution connecting ADP payroll data, warehouse metadata, and employee-to-warehouse business logic.",
    problem:
      "A manual Excel/S3-driven labor allocation process required recurring updates whenever warehouses changed, creating avoidable month-end dependency.",
    complexity: [
      "Employee effort needed to be mapped to warehouses using business rules, not simple static lookups.",
      "New fulfillment centers had to be onboarded dynamically without manually editing files every month.",
      "Outputs had to remain compatible with downstream MEC cost allocation inputs.",
    ],
    actions: [
      "Connected payroll and warehouse metadata sources to automate monthly allocation inputs.",
      "Implemented business logic to infer employee effort by warehouse and allocation category.",
      "Removed manual S3 file updates and reduced recurring operational dependency.",
    ],
    impact: [
      "Saved 4+ hours of recurring monthly manual effort.",
      "Reduced manual error risk during month-end close.",
      "Made labor allocation more scalable as new warehouses were added.",
    ],
    tags: ["Python", "SQL", "AWS S3", "ADP", "Automation"],
    icon: "LA",
  },
  {
    company: "Amazon Pharmacy",
    theme: "amazon",
    title: "HFDA Data Platform Usage Metrics Dashboard",
    subtitle: "Governance analytics from 1M+ monthly audit log events",
    text: "Built a governance dashboard using audit log event data to measure dataset adoption, platform usage, user access patterns, and unused assets.",
    problem:
      "Data platform owners needed visibility into who was using which datasets, through which tools, and where unused or underused assets existed.",
    complexity: [
      "Audit logs contained dense ARN, session, role, and event metadata that needed classification before it was useful.",
      "Access patterns needed separation across QuickSight, Workbench, Athena/Glue, Cradle, Datanet, and other tools.",
      "The dashboard had to serve governance and capacity-planning needs without becoming a noisy log dump.",
    ],
    actions: [
      "Reverse-engineered event metadata and created classification logic for platform, user, role, dataset, and tool usage.",
      "Designed adoption and usage metrics for active datasets, unused assets, platform mix, and access trends.",
      "Built a dashboard layer that turned raw audit logs into governance-ready insights.",
    ],
    impact: [
      "Enabled better dataset adoption tracking and platform governance.",
      "Surfaced underused assets and usage patterns for capacity planning.",
      "Converted raw audit events into decision-ready data product insights.",
    ],
    tags: ["SQL", "QuickSight", "Audit Logs", "Governance", "Data Platform"],
    icon: "HFDA",
  },
  {
    company: "Amazon Pharmacy",
    theme: "amazon",
    title: "GenAI-Assisted Cost Variance Summaries",
    subtitle: "Claude-on-Bedrock workflow for month-end variance narratives",
    text: "Integrated Claude via Amazon Bedrock to analyze cost allocation anomalies and generate natural-language summaries of month-end variance reports.",
    problem:
      "Finance stakeholders often needed plain-English explanations for cost allocation anomalies and month-end variance movements, not just raw tables.",
    complexity: [
      "Narratives had to be finance-safe, reviewable, and careful not to invent unsupported causes.",
      "Structured cost variance data needed to be converted into meaningful prompts and consistent summary output.",
      "The workflow had to help analysts communicate faster without replacing validation or source-of-truth reporting.",
    ],
    actions: [
      "Used structured cost center variance inputs as context for Claude through Amazon Bedrock.",
      "Designed prompts to generate likely drivers, caveats, and executive summaries.",
      "Positioned the output as analyst-assist narrative generation for stakeholder communication.",
    ],
    impact: [
      "Reduced manual interpretation time for variance explanation drafts.",
      "Improved readability of complex financial anomaly communication.",
      "Demonstrated practical GenAI usage within BI and finance analytics workflows.",
    ],
    tags: ["Amazon Bedrock", "Claude", "Python", "GenAI", "Variance Analysis"],
    icon: "AI",
  },
  {
    company: "Amazon Pharmacy",
    theme: "amazon",
    title: "Business-Facing Cost Allocation Documentation",
    subtitle: "Turning SQL-heavy finance logic into stakeholder-ready methodology",
    text: "Authored a business-facing cost allocation framework explaining methodology, cost drivers, manual adjustments, and rate-card logic.",
    problem:
      "The cost allocation ecosystem was highly technical, making it difficult for finance and business stakeholders to understand methodology, assumptions, and month-end behavior.",
    complexity: [
      "Documentation needed to bridge SQL logic, finance concepts, cost centers, drivers, and stakeholder questions.",
      "It had to explain current-month proxy logic, manual adjustments, segment definitions, and rate-card examples.",
      "The output needed to be useful for onboarding, review, and business sign-off.",
    ],
    actions: [
      "Translated complex pipeline logic into plain-English methodology and examples.",
      "Created sections for cost drivers, segments, manual inputs, FAQs, glossary, and worked examples.",
      "Aligned technical implementation with finance stakeholder understanding.",
    ],
    impact: [
      "Improved stakeholder understanding of how costs flow into Contribution Profit.",
      "Reduced onboarding friction for complex finance pipeline logic.",
      "Created a reusable reference for business review and future allocation changes.",
    ],
    tags: ["Documentation", "Finance Analytics", "Cost Drivers", "Methodology"],
    icon: "DOC",
  },
  {
    company: "Barclays",
    theme: "barclays",
    title: "Callback Feature Revamp & SLA Logic Redesign",
    subtitle:
      "Contact center performance analytics across callback workflows and SLA reporting",
    text: "Led a 3-member team to redesign SLA logic and integrate callback features into Contact Center workflows, enhancing 45+ dashboards and reports.",
    problem:
      "Contact center teams needed updated SLA logic and callback reporting to better track queue efficiency, customer retention, and servicing outcomes.",
    complexity: [
      "Changes affected 45+ dashboards and reports tied to operational workflows and SLA reporting.",
      "Callback performance had to be integrated into existing contact center KPI definitions.",
      "Coordination was needed across analytics, product, and operations stakeholders.",
    ],
    actions: [
      "Led a 3-member team through dashboard changes, SLA logic redesign, and callback analytics integration.",
      "Updated reporting logic and validated KPI continuity across impacted dashboards.",
      "Created views to monitor queue efficiency and callback performance over time.",
    ],
    impact: [
      "Improved queue efficiency visibility and customer retention tracking.",
      "Enhanced 45+ dashboards and reports.",
      "Supported a 15% improvement in customer retention as reported in project outcomes.",
    ],
    tags: ["Tableau", "SLA", "Callback Analytics", "Leadership"],
    icon: "CB",
    pipeline: "barclaysIvr",
  },
  {
    company: "Barclays",
    theme: "barclays",
    title: "IVR Customer Journey Analytics & ETL Framework",
    subtitle:
      "5M+ interactions analyzed across IVR funnels, transfers, and servicing paths",
    text: "Built and managed ETL processes powering 30+ IVR Tableau dashboards and analyzed 5M+ interactions across call logs and servicing data.",
    problem:
      "Servicing teams needed standardized funnel reporting across containment, self-service, transfers, sentiment, and customer journey drop-offs.",
    complexity: [
      "Data came from Oracle, AWS, IVR logs, clickstream, call records, and Tableau Prep flows.",
      "Metrics had to be standardized across multiple dashboards to avoid conflicting KPI definitions.",
      "The system needed to scale as IVR data volumes increased and dashboard performance became a concern.",
    ],
    actions: [
      "Built ETL frameworks powering 30+ IVR dashboards and standardized funnel KPI logic.",
      "Analyzed 5M+ IVR interactions to identify transfer drivers, call time patterns, and containment opportunities.",
      "Created heatmaps and predictive views to support customer journey optimization.",
    ],
    impact: [
      "Helped reduce call time by 15% and transfers by 20% in project outcomes.",
      "Improved funnel monitoring consistency across servicing teams.",
      "Created a scalable analytics foundation for IVR performance reporting.",
    ],
    tags: ["Tableau", "ETL", "Oracle", "AWS", "IVR"],
    icon: "IVR",
    pipeline: "barclaysIvr",
  },
  {
    company: "Barclays",
    theme: "barclays",
    title: "Cloud Migration & Data Lake Setup",
    subtitle: "Oracle to AWS S3 migration with Athena and Redshift performance gains",
    text: "Co-led migration of multi-terabyte datasets from Oracle to AWS S3, creating a scalable data lake and reducing query latency using Athena and Redshift.",
    problem:
      "Legacy Oracle-based reporting workflows were becoming slower and less scalable as data volumes increased across servicing and IVR analytics.",
    complexity: [
      "Multi-terabyte datasets needed migration without breaking downstream dashboards and reporting workflows.",
      "Historical and current data needed to remain usable for performance reporting.",
      "Query performance and data accessibility had to improve without sacrificing KPI consistency.",
    ],
    actions: [
      "Co-led migration from Oracle to AWS S3 and supported scalable data lake setup.",
      "Used Athena and Redshift patterns to improve analytical query access.",
      "Validated downstream reporting continuity across Tableau and analytics workflows.",
    ],
    impact: [
      "Cut query latency by 40% in project outcomes.",
      "Improved scalability of analytics workflows.",
      "Supported modernization of reporting infrastructure for contact center analytics.",
    ],
    tags: ["AWS S3", "Athena", "Redshift", "Oracle", "Migration"],
    icon: "AWS",
  },
  {
    company: "Barclays",
    theme: "barclays",
    title: "Queue Optimization, A/B Testing & Agent Performance Analytics",
    subtitle: "Experimentation and scoring models for servicing performance improvement",
    text: "Designed A/B tests for queue restructuring and developed an agent performance scoring model using sentiment, CSAT, NPS, and Z-score normalization.",
    problem:
      "Operations teams needed evidence-based ways to evaluate queue restructuring and identify coaching opportunities for agent performance.",
    complexity: [
      "Queue experiments needed clean comparison logic between Simple vs. Complex servicing paths.",
      "Agent benchmarking required normalizing multiple metrics like sentiment, CSAT, and NPS.",
      "Outputs needed to be easy for QA and coaching teams to interpret.",
    ],
    actions: [
      "Designed A/B testing views for queue restructuring and month-over-month tracking.",
      "Built agent scoring logic using Z-score normalization across sentiment, CSAT, and NPS data.",
      "Created dashboards to identify outliers and performance trends.",
    ],
    impact: [
      "Supported a 12% improvement in resolution efficiency in project outcomes.",
      "Improved visibility into agent outliers for QA and coaching.",
      "Helped operations teams evaluate servicing changes with data rather than anecdotes.",
    ],
    tags: ["A/B Testing", "Z-Score", "CSAT", "NPS", "Tableau"],
    icon: "AB",
  },
  {
    company: "Accenture",
    theme: "accenture",
    title: "SAP MM / Procure-to-Pay Workflow Automation",
    subtitle:
      "Procurement process automation across purchasing, inventory, and invoice workflows",
    text: "Streamlined procurement operations by implementing SAP MM workflow automation including automatic PO generation and release strategy configuration.",
    problem:
      "Enterprise clients needed more efficient Procure-to-Pay workflows across purchasing, inventory, invoice processing, and approval routing.",
    complexity: [
      "Automation needed to align with business approval rules, procurement controls, and SAP MM configuration logic.",
      "Process changes had to integrate cleanly with downstream finance, inventory, and enterprise reporting flows.",
      "Stakeholders needed clear testing, training, and change-management support before adoption.",
    ],
    actions: [
      "Configured SAP MM workflow logic including automatic PO generation and release strategy support.",
      "Partnered with business and IT teams to translate operational requirements into system behavior.",
      "Supported testing, training, and post-go-live stabilization for procurement users.",
    ],
    impact: [
      "Reduced procurement processing time by 25% in project outcomes.",
      "Improved operational efficiency and approval consistency.",
      "Built strong foundation in enterprise process automation and stakeholder delivery.",
    ],
    tags: ["SAP MM", "P2P", "Workflow Automation", "Procurement"],
    icon: "P2P",
  },
  {
    company: "Accenture",
    theme: "accenture",
    title: "SAP Integration, BRDs & UAT Enablement",
    subtitle:
      "Cross-functional consulting delivery across requirements, documentation, testing, and adoption",
    text: "Delivered functional specifications, BRDs, UAT support, stakeholder workshops, training, and integration coordination across SAP MM, SD, FI, and PP teams.",
    problem:
      "Large enterprise SAP programs needed business requirements translated into scalable technical changes while keeping stakeholders aligned through testing and rollout.",
    complexity: [
      "SAP MM changes had to integrate with SD, FI, and PP modules while preserving data integrity.",
      "Custom reports and enhancements required clear functional specs for ABAP developers.",
      "Business users needed training and UAT support to adopt process changes with minimal disruption.",
    ],
    actions: [
      "Created BRDs and functional specifications for custom reports and enhancements.",
      "Coordinated with ABAP developers and business stakeholders to deliver logic-driven solutions.",
      "Facilitated workshops, UAT, end-user training, and post-go-live support.",
    ],
    impact: [
      "Supported 95% user adoption in project outcomes.",
      "Improved cross-module communication and enterprise data integrity.",
      "Built consulting muscles in requirements gathering, documentation, UAT, and stakeholder management.",
    ],
    tags: ["BRD", "UAT", "SAP Integration", "Workshops"],
    icon: "UAT",
  },
];

const skills = [
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
  "Amazon Bedrock",
  "JIRA",
  "Confluence",
];

const softSkills = [
  "Deep ownership",
  "Cross-functional delivery",
  "Stakeholder communication",
  "Root-cause debugging",
  "Ambiguity handling",
  "Executive-ready storytelling",
  "Requirements gathering",
  "UAT facilitation",
  "Change management",
  "Team leadership",
];

function themeClasses(theme: Theme) {
  if (theme === "amazon") {
    return {
      section: "bg-gradient-to-br from-orange-50 via-white to-teal-50 border-orange-100",
      pill: "bg-orange-100 text-orange-800 border-orange-200",
      icon: "bg-slate-950 text-white",
      button: "text-orange-700",
      tag: "bg-orange-50 text-orange-800 border-orange-100",
      border: "border-orange-200",
      accent: "from-orange-400 to-teal-500",
    };
  }

  if (theme === "barclays") {
    return {
      section: "bg-gradient-to-br from-sky-50 via-white to-blue-50 border-sky-100",
      pill: "bg-sky-100 text-sky-800 border-sky-200",
      icon: "bg-sky-500 text-white",
      button: "text-sky-700",
      tag: "bg-sky-50 text-sky-800 border-sky-100",
      border: "border-sky-200",
      accent: "from-sky-400 to-blue-600",
    };
  }

  return {
    section: "bg-gradient-to-br from-purple-50 via-white to-violet-50 border-purple-100",
    pill: "bg-purple-100 text-purple-800 border-purple-200",
    icon: "bg-purple-700 text-white",
    button: "text-purple-700",
    tag: "bg-purple-50 text-purple-800 border-purple-100",
    border: "border-purple-200",
    accent: "from-purple-500 to-violet-700",
  };
}

function getCompanyLogo(theme: Theme) {
  if (theme === "amazon") return logos.amazon;
  if (theme === "barclays") return logos.barclays;
  return logos.accenture;
}

function LogoImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) return <span className="text-lg font-bold text-slate-800">{alt}</span>;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
        display: "block",
      }}
      onError={() => setFailed(true)}
    />
  );
}

function CompanyLogo({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  const isBarclays = name.toLowerCase().includes("barclays");
  const isAccenture = name.toLowerCase().includes("accenture");
  const isAmazon = name.toLowerCase().includes("amazon");
  const isEller = name.toLowerCase().includes("arizona");

  return (
    <div className="flex items-center justify-center bg-white transition duration-300 h-[170px] overflow-hidden px-6">
      <img
        src={image}
        alt={name}
        className={`
          object-contain w-auto h-auto
          ${
            isAmazon
              ? "max-h-[110px] max-w-[230px]"
              : isBarclays
              ? "max-h-[75px] max-w-[240px] scale-[1.45]"
              : isAccenture
              ? "max-h-[70px] max-w-[230px] scale-[1.55]"
              : isEller
              ? "max-h-[95px] max-w-[230px]"
              : "max-h-[90px] max-w-[220px]"
          }
        `}
      />
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-10">
      <p className="text-blue-600 text-xs font-black uppercase tracking-[0.35em]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-slate-950">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-slate-600 leading-7">{subtitle}</p>}
    </div>
  );
}

function PipelinePreviewCard({
  title,
  description,
  theme,
  onOpen,
}: {
  title: string;
  description: string;
  theme: Theme;
  onOpen: () => void;
}) {
  const t = themeClasses(theme);

  return (
    <Card className={`mb-8 rounded-3xl border ${t.border} bg-white/90 shadow-sm`}>
      <CardContent className="p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="flex gap-4">
          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${t.icon}`}>
            <Workflow className="h-6 w-6" />
          </div>
          <div>
            <p className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${t.pill}`}>
              Main pipeline view
            </p>
            <h3 className="mt-3 text-2xl font-black text-slate-950">{title}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">{description}</p>
          </div>
        </div>

        <Button
          onClick={onOpen}
          variant="outline"
          className="rounded-xl border-slate-200 bg-white px-5 py-6 hover:bg-slate-50 shrink-0"
        >
          <Eye className="mr-2 h-4 w-4" /> View Pipeline
        </Button>
      </CardContent>
    </Card>
  );
}

function PipelineDiagram({ steps, theme }: { steps: string[]; theme: Theme }) {
  const t = themeClasses(theme);

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 md:p-7 shadow-sm">
      <div className="grid gap-4 md:grid-cols-7">
        {steps.map((step, index) => (
          <div key={step} className="relative">
            <div className={`rounded-2xl border ${t.border} bg-gradient-to-br from-white to-slate-50 p-4 min-h-[120px] shadow-sm`}>
              <div className="flex items-center justify-between">
                <div className={`h-8 w-8 rounded-full bg-gradient-to-r ${t.accent} text-white flex items-center justify-center text-xs font-black`}>
                  {index + 1}
                </div>
                <Layers3 className="h-4 w-4 text-slate-400" />
              </div>
              <p className="mt-5 text-sm font-black leading-5 text-slate-850">{step}</p>
            </div>
            {index < steps.length - 1 && (
              <ArrowRight className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 z-10" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-3">
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
            <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const theme = themeClasses(project.theme);

  return (
    <button onClick={onClick} className="h-full w-full text-left group">
      <Card
        className={`h-full rounded-3xl border ${theme.border} bg-white shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
      >
        <div className={`h-2 bg-gradient-to-r ${theme.accent}`} />

        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              <div
                className={`h-14 w-14 rounded-2xl flex items-center justify-center font-black text-xs ${theme.icon}`}
              >
                {project.icon}
              </div>

              <div>
                <div className="h-8 w-32 mb-2 flex items-center">
                  <LogoImage
                    src={getCompanyLogo(project.theme)}
                    alt={project.company}
                    className="object-contain h-8 max-w-[130px]"
                  />
                </div>

                <h3 className="text-lg font-black text-slate-950 leading-snug">
                  {project.title}
                </h3>
              </div>
            </div>

            <ArrowRight
              className={`h-5 w-5 shrink-0 group-hover:translate-x-1 transition ${theme.button}`}
            />
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-600">{project.text}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium border ${theme.tag}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <p className={`mt-5 text-sm font-bold flex items-center gap-2 ${theme.button}`}>
            View details <ExternalLink className="h-4 w-4" />
          </p>
        </CardContent>
      </Card>
    </button>
  );
}

function CompanySection({
  id,
  theme,
  logo,
  heading,
  label,
  description,
  pipelineTitle,
  pipelineDescription,
  pipelineSteps,
  projects,
  setSelectedProject,
  setPipelineModal,
}: {
  id: string;
  theme: Theme;
  logo: string;
  heading: string;
  label: string;
  description: string;
  pipelineTitle?: string;
  pipelineDescription?: string;
  pipelineSteps?: string[];
  projects: Project[];
  setSelectedProject: (project: Project) => void;
  setPipelineModal: (pipeline: { title: string; steps: string[]; theme: Theme } | null) => void;
}) {
  const t = themeClasses(theme);

  return (
    <section id={id} className={`py-16 border-y ${t.section}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <div className="h-14 w-72 flex items-center mb-4">
            <LogoImage src={logo} alt={heading} className="object-contain h-14 max-w-[280px]" />
          </div>

          <p className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] ${t.pill}`}>
            {label}
          </p>

          <h2 className="mt-4 text-3xl md:text-4xl font-black tracking-tight text-slate-950">
            {heading}
          </h2>

          <p className="mt-3 max-w-3xl text-slate-600 leading-7">{description}</p>
        </div>

        {pipelineTitle && pipelineDescription && pipelineSteps && (
          <PipelinePreviewCard
            title={pipelineTitle}
            description={pipelineDescription}
            theme={theme}
            onOpen={() => setPipelineModal({ title: pipelineTitle, steps: pipelineSteps, theme })}
          />
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [showPipeline, setShowPipeline] = useState(false);
  const t = themeClasses(project.theme);

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`sticky top-0 bg-white/95 backdrop-blur border-b p-6 flex items-start justify-between gap-4 ${t.border}`}>
          <div>
            <div className="h-10 w-48 flex items-center mb-3">
              <LogoImage
                src={getCompanyLogo(project.theme)}
                alt={project.company}
                className="object-contain h-10 max-w-[190px]"
              />
            </div>

            <p className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${t.pill}`}>
              {project.company}
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-950">{project.title}</h2>
            <p className="mt-2 text-slate-600">{project.subtitle}</p>
          </div>

          <button onClick={onClose} className="rounded-full border border-slate-200 p-2 hover:bg-slate-50">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="font-black text-slate-950 mb-2">Problem</h3>
            <p className="text-slate-700 leading-7">{project.problem}</p>
          </div>

          {project.pipeline && (
            <div>
              <Button
                variant="outline"
                onClick={() => setShowPipeline(!showPipeline)}
                className="rounded-xl border-slate-200 bg-white hover:bg-slate-50"
              >
                <Workflow className="mr-2 h-4 w-4" />
                {showPipeline ? "Hide related pipeline" : "View related pipeline"}
              </Button>

              {showPipeline && (
                <div className="mt-5">
                  <PipelineDiagram
                    steps={pipelineDefinitions[project.pipeline]}
                    theme={project.theme}
                  />
                </div>
              )}
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            <DetailList title="Complexity" items={project.complexity} />
            <DetailList title="Actions" items={project.actions} />
            <DetailList title="Impact" items={project.impact} />
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium border ${t.tag}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex justify-end">
            <Button onClick={onClose} className="rounded-xl bg-blue-600 hover:bg-blue-700">
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function PipelineModal({
  title,
  steps,
  theme,
  onClose,
}: {
  title: string;
  steps: string[];
  theme: Theme;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-7xl rounded-[2rem] bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-slate-200 p-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">Pipeline architecture</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">{title}</h2>
          </div>
          <button onClick={onClose} className="rounded-full border border-slate-200 p-2 hover:bg-slate-50">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 md:p-8">
          <PipelineDiagram steps={steps} theme={theme} />
          <p className="mt-5 text-sm leading-7 text-slate-600">
            This is a simplified portfolio-safe view of the architecture. It shows the flow and ownership areas without exposing internal details.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [pipelineModal, setPipelineModal] = useState<{
    title: string;
    steps: string[];
    theme: Theme;
  } | null>(null);

  const amazonProjects = projects.filter((p) => p.theme === "amazon");
  const barclaysProjects = projects.filter((p) => p.theme === "barclays");
  const accentureProjects = projects.filter((p) => p.theme === "accenture");

  return (
    <div className="min-h-screen bg-white text-slate-900 [font-family:Inter,Segoe_UI,Arial,sans-serif]">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,#dbeafe,transparent_35%),radial-gradient(circle_at_bottom_left,#fff7ed,transparent_30%)]" />

      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <div>
            <a href="#top" className="text-2xl font-black tracking-tight text-slate-950">
              Madhvika Sehgal
            </a>
            <p className="text-sm text-slate-500 mt-1">Business Intelligence Engineer</p>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-700">
            <a href="#top" className="text-blue-600 border-b-2 border-blue-600 pb-2">Home</a>
            <a href="#amazon" className="hover:text-blue-600">Amazon</a>
            <a href="#barclays" className="hover:text-blue-600">Barclays</a>
            <a href="#skills" className="hover:text-blue-600">Skills</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </nav>

          <Button asChild className="hidden md:inline-flex rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20">
            <a href={resumeUrl} download>
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </a>
          </Button>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 grid lg:grid-cols-[1.05fr_.95fr] gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
              <Sparkles className="h-4 w-4" /> BI Engineering · Finance Analytics · Cloud Data Platforms
            </div>

            <h1 className="mt-7 text-5xl md:text-7xl font-black tracking-tight leading-[1.03] text-slate-950">
              I turn messy finance and operations data into <span className="text-blue-600">trusted business decisions.</span>
            </h1>

            <p className="mt-7 text-lg leading-8 text-slate-600 max-w-3xl">
              Business Intelligence Engineer with 4+ years of experience across healthcare-tech, fintech, and consulting. I build SQL-heavy finance pipelines, cost allocation frameworks, governance dashboards, IVR analytics systems, and stakeholder-ready reporting layers.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-6 text-base shadow-lg shadow-blue-600/20">
                <a href="#amazon">View Projects <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>

              <Button asChild variant="outline" className="rounded-xl border-slate-200 bg-white px-6 py-6 text-base hover:bg-slate-50">
                <a href={resumeUrl} download><FileText className="mr-2 h-4 w-4" /> Resume</a>
              </Button>

              <Button asChild variant="outline" className="rounded-xl border-slate-200 bg-white px-6 py-6 text-base hover:bg-slate-50">
                <a href={emailUrl}><Mail className="mr-2 h-4 w-4" /> Contact</a>
              </Button>
            </div>

            <div className="mt-10 rounded-[28px] border border-slate-200 bg-white shadow-lg overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-200">
                <CompanyLogo name="Amazon Pharmacy" image={logos.amazon} />
                <CompanyLogo name="Barclays" image={logos.barclays} />
                <CompanyLogo name="Accenture" image={logos.accenture} />
                <CompanyLogo name="University of Arizona" image={logos.eller} />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.1 }}>
            <Card className="rounded-[2rem] border-slate-200 bg-white/90 shadow-2xl shadow-slate-200/70">
              <CardContent className="p-8">
                <p className="text-blue-600 text-xs font-black uppercase tracking-[0.35em]">Portfolio Snapshot</p>
                <h2 className="mt-4 text-2xl md:text-3xl font-black text-slate-950">Scale, complexity, and business impact.</h2>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  {metrics.map(({ value, label, icon: Icon }) => (
                    <div key={value} className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/60 p-5 shadow-sm">
                      <div className="flex items-center gap-4">
                        <Icon className="h-7 w-7 text-blue-600" />
                        <div className="text-3xl font-black text-blue-600">{value}</div>
                      </div>
                      <div className="mt-2 text-sm text-slate-600 pl-11">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-1" />
                  <p className="text-sm leading-7 text-slate-700">
                    Core strength: tracing metrics from dashboard symptoms back through SQL, upstream data, finance logic, and stakeholder definitions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <CompanySection
          id="amazon"
          theme="amazon"
          logo={logos.amazon}
          heading="Amazon Projects"
          label="Pharmacy Finance · Cost Allocation · Contribution Profit"
          description="Finance data engineering-adjacent analytics work across MEC cost allocation, CP reporting, automation, governance, GenAI-assisted cost narratives, and stakeholder documentation."
          pipelineTitle="Pipeline Architecture:GL → Contribution Profit"
          pipelineDescription="A simplified, portfolio-safe view of the financial allocation pipeline I helped debug, redesign, validate, document, and operationalize."
          pipelineSteps={pipelineDefinitions.amazonMec}
          projects={amazonProjects}
          setSelectedProject={setSelectedProject}
          setPipelineModal={setPipelineModal}
        />

        <CompanySection
          id="barclays"
          theme="barclays"
          logo={logos.barclays}
          heading="Barclays Projects"
          label="Fintech · IVR · Contact Center Analytics"
          description="Customer journey and contact-center analytics across IVR funnels, callback workflows, cloud migration, SLA logic, A/B testing, and performance scoring."
          pipelineTitle="Pipeline Architecture: IVR → KPI dashboards"
          pipelineDescription="Architected and implemented a scalable IVR analytics ecosystem from the ground up during contact center modernization, integrating multi-source call data, designing ETL pipelines, standardizing KPI definitions, and enabling Tableau-based operational reporting for business stakeholders."
          pipelineSteps={pipelineDefinitions.barclaysIvr}
          projects={barclaysProjects}
          setSelectedProject={setSelectedProject}
          setPipelineModal={setPipelineModal}
        />

        <CompanySection
          id="accenture"
          theme="accenture"
          logo={logos.accenture}
          heading="Accenture Foundation"
          label="Consulting · SAP MM · Procure-to-Pay"
          description="Enterprise consulting experience that built the foundation for stakeholder management, requirements gathering, UAT, documentation, and cross-functional delivery."
          projects={accentureProjects}
          setSelectedProject={setSelectedProject}
          setPipelineModal={setPipelineModal}
        />

        <section id="skills" className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader
              eyebrow="Skills"
              title="Technical and cross-functional strengths"
              subtitle="A practical mix of BI, analytics engineering, finance analytics, cloud migration, stakeholder delivery, and business storytelling."
            />

            <div className="mb-10 flex flex-wrap justify-center gap-3">
              {softSkills.map((skill) => (
                <span key={skill} className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm">
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill) => (
                <span key={skill} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <Card className="rounded-[2rem] border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-2xl shadow-slate-400/20">
              <CardContent className="p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <p className="text-slate-300 text-sm font-bold uppercase tracking-[0.25em]">Open to roles</p>
                  <h2 className="mt-3 text-3xl md:text-4xl font-black">Analytics Engineer · BIE · Finance Analytics</h2>
                  <p className="mt-4 text-slate-300 max-w-3xl leading-7">
                    Best fit: roles where business ambiguity, SQL-heavy pipelines, finance logic, and stakeholder communication all meet.
                  </p>

                  <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm text-slate-200">
                    <a className="flex items-center gap-2 hover:underline" href={emailUrl}>
                      <Mail className="h-4 w-4" /> madhvika.sehgal@gmail.com
                    </a>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> Seattle, WA
                    </div>
                    <a className="flex items-center gap-2 hover:underline" href={linkedInUrl} target="_blank" rel="noreferrer">
                      <BriefcaseBusiness className="h-4 w-4" /> LinkedIn
                    </a>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild variant="secondary" className="rounded-xl bg-white text-slate-950 hover:bg-slate-100 px-6 py-6 font-bold">
                    <a href={emailUrl}><Mail className="mr-2 h-4 w-4" /> Contact Me</a>
                  </Button>

                  <Button asChild variant="secondary" className="rounded-xl bg-white text-slate-950 hover:bg-slate-100 px-6 py-6 font-bold">
                    <a href={resumeUrl} download><Download className="mr-2 h-4 w-4" /> Resume</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}

      {pipelineModal && (
        <PipelineModal
          title={pipelineModal.title}
          steps={pipelineModal.steps}
          theme={pipelineModal.theme}
          onClose={() => setPipelineModal(null)}
        />
      )}
    </div>
  );
}
