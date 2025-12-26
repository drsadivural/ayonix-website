'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  FileText,
  CheckCircle2,
  Search,
  Database,
  Shield,
  Zap,
  Globe,
  Users,
} from 'lucide-react';

export default function CompanyRAGPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-ayonix-forest via-ayonix-teal to-ayonix-teal-light" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-ayonix-teal/20 rounded-full border border-ayonix-teal/30 mb-6">
              <FileText className="w-4 h-4 text-ayonix-teal" />
              <span className="text-ayonix-teal text-sm font-medium">Use Case</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Company RAG
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Intelligent document retrieval and analysis powered by Retrieval-Augmented Generation. Transform how your organization accesses and utilizes knowledge.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-ayonix-teal text-white hover:bg-ayonix-teal-dark rounded-full"
              >
                <Link href="/inquiry">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-ayonix-teal text-ayonix-teal hover:bg-ayonix-teal hover:text-white rounded-full"
              >
                <Link href="/demos">
                  Watch Demo
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/ai-agent-business-intelligence.jpg"
              alt="Company RAG"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-ayonix-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Challenge
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enterprises struggle with scattered information across thousands of documents, making it difficult for employees to find accurate answers quickly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Information Silos',
                description: 'Critical knowledge trapped in disconnected systems and documents',
              },
              {
                title: 'Time Wasted',
                description: 'Employees spend hours searching for information instead of working',
              },
              {
                title: 'Inconsistent Answers',
                description: 'Different sources provide conflicting information',
              },
            ].map((problem, i) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{problem.title}</h3>
                <p className="text-gray-600">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ayonix Company RAG uses advanced AI to understand, index, and retrieve information from your entire document ecosystem.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Search, title: 'Semantic Search', description: 'Find information based on meaning, not just keywords' },
              { icon: Database, title: 'Unified Knowledge Base', description: 'Connect all your documents in one intelligent system' },
              { icon: Zap, title: 'Instant Answers', description: 'Get accurate responses in seconds, not hours' },
              { icon: Shield, title: 'Enterprise Security', description: 'Role-based access control and data encryption' },
              { icon: Globe, title: 'Multi-Language', description: 'Search and retrieve in any language' },
              { icon: Users, title: 'Team Collaboration', description: 'Share knowledge across departments seamlessly' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-ayonix-cream rounded-2xl p-8 hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-ayonix-teal rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-ayonix-forest text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Proven Results
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: '90%', label: 'Faster Information Retrieval' },
              { value: '75%', label: 'Reduction in Support Tickets' },
              { value: '60%', label: 'Less Time in Meetings' },
              { value: '3x', label: 'Increase in Productivity' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-ayonix-mint mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Knowledge Management?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's discuss how Company RAG can help your organization
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-ayonix-teal hover:bg-ayonix-teal-dark text-white rounded-full px-8"
              >
                <Link href="/inquiry">
                  Contact Sales
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-ayonix-teal text-ayonix-teal hover:bg-ayonix-teal hover:text-white rounded-full px-8"
              >
                <Link href="/use-cases">
                  View All Use Cases
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
