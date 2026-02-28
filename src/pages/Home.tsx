import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Leaf, Map, TreeDeciduous, Sprout, ArrowRight, Target } from 'lucide-react';

const FEATURES = [
  {
    icon: Map,
    title: 'Interactive Soil Mapping',
    desc: 'Select urban zones on a real city map and assess soil conditions.',
  },
  {
    icon: Target,
    title: 'Rule-Based Evaluation',
    desc: 'Transparent, explainable scoring — no AI or black-box models.',
  },
  {
    icon: TreeDeciduous,
    title: 'Future Impact Analysis',
    desc: 'See how planting decisions today affect ecology for 20–30 years.',
  },
  {
    icon: Sprout,
    title: 'Actionable Recommendations',
    desc: 'Get specific steps to restore, improve, or leverage each zone.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
  }),
};

export default function HomePage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-5" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              Urban Soil Suitability Mapping
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              <span className="text-gradient-hero">Growing the Future</span>
              <br />
              <span className="text-foreground">One Zone at a Time</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Where should cities grow trees and food so future generations inherit
              a living ecosystem? This tool answers that question with transparent,
              rule-based soil analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/map">
                <Button size="lg" className="text-base px-8 gap-2">
                  <Map className="w-5 h-5" />
                  Explore the Map
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="text-base px-8">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pitch line */}
      <section className="border-y bg-card">
        <div className="container mx-auto px-4 py-12 text-center">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-xl md:text-2xl font-semibold text-foreground italic max-w-3xl mx-auto"
          >
            "Planting trees blindly is not sustainability.
            <br />
            Planting trees <span className="text-primary">where soil can support future life</span> is sustainability."
          </motion.blockquote>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">How It Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A simple, transparent workflow from area selection to future-impact analysis.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="p-6 rounded-xl bg-card border shadow-soft hover:shadow-card transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Zone legend */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { color: 'bg-zone-green', emoji: '🟢', label: 'Green Zone', desc: 'Best for trees & farming. Supports future generations.' },
            { color: 'bg-zone-yellow', emoji: '🟡', label: 'Yellow Zone', desc: 'Needs soil improvement. Potential with composting & care.' },
            { color: 'bg-zone-red', emoji: '🔴', label: 'Red Zone', desc: 'Not suitable. Requires soil restoration before planting.' },
          ].map((z) => (
            <div key={z.label} className={`${z.color} rounded-xl p-6 text-primary-foreground`}>
              <span className="text-2xl">{z.emoji}</span>
              <h3 className="font-display font-bold text-lg mt-2">{z.label}</h3>
              <p className="text-primary-foreground/80 text-sm mt-1">{z.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Urban Soil Suitability Mapping — For Sustainable Tree Plantation & Agriculture</p>
          <p className="mt-1">Helping cities decide where to plant today for a greener tomorrow.</p>
        </div>
      </footer>
    </div>
  );
}
