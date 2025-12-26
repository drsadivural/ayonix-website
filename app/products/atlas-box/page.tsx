'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { 
  Box, 
  Building2, 
  Factory, 
  Store,
  Cpu,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Zap,
  Shield,
  Thermometer,
  Network,
  HardDrive,
  Wifi,
  MessageSquare,
  Video,
  Camera,
  Scan,
  Users,
  MonitorPlay,
  CircleDot,
  Eye,
  LayoutGrid,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useEffect, useCallback } from 'react';

// Image Slider Component for ATLAS BOX product images
const sliderImages = [
  {
    src: "/images/atlas-box-front.png",
    alt: "ATLAS BOX Front View",
    caption: "Front Panel - USB-C, HDMI, Dual LAN Ports"
  },
  {
    src: "/images/atlas-box-dimensions.png",
    alt: "ATLAS BOX Dimensions",
    caption: "Compact Design - 96.5mm × 68mm × 30mm"
  },
  {
    src: "/images/atlas-box-side.png",
    alt: "ATLAS BOX Side View",
    caption: "Side Panel - Status LEDs & Reset Button"
  }
];

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentImage = sliderImages[currentIndex];

  return (
    <div className="relative">
      {/* Main Image Container */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-white" style={{ minHeight: '300px' }}>
        <div className="flex items-center justify-center p-6" style={{ minHeight: '300px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-w-full object-contain transition-opacity duration-500"
            style={{ maxHeight: '280px' }}
          />
        </div>
        
        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-600 to-transparent p-4">
          <p className="text-white text-center font-medium drop-shadow-lg">
            {currentImage.caption}
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => { prevSlide(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 5000); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-emerald-600 hover:bg-emerald-700 shadow-lg rounded-full flex items-center justify-center transition-all z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={() => { nextSlide(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 5000); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-emerald-600 hover:bg-emerald-700 shadow-lg rounded-full flex items-center justify-center transition-all z-10"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white scale-110'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

interface UseCase {
  title: string;
  icon: React.ElementType;
  description: string;
  image: string;
  benefits: string[];
  features: string[];
  specifications: string[];
}

const useCases: UseCase[] = [
  {
    title: "Smart City Deployment",
    icon: Building2,
    description: "Deploy ATLAS BOX devices across urban infrastructure for intelligent city management. Monitor traffic, environmental conditions, public safety, and infrastructure health in real-time with edge computing power.",
    image: "/images/atlas-box-smart-city.jpg",
    benefits: [
      "Real-time traffic management",
      "Environmental monitoring",
      "Public safety enhancement",
      "Infrastructure optimization"
    ],
    features: [
      "Traffic Flow Analysis",
      "Air Quality Monitoring",
      "Smart Lighting Control",
      "Crowd Management",
      "Incident Detection",
      "Energy Optimization"
    ],
    specifications: [
      "Supports 20+ camera feeds per device",
      "Weather-resistant IP67 enclosure",
      "Operating temperature: -40°C to 70°C",
      "4G/5G connectivity with failover",
      "Solar power option available",
      "Remote monitoring and updates"
    ]
  },
  {
    title: "Industrial IoT & Manufacturing",
    icon: Factory,
    description: "Transform factories with edge AI processing for predictive maintenance, quality control, and production optimization. ATLAS BOX processes sensor data locally, ensuring low latency and operational continuity.",
    image: "/images/atlas-box-industrial-iot.jpg",
    benefits: [
      "Predictive maintenance",
      "Quality assurance automation",
      "Production optimization",
      "Reduced downtime"
    ],
    features: [
      "Machine Health Monitoring",
      "Vibration Analysis",
      "Temperature Monitoring",
      "Quality Inspection",
      "Production Analytics",
      "Alert System"
    ],
    specifications: [
      "Supports 100+ IoT sensors",
      "Industrial-grade components",
      "DIN rail mounting option",
      "Modbus, OPC-UA protocols",
      "99.99% uptime SLA",
      "Local data processing"
    ]
  },
  {
    title: "Retail Edge Computing",
    icon: Store,
    description: "Enhance retail operations with AI-powered customer analytics, inventory management, and loss prevention. Process video and sensor data at the edge for instant insights and privacy-compliant operations.",
    image: "/images/atlas-box-retail-edge.jpg",
    benefits: [
      "Customer behavior insights",
      "Inventory optimization",
      "Loss prevention",
      "Privacy compliance"
    ],
    features: [
      "Customer Analytics",
      "Foot Traffic Analysis",
      "Queue Management",
      "Shelf Monitoring",
      "POS Integration",
      "Heatmap Generation"
    ],
    specifications: [
      "Processes 10+ camera feeds",
      "GDPR compliant edge processing",
      "Compact form factor for retail",
      "Wi-Fi 6 and Ethernet connectivity",
      "Encrypted local storage",
      "Cloud sync optional"
    ]
  },
  {
    title: "Healthcare & Medical Facilities",
    icon: Thermometer,
    description: "Deploy secure edge computing for patient monitoring, facility management, and medical equipment tracking. Ensure HIPAA compliance with local data processing and encrypted communications.",
    image: "/images/edge-computing-network.jpg",
    benefits: [
      "HIPAA compliant processing",
      "Patient safety monitoring",
      "Asset tracking",
      "Facility optimization"
    ],
    features: [
      "Patient Monitoring",
      "Equipment Tracking",
      "Environmental Control",
      "Access Management",
      "Fall Detection",
      "Compliance Reporting"
    ],
    specifications: [
      "Medical-grade reliability",
      "HIPAA compliant architecture",
      "Redundant power supply",
      "Secure boot and encryption",
      "Audit logging built-in",
      "24/7 technical support"
    ]
  }
];

const technicalSpecs = [
  {
    icon: Cpu,
    title: "Powerful Edge AI",
    description: "ARM A76 CPU with 6+ TOPS AI performance"
  },
  {
    icon: HardDrive,
    title: "Local Storage",
    description: "Up to 4TB NVMe SSD for data buffering and local processing"
  },
  {
    icon: Network,
    title: "Connectivity",
    description: "2.5G + 1G LAN, Wi-Fi 6, with automatic failover"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "TPM 2.0, secure boot, encrypted storage, and VPN support"
  },
  {
    icon: Zap,
    title: "Power Efficiency",
    description: "Low power consumption with optional solar/battery backup"
  },
  {
    icon: Wifi,
    title: "Remote Management",
    description: "Over-the-air updates, remote diagnostics, and monitoring"
  }
];

const softwareFeatures = [
  {
    icon: MessageSquare,
    title: "Standalone AI Chatbot",
    description: "Fully offline conversational AI assistant that runs locally on ATLAS BOX without internet dependency",
    image: "/images/ai-chatbot-feature.jpg",
    capabilities: [
      "Natural language processing",
      "Context-aware responses",
      "Multi-language support",
      "Custom knowledge base integration",
      "Voice interaction support",
      "Privacy-first local processing"
    ]
  },
  {
    icon: Video,
    title: "AI Video Analytics",
    description: "Comprehensive video intelligence suite with advanced AI-powered analysis capabilities",
    image: "/images/video-analytics-feature.jpg",
    subFeatures: [
      {
        icon: LayoutGrid,
        name: "Object Analysis",
        description: "Detect and classify objects in real-time including vehicles, packages, and equipment"
      },
      {
        icon: Scan,
        name: "Face Recognition",
        description: "High-accuracy facial identification with anti-spoofing and liveness detection"
      },
      {
        icon: Eye,
        name: "Perimeter Detection",
        description: "Intelligent intrusion detection with customizable zones and alert triggers"
      },
      {
        icon: Users,
        name: "People Counting",
        description: "Accurate occupancy tracking with directional flow analysis and heatmaps"
      }
    ]
  },
  {
    icon: MonitorPlay,
    title: "Video Management System (VMS)",
    description: "Enterprise-grade video management powered by Network Optics VMS",
    image: "/images/vms-feature.jpg",
    specs: [
      {
        label: "Live Streaming",
        value: "36 IP Cameras",
        description: "Stream up to 36 IP cameras simultaneously"
      },
      {
        label: "Parallel Recording",
        value: "16 Cameras",
        description: "Record 16 cameras in parallel with continuous storage"
      },
      {
        label: "VMS Platform",
        value: "Network Optics",
        description: "Industry-leading VMS with intuitive interface"
      },
      {
        label: "Storage Capacity",
        value: "4TB NVMe",
        description: "High-speed local storage for extended retention"
      }
    ],
    features: [
      "Multi-camera live view",
      "Timeline-based playback",
      "Motion-triggered recording",
      "Remote access via web/mobile",
      "Event-based alerts",
      "Export and backup tools"
    ]
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
          <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-emerald-500/10 rounded-full">
            <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Deployment Scenario {index + 1}</span>
          </div>
          
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
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
                  className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium border border-emerald-200 dark:border-emerald-800"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800"
      >
        <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Technical Specifications</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {useCase.specifications.map((spec, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
              <p className="text-gray-700 dark:text-gray-300">{spec}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ATLASBOXPage() {
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
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700">
          <div className="absolute inset-0">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-400/30 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -90, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-400/30 rounded-full blur-3xl"
            />
          </div>
          
          {/* Circuit Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="2" fill="white" />
                  <line x1="10" y1="10" x2="50" y2="10" stroke="white" strokeWidth="1" />
                  <circle cx="50" cy="10" r="2" fill="white" />
                  <line x1="50" y1="10" x2="50" y2="50" stroke="white" strokeWidth="1" />
                  <circle cx="50" cy="50" r="2" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
            </svg>
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
              <Box className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">ATLAS BOX</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Edge AI Computing Device
              <br />
              <span className="text-emerald-200">Process Anywhere, Anytime</span>
            </h1>
            
            <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
              Deploy powerful edge AI processing with ATLAS BOX - the rugged, intelligent computing device designed for distributed AI applications
            </p>

            {/* Product Image Slider */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-2xl mx-auto mb-12"
            >
              <ImageSlider />
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { label: "AI Performance", value: "6+ TOPS" },
                { label: "Storage", value: "4TB NVME" },
                { label: "Connectivity", value: "2.5G+1G LAN" },
                { label: "CPU", value: "ARM A76" },
                { label: "RAM", value: "8GB Fast" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                  className="bg-ayonix-teal/80 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-emerald-100 text-sm">{stat.label}</div>
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
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Deployment Scenarios
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              ATLAS BOX adapts to diverse environments and use cases
            </p>
          </div>

          {useCases.map((useCase, index) => (
            <UseCaseSection key={index} useCase={useCase} index={index} />
          ))}
        </div>
      </section>

      {/* Software Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Built-in Software Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Pre-installed enterprise software ready to deploy out of the box
            </p>
          </div>

          {/* Standalone AI Chatbot */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-emerald-500/10 rounded-full">
                  <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">AI Assistant</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                  Standalone AI Chatbot
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Fully offline conversational AI assistant that runs locally on ATLAS BOX without internet dependency. Perfect for secure environments and privacy-sensitive applications.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {["Natural language processing", "Context-aware responses", "Multi-language support", "Custom knowledge base", "Voice interaction", "Privacy-first processing"].map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span className="text-gray-700 dark:text-gray-300">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl p-8 shadow-xl">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 dark:text-white">ATLAS AI Assistant</div>
                        <div className="text-sm text-emerald-500">Online • Local Processing</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-sm text-gray-600 dark:text-gray-300">
                        How can I help you today?
                      </div>
                      <div className="bg-emerald-500 text-white rounded-lg p-3 text-sm ml-8">
                        What's the current system status?
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-sm text-gray-600 dark:text-gray-300">
                        All systems operational. CPU: 23%, Memory: 4.2GB/8GB, Storage: 1.2TB available.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Video Analytics */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2">
                <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-blue-500/10 rounded-full">
                  <Video className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">Video Intelligence</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                  AI Video Analytics
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Comprehensive video intelligence suite with advanced AI-powered analysis capabilities for security, operations, and business insights.
                </p>
              </div>
              <div className="lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: LayoutGrid, name: "Object Analysis", desc: "Detect and classify objects in real-time" },
                    { icon: Scan, name: "Face Recognition", desc: "High-accuracy facial identification" },
                    { icon: Eye, name: "Perimeter Detection", desc: "Intelligent intrusion detection" },
                    { icon: Users, name: "People Counting", desc: "Accurate occupancy tracking" }
                  ].map((feature, idx) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-3">
                          <FeatureIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-1">{feature.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Video Management System */}
          <div>
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-3xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-purple-500/10 rounded-full">
                    <MonitorPlay className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">VMS Platform</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                    Video Management System
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    Enterprise-grade video management powered by <strong>Network Optics VMS</strong> - the industry-leading platform for professional surveillance.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { label: "Live Streaming", value: "36 IP Cameras" },
                      { label: "Parallel Recording", value: "16 Cameras" },
                      { label: "VMS Platform", value: "Network Optics" },
                      { label: "Storage", value: "4TB NVMe" }
                    ].map((spec, idx) => (
                      <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{spec.value}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{spec.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Multi-camera live view", "Timeline playback", "Motion recording", "Remote access", "Event alerts", "Export tools"].map((feature, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gray-900 rounded-2xl p-4 shadow-2xl">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-gray-400 text-sm ml-2">Network Optics VMS</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[...Array(9)].map((_, idx) => (
                        <div key={idx} className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                          <Camera className="w-6 h-6 text-gray-600" />
                          <div className="absolute bottom-1 left-1 text-xs text-gray-500">CAM {idx + 1}</div>
                          <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-green-400">● 36 Cameras Online</span>
                      <span className="text-gray-400">Recording: 16/16</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              Hardware Specifications
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Enterprise-grade hardware for demanding edge AI workloads
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
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
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
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Deploy ATLAS BOX Today
            </h2>
            <p className="text-xl mb-8 text-emerald-100 max-w-2xl mx-auto">
              Experience the power of edge AI computing in your environment
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-emerald-600 hover:bg-gray-100"
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
                className="inline-flex items-center text-white hover:text-emerald-100 transition-colors"
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
