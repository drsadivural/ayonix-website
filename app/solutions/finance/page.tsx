'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DollarSign,
  Shield,
  TrendingUp,
  Users,
  PieChart,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Target,
  BarChart3,
  Lock,
  Briefcase,
  CreditCard,
  FileCheck,
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
    title: 'Fraud Detection & Prevention',
    description:
      'Real-time fraud monitoring system powered by AI that analyzes transaction patterns, identifies anomalies, and prevents fraudulent activities before they impact your business. Stay ahead of sophisticated fraud schemes.',
    icon: Shield,
    imageUrl: 'https://cdn.abacus.ai/images/db73a751-d82c-4a72-b351-1b2038a56ff4.png',
    benefits: [
      'Detect fraud in real-time with 99.5% accuracy',
      'Reduce false positives by 70%',
      'Prevent losses with proactive alerts',
      'Continuous learning from new patterns',
      'Compliance with regulatory requirements',
    ],
    features: [
      'Real-time transaction monitoring',
      'Behavioral analytics and pattern recognition',
      'Multi-factor authentication analysis',
      'Geolocation and device fingerprinting',
      'Network analysis for organized fraud',
      'Automated case management',
    ],
  },
  {
    title: 'Financial Analytics & Market Intelligence',
    description:
      'Advanced AI-powered analytics platform that processes market data, generates insights, and provides actionable intelligence for trading and investment decisions. Make data-driven decisions with confidence.',
    icon: BarChart3,
    imageUrl: 'https://cdn.abacus.ai/images/09bff807-f47b-49df-adf4-59e443c17ae2.png',
    benefits: [
      'Real-time market sentiment analysis',
      'Improved trading performance by 45%',
      'Risk-adjusted return optimization',
      'Early trend identification',
      'Comprehensive market coverage',
    ],
    features: [
      'Multi-asset class analytics',
      'Sentiment analysis from news and social media',
      'Predictive modeling and forecasting',
      'Risk exposure analysis',
      'Custom alert configuration',
      'Integration with trading platforms',
    ],
  },
  {
    title: 'Investment Portfolio Management',
    description:
      'Intelligent portfolio management system that optimizes asset allocation, rebalances portfolios, and provides personalized investment recommendations based on risk profile and financial goals.',
    icon: PieChart,
    imageUrl: 'https://cdn.abacus.ai/images/2ab7624f-8dac-4094-ba6b-a28a5f4f8fc3.png',
    benefits: [
      'Automated portfolio rebalancing',
      'Enhanced risk-adjusted returns',
      'Tax-loss harvesting optimization',
      'Real-time performance tracking',
      'Personalized investment strategies',
    ],
    features: [
      'AI-driven asset allocation',
      'Risk assessment and profiling',
      'ESG integration capabilities',
      'Tax optimization strategies',
      'Performance attribution analysis',
      'Regulatory reporting automation',
    ],
  },
  {
    title: 'Banking Customer Service AI',
    description:
      'Comprehensive customer service platform that handles inquiries, processes transactions, and provides personalized financial advice. Deliver exceptional customer experiences 24/7.',
    icon: Users,
    imageUrl: 'https://cdn.abacus.ai/images/9fb59bad-4d68-4723-a2f6-454cbb5b27d5.png',
    benefits: [
      'Resolve 80% of inquiries instantly',
      'Reduce customer wait time by 90%',
      'Increase customer satisfaction by 40%',
      'Available 24/7 across all channels',
      'Seamless human agent handoff',
    ],
    features: [
      'Natural language understanding',
      'Account management and transactions',
      'Personalized product recommendations',
      'Secure authentication protocols',
      'Multi-channel support (chat, voice, email)',
      'Integration with core banking systems',
    ],
  },
];

const additionalCapabilities = [
  {
    icon: Lock,
    title: 'Regulatory Compliance',
    description: 'Automated compliance monitoring and reporting for KYC, AML, and regulatory requirements.',
  },
  {
    icon: CreditCard,
    title: 'Credit Risk Assessment',
    description: 'AI-powered credit scoring and risk evaluation for lending decisions.',
  },
  {
    icon: FileCheck,
    title: 'Document Processing',
    description: 'Automated extraction and processing of financial documents and statements.',
  },
  {
    icon: AlertTriangle,
    title: 'Risk Management',
    description: 'Real-time risk monitoring and mitigation across all financial operations.',
  },
  {
    icon: Briefcase,
    title: 'Wealth Management',
    description: 'Personalized wealth management services with AI-driven insights.',
  },
  {
    icon: TrendingUp,
    title: 'Algorithmic Trading',
    description: 'AI-powered trading algorithms for optimal execution and alpha generation.',
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

export default function FinanceAIPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [capabilitiesRef, capabilitiesInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #059669 50%, #10b981 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/30 rounded-full blur-3xl"
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
            className="absolute top-40 right-20 w-96 h-96 bg-green-400/30 rounded-full blur-3xl"
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
            <DollarSign className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Finance AI Solutions</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
          >
            Revolutionize Financial Services with
            <br />
            <span className="text-emerald-200">AI-Powered Intelligence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-green-50 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Deliver sophisticated fraud detection, intelligent analytics, and personalized financial services
            with AI agents built for the modern financial industry.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="https://finai.ayonix.com" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 text-lg px-8">
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
              { value: '99.5%', label: 'Fraud Detection Accuracy' },
              { value: '70%', label: 'Cost Reduction' },
              { value: '$100B+', label: 'Assets Managed' },
              { value: '200+', label: 'Financial Institutions' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-green-100">{stat.label}</div>
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
              Complete Financial AI Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From fraud detection to wealth management, our AI agents provide the intelligence
              financial institutions need to stay competitive.
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
        className="py-24 bg-gradient-to-br from-green-600 to-emerald-500 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={capabilitiesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Additional Capabilities</h2>
            <p className="text-xl text-green-50 max-w-3xl mx-auto">
              Comprehensive features to support all aspects of modern financial services.
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
                <p className="text-green-50">{capability.description}</p>
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
              Ready to Transform Your Financial Services?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join leading financial institutions that trust ATLAS AI for secure, intelligent, and compliant operations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="https://finai.ayonix.com" target="_blank" rel="noopener noreferrer">
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
