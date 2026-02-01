"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    title: "Full Stack Developer (Contract)",
    company: "Botminds.ai",
    period: "Aug 2025 – Present",
    current: true,
    highlights: [
      "Built enterprise-level UI in Angular and handled C# backend interactions",
      "Developed a Word document editor-like feature as a key challenge",
      "Leveraged AI coding assistants (Antigravity, Claude Code) to boost productivity by 40%",
      "Implemented BMX file management with Gitia for version control",
    ],
  },
  {
    title: "Full Stack Developer (Contract)",
    company: "IVAM Global Solutions",
    period: "July 2024 – July 2025",
    current: false,
    highlights: [
      "KriyaLearn: Developed console dashboard and learning portal with Next.js",
      "Opsverse: Designed real-time AI-powered deployment assistant using React",
      "PlanB Consulting: Migrated SharePoint to React, created D3.js charts",
      "Integrated Azure Container Instances and CosmosDB",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Soulocal Technologies",
    period: "Dec 2023 – July 2024",
    current: false,
    highlights: [
      "Sole frontend developer across three Flutter apps and a Next.js billing web app",
      "Architected entire frontend with responsive UI/UX",
      "Built backend for billing using FastAPI and MongoDB, deployed via AWS",
      "Integrated Razorpay for secure payment processing",
    ],
  },
  {
    title: "Software Development Engineer (SDE-II)",
    company: "Sporfy Indian Private Limited",
    period: "Aug 2021 – Nov 2023",
    current: false,
    highlights: [
      "Engineered 10+ live scoring platforms using Flutter, Next.js, Firebase",
      "Managed Play Store and App Store releases",
      "Led a 3-member pod with sprint planning and deployment pipelines",
      "Recognized with Quarterly Performance Award and promoted",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  },
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#09090B] mb-4 font-[family-name:var(--font-archivo)]">
            Professional Experience
          </h2>
          <p className="text-[#71717A] text-lg max-w-2xl mx-auto">
            My journey through different roles and companies, building scalable
            solutions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#E4E4E7] transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              variants={itemVariants}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-[#2563EB] border-4 border-white shadow-md transform -translate-x-1/2 mt-2" />

              {/* Content */}
              <div
                className={`flex-1 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"} pl-8 md:pl-0`}
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E4E4E7] hover:shadow-lg hover:border-[#2563EB]/20 transition-all duration-300">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-[#09090B]">
                      {exp.title}
                    </h3>
                    {exp.current && (
                      <span className="px-3 py-1 bg-[#DCFCE7] text-[#166534] text-xs font-semibold rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-[#2563EB] font-semibold mb-1">
                    {exp.company}
                  </p>
                  <p className="text-[#71717A] text-sm mb-4">{exp.period}</p>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex gap-2 text-[#3F3F46] text-sm">
                        <svg
                          className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 bg-[#EFF6FF] rounded-2xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-[#2563EB] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-[#09090B] mb-2 font-[family-name:var(--font-archivo)]">
            B.Tech in Information Technology
          </h3>
          <p className="text-[#3F3F46]">
            Dr. N.G.P Institute of Technology, Coimbatore
          </p>
          <p className="text-[#71717A]">June 2018 – June 2022</p>
        </motion.div>
      </div>
    </section>
  );
}
