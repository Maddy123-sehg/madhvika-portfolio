"use client";

import React from "react";
import Image from "next/image";
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
  LineChart,
  Mail,
  MapPin,
  User,
  Sparkles,
  CalendarDays,
  Clock3,
  Layers3,
  Network,
  GitBranch,
} from "lucide-react";

const companies = [
  { name: "Amazon Pharmacy", image: "/logos/amazon-pharmacy.webp" },
  { name: "Barclays", image: "/logos/barclays.png" },
  { name: "Accenture", image: "/logos/accenture.png" },
  { name: "University of Arizona", image: "/logos/eller.png" },
];

const metrics = [
  { value: "1,900+", label: "line finance SQL pipeline", icon: Database },
  { value: "1M+", label: "monthly audit log events", icon: CalendarDays },
  { value: "4+ hrs", label: "monthly manual work saved", icon: Clock3 },
  { value: "30+", label: "BI dashboards supported", icon: BarChart3 },
];

const caseStudies = [
  {
    company: "Amazon Pharmacy",
    title: "MEC Cost Allocation Framework",
    text: "Enhanced and validated SQL-based allocation logic distributing fulfillment, pharmacist, CS, billing, and operational costs into Contribution Profit reporting.",
    tags: ["SQL", "AWS", "Cost Allocation", "Finance"],
    icon: "a",
    iconStyle: "bg-slate-950 text-white",
  },
  {
    company: "Amazon Pharmacy",
    title: "Automated Labor Allocation",
    text: "Automated month-end labor allocation by connecting ADP payroll data, warehouse metadata, and employee-to-warehouse business rules.",
    tags: ["Python", "S3", "Automation", "Month-End"],
    icon: "λ",
    iconStyle: "bg-blue-600 text-white",
  },
  {
    company: "Amazon Pharmacy",
    title: "HFDA Usage Metrics Dashboard",
    text: "Built governance analytics using 1M+ monthly audit log events to measure dataset adoption, platform usage, and unused assets.",
    tags: ["QuickSight", "Audit Logs", "Governance", "BI"],
    icon: "Q",
    iconStyle: "bg-purple-600 text-white",
  },
  {
    company: "Amazon Pharmacy",
    title: "Payer BIN/PCN Attribution Fix",
    text: "Consolidated payer attribution definitions across regular and discount card paths to improve claims attribution accuracy and reduce fallback misclassification.",
    tags: ["SQL", "Claims", "Attribution", "Data Quality"],
    icon: "$",
    iconStyle: "bg-emerald-600 text-white",
  },
  {
    company: "Prototype / Bedrock",
    title: "GenAI Cost Variance Explainer",
    text: "Prototyped a Claude-on-Bedrock workflow to convert structured month-end variance data into reviewable executive summaries.",
    tags: ["Claude", "Bedrock", "Python", "GenAI"],
    icon: "AI",
    iconStyle: "bg-cyan-600 text-white",
  },
  {
    company: "Barclays",
    title: "IVR Analytics & SLA Optimization",
    text: "Built and enhanced IVR dashboards across containment, self-service, transfer rate, callbacks, queues, and customer journey KPIs.",
    tags: ["Tableau", "Oracle", "AWS", "IVR"],
    icon: "B",
    iconStyle: "bg-sky-500 text-white",
  },
];

const tools = [
  { name: "SQL", icon: Database },
  { name: "Python", icon: BrainCircuit },
  { name: "Amazon Redshift", icon: Cloud },
  { name: "AWS", icon: Cloud },
  { name: "QuickSight", icon: BarChart3 },
  { name: "Tableau", icon: LineChart },
  { name: "Oracle", icon: Database },
  { name: "Excel", icon: Layers3 },
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
  "Data Modeling",
  "ETL/ELT",
  "KPI Development",
  "Cost Allocation",
  "Activity-Based Costing",
  "Finance Analytics",
  "Data Validation",
  "Root Cause Analysis",
  "Stakeholder Communication",
  "Amazon Bedrock",
  "JIRA",
  "Confluence",
];

const experience = [
  {
    role: "Business Intelligence Engineer",
    company: "Amazon",
    period: "Aug 2025 – Present",
    bullets: [
      "Built and enhanced Pharmacy Finance pipelines supporting Contribution Profit and MEC cost allocation reporting.",
      "Redesigned allocation logic during cost center restructuring and validated downstream impact through SQL reconciliation.",
      "Created automation, governance dashboards, documentation, and GenAI-assisted prototypes to improve reporting clarity.",
    ],
  },
  {
    role: "Business Intelligence Analyst",
    company: "Barclays",
    period: "Dec 2020 – Jul 2025",
    bullets: [
      "Led analytics across IVR, customer journey, callback, SLA, queue optimization, and servicing performance initiatives.",
      "Built ETL frameworks and Tableau dashboards powering real-time funnel monitoring and KPI reporting.",
      "Co-led cloud migration and reporting automation across Oracle, AWS S3, Athena, Redshift, and Tableau.",
    ],
  },
  {
    role: "Business Consultant",
    company: "Accenture",
    period: "Sep 2016 – Jul 2019",
    bullets: [
      "Delivered SAP MM and Procure-to-Pay implementations across requirements, configuration, testing, training, and go-live support.",
      "Partnered with business and engineering teams to automate procurement workflows and improve operational efficiency.",
    ],
  },
];

