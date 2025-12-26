'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { 
  Glasses, 
  Wrench, 
  Heart, 
  ShoppingCart,
  Eye,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Navigation,
  Zap,
  Shield,
  Battery,
  Wifi
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
    title: "Industrial Maintenance & Repair",
    icon: Wrench,
    description: "Revolutionize field service and maintenance operations with hands-free AR guidance. Technicians receive step-by-step repair instructions, 3D schematics, and remote expert assistance directly in their field of view.",
    image: "/images/smartglass-industrial-maintenance.jpg",
    benefits: [
      "50% faster repair times",
      "Remote expert collaboration",
      "Hands-free operation",
      "95% first-time fix rate"
    ],
    features: [
      "AR Repair Instructions",
      "3D Schematics Overlay",
      "Remote Video Support",
      "Parts Identification",
      "Safety Warnings",
      "Documentation Capture"
    ]
  },
  {
    title: "Medical Procedures & Surgery",
    icon: Heart,
    description: "Enhance surgical precision and patient care with real-time vital signs, 3D anatomical overlays, and access to patient records without breaking sterile field. Perfect for surgical navigation and medical training.",
    image: "/images/smartglass-medical-procedure.jpg",
    benefits: [
      "Enhanced surgical precision",
      "Real-time patient data access",
      "Sterile field maintained",
      "Improved training outcomes"
    ],
    features: [
      "Vital Signs Display",
      "3D Anatomical Models",
      "Patient Records Access",
      "Surgical Navigation",
      "Medical Imaging Overlay",
      "Hands-Free Documentation"
    ]
  },
  {
    title: "Retail Shopping Experience",
    icon: ShoppingCart,
    description: "Transform retail experiences with personalized product information, instant price comparisons, customer reviews, and virtual try-on capabilities. Create immersive shopping journeys that drive engagement and sales.",
    image: "/images/smartglass-retail-shopping.jpg",
    benefits: [
      "Personalized recommendations",
      "Instant product information",
      "Virtual try-on features",
      "60% higher engagement"
    ],
    features: [
      "Product Recognition",
      "Price Comparison",
      "Customer Reviews Display",
      "Virtual Try-On",
      "Inventory Check",
      "Loyalty Integration"
    ]
  },
  {
    title: "Warehouse & Logistics",
    icon: Eye,
    description: "Optimize warehouse operations with AR-guided picking, real-time inventory tracking, and navigation assistance. Increase accuracy and efficiency while reducing training time for new workers.",
    image: "/images/smartglass-ar-view.jpg",
    benefits: [
      "30% faster picking speed",
      "99.9% accuracy rate",
      "Reduced training time",
      "Hands-free scanning"
    ],
    features: [
      "Pick Path Optimization",
      "Real-time Inventory",
      "Visual Navigation",
      "Barcode Scanning",
      "Quality Verification",
      "Performance Analytics"
    ]
  }
];

const technicalSpecs = [
  {
    icon: Sparkles,
    title: "Advanced AR Display",
    description: "High-resolution transparent display with 60° field of view"
  },
  {
    icon: Navigation,
    title: "Spatial Tracking",
    description: "6DOF tracking with SLAM for precise AR placement"
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Edge AI processing with < 20ms latency"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Encrypted data transmission and secure authentication"
  },
  {
    icon: Battery,
    title: "All-Day Battery",
    description: "8+ hours of continuous use on a single charge"
  },
  {
    icon: Wifi,
    title: "5G Connectivity",
    description: "Ultra-fast wireless connectivity for cloud computing"
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
        <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-cyan-500/10 rounded-full">
          <Icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          <span className="text-cyan-600 dark:text-cyan-400 font-semibold">AR Use Case {index + 1}</span>
        </div>
        
        <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
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
          <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">AR Features</h4>
          <div className="flex flex-wrap gap-2">
            {useCase.features.map((feature, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 rounded-full text-sm font-medium border border-cyan-200 dark:border-cyan-800"
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

export default function ATLASSmartglassPage() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [specsRef, specsInView] = useInView({
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
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700">
          <div className="absolute inset-0">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/30 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -90, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"
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
              <Glasses className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">ATLAS Smartglass Agent</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Augmented Reality
              <br />
              Smart Glasses
            </h1>
            
            <p className="text-xl text-cyan-100 mb-8 leading-relaxed">
              Experience the future with hands-free AR smart glasses powered by AI. See information overlay in your field of view while keeping your hands free
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { label: "Field of View", value: "60°" },
                { label: "Battery Life", value: "8+ hrs" },
                { label: "Latency", value: "<20ms" },
                { label: "Weight", value: "45g" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                  className="bg-ayonix-teal/80 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-cyan-100 text-sm">{stat.label}</div>
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
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              AR Smart Glasses Use Cases
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Transform industries with augmented reality experiences
            </p>
          </div>

          {useCases.map((useCase, index) => (
            <UseCaseSection key={index} useCase={useCase} index={index} />
          ))}
        </div>
      </section>

      {/* Technical Specifications */}
      <motion.section
        ref={specsRef}
        initial={{ opacity: 0 }}
        animate={specsInView ? { opacity: 1 } : {}}
        className="py-20 bg-gray-100 dark:bg-gray-800/50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
              Technical Specifications
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Cutting-edge technology for seamless AR experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalSpecs.map((spec, idx) => {
              const Icon = spec.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={specsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                    {spec.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {spec.description}
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
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Experience the Future Today
            </h2>
            <p className="text-xl mb-8 text-cyan-100 max-w-2xl mx-auto">
              Request a demo and discover how ATLAS Smartglass can transform your operations
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-cyan-600 hover:bg-gray-100"
                asChild
              >
                <Link href="/demos">
                  Request Demo <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
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
                className="inline-flex items-center text-white hover:text-cyan-100 transition-colors"
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
