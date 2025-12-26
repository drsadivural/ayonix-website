'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Heart,
  Building2,
  DollarSign,
  Landmark,
  Glasses,
  ArrowRight,
  CheckCircle2,
  Users,
  TrendingUp,
  Shield,
  Video,
  Eye,
  Fingerprint,
  Scan,
  Box,
  Zap,
} from 'lucide-react';

interface Solution {
  id: string;
  icon: any;
  title: string;
  description: string;
  imageUrl: string;
  benefits: string[];
  useCases: string[];
  demoUrl: string;
  detailsUrl: string;
}

const solutions: Solution[] = [
  {
    id: 'healthcare',
    icon: Heart,
    title: 'Healthcare AI Agents',
    description:
      'Transform patient care with AI-powered assistance for medical professionals and healthcare providers.',
    imageUrl:
      'https://cdn.abacus.ai/images/71c96f08-e6c7-4324-8d19-e9e524b49ce1.png',
    benefits: [
      'Improved patient outcomes',
      '24/7 medical assistance',
      'Reduced administrative burden',
      'Enhanced diagnostic accuracy',
    ],
    useCases: [
      'Patient triage and scheduling',
      'Medical records management',
      'Treatment recommendations',
      'Prescription management',
    ],
    demoUrl: 'https://healthcare.ayonix.com',
    detailsUrl: '/solutions/healthcare',
  },
  {
    id: 'corporate',
    icon: Building2,
    title: 'Corporate AI Agents',
    description:
      'Boost productivity and streamline operations with intelligent business automation and workflow optimization.',
    imageUrl:
      'https://cdn.abacus.ai/images/32b38371-2a44-49dd-9e83-4b62647e1634.png',
    benefits: [
      'Increased operational efficiency',
      'Enhanced decision-making',
      'Automated routine tasks',
      'Improved collaboration',
    ],
    useCases: [
      'Document processing',
      'Meeting scheduling and management',
      'HR and onboarding assistance',
      'Project management support',
    ],
    demoUrl: 'https://rag.ayonix.com',
    detailsUrl: '/solutions/corporate',
  },
  {
    id: 'finance',
    icon: DollarSign,
    title: 'Finance Industry AI Agents',
    description:
      'Deliver sophisticated financial analysis, fraud detection, and customer service for banking and fintech.',
    imageUrl:
      'https://cdn.abacus.ai/images/98120cb9-a4d7-4b30-951a-acdda61904b0.png',
    benefits: [
      'Real-time fraud detection',
      'Automated compliance checks',
      'Enhanced customer insights',
      'Risk assessment and management',
    ],
    useCases: [
      'Transaction monitoring',
      'Financial advisory services',
      'Credit risk assessment',
      'Investment recommendations',
    ],
    demoUrl: 'https://finai.ayonix.com',
    detailsUrl: '/solutions/finance',
  },
  {
    id: 'government',
    icon: Landmark,
    title: 'Government AI Agents',
    description:
      'Modernize public services with AI-driven citizen engagement and efficient administrative processes.',
    imageUrl:
      'https://cdn.abacus.ai/images/7664185a-aec6-44dd-a506-66f3c6563ddb.png',
    benefits: [
      'Improved citizen services',
      'Streamlined bureaucracy',
      'Enhanced transparency',
      'Cost-effective operations',
    ],
    useCases: [
      'Citizen inquiry handling',
      'Document verification',
      'Public information access',
      'Service request processing',
    ],
    demoUrl: 'https://govai.ayonix.com',
    detailsUrl: '/solutions/government',
  },
];

