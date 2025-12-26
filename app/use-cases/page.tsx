'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  FileText,
  Users,
  MessageSquare,
  Bot,
  Code2,
  Scan,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const useCases = [
  {
    id: 'company-rag',
    name: 'Company RAG',
    icon: FileText,
    description: 'Intelligent document retrieval and analysis powered by Retrieval-Augmented Generation',
    longDescription: 'Transform your enterprise knowledge management with AI-powered document retrieval. Our Company RAG solution enables employees to instantly find and synthesize information from thousands of documents, policies, and procedures.',
    features: [
      'Semantic search across all company documents',
      'Real-time answer generation from multiple sources',
      'Automatic document indexing and updates',
      'Role-based access control',
      'Multi-language support',
    ],
    benefits: ['90% faster information retrieval', 'Reduced training time', 'Improved decision making'],
    image: '/images/ai-agent-business-intelligence.jpg',
  },
  {
    id: 'employment-training',
    name: 'Employment Training',
    icon: Users,
    description: 'AI-powered training and onboarding solutions for modern enterprises',
    longDescription: 'Revolutionize employee training with personalized AI-driven learning paths. Our solution adapts to each learner\'s pace and style, ensuring maximum knowledge retention and skill development.',
    features: [
      'Personalized learning paths',
      'Interactive AI tutoring',
      'Progress tracking and analytics',
      'Automated assessment generation',
      'Integration with existing LMS',
    ],
    benefits: ['50% reduction in training time', 'Higher completion rates', 'Measurable skill improvement'],
    image: '/images/ai-agent-customer-service.jpg',
  },
  {
    id: 'automated-posts',
    name: 'Automated Posts',
    icon: MessageSquare,
    description: 'Smart content generation and scheduling for social media and communications',
    longDescription: 'Automate your content creation and distribution with AI that understands your brand voice. Generate engaging posts, schedule across platforms, and analyze performance—all with minimal human intervention.',
    features: [
      'AI-powered content generation',
      'Multi-platform scheduling',
      'Brand voice consistency',
      'Performance analytics',
      'A/B testing automation',
    ],
    benefits: ['10x content output', 'Consistent brand messaging', 'Data-driven optimization'],
    image: '/images/ai-agent-workflow-automation.jpg',
  },
  {
    id: 'offline-chatbot',
    name: 'Offline Chatbot',
    icon: Bot,
    description: 'On-premise AI assistant solutions for secure, air-gapped environments',
    longDescription: 'Deploy powerful AI assistants in environments where cloud connectivity isn\'t possible or desired. Our offline chatbot runs entirely on your infrastructure, ensuring data never leaves your premises.',
    features: [
      'Fully on-premise deployment',
      'No internet connection required',
      'Enterprise-grade security',
      'Custom knowledge base integration',
      'Multi-language support',
    ],
    benefits: ['Complete data sovereignty', 'Zero latency responses', 'Regulatory compliance'],
    image: '/images/atlas-ai-agent.jpg',
  },
  {
    id: 'code-assistant',
    name: 'Code Assistant',
    icon: Code2,
    description: 'AI-powered development tools for faster, better code',
    longDescription: 'Supercharge your development team with an AI coding assistant that understands your codebase. Get intelligent suggestions, automated code reviews, and instant documentation generation.',
    features: [
      'Context-aware code completion',
      'Automated code review',
      'Bug detection and fixes',
      'Documentation generation',
      'Multi-language support',
    ],
    benefits: ['40% faster development', 'Fewer bugs in production', 'Consistent code quality'],
    image: '/images/atlas-code-agent.jpg',
  },
  {
    id: 'face-recognition',
    name: 'Face Recognition',
    icon: Scan,
    description: 'Advanced biometric identification for security and access control',
    longDescription: 'Implement state-of-the-art face recognition technology for secure access control, attendance tracking, and identity verification. Our solution offers unmatched accuracy even in challenging conditions.',
    features: [
      'Real-time face detection',
      '99.9% recognition accuracy',
      'Liveness detection',
      'Multi-face tracking',
      'Edge device support',
    ],
    benefits: ['Enhanced security', 'Contactless access', 'Fraud prevention'],
    image: '/images/face-detection.jpg',
  },
];

export default function UseCasesPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[50vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-ayonix-forest via-ayonix-teal to-ayonix-teal-light" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={heroInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-8"
          >
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Putting Agents to Work</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Use Cases
          </h1>
          <p className="text-xl md:text-2xl text-ayonix-mint mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover how Ayonix AI agents transform your business operations across industries
          </p>
        </motion.div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {useCases.map((useCase, index) => (
              <UseCaseCard key={useCase.id} useCase={useCase} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ayonix-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's discuss how Ayonix AI agents can solve your specific challenges
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
                <Link href="/demos">
                  Try Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function UseCaseCard({ useCase, index }: { useCase: typeof useCases[0]; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
    >
      <div className={`grid lg:grid-cols-2 gap-0 ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
        {/* Image Section */}
        <div className={`relative h-80 lg:h-auto ${!isEven ? 'lg:col-start-2' : ''}`}>
          <Image
            src={useCase.image}
            alt={useCase.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <div className="w-14 h-14 bg-ayonix-teal rounded-xl flex items-center justify-center">
              <useCase.icon className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className={`p-8 lg:p-12 flex flex-col justify-center ${!isEven ? 'lg:col-start-1' : ''}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {useCase.name}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {useCase.longDescription}
          </p>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
            <div className="grid grid-cols-1 gap-2">
              {useCase.features.map((feature) => (
                <div key={feature} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-ayonix-teal flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap gap-2 mb-6">
            {useCase.benefits.map((benefit) => (
              <span
                key={benefit}
                className="px-3 py-1 bg-ayonix-cream text-ayonix-teal rounded-full text-sm font-medium"
              >
                {benefit}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <Link href={`/use-cases/${useCase.id}`}>
              <Button className="bg-ayonix-teal hover:bg-ayonix-teal-dark text-white rounded-full">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/inquiry">
              <Button variant="outline" className="border-ayonix-teal text-ayonix-teal hover:bg-ayonix-cream rounded-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
