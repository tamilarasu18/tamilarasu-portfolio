"use client";

import { motion } from "framer-motion";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-[#F4F4F5]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#09090B] mb-4 font-[family-name:var(--font-archivo)]">
            AI Side Project
          </h2>
          <p className="text-[#71717A] text-lg max-w-2xl mx-auto">
            Exploring the intersection of AI and content creation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-[#E4E4E7] overflow-hidden relative"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#EFF6FF] to-transparent rounded-full transform translate-x-32 -translate-y-32" />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#EFF6FF] rounded-2xl flex items-center justify-center">
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
      </div>
    </section>
  );
}
