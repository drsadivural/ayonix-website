'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LiveAnimeCharacter } from '@/components/live-anime-character';
import {
  ArrowRight,
  Sparkles,
  Brain,
  Shield,
  Zap,
  CheckCircle2,
  Users,
  Globe,
  TrendingUp,
  Play,
  Building2,
  FileText,
  MessageSquare,
  Code2,
  Scan,
  Bot,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const useCases = [
  { name: 'Company RAG', icon: FileText, href: '/use-cases/company-rag' },
  { name: 'Employment Training', icon: Users, href: '/use-cases/employment-training' },
  { name: 'Automated Posts', icon: MessageSquare, href: '/use-cases/automated-posts' },
  { name: 'Offline Chatbot', icon: Bot, href: '/use-cases/offline-chatbot' },
  { name: 'Code Assistant', icon: Code2, href: '/use-cases/code-assistant' },
  { name: 'Face Recognition', icon: Scan, href: '/use-cases/face-recognition' },
];

export default function HomePage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [useCasesRef, useCasesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [whyRef, whyInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div className="bg-white overflow-hidden" ref={containerRef}>
      {/* Announcement Banner */}
      <div className="bg-ayonix-forest text-white py-2 px-4 text-center text-sm">
        <span>Ayonix Unveils Latest AI Agent Platform with Voice-Controlled Interface</span>
        <Link href="/news" className="ml-2 text-ayonix-mint hover:underline inline-flex items-center">
          Read now <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
      </div>

      {/* Hero Section - Sema4.ai Inspired */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center overflow-hidden"
      >
        {/* Organic Background Shape - Teal/Green */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          {/* Main curved shape - right side */}
          <div className="absolute top-0 right-0 w-[65%] h-[120%] bg-gradient-to-br from-ayonix-teal via-ayonix-teal-light to-ayonix-mint rounded-bl-[600px] transform translate-x-[5%]" />
          
          {/* Secondary shape - bottom accent */}
          <div className="absolute bottom-0 right-[20%] w-[50%] h-[40%] bg-ayonix-forest/20 rounded-tl-[400px] rounded-tr-[200px]" />
        </motion.div>

        {/* Chevron Pattern - Left Side */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:flex gap-3">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={heroInView ? { opacity: 0.4 - i * 0.1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="text-ayonix-teal"
            >
              <svg width="40" height="80" viewBox="0 0 40 80" fill="none">
                <path d="M5 5L35 40L5 75" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10 py-20">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-gray-900"
          >
            {/* White background card for better text visibility */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-ayonix-forest">AI.</span>{' '}
                <span className="gradient-text-teal">Reimagined.</span>
              </h1>
              <p className="text-2xl md:text-3xl font-semibold mb-4 text-ayonix-teal">
                The Enterprise AI Agent Company
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-xl">
                Enterprise AI agents are the "killer app" of the AI era. Learn how the Ayonix Enterprise AI Agent Platform enables businesses to build, operate, and scale intelligent AI agents.
              </p>
            
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                asChild
                size="lg"
                className="bg-ayonix-teal hover:bg-ayonix-teal-dark text-white text-lg px-8 py-6 rounded-full shadow-lg btn-hover-lift"
              >
                <Link href="/products">
                  <ArrowRight className="mr-2 w-5 h-5" />
                  Get Started Now
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-ayonix-teal text-ayonix-teal hover:bg-ayonix-teal hover:text-white text-lg px-8 py-6 rounded-full transition-all"
              >
                <Link href="/demos">
                  <Play className="mr-2 w-5 h-5" />
                  Try Demo
                </Link>
              </Button>
              </div>

              {/* Feature Badges */}
              <div className="flex flex-wrap gap-3">
                {['VOICE CONTROLLED', 'ENTERPRISE READY', 'HANDS-FREE'].map((badge) => (
                  <span
                    key={badge}
                    className="px-4 py-2 bg-ayonix-cream border border-ayonix-mint rounded-full text-xs font-semibold text-ayonix-forest tracking-wider"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side - Live Anime Character */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <LiveAnimeCharacter />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-ayonix-teal/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-ayonix-teal/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Trusted Companies Section */}
      <section className="py-16 bg-gradient-to-b from-ayonix-cream to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-sm font-semibold text-ayonix-teal tracking-wider uppercase mb-8">
              Trusted by Industry Leaders Worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12">
              {['Healthcare', 'Finance', 'Government', 'Corporate', 'Technology'].map((company, i) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-2xl font-bold text-gray-400 hover:text-ayonix-teal transition-colors cursor-pointer"
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Ayonix Section - Sema4.ai Style */}
      <section ref={whyRef} className="py-20 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/ai-workflow.jpg"
            alt="AI Workflow"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ayonix-forest/90" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Ayonix AI?
            </h2>
            <p className="text-xl text-ayonix-mint mb-4 font-semibold">
              The only platform that unites business, IT and developers around AI agent initiatives
            </p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto mb-12">
              In the AI era, enterprises face a critical challenge: how to harness the power of AI to transform how work gets done while ensuring security, accuracy, and control. Ayonix delivers the answer with enterprise AI agents that are accurate and deterministic for complex, multi-step workloads.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-white text-ayonix-forest hover:bg-ayonix-cream text-lg px-8 py-6 rounded-full shadow-lg"
            >
              <Link href="/demos">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Link>
            </Button>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              {['UNMATCHED ACCURACY', 'HUMAN-LIKE PROCESSING', 'VOICE CONTROLLED'].map((feature) => (
                <span
                  key={feature}
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-semibold text-white"
                >
                  <span className="w-2 h-2 bg-ayonix-mint rounded-full inline-block mr-2" />
                  {feature}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section ref={useCasesRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={useCasesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Putting Agents to Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how Ayonix AI agents transform your business operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, i) => (
              <motion.div
                key={useCase.name}
                initial={{ opacity: 0, y: 30 }}
                animate={useCasesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link href={useCase.href}>
                  <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-ayonix-teal hover:shadow-xl transition-all card-hover group">
                    <div className="w-14 h-14 bg-ayonix-cream rounded-xl flex items-center justify-center mb-6 group-hover:bg-ayonix-teal transition-colors">
                      <useCase.icon className="w-7 h-7 text-ayonix-teal group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-ayonix-teal transition-colors">
                      {useCase.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Automate and enhance your {useCase.name.toLowerCase()} workflows with intelligent AI agents.
                    </p>
                    <span className="text-ayonix-teal font-semibold inline-flex items-center">
                      Learn more <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-ayonix-teal text-ayonix-teal hover:bg-ayonix-teal hover:text-white rounded-full px-8"
            >
              <Link href="/use-cases">
                View All Use Cases
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-ayonix-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Platform Delivers Transformative Results
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: '100x', label: 'Process datasets 100× larger than LLM context windows', icon: TrendingUp },
              { value: '94%', label: 'Reduce LLM token usage while delivering unmatched accuracy', icon: Zap },
              { value: '100%', label: 'Accuracy on documents up to 200+ pages', icon: CheckCircle2 },
              { value: '5M+', label: 'Global users across 30+ countries', icon: Users },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-ayonix-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-ayonix-teal" />
                </div>
                <div className="text-4xl font-bold text-ayonix-teal mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Customers Choose Ayonix
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enterprise-grade AI solutions designed for scale, security, and performance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'Predictable Execution',
                description: 'A combination of innovative capabilities enable our agents to quickly reason across multiple complex steps while maintaining accuracy with data.',
              },
              {
                icon: Shield,
                title: 'Accuracy - No Hallucinations',
                description: 'We combine advanced reasoning with SQL calculations to handle critical data-centric workloads without errors or guesswork.',
              },
              {
                icon: Zap,
                title: 'Autonomous Agent Execution',
                description: 'External triggers combined with precise document processing and advanced reasoning models virtually eliminates human oversight.',
              },
              {
                icon: Sparkles,
                title: 'AI-Guided Configuration',
                description: 'Our AI copilot assists with upfront configuration and agent creation, speeding time to agent deployment.',
              },
              {
                icon: Globe,
                title: 'Global Scale',
                description: 'Deployed across 30+ countries with 99.9% uptime and enterprise-grade security.',
              },
              {
                icon: Users,
                title: '24/7 Voice Support',
                description: 'Dedicated support team and always-on AI assistant available around the clock.',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-ayonix-cream rounded-2xl p-8 hover:shadow-xl transition-shadow card-hover"
              >
                <div className="w-14 h-14 bg-ayonix-teal rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-ayonix-forest text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              What Our Customers Say
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-left">
                <p className="text-lg text-white/90 mb-6 italic">
                  "By integrating Ayonix's AI agents into our operations, we are setting a new standard for productivity and operational excellence. This collaboration enhances our internal workflows and positions us to offer innovative solutions."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-ayonix-teal rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Enterprise Customer</p>
                    <p className="text-ayonix-mint text-sm">Chief Technology Officer</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-left">
                <p className="text-lg text-white/90 mb-6 italic">
                  "Our recent collaboration with Ayonix led to the development of an AI agent that has significantly streamlined our document processing for thousands of customer interactions."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-ayonix-teal rounded-full flex items-center justify-center mr-4">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Global Corporation</p>
                    <p className="text-ayonix-mint text-sm">VP of Business Services</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-ayonix-teal via-ayonix-teal-light to-ayonix-mint text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join the AI Revolution
            </h2>
            <p className="text-xl mb-8 text-white/90">
              The future of work is being reimagined through enterprise AI agents. With Ayonix, you can lead this transformation while maintaining the security, accuracy, and control your enterprise demands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-ayonix-teal hover:bg-ayonix-cream text-lg px-8 py-6 rounded-full shadow-lg"
              >
                <Link href="/inquiry">
                  Contact Sales
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-ayonix-forest text-white hover:bg-ayonix-forest/90 text-lg px-8 py-6 rounded-full transition-all"
              >
                <Link href="/products">
                  Explore Products
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
