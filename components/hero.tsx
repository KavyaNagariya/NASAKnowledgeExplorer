'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(11, 61, 145, 0.15) 0%, rgba(5, 7, 13, 0.95) 100%), url("https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Explore the Universe
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover NASA&apos;s latest missions, stunning space imagery, and fascinating cosmic discoveries
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/learn"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all hover:scale-105"
          >
            Explore Now 🚀
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold text-lg hover:bg-primary/10 transition-all hover:scale-105"
          >
            Take a Quiz
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
