'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { 
  Video, 
  Eye, 
  Fingerprint, 
  Scan,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Shield,
  Zap,
  Brain,
  Activity,
  Target,
  BarChart3
} from 'lucide-react';

interface UseCase {
  title: string;
  icon: React.ElementType;
  description: string;
  image: string;
  benefits: string[];
  features: string[];
  capabilities: string[];
}

const useCases: UseCase[] = [
  {
    title: "Face Detection & Recognition",
    icon: Eye,
    description: "Advanced facial detection and recognition technology that identifies and verifies individuals in real-time. Perfect for security, attendance tracking, and personalized customer experiences with industry-leading accuracy.",
    image: "/images/face-detection.jpg",
    benefits: [
      "99.8% detection accuracy",
      "Real-time processing",
      "Works in various lighting",
      "Multi-face detection"
    ],
    features: [
      "Face Detection",
      "Face Recognition",
      "Age Estimation",
      "Gender Detection",
      "Emotion Analysis",
      "Liveness Detection"
    ],
    capabilities: [
      "Detect multiple faces simultaneously in video streams",
      "Recognize individuals from database of millions",
      "Extract 512-dimensional face embeddings",
      "Work effectively in low-light conditions",
      "Process 60+ FPS on standard hardware",
      "Comply with privacy regulations"
    ]
  },
  {
    title: "Face Tracking & Monitoring",
    icon: Scan,
    description: "Continuous face tracking across video frames with unique ID assignment. Monitor crowd movement, analyze dwell times, and track individual journeys through multiple camera zones with seamless handoff.",
    image: "/images/video-analytics-face-tracking.jpg",
    benefits: [
      "Persistent tracking across frames",
      "Multi-camera handoff",
      "Movement pattern analysis",
      "Dwell time calculation"
    ],
    features: [
      "Real-time Tracking",
      "Unique ID Assignment",
      "Path Reconstruction",
      "Dwell Time Analysis",
      "Heatmap Generation",
      "Alert System"
    ],
    capabilities: [
      "Track up to 500 individuals simultaneously",
      "Maintain tracking through occlusions",
      "Generate movement heatmaps and trajectories",
      "Calculate time spent in specific zones",
      "Trigger alerts for suspicious behavior",
      "Export tracking data for analysis"
    ]
  },
  {
    title: "Multimodal Biometric Recognition",
    icon: Fingerprint,
    description: "Comprehensive biometric identification combining facial recognition, iris scanning, and behavioral analysis. Provide the highest level of security with multi-factor biometric authentication for critical applications.",
    image: "/images/biometric-recognition.jpg",
    benefits: [
      "99.95% verification accuracy",
      "Multi-factor authentication",
      "Spoofing prevention",
      "Fast verification (<1 second)"
    ],
    features: [
      "Facial Recognition",
      "Iris Detection",
      "Behavioral Analysis",
      "Liveness Verification",
      "Multi-modal Fusion",
      "Anti-spoofing"
    ],
    capabilities: [
      "Combine multiple biometric modalities",
      "Detect presentation attacks (spoofing)",
      "Verify liveness through challenge-response",
      "Process biometrics in encrypted form",
      "Support contactless authentication",
      "Integrate with existing access control"
    ]
  },
  {
    title: "YOLO Object Detection & Video Analytics",
    icon: Video,
    description: "State-of-the-art YOLO-based object detection for real-time video analytics. Detect and classify 80+ object categories, track movements, and generate actionable insights from video streams with millisecond latency.",
    image: "/images/yolo-object-detection.jpg",
    benefits: [
      "Real-time object detection",
      "80+ object categories",
      "High accuracy (mAP >50%)",
      "Low latency (<30ms)"
    ],
    features: [
      "YOLO v8 Integration",
      "Object Classification",
      "Bounding Box Detection",
      "Object Tracking",
      "Event Detection",
      "Video Summarization"
    ],
    capabilities: [
      "Detect vehicles, people, objects in real-time",
      "Track objects across video frames",
      "Count and classify detected objects",
      "Detect anomalies and events automatically",
      "Generate video summaries and highlights",
      "Export detection data in various formats"
    ]
  },
  {
    title: "Crowd Analytics & Management",
    icon: Users,
    description: "Comprehensive crowd analysis for public spaces, events, and retail environments. Monitor crowd density, detect congestion, analyze flow patterns, and predict capacity issues before they occur.",
    image: "/images/video-analytics-crowd-analytics.jpg",
    benefits: [
      "Real-time crowd counting",
      "Density heatmaps",
      "Flow pattern analysis",
      "Capacity management"
    ],
    features: [
      "People Counting",
      "Density Estimation",
      "Flow Analysis",
      "Queue Detection",
      "Occupancy Monitoring",
      "Predictive Analytics"
    ],
    capabilities: [
      "Count people in crowded environments",
      "Generate real-time density heatmaps",
      "Analyze crowd movement patterns",
      "Detect queue formation and length",
      "Alert when capacity thresholds reached",
      "Predict crowd behavior trends"
    ]
  }
];

