'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Building2,
  FileText,
  Users,
  Calendar,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Zap,
  Target,
  BarChart3,
  Search,
  Database,
  MessageSquare,
} from 'lucide-react';

interface UseCase {
  title: string;
  description: string;
  icon: any;
  imageUrl: string;
  benefits: string[];
  features: string[];
}

const useCases: UseCase[] = [
  {
    title: 'Document Processing & RAG',
    description:
      'Advanced Retrieval-Augmented Generation (RAG) system that intelligently processes, indexes, and retrieves information from vast document repositories. Transform your knowledge base into an intelligent assistant.',
    icon: FileText,
    imageUrl: 'https://cdn.abacus.ai/images/dc7a6d99-849f-4c4a-a8f8-e84eaa679f41.png',
    benefits: [
      'Process thousands of documents in minutes',
      'Instant knowledge retrieval across all documents',
      'Reduce document search time by 90%',
      'Automatic information extraction and summarization',
      'Context-aware intelligent responses',
    ],
    features: [
      'Multi-format support (PDF, Word, Excel, PowerPoint)',
      'Semantic search with natural language queries',
      'Automatic document categorization and tagging',
      'Real-time document indexing',
      'Version control and change tracking',
      'Custom knowledge base creation',
    ],
  },
  {
    title: 'Meeting Collaboration & Management',
    description:
      'Intelligent meeting assistant that captures discussions, generates action items, schedules follow-ups, and ensures nothing falls through the cracks. Transform meetings into productive outcomes.',
    icon: Users,
    imageUrl: 'https://cdn.abacus.ai/images/4c5f023d-44c0-4648-89d8-6a28cfb76d9a.png',
    benefits: [
      'Automatic meeting transcription and summarization',
      'Action item extraction and assignment',
      'Increase meeting productivity by 50%',
      'Never miss important decisions or commitments',
      'Seamless calendar integration',
    ],
    features: [
      'Real-time transcription and note-taking',
      'AI-powered meeting summaries',
      'Automatic action item detection',
      'Smart scheduling with availability analysis',
      'Integration with popular meeting platforms',
      'Meeting analytics and insights',
    ],
  },
  {
    title: 'HR Onboarding & Assistance',
    description:
      'Streamlined employee onboarding experience with AI-guided processes, automated paperwork, and personalized training paths. Welcome new team members with confidence.',
    icon: Briefcase,
    imageUrl: 'https://cdn.abacus.ai/images/dfe82586-a1ce-415e-a37a-3d284c3d02d9.png',
    benefits: [
      'Reduce onboarding time by 60%',
      'Consistent onboarding experience',
      'Automated compliance tracking',
      'Personalized training recommendations',
      'Increased new hire engagement',
    ],
    features: [
      'Digital onboarding workflows',
      'Automated document collection',
      'Training module assignment',
      'Progress tracking dashboards',
      '24/7 AI onboarding assistant',
      'Integration with HRIS systems',
    ],
  },
  {
    title: 'Project Management Support',
    description:
      'AI-powered project management assistant that optimizes resource allocation, predicts bottlenecks, and keeps projects on track. Deliver projects faster with intelligent insights.',
    icon: Target,
    imageUrl: 'https://cdn.abacus.ai/images/a463902b-6c16-4425-96b5-8652a6b9e836.png',
    benefits: [
      'Improve project delivery time by 40%',
      'Early risk detection and mitigation',
      'Optimized resource utilization',
      'Real-time project health insights',
      'Automated status reporting',
    ],
    features: [
      'AI-driven task prioritization',
      'Resource allocation optimization',
      'Risk prediction and alerts',
      'Dependency management',
      'Automated progress tracking',
      'Integration with project tools',
    ],
  },
];

const additionalCapabilities = [
  {
    icon: Search,
    title: 'Enterprise Search',
    description: 'Unified search across all corporate systems and documents with AI-powered relevance ranking.',
  },
  {
    icon: Database,
    title: 'Knowledge Management',
    description: 'Centralized knowledge base with automatic updates and intelligent recommendations.',
  },
  {
    icon: MessageSquare,
    title: 'Internal Communications',
    description: 'AI-powered communication tools that enhance collaboration and reduce email overload.',
  },
  {
    icon: BarChart3,
    title: 'Business Intelligence',
    description: 'Automated reporting and insights from corporate data for better decision-making.',
  },
  {
    icon: Zap,
    title: 'Workflow Automation',
    description: 'Automate repetitive tasks and processes to free up time for strategic work.',
  },
  {
    icon: TrendingUp,
    title: 'Performance Analytics',
    description: 'Track team performance and operational metrics with AI-powered insights.',
  },
];

function UseCaseSection({ useCase, index }: { useCase: UseCase; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="mb-24"
    >
      <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
        <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-400/20 z-10" />
            <Image
              src={useCase.imageUrl}
              alt={useCase.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mb-6">
            <useCase.icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">{useCase.title}</h3>
          <p className="text-lg text-gray-600 mb-6">{useCase.description}</p>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
              Key Benefits
            </h4>
            <div className="space-y-2">
              {useCase.benefits.map((benefit) => (
                <div key={benefit} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Target className="w-5 h-5 text-blue-600 mr-2" />
              Core Features
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {useCase.features.map((feature) => (
                <div key={feature} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CorporateAIPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [capabilitiesRef, capabilitiesInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 60, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -50, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={heroInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8"
          >
            <Building2 className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Corporate AI Solutions</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
          >
            Supercharge Your Business with
            <br />
            <span className="text-blue-200">AI-Powered Operations</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-50 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Transform your corporate operations with intelligent AI agents that automate workflows,
            enhance collaboration, and unlock insights from your enterprise knowledge base.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="https://rag.ayonix.com" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8">
                Try Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/inquiry">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-gray-800 dark:text-white bg-white/90 hover:bg-white text-lg px-8"
              >
                Contact Sales
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/20"
          >
            {[
              { value: '3x', label: 'Productivity Boost' },
              { value: '90%', label: 'Faster Search' },
              { value: '50%', label: 'Time Saved' },
              { value: '1000+', label: 'Enterprises' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Complete Corporate AI Suite
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From document processing to project management, our AI agents handle the heavy lifting
              so your team can focus on what matters most.
            </p>
          </motion.div>

          {useCases.map((useCase, index) => (
            <UseCaseSection key={useCase.title} useCase={useCase} index={index} />
          ))}
        </div>
      </section>

      {/* Additional Capabilities */}
      <section
        ref={capabilitiesRef}
        className="py-24 bg-gradient-to-br from-blue-600 to-blue-400 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={capabilitiesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Additional Capabilities</h2>
            <p className="text-xl text-blue-50 max-w-3xl mx-auto">
              Comprehensive features to support all aspects of corporate operations and collaboration.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalCapabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 30 }}
                animate={capabilitiesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <capability.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{capability.title}</h3>
                <p className="text-blue-50">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Ready to Transform Your Corporate Operations?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of enterprises that trust ATLAS AI for smarter, more efficient business operations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="https://rag.ayonix.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/solutions">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8"
                >
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  Back to Solutions
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
