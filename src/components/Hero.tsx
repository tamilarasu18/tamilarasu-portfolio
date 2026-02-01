"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Typewriter from "./Typewriter";

export default function Hero() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center pt-32 pb-16 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/avatar.png"
                alt="Tamilarasu - Full Stack Developer"
                width={320}
                height={320}
                priority
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative ring */}
            <div className="absolute inset-0 w-64 h-64 lg:w-80 lg:h-80 rounded-full border-4 border-[#2563EB]/20 -z-10 translate-x-2 translate-y-2" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[#2563EB] font-semibold mb-4 text-lg"
            >
              Hello, I&apos;m
            </motion.p>
            <h1 className="text-5xl lg:text-7xl font-bold text-[#09090B] mb-4 font-[family-name:var(--font-archivo)]">
              Tamilarasu
            </h1>
            <h2 className="text-2xl lg:text-3xl text-[#3F3F46] mb-6 font-medium h-10">
              <Typewriter text="Full Stack Developer" speed={80} />
            </h2>
            <p className="text-[#71717A] max-w-2xl text-lg leading-relaxed mb-8">
              Results-driven developer with{" "}
              <strong className="text-[#09090B]">4+ years</strong> of hands-on
              experience in Flutter, React, Next.js, and backend development
              using FastAPI and MongoDB. Passionate about leveraging{" "}
              <strong className="text-[#09090B]">AI and automation</strong> to
              build impactful solutions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-[#2563EB] text-white rounded-xl font-semibold hover:bg-[#1D4ED8] transition-colors duration-200 cursor-pointer shadow-lg hover:shadow-xl text-center"
              >
                Get in Touch
              </motion.a>
              <motion.a
                href="#experience"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border-2 border-[#E4E4E7] text-[#3F3F46] rounded-xl font-semibold hover:border-[#2563EB] hover:text-[#2563EB] transition-all duration-200 cursor-pointer text-center"
              >
                View Experience
              </motion.a>
            </div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-8 mt-10 justify-center lg:justify-start"
            >
              <div className="text-center">
                <p className="text-3xl font-bold text-[#2563EB]">4+</p>
                <p className="text-[#71717A] text-sm">Years Exp</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#2563EB]">10+</p>
                <p className="text-[#71717A] text-sm">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#2563EB]">4</p>
                <p className="text-[#71717A] text-sm">Companies</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