const flow = [
  "Raw Finance + Ops Data",
  "Work Units",
  "Cost Allocation",
  "Rate Cards",
  "Contribution Profit",
  "Finance Dashboards",
];

function CompanyLogo({ name, image }: { name: string; image: string }) {
  return (
    <div className="flex items-center justify-center px-8 py-6 bg-white hover:bg-slate-50 transition duration-300 min-h-[110px]">
      <Image
        src={image}
        alt={name}
        width={190}
        height={70}
        className="object-contain h-14 w-auto"
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
    <div className="text-center max-w-3xl mx-auto mb-9">
      <p className="text-blue-600 text-xs font-black uppercase tracking-[0.35em]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-slate-950">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-slate-600 leading-7">{subtitle}</p>
      )}
    </div>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,#dbeafe,transparent_35%),radial-gradient(circle_at_bottom_left,#ecfeff,transparent_30%)]" />

      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <div>
            <a
              href="#top"
              className="text-2xl font-black tracking-tight text-slate-950"
            >
              Madhvika Sehgal
            </a>
            <p className="text-sm text-slate-500 mt-1">
              Business Intelligence Engineer
            </p>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-700">
            <a href="#top" className="text-blue-600 border-b-2 border-blue-600 pb-2">
              Home
            </a>
            <a href="#projects" className="hover:text-blue-600">
              Projects
            </a>
            <a href="#architecture" className="hover:text-blue-600">
              Architecture
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

          <Button
            asChild
            className="hidden md:inline-flex rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
          >
            <a href="#contact">
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </a>
          </Button>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 grid lg:grid-cols-[1.05fr_.95fr] gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
              <Sparkles className="h-4 w-4" /> Business Intelligence Engineer ·
              Finance Analytics · Data Platforms
            </div>

            <h1 className="mt-7 text-5xl md:text-7xl font-black tracking-tight leading-[1.03] text-slate-950">
              I build finance data systems that turn{" "}
              <span className="text-blue-600">complexity</span> into{" "}
              <span className="text-blue-600">clarity.</span>
            </h1>

            <p className="mt-7 text-lg leading-8 text-slate-600 max-w-3xl">
              Business Intelligence Engineer with 4+ years of experience across
              Amazon Pharmacy, Barclays, and Accenture. I specialize in
              SQL-heavy analytics engineering, cost allocation frameworks,
              Contribution Profit reporting, cloud data platforms, BI dashboards,
              and stakeholder-ready storytelling.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                className="rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-6 text-base shadow-lg shadow-blue-600/20"
              >
                <a href="#projects">
                  View Case Studies <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-xl border-slate-200 bg-white px-6 py-6 text-base hover:bg-slate-50"
              >
                <a href="#contact">
                  <User className="mr-2 h-4 w-4" /> Resume + Contact
                </a>
              </Button>
            </div>

            <div className="mt-10 rounded-[28px] border border-slate-200 bg-white shadow-lg overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-200">
                {companies.map((company) => (
                  <CompanyLogo key={company.name} {...company} />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <Card className="rounded-[2rem] border-slate-200 bg-white/90 shadow-2xl shadow-slate-200/70">
              <CardContent className="p-8">
                <p className="text-blue-600 text-xs font-black uppercase tracking-[0.35em]">
                  Portfolio Snapshot
                </p>
                <h2 className="mt-4 text-2xl md:text-3xl font-black text-slate-950">
                  Real impact. Real numbers.
                </h2>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  {metrics.map(({ value, label, icon: Icon }) => (
                    <div
                      key={value}
                      className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/60 p-5 shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <Icon className="h-7 w-7 text-blue-600" />
                        <div className="text-3xl font-black text-blue-600">
                          {value}
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-slate-600 pl-11">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-1" />
                  <p className="text-sm leading-7 text-slate-700">
                    Core strength: tracing business metrics from dashboard
                    symptoms back through SQL, upstream data, finance logic, and
                    stakeholder definitions. Tiny hobby. Very normal.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <section id="projects" className="border-y border-slate-100 bg-white/80 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader
              eyebrow="Featured Case Studies"
              title="Solving real business problems with data"
              subtitle="End-to-end impact across analysis, engineering, automation, finance reporting, and stakeholder outcomes."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Card className="h-full rounded-2xl border-slate-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4">
                          <div
                            className={`h-12 w-12 rounded-xl flex items-center justify-center font-black ${project.iconStyle}`}
                          >
                            {project.icon}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-blue-600">
                              {project.company}
                            </p>
                            <h3 className="mt-1 text-lg font-black text-slate-950 leading-snug">
                              {project.title}
                            </h3>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-blue-600 shrink-0" />
                      </div>

                      <p className="mt-5 text-sm leading-7 text-slate-600">
                        {project.text}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 border border-blue-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="architecture" className="py-16 bg-slate-50/70">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader
              eyebrow="Architecture Story"
              title="How the Amazon Pharmacy finance data flow fits together"
              subtitle="A simplified version of the ecosystem I worked across: upstream operational signals, work units, allocation logic, Contribution Profit, and finance dashboards."
            />

            <Card className="rounded-[2rem] border-slate-200 bg-white shadow-sm">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-6 gap-4 items-stretch">
                  {flow.map((item, index) => (
                    <div key={item} className="relative">
                      <div className="h-full min-h-28 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <Layers3 className="h-5 w-5 text-blue-600" />
                          <span className="text-xs font-bold text-blue-300">
                            0{index + 1}
                          </span>
                        </div>
                        <div className="mt-5 text-sm font-black text-slate-950 leading-5">
                          {item}
                        </div>
                      </div>

                      {index < flow.length - 1 && (
                        <ArrowRight className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500 z-10" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: Network,
                      title: "Data lineage",
                      text: "Tracing dashboard numbers back through CP, MEC allocation, work units, upstream mappings, and finance definitions.",
                    },
                    {
                      icon: GitBranch,
                      title: "Change validation",
                      text: "Testing cost center restructuring, schema propagation, attribution fixes, and downstream metric impact.",
                    },
                    {
                      icon: BarChart3,
                      title: "Business consumption",
                      text: "Turning SQL-heavy finance logic into dashboards, summaries, docs, and decision-ready narratives.",
                    },
                  ].map(({ icon: Icon, title, text }) => (
                    <div
                      key={title}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <Icon className="h-6 w-6 text-blue-600" />
                      <h3 className="mt-4 text-lg font-black text-slate-950">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 leading-6">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="experience" className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader
              eyebrow="Experience"
              title="Career timeline"
              subtitle="Finance analytics, operational BI, cloud migration, automation, and consulting delivery."
            />

            <div className="space-y-5">
              {experience.map((job) => (
                <Card
                  key={job.company}
                  className="rounded-2xl border-slate-200 bg-white shadow-sm"
                >
                  <CardContent className="p-6 grid md:grid-cols-[0.32fr_0.68fr] gap-6">
                    <div>
                      <div className="text-3xl font-black text-slate-950">
                        {job.company}
                      </div>
                      <h3 className="text-lg font-bold text-blue-600 mt-2">
                        {job.role}
                      </h3>
                      <p className="text-sm text-slate-500 mt-2">
                        {job.period}
                      </p>
                    </div>

                    <ul className="space-y-3 text-slate-600 leading-7">
                      {job.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <CheckCircle2 className="mt-1 h-5 w-5 text-blue-600 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="py-16 bg-slate-50/70">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader
              eyebrow="Tools & Technologies"
              title="The stack behind the work"
            />

            <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                  {tools.map(({ name, icon: Icon }) => (
                    <div
                      key={name}
                      className="rounded-2xl border border-slate-100 bg-white p-4 text-center hover:border-blue-200 hover:bg-blue-50/40 transition"
                    >
                      <Icon className="mx-auto h-7 w-7 text-blue-600" />
                      <div className="mt-3 text-sm font-semibold text-slate-700">
                        {name}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {skills.map((skill) => (
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

        <section id="contact" className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <Card className="rounded-[2rem] border-blue-100 bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-2xl shadow-blue-600/20">
              <CardContent className="p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <p className="text-blue-100 text-sm font-bold uppercase tracking-[0.25em]">
                    Open to roles
                  </p>
                  <h2 className="mt-3 text-3xl md:text-4xl font-black">
                    Analytics Engineer · BIE · Finance Analytics
                  </h2>
                  <p className="mt-4 text-blue-50 max-w-3xl leading-7">
                    Best fit: roles where business ambiguity, SQL-heavy
                    pipelines, finance logic, and stakeholder communication all
                    meet.
                  </p>

                  <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm text-blue-50">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" /> madhvika.sehgal@gmail.com
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> Seattle, WA
                    </div>
                    <div className="flex items-center gap-2">
                      <BriefcaseBusiness className="h-4 w-4" /> linkedin.com/in/madhvika-sehgal
                    </div>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  className="rounded-xl bg-white text-blue-700 hover:bg-blue-50 px-6 py-6 font-bold"
                >
                  <Mail className="mr-2 h-4 w-4" /> Contact Me
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}