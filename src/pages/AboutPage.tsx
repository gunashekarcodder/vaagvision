import { motion } from 'framer-motion';
import { Leaf, TreeDeciduous, Target, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Leaf className="w-4 h-4" />
            About This Project
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Growing the Future
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Urban Soil Suitability Mapping for Sustainable Tree Plantation & Agriculture.
            This web application helps cities decide where to plant trees and grow food today
            so future generations inherit a living ecosystem.
          </p>

          <div className="space-y-8">
            <Section icon={Target} title="The Problem">
              Urban areas lose tree plantation programs because soil conditions are never checked.
              Random planting leads to wasted resources, ecological loss, and no benefit for future generations.
              Cities don't know where soil can actually support life.
            </Section>

            <Section icon={Leaf} title="Our Solution">
              A transparent, rule-based web application that evaluates urban soil zones and classifies
              them as Green (ready to plant), Yellow (needs improvement), or Red (restore first).
              No AI, no ML — just clear ecological rules that anyone can understand and trust.
            </Section>

            <Section icon={TreeDeciduous} title="Future Generation Impact">
              Every zone shows a clear message about its 20–30 year potential. This prevents
              greenwashing and "show-off" plantation drives. Only zones that can genuinely support
              future ecology get the green signal.
            </Section>

            <Section icon={Users} title="Who Benefits">
              City planners, environmental organizations, community groups, and citizens who want
              to make informed decisions about urban greening. This tool brings data-driven
              sustainability to everyone.
            </Section>
          </div>

          <div className="mt-12 p-6 rounded-xl bg-card border shadow-soft text-center">
            <blockquote className="font-display text-xl font-semibold text-foreground italic mb-4">
              "Planting trees blindly is not sustainability.<br />
              Planting trees where soil can support future life is sustainability."
            </blockquote>
            <Link to="/map">
              <Button className="gap-2">
                Start Mapping <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h2 className="font-display font-bold text-lg text-foreground mb-1">{title}</h2>
        <p className="text-muted-foreground leading-relaxed">{children}</p>
      </div>
    </div>
  );
}
