'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { 
  Code2, 
  Smartphone, 
  Globe, 
  Database,
  GitBranch,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Zap,
  Shield,
  Users,
  Sparkles,
  FileCode,
  Workflow
} from 'lucide-react';

interface UseCase {
  title: string;
  icon: React.ElementType;
  description: string;
  image: string;
  benefits: string[];
  features: string[];
  examples: string[];
}

const useCases: UseCase[] = [
  {
    title: "SaaS Application Development",
    icon: Globe,
    description: "Build production-ready SaaS applications from a single prompt. ATLAS Code-Agent generates full-stack applications with authentication, database integration, payment processing, and responsive UI - all deployed in minutes.",
    image: "/images/code-agent-saas-development.jpg",
    benefits: [
      "10x faster development speed",
      "Production-ready code from day one",
      "Built-in best practices and security",
      "Automatic testing and deployment"
    ],
    features: [
      "Full-Stack Generation",
      "User Authentication",
      "Database Schema Design",
      "Payment Integration",
      "API Development",
      "SEO Optimization"
    ],
    examples: [
      "Project Management Tools",
      "CRM Systems",
      "Analytics Dashboards",
      "Collaboration Platforms",
      "Booking Systems",
      "Subscription Services"
    ]
  },
  {
    title: "E-Commerce Platforms",
    icon: Database,
    description: "Create sophisticated e-commerce solutions with product catalogs, shopping carts, payment gateways, inventory management, and order tracking. Integrate with Stripe, PayPal, and other payment providers seamlessly.",
    image: "/images/code-agent-ecommerce.jpg",
    benefits: [
      "Complete e-commerce functionality",
      "Secure payment integration",
      "Inventory management system",
      "Mobile-responsive design"
    ],
    features: [
      "Product Management",
      "Shopping Cart",
      "Stripe Integration",
      "Order Processing",
      "Customer Portal",
      "Analytics Dashboard"
    ],
    examples: [
      "Online Stores",
      "Marketplaces",
      "Digital Product Platforms",
      "Subscription Boxes",
      "B2B Portals",
      "Auction Sites"
    ]
  },
  {
    title: "Mobile Application Development",
    icon: Smartphone,
    description: "Generate cross-platform mobile applications with native performance. Build iOS and Android apps simultaneously with responsive layouts, offline capabilities, and seamless backend integration.",
    image: "/images/code-agent-mobile-app.jpg",
    benefits: [
      "Cross-platform compatibility",
      "Native performance",
      "Offline-first architecture",
      "App store ready"
    ],
    features: [
      "React Native/Flutter",
      "Push Notifications",
      "Offline Support",
      "Camera Integration",
      "Geolocation Services",
      "Social Media Integration"
    ],
    examples: [
      "Fitness Apps",
      "Social Networks",
      "Food Delivery Apps",
      "Travel Companions",
      "Educational Apps",
      "Productivity Tools"
    ]
  },
  {
    title: "API & Microservices Development",
    icon: GitBranch,
    description: "Design and implement scalable REST and GraphQL APIs with automatic documentation, testing, and deployment. Build microservices architectures with container orchestration and service mesh integration.",
    image: "/images/code-agent-api-development.jpg",
    benefits: [
      "Auto-generated documentation",
      "Built-in testing suites",
      "Scalable architecture",
      "Container-ready deployment"
    ],
    features: [
      "REST & GraphQL APIs",
      "OpenAPI Specification",
      "Docker Containers",
      "Kubernetes Integration",
      "API Gateway",
      "Rate Limiting"
    ],
    examples: [
      "Payment APIs",
      "Authentication Services",
      "Data Processing Pipelines",
      "Integration Hubs",
      "Webhook Handlers",
      "Event-Driven Systems"
    ]
  }
];

