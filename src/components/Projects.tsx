"use client";

import { motion } from "framer-motion";

type ProjectLink = {
  label: string;
  href: string;
};

type Project = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
  icon: React.ReactNode;
};

const projects: Project[] = [
  {
    title: "GSTZap",
    subtitle: "E-commerce GST Filing Automation",
    description:
      "Turns raw Amazon, Flipkart & Meesho sales reports into a ready-to-file GSTR-1 JSON in seconds. Auto-calculates CGST / SGST / IGST splits across all GST tables and runs fully offline in the browser for complete data privacy.",
    tags: ["Amazon", "Flipkart", "Meesho", "GSTR-1"],
    links: [{ label: "Visit Site", href: "https://gstzap.vercel.app/" }],
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 14l2 2 4-4m1 8H7a2 2 0 01-2-2V6a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V18a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    title: "Dynamic QR Generator",
    subtitle: "Create & Track QR Codes",
    description:
      "Generate customizable QR codes whose destination can be updated anytime without reprinting. Built-in analytics track every scan so you can monitor campaign performance in real time.",
    tags: ["QR Codes", "Analytics", "Tracking"],
    links: [
      { label: "Visit Site", href: "https://dynamic-qr-code.vercel.app" },
    ],
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
        />
      </svg>
    ),
  },
  {
    title: "FarmPilot",
    subtitle: "Smart Farming Management",
    description:
      "A digital farm management platform that helps farmers plan, organize and track their day-to-day agricultural operations from a single, easy-to-use dashboard.",
    tags: ["AgriTech", "Dashboard", "Management"],
    links: [
      { label: "Visit Site", href: "https://farm-pilot-blue.vercel.app/" },
    ],
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 21v-8m0 0C9 13 6 11 6 7c4 0 6 2 6 6zm0 0c0-5 3-7 6-7 0 4-3 6-6 6z"
        />
      </svg>
    ),
  },
  {
    title: "RestroCaptain POS",
    subtitle: "Hotel Management Suite",
    description:
      "An end-to-end hotel & restaurant POS ecosystem built across three connected apps — an admin dashboard to run daily operations, inventory & stock control, and a customer-facing ordering experience.",
    tags: ["POS", "Inventory", "Multi-App"],
    links: [
      { label: "Admin", href: "https://hotel-pos-amdin-v2.vercel.app/" },
      {
        label: "Stock",
        href: "https://hotel-pos-stock-management-v2.vercel.app",
      },
      { label: "Customer", href: "https://hotel-pos-customer-v2.vercel.app/" },
    ],
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0V11a2 2 0 012-2h0a2 2 0 012 2v10M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 4h4m-4 0v6m4-6v6"
        />
      </svg>
    ),
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-[#F4F4F5]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#09090B] mb-4 font-[family-name:var(--font-archivo)]">
            Projects
          </h2>
          <p className="text-[#71717A] text-lg max-w-2xl mx-auto">
            A selection of products and tools I&apos;ve designed, built and
            shipped.
          </p>
        </motion.div>

        {/* Featured project */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-[#E4E4E7] overflow-hidden relative mb-8"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#EFF6FF] to-transparent rounded-full transform translate-x-32 -translate-y-32" />

          <div className="relative z-10">
            <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wide uppercase text-[#2563EB] bg-[#EFF6FF] rounded-full">
              Featured
            </span>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#EFF6FF] rounded-2xl flex items-center justify-center shrink-0">
                <svg
                  className="w-8 h-8 text-[#2563EB]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#09090B] font-[family-name:var(--font-archivo)]">
                  Story-to-Video Pipeline
                </h3>
                <p className="text-[#71717A]">Automated AI Content Creation</p>
              </div>
            </div>

            <p className="text-[#3F3F46] text-lg leading-relaxed mb-8">
              Created a one-click Story-to-Video generation pipeline that
              combines multiple AI technologies to automatically generate and
              publish content.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {[
                { name: "Gemma3", desc: "Stories" },
                { name: "Kokoro", desc: "Voice" },
                { name: "Whisper", desc: "Subtitles" },
                { name: "Stable Diffusion", desc: "Visuals" },
                { name: "MoviePy", desc: "Video" },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="bg-[#F4F4F5] rounded-xl p-4 text-center hover:bg-[#EFF6FF] transition-colors duration-200"
                >
                  <p className="font-semibold text-[#09090B] text-sm">
                    {tech.name}
                  </p>
                  <p className="text-[#71717A] text-xs">{tech.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#F4F4F5] rounded-xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <svg
                  className="w-6 h-6 text-[#2563EB]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                  />
                </svg>
                <h4 className="font-semibold text-[#09090B]">Infrastructure</h4>
              </div>
              <p className="text-[#3F3F46]">
                Deployed using FastAPI, scheduled and published content to
                YouTube via GCS & YouTube API automation.
              </p>
            </div>

            <motion.a
              href="https://www.youtube.com/@RiseupNarratives-u5j"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-[#FF0000] text-white rounded-xl font-semibold hover:bg-[#CC0000] transition-colors duration-200 cursor-pointer shadow-md"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Visit YouTube Channel
            </motion.a>
          </div>
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg border border-[#E4E4E7] transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-[#EFF6FF] rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <span className="w-7 h-7 text-[#2563EB] [&>svg]:w-full [&>svg]:h-full">
                    {project.icon}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#09090B] font-[family-name:var(--font-archivo)]">
                    {project.title}
                  </h3>
                  <p className="text-[#71717A] text-sm">{project.subtitle}</p>
                </div>
              </div>

              <p className="text-[#3F3F46] leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium text-[#52525B] bg-[#F4F4F5] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-auto">
                {project.links.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#09090B] text-white rounded-lg text-sm font-semibold hover:bg-[#2563EB] transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
