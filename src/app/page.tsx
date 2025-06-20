'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'


export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col px-4 py-12 relative"
    style={{
      background: `linear-gradient(to bottom, #fdf29a, #fba58b, #fb918f)`,
      backgroundAttachment: 'fixed',
      backgroundSize: '100% 500%',
    }}>

      {/* NAVBAR */}
      <nav className="absolute top-6 right-6 z-10">
        <a
          href="/resume.pdf"
          download
          className="px-5 py-2 bg-[#f9dbbd] text-[#780000] font-semibold rounded-xl shadow hover:opacity-90 transition"
        >
          Download Resume
        </a>
      </nav>

      {/* HERO SECTION */}
      <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl w-full gap-10 pt-24 md:pt-32">
        {/* LEFT: Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-64 h-64 relative flex-shrink-0"
        >
          <Image
            src="/profile.png"
            alt="Sowmya profile"
            fill
            className="object-contain rounded-full"
          />
        </motion.div>

        {/* RIGHT: Text Content */}
        <motion.div
          className="text-right text-[#000000] flex-1"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 className="text-4xl md:text-5xl font-bold mb-4">
            {'Hi, I’m Sowmya 👋'}
          </motion.h1>

          <motion.p className="text-lg max-w-xl mb-6 text-right ml-auto">
            {'A CS Master’s student at UTD (’25), ex-BNY Mellon, full-stack engineer with a love for ML, Kafka, and clean design. Welcome to my portfolio.'}
          </motion.p>
        </motion.div>
      </div>

      {/* ABOUT ME SECTION (Visible on Scroll) */}
      <motion.section
        id="about"
        className="mt-48 w-full max-w-5xl text-right self-end"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-4 text-[#000000]">About Me</h2>
        <p className="leading-relaxed text-[#000000] text-base md:text-lg">
          {`I'm a Computer Science master’s student at UTD, graduating in 2025. With 3.5 years of experience in the fintech industry — including at BNY Mellon and Bridge Solutions — I've developed and optimized high-throughput backend systems and built full-stack applications with React, Java, Spring Boot, and more.`}
          <br /><br />
          {`My current interests lie in large language models, Spark streaming, and building intelligent systems with clean design and high performance.`}
        </p>
      </motion.section>
    </main>
  )
}