const developerFeatures = [
  {
    icon: Code2,
    title: "Natural Language to Code",
    description: "Describe your app in plain English, get production code instantly"
  },
  {
    icon: Zap,
    title: "Real-time Code Generation",
    description: "Watch your application come to life as code is generated"
  },
  {
    icon: Shield,
    title: "Security by Default",
    description: "Built-in security best practices and vulnerability scanning"
  },
  {
    icon: FileCode,
    title: "Full Code Ownership",
    description: "Download and modify your code freely - no vendor lock-in"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Built-in version control and team workspace features"
  },
  {
    icon: Workflow,
    title: "CI/CD Pipeline",
    description: "Automatic testing, building, and deployment workflows"
  }
];

const applicationTypes = [
  { name: "Landing Pages", time: "5 min" },
  { name: "Blog Platforms", time: "15 min" },
  { name: "Portfolio Sites", time: "10 min" },
  { name: "SaaS Dashboards", time: "30 min" },
  { name: "E-Commerce Stores", time: "45 min" },
  { name: "Booking Systems", time: "25 min" },
  { name: "Social Networks", time: "60 min" },
  { name: "Admin Panels", time: "20 min" },
  { name: "API Backends", time: "15 min" },
  { name: "Mobile Apps", time: "40 min" },
  { name: "Chrome Extensions", time: "10 min" },
  { name: "PWA Applications", time: "30 min" }
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
        <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-indigo-500/10 rounded-full">
          <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Development Type {index + 1}</span>
        </div>
        
        <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
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

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Core Features</h4>
          <div className="flex flex-wrap gap-2">
            {useCase.features.map((feature, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium border border-indigo-200 dark:border-indigo-800"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Example Applications</h4>
          <div className="flex flex-wrap gap-2">
            {useCase.examples.map((example, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
              >
                {example}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ATLASCodeAgentPage() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [typesRef, typesInView] = useInView({
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
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
          <div className="absolute inset-0">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-400/30 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -90, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl"
            />
          </div>
          
          {/* Code Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="code-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <text x="5" y="20" fill="white" fontSize="12" fontFamily="monospace">&lt;/&gt;</text>
                  <text x="5" y="50" fill="white" fontSize="12" fontFamily="monospace">{ }</text>
                  <text x="5" y="80" fill="white" fontSize="12" fontFamily="monospace">=&gt;</text>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#code-pattern)" />
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
              <Code2 className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">ATLAS Code-Agent</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              AI-Powered Code Generation
              <br />
              <span className="text-indigo-200">From Idea to Production</span>
            </h1>
            
            <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
              Build complete applications in minutes, not months. Describe your vision in plain English and watch as ATLAS Code-Agent generates production-ready code
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { label: "Faster Development", value: "10x" },
                { label: "Code Quality", value: "99%" },
                { label: "Languages Supported", value: "30+" },
                { label: "Developers Served", value: "50K+" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                  className="bg-ayonix-teal/80 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-indigo-100 text-sm">{stat.label}</div>
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

      {/* Application Types */}
      <motion.section
        ref={typesRef}
        initial={{ opacity: 0 }}
        animate={typesInView ? { opacity: 1 } : {}}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Build Any Application
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From simple landing pages to complex SaaS platforms - all generated in minutes
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {applicationTypes.map((app, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={typesInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
              >
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {app.name}
                  </div>
                  <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                    ~{app.time}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Development Use Cases
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive solutions for every development need
            </p>
          </div>

          {useCases.map((useCase, index) => (
            <UseCaseSection key={index} useCase={useCase} index={index} />
          ))}
        </div>
      </section>

      {/* Developer Features */}
      <motion.section
        ref={featuresRef}
        initial={{ opacity: 0 }}
        animate={featuresInView ? { opacity: 1 } : {}}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
              Developer-First Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Everything you need for professional development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developerFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
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
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Start Building with ATLAS Code-Agent
            </h2>
            <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
              Transform your ideas into production-ready applications in minutes
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-indigo-600 hover:bg-gray-100"
                asChild
              >
                <a href="https://agentcoder.ayonix.com" target="_blank" rel="noopener noreferrer">
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
                className="inline-flex items-center text-white hover:text-indigo-100 transition-colors"
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