const platformFeatures = [
  {
    icon: Brain,
    title: "AI-Powered Analytics",
    description: "Deep learning models for accurate detection and classification"
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Process multiple video streams simultaneously with low latency"
  },
  {
    icon: Shield,
    title: "Privacy Protection",
    description: "GDPR compliant with data encryption and anonymization"
  },
  {
    icon: Activity,
    title: "Multi-Camera Support",
    description: "Manage and analyze feeds from unlimited cameras"
  },
  {
    icon: Target,
    title: "Custom Training",
    description: "Train models on your specific use cases and requirements"
  },
  {
    icon: BarChart3,
    title: "Advanced Reporting",
    description: "Comprehensive analytics dashboards and export capabilities"
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
      className={`mb-24`}
    >
      <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
        <div className={`${!isEven ? 'md:order-2' : ''}`}>
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={useCase.image}
              alt={useCase.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        <div className={`${!isEven ? 'md:order-1' : ''}`}>
          <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-purple-500/10 rounded-full">
            <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-600 dark:text-purple-400 font-semibold">Analytics Module {index + 1}</span>
          </div>
          
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
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
                  className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-800"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Capabilities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-2xl p-8 border border-purple-200 dark:border-purple-800"
      >
        <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Technical Capabilities</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {useCase.capabilities.map((capability, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
              <p className="text-gray-700 dark:text-gray-300">{capability}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function VideoAnalyticsPage() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [featuresRef, featuresInView] = useInView({
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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600">
          <div className="absolute inset-0">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-400/30 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -90, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl"
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
              <Video className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">AI Video Analytics Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Advanced AI Video Analytics
              <br />
              <span className="text-purple-200">Face • Track • Detect • Analyze</span>
            </h1>
            
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              Comprehensive video analytics platform with face detection, recognition, tracking, biometric identification, and YOLO-based object detection
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { label: "Detection Accuracy", value: "99.8%" },
                { label: "Processing Speed", value: "60 FPS" },
                { label: "Object Categories", value: "80+" },
                { label: "Cameras Supported", value: "Unlimited" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                  className="bg-ayonix-teal/80 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-purple-100 text-sm">{stat.label}</div>
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
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Comprehensive Video Analytics
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Detailed capabilities for face detection, tracking, biometric recognition, and object analytics
            </p>
          </div>

          {useCases.map((useCase, index) => (
            <UseCaseSection key={index} useCase={useCase} index={index} />
          ))}
        </div>
      </section>

      {/* Platform Features */}
      <motion.section
        ref={featuresRef}
        initial={{ opacity: 0 }}
        animate={featuresInView ? { opacity: 1 } : {}}
        className="py-20 bg-gray-100 dark:bg-gray-800/50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
              Platform Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Enterprise-grade video analytics infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
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
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Transform Your Video Surveillance
            </h2>
            <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
              Deploy AI-powered video analytics with face detection, tracking, and object recognition
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100"
                asChild
              >
                <a href="https://va.ayonix.com" target="_blank" rel="noopener noreferrer">
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
                className="inline-flex items-center text-white hover:text-purple-100 transition-colors"
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
