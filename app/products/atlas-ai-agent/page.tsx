'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  BarChart3, 
  Workflow,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Bot,
  Clock,
  Shield,
  Zap,
  Target,
  Brain
} from 'lucide-react';

interface UseCase {
  title: string;
  icon: React.ElementType;
  description: string;
  image: string;
  benefits: string[];
  features: string[];
}

const useCases: UseCase[] = [
  {
    title: "Intelligent Customer Service",
    icon: MessageSquare,
    description: "Transform customer support with AI agents that understand context, sentiment, and intent. Provide 24/7 multilingual support with human-like conversations that resolve issues faster.",
    image: "/images/ai-agent-customer-service.jpg",
    benefits: [
      "40% reduction in response time",
      "24/7 availability across all channels",
      "Support for 100+ languages",
      "90% customer satisfaction rate"
    ],
    features: [
      "Natural Language Understanding",
      "Sentiment Analysis",
      "Multi-channel Integration",
      "Automated Ticket Routing",
      "Context-Aware Responses",
      "Seamless Human Handoff"
    ]
  },
  {
    title: "Business Intelligence & Analytics",
    icon: BarChart3,
    description: "Empower decision-makers with AI agents that analyze vast amounts of data, identify trends, and provide actionable insights in real-time. Turn data into competitive advantage.",
    image: "/images/ai-agent-business-intelligence.jpg",
    benefits: [
      "3x faster data analysis",
      "Real-time predictive insights",
      "Automated report generation",
      "95% forecast accuracy"
    ],
    features: [
      "Predictive Analytics",
      "Real-time Dashboards",
      "Automated Reporting",
      "Data Visualization",
      "Trend Detection",
      "KPI Monitoring"
    ]
  },
  {
    title: "Workflow Automation",
    icon: Workflow,
    description: "Automate complex business processes with intelligent agents that handle document processing, email management, scheduling, and cross-system integrations without human intervention.",
    image: "/images/ai-agent-workflow-automation.jpg",
    benefits: [
      "60% time savings on routine tasks",
      "99.9% accuracy in data processing",
      "Zero manual data entry errors",
      "Instant cross-system synchronization"
    ],
    features: [
      "Document Processing",
      "Email Management",
      "Calendar Scheduling",
      "Task Automation",
      "Integration Hub",
      "Process Optimization"
    ]
  },
  {
    title: "Sales & Marketing Automation",
    icon: TrendingUp,
    description: "Drive revenue growth with AI agents that qualify leads, personalize outreach, manage campaigns, and predict customer behavior to optimize conversion rates.",
    image: "/images/atlas-ai-agent.jpg",
    benefits: [
      "50% increase in qualified leads",
      "35% higher conversion rates",
      "Personalized customer journeys",
      "Automated follow-up sequences"
    ],
    features: [
      "Lead Qualification",
      "Personalized Outreach",
      "Campaign Management",
      "Behavioral Prediction",
      "A/B Testing Automation",
      "ROI Optimization"
    ]
  }
];

const additionalCapabilities = [
  {
    icon: Bot,
    title: "Multi-Agent Orchestration",
    description: "Deploy multiple specialized agents that work together seamlessly"
  },
  {
    icon: Clock,
    title: "Real-time Processing",
    description: "Instant responses with millisecond-level latency"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption and compliance with industry standards"
  },
  {
    icon: Zap,
    title: "Scalable Architecture",
    description: "Handle millions of interactions without performance degradation"
  },
  {
    icon: Target,
    title: "Custom Training",
    description: "Fine-tune agents on your specific business data and processes"
  },
  {
    icon: Brain,
    title: "Continuous Learning",
    description: "Agents improve over time by learning from interactions"
  }
];

function UseCaseSection({ useCase, index }: { useCase: UseCase; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const Icon = useCase.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`grid md:grid-cols-2 gap-8 items-center mb-24 ${!isEven ? 'md:grid-flow-dense' : ''}`}
    >
      <div className={`${!isEven ? 'md:col-start-2' : ''}`}>
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={useCase.image}
            alt={useCase.title}
            fill
            className="object-cover"
          />
        </div>
      </div>
      
      <div className={`${!isEven ? 'md:col-start-1 md:row-start-1' : ''}`}>
        <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-blue-500/10 rounded-full">
          <Icon className="w-5 h-5 text-blue-500" />
          <span className="text-blue-500 font-semibold">Use Case {index + 1}</span>
        </div>
        
        <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          {useCase.title}
        </h3>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {useCase.description}
        </p>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Key Benefits</h4>
          <ul className="space-y-2">
            {useCase.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Core Features</h4>
          <div className="flex flex-wrap gap-2">
            {useCase.features.map((feature, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ATLASAIAgentPage() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [capabilitiesRef, capabilitiesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        className="relative py-20 overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600">
          <div className="absolute inset-0">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -90, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl"
            />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Bot className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">ATLAS AI Agent</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Intelligent Autonomous
              <br />
              AI Agents
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Deploy intelligent AI agents that understand, learn, and act autonomously to transform your business operations
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { label: "Faster Response", value: "10x" },
                { label: "Cost Reduction", value: "70%" },
                { label: "Uptime", value: "99.9%" },
                { label: "Global Users", value: "5M+" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                  className="bg-ayonix-teal/80 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-blue-100 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor" className="text-gray-50 dark:text-gray-900"/>
          </svg>
        </div>
      </motion.section>

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Comprehensive Use Cases
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover how ATLAS AI Agent transforms business operations across different domains
            </p>
          </div>

          {useCases.map((useCase, index) => (
            <UseCaseSection key={index} useCase={useCase} index={index} />
          ))}
        </div>
      </section>

      {/* Additional Capabilities */}
      <motion.section
        ref={capabilitiesRef}
        initial={{ opacity: 0 }}
        animate={capabilitiesInView ? { opacity: 1 } : {}}
        className="py-20 bg-gray-100 dark:bg-gray-800/50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
              Additional Capabilities
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Advanced features that set ATLAS AI Agent apart
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalCapabilities.map((capability, idx) => {
              const Icon = capability.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={capabilitiesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                    {capability.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {capability.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Deploy ATLAS AI Agent?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Start transforming your business operations with intelligent AI agents today
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100"
                asChild
              >
                <a href="https://atlas.ayonix.com" target="_blank" rel="noopener noreferrer">
                  Try Demo <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-gray-800 dark:text-white bg-white/90 hover:bg-white"
                asChild
              >
                <Link href="/inquiry">
                  Contact Sales
                </Link>
              </Button>
            </div>
            <div className="mt-8">
              <Link 
                href="/products" 
                className="inline-flex items-center text-white hover:text-blue-100 transition-colors"
              >
                <ArrowLeft className="mr-2 w-5 h-5" />
                Back to All Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
