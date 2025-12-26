'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Landmark,
  Users,
  FileCheck,
  Globe,
  Shield,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Target,
  BarChart3,
  Clock,
  Search,
  MessageSquare,
  Building,
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
    title: 'Digital Government Services Platform',
    description:
      'Comprehensive digital service delivery platform that enables citizens to access government services 24/7. Streamline bureaucracy with intelligent self-service kiosks and online portals powered by AI.',
    icon: Globe,
    imageUrl: 'https://cdn.abacus.ai/images/7d16b345-fe9f-40fe-adc3-0eebeb655241.png',
    benefits: [
      'Reduce service delivery time by 75%',
      'Increase citizen satisfaction by 60%',
      'Lower operational costs by 50%',
      '24/7 service availability',
      'Accessible to all citizens',
    ],
    features: [
      'Multi-lingual support for diverse populations',
      'Accessible design for disabilities',
      'Integration with existing government systems',
      'Secure authentication and identity verification',
      'Mobile-first responsive design',
      'Real-time application status tracking',
    ],
  },
  {
    title: 'Citizen Service Portal & Inquiry Handling',
    description:
      'Intelligent portal that helps citizens find information, submit requests, and get answers to common questions. AI chatbot handles routine inquiries while complex cases are routed to appropriate departments.',
    icon: MessageSquare,
    imageUrl: 'https://cdn.abacus.ai/images/88d25a0e-bd09-4e91-a2e5-7264f5c0faca.png',
    benefits: [
      'Handle 85% of inquiries automatically',
      'Reduce response time from days to minutes',
      'Improve transparency and trust',
      'Free up staff for complex cases',
      'Consistent service quality',
    ],
    features: [
      'Natural language query understanding',
      'Intelligent routing and escalation',
      'Knowledge base management',
      'Multi-channel support (web, mobile, phone)',
      'Sentiment analysis for priority handling',
      'Automated response generation',
    ],
  },
  {
    title: 'Document Verification & Processing',
    description:
      'AI-powered document verification system that authenticates certificates, licenses, and official documents. Prevents fraud while accelerating processing times for legitimate requests.',
    icon: FileCheck,
    imageUrl: 'https://cdn.abacus.ai/images/b2aa584e-eb35-48d0-8dd9-201e3ccec774.png',
    benefits: [
      'Verify documents in seconds',
      'Reduce fraud by 90%',
      'Lower processing costs by 65%',
      'Improve data accuracy',
      'Streamlined audit trails',
    ],
    features: [
      'OCR and document digitization',
      'Authenticity verification',
      'Cross-reference with official databases',
      'Automated data extraction',
      'Blockchain-based verification',
      'Secure document storage',
    ],
  },
  {
    title: 'Public Safety & Emergency Response',
    description:
      'AI-enhanced emergency management system that coordinates response efforts, predicts incidents, and optimizes resource deployment. Keep communities safe with intelligent monitoring and rapid response.',
    icon: Shield,
    imageUrl: 'https://cdn.abacus.ai/images/71c96f08-e6c7-4324-8d19-e9e524b49ce1.png',
    benefits: [
      'Faster emergency response times',
      'Predictive incident prevention',
      'Optimized resource allocation',
      'Enhanced situational awareness',
      'Better inter-agency coordination',
    ],
    features: [
      'Real-time incident monitoring',
      'Predictive analytics for crime prevention',
      'Automated dispatch optimization',
      'Multi-agency coordination',
      'Emergency communication systems',
      'Post-incident analysis and reporting',
    ],
  },
];

const additionalCapabilities = [
  {
    icon: Search,
    title: 'Public Records Search',
    description: 'Efficient search and retrieval of public records with AI-powered relevance ranking.',
  },
  {
    icon: BarChart3,
    title: 'Government Analytics',
    description: 'Data-driven insights for policy making and operational efficiency.',
  },
  {
    icon: Building,
    title: 'Infrastructure Management',
    description: 'AI-optimized management of public infrastructure and assets.',
  },
  {
    icon: Users,
    title: 'Citizen Engagement',
    description: 'Enhanced citizen participation through digital engagement platforms.',
  },
  {
    icon: Clock,
    title: 'Permit Processing',
    description: 'Automated permit review and approval workflows.',
  },
  {
    icon: TrendingUp,
    title: 'Resource Optimization',
    description: 'Intelligent allocation of government resources based on demand.',
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

export default function GovernmentAIPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [capabilitiesRef, capabilitiesInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
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
            <Landmark className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Government AI Solutions</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
          >
            Modernize Public Services with
            <br />
            <span className="text-blue-200">Intelligent AI Agents</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-50 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Transform government operations with AI-driven solutions that enhance citizen services,
            increase transparency, and deliver cost-effective digital transformation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="https://govai.ayonix.com" target="_blank" rel="noopener noreferrer">
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
              { value: '75%', label: 'Faster Services' },
              { value: '50%', label: 'Cost Savings' },
              { value: '60%', label: 'Higher Satisfaction' },
              { value: '100+', label: 'Government Agencies' },
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
              Comprehensive Government AI Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From citizen services to public safety, our AI agents help government agencies
              deliver better outcomes for their communities.
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
              Comprehensive features to support all aspects of modern government operations.
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
              Ready to Transform Your Government Services?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join progressive government agencies that trust ATLAS AI to deliver better citizen
              services and operational efficiency.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="https://govai.ayonix.com" target="_blank" rel="noopener noreferrer">
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
