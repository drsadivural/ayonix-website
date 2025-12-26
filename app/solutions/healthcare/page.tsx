'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Heart,
  Activity,
  Calendar,
  FileText,
  Stethoscope,
  Pill,
  Brain,
  Shield,
  Clock,
  Users,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Zap,
  Target,
  BarChart3,
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
    title: 'Patient Care Monitoring',
    description:
      'Advanced AI-powered monitoring systems that track patient vital signs, predict health deterioration, and alert medical staff in real-time. Ensures continuous care and early intervention for better outcomes.',
    icon: Activity,
    imageUrl: 'https://cdn.abacus.ai/images/b8586d1c-817f-4af9-9ee4-89593aab4093.png',
    benefits: [
      'Real-time vital signs monitoring',
      'Early warning system for deterioration',
      'Automated alert generation',
      'Reduced nurse workload by 40%',
      '24/7 intelligent patient surveillance',
    ],
    features: [
      'Continuous monitoring of heart rate, blood pressure, oxygen levels',
      'ML-based prediction of patient deterioration',
      'Integration with EMR systems',
      'Mobile alerts for medical staff',
      'Historical trend analysis',
      'Customizable alert thresholds',
    ],
  },
  {
    title: 'Medical Records Management',
    description:
      'Intelligent electronic health record (EHR) system that organizes, analyzes, and retrieves patient data instantly. AI-powered search and insights help healthcare providers make informed decisions faster.',
    icon: FileText,
    imageUrl: 'https://cdn.abacus.ai/images/8a931ddd-bf75-4aee-a7d0-b19a0c99c6de.png',
    benefits: [
      'Instant access to complete patient history',
      'Automated data organization',
      'Reduced chart retrieval time by 80%',
      'HIPAA-compliant secure storage',
      'Intelligent data extraction from documents',
    ],
    features: [
      'Natural language search across records',
      'Automatic coding and categorization',
      'Integration with lab systems',
      'Voice-to-text documentation',
      'Smart templates for common procedures',
      'Audit trail and version control',
    ],
  },
  {
    title: 'Telemedicine Consultation',
    description:
      'Comprehensive virtual care platform with AI assistance that enables remote consultations, symptom assessment, and treatment planning. Brings quality healthcare to patients anywhere.',
    icon: Stethoscope,
    imageUrl: 'https://cdn.abacus.ai/images/1b2c3690-e4d8-4356-aac0-d56afa21d783.png',
    benefits: [
      'Increased patient access to specialists',
      'Reduced no-show rates by 60%',
      'Lower operational costs',
      'AI-assisted symptom triage',
      'Seamless prescription management',
    ],
    features: [
      'HD video consultations with screen sharing',
      'AI symptom checker and triage',
      'Digital prescription transmission',
      'Appointment scheduling and reminders',
      'Secure patient-provider messaging',
      'Integration with wearable devices',
    ],
  },
  {
    title: 'Medical Diagnosis Assistance',
    description:
      'AI-powered diagnostic support system that analyzes medical images, lab results, and patient symptoms to assist physicians in accurate diagnosis. Combines multiple data sources for comprehensive insights.',
    icon: Brain,
    imageUrl: 'https://cdn.abacus.ai/images/0e4c1427-2f3e-4f3e-89aa-37c142f78466.png',
    benefits: [
      'Improved diagnostic accuracy by 35%',
      'Faster diagnosis and treatment',
      'Reduced misdiagnosis rates',
      'Support for rare disease identification',
      'Continuous learning from outcomes',
    ],
    features: [
      'Medical image analysis (X-ray, MRI, CT)',
      'Pattern recognition in lab results',
      'Differential diagnosis suggestions',
      'Drug interaction checking',
      'Clinical decision support',
      'Evidence-based treatment recommendations',
    ],
  },
];

const additionalCapabilities = [
  {
    icon: Calendar,
    title: 'Intelligent Scheduling',
    description: 'AI-optimized appointment scheduling that reduces wait times and maximizes resource utilization.',
  },
  {
    icon: Pill,
    title: 'Medication Management',
    description: 'Automated prescription tracking, refill reminders, and drug interaction alerts.',
  },
  {
    icon: Shield,
    title: 'Compliance & Security',
    description: 'HIPAA-compliant infrastructure with end-to-end encryption and audit logging.',
  },
  {
    icon: Users,
    title: 'Care Coordination',
    description: 'Seamless communication between healthcare teams for better patient outcomes.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description: 'Comprehensive insights into patient outcomes, operational efficiency, and quality metrics.',
  },
  {
    icon: Zap,
    title: 'Rapid Deployment',
    description: 'Quick integration with existing systems and minimal training required.',
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
        {/* Image */}
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

        {/* Content */}
        <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mb-6">
            <useCase.icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">{useCase.title}</h3>
          <p className="text-lg text-gray-600 mb-6">{useCase.description}</p>

          {/* Benefits */}
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

          {/* Features */}
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

export default function HealthcareAIPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [capabilitiesRef, capabilitiesInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="bg-white">
      {/* Hero Section with Animated Banner */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #06b6d4 100%)',
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/30 rounded-full blur-3xl"
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
            className="absolute top-40 right-20 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"
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
          <motion.div
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-teal-400/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.25, 1],
              x: [0, 70, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Medical Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='https://lh3.googleusercontent.com/BWwSXvV4LN0Ta6HG1XenEDTm5TnwsPcdWZnJbaNH0aYWJRogW-V7D0BujuJwuDa4c6TcfNzLklDJFzeHNl4jNSXiCjr19Qq8scpGCZrnktYSP6Ns_3x1yMI10rKXZyzghqoySdCt d='M30 0v30M30 30h30M30 30v30M30 30H0' stroke='white' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={heroInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8"
          >
            <Heart className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Healthcare AI Solutions</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
          >
            Transform Healthcare with
            <br />
            <span className="text-cyan-300">Intelligent AI Agents</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-50 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Empower healthcare professionals with AI-powered tools that improve patient outcomes,
            streamline operations, and deliver 24/7 intelligent assistance across all care settings.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="https://healthcare.ayonix.com" target="_blank" rel="noopener noreferrer">
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

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/20"
          >
            {[
              { value: '99.9%', label: 'Uptime' },
              { value: '40%', label: 'Cost Reduction' },
              { value: '24/7', label: 'Availability' },
              { value: '500+', label: 'Healthcare Providers' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Wave Decoration */}
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
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI agents are designed to address the most critical challenges in modern healthcare,
              from patient monitoring to diagnostic support.
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
              Beyond core use cases, our platform offers a comprehensive suite of features to support
              every aspect of healthcare operations.
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
              Ready to Transform Your Healthcare Operations?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join hundreds of healthcare providers who trust ATLAS AI to deliver better patient
              outcomes and operational efficiency.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="https://healthcare.ayonix.com" target="_blank" rel="noopener noreferrer">
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