function SolutionCard({ solution, index }: { solution: Solution; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      id={solution.id}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="scroll-mt-24"
    >
      <div
        className={`grid md:grid-cols-2 gap-8 items-center ${
          isEven ? '' : 'md:flex-row-reverse'
        }`}
      >
        <div className={isEven ? 'md:order-1' : 'md:order-2'}>
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={solution.imageUrl}
              alt={solution.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className={isEven ? 'md:order-2' : 'md:order-1'}>
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mb-6">
            <solution.icon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {solution.title}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {solution.description}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                Benefits
              </h3>
              <div className="space-y-2">
                {solution.benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-start space-x-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                Use Cases
              </h3>
              <div className="space-y-2">
                {solution.useCases.map((useCase) => (
                  <div
                    key={useCase}
                    className="flex items-start space-x-2"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">
                      {useCase}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href={solution.detailsUrl}>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link 
              href={solution.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-blue-600 hover:bg-blue-700">
                Explore Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SolutionsPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="bg-white">
      {/* Stylish Hero Banner */}
      <section
        ref={heroRef}
        className="relative min-h-[55vh] flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-2xl" />
        </div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
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
            <Building2 className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Industry Solutions</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            AI Solutions by Industry
          </h1>
          <p className="text-xl md:text-2xl text-blue-50 mb-8 max-w-3xl mx-auto leading-relaxed">
            Specialized AI agents tailored to meet the unique challenges of your
            sector
          </p>
        </motion.div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {solutions.map((solution, index) => (
              <SolutionCard
                key={solution.id}
                solution={solution}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ATLAS Smartglass Agent */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/atlas-smartglass.jpg"
                  alt="ATLAS Smartglass Agent"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                <Glasses className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-4">
                ATLAS Smartglass Agent
              </h2>
              <p className="text-xl text-blue-50 mb-6">
                Experience the future of hands-free computing with AI-powered augmented
                reality smart glasses that seamlessly blend physical and digital worlds
              </p>
              <div className="space-y-3 mb-8">
                {[
                  '12MP Ultrawide Camera with 3K Video Recording',
                  'Real-time AI Visual Recognition & Translation',
                  'Voice-Activated AI Assistant',
                  'In-Lens AR Display with Holographic UI',
                  'Neural Gesture Control via Wristband',
                  'Open-Ear Premium Audio',
                  'Extended Battery Life (8+ hours)',
                  'Hands-Free Video Calling & Live Streaming',
                ].map((feature) => (
                  <div key={feature} className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-200 flex-shrink-0" />
                    <span className="text-blue-50">{feature}</span>
                  </div>
                ))}
              </div>
              <Link href="/inquiry">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Request Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Video Analytics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              AI Video Analytics Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive computer vision platform powered by advanced deep learning
              models for real-time video intelligence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Face Detection & Recognition */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg"
            >
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6">
                <Image
                  src="/images/face-detection.jpg"
                  alt="Face Detection & Recognition"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Face Detection & Recognition
              </h3>
              <p className="text-gray-600 mb-4">
                Real-time facial detection and recognition with advanced deep learning
                algorithms for secure access control and identity verification.
              </p>
              <div className="space-y-2">
                {[
                  'Multi-face detection in crowded scenes',
                  'High accuracy facial recognition',
                  'Live face tracking and monitoring',
                  'Age and gender estimation',
                  'Facial landmark detection',
                ].map((feature) => (
                  <div key={feature} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Multimodal Biometric Recognition */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg"
            >
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6">
                <Image
                  src="/images/biometric-recognition.jpg"
                  alt="Multimodal Biometric Recognition"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Fingerprint className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Multimodal Biometrics
              </h3>
              <p className="text-gray-600 mb-4">
                Advanced biometric identification combining multiple authentication
                methods for maximum security and accuracy.
              </p>
              <div className="space-y-2">
                {[
                  'Iris recognition and matching',
                  'Fingerprint biometric integration',
                  'Facial expression analysis',
                  'Multi-factor authentication',
                  'Behavioral pattern recognition',
                ].map((feature) => (
                  <div key={feature} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* YOLO Object Detection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg"
            >
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6">
                <Image
                  src="/images/yolo-object-detection.jpg"
                  alt="YOLO Object Detection"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Scan className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                YOLO Object Detection
              </h3>
              <p className="text-gray-600 mb-4">
                State-of-the-art real-time object detection powered by YOLO (You Only
                Look Once) for instant visual intelligence.
              </p>
              <div className="space-y-2">
                {[
                  'Real-time processing at 155+ FPS',
                  'High accuracy (95%+) object detection',
                  'Multi-scale object recognition',
                  'Single-shot detection architecture',
                  'Support for 80+ object classes',
                ].map((feature) => (
                  <div key={feature} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Video Analytics Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Video className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4">
                  Centralized Analytics Dashboard
                </h3>
                <p className="text-gray-300 mb-6">
                  Monitor and analyze video streams from a unified control center with
                  real-time alerts, comprehensive reports, and actionable insights.
                </p>
                <div className="space-y-3">
                  {[
                    'Multi-camera feed management',
                    'Real-time threat detection alerts',
                    'Crowd analytics and heat mapping',
                    'Behavioral pattern analysis',
                    'Custom alert configuration',
                    'Export and reporting tools',
                  ].map((feature) => (
                    <div key={feature} className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span className="text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/video-analytics-dashboard.jpg"
                  alt="Video Analytics Dashboard"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ATLAS BOX */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mb-6">
                <Box className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                ATLAS BOX
              </h2>
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                Edge Computing Powerhouse
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Compact, powerful edge computing device designed for AI-driven
                applications, video analytics, and high-quality video recording. Bring AI
                processing directly to the source for real-time decision-making without
                cloud dependency.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-1">8</div>
                  <div className="text-sm text-gray-600">Camera Channels</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-1">4K</div>
                  <div className="text-sm text-gray-600">Video Recording</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-1">2TB+</div>
                  <div className="text-sm text-gray-600">Local Storage</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-1">-20°C</div>
                  <div className="text-sm text-gray-600">to 60°C Range</div>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Zap className="w-5 h-5 text-blue-600 mr-2" />
                  Key Features
                </h4>
                {[
                  'Integrated AI Processing Unit',
                  'On-Device AI Model Execution',
                  'Edge Computing Optimization',
                  'Low-Latency Processing',
                  'Industrial-Grade Durability',
                  'Offline Operation Mode',
                  'Remote Management Interface',
                  'Energy-Efficient Design',
                ].map((feature) => (
                  <div key={feature} className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/inquiry">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Get Pricing
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 p-8">
                <Image
                  src="/images/atlas-box-device.jpg"
                  alt="ATLAS BOX Edge Computing Device"
                  fill
                  className="object-contain p-8"
                />
              </div>
              <div className="mt-6 bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Perfect For:
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Remote Security',
                    'Industrial Automation',
                    'Smart Buildings',
                    'Agricultural Monitoring',
                    'Traffic Surveillance',
                    'Retail Analytics',
                    'Environmental Monitoring',
                    'Construction Sites',
                  ].map((useCase) => (
                    <div key={useCase} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                      <span className="text-sm text-gray-600">{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Transform Your Industry Today
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join industry leaders leveraging Ayonix AI solutions for competitive
              advantage
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 px-8"
                >
                  View All Products
                </Button>
              </Link>
              <Link href="/inquiry">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8"
                >
                  Contact Us
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
