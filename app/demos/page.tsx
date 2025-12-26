'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Play,
  ArrowRight,
  MessageSquare,
  Brain,
  Zap,
  Video,
  Calendar,
} from 'lucide-react';
import { useState } from 'react';
import { Chatbot } from '@/components/chatbot';

interface Demo {
  id: string;
  title: string;
  description: string;
  icon: any;
  type: 'interactive' | 'video';
}

export default function DemosPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isChatOpen, setIsChatOpen] = useState(false);

  const demos: Demo[] = [
    {
      id: 'chatbot',
      title: 'AI Chatbot Assistant',
      description:
        'Experience real-time conversations with our intelligent AI assistant. Ask questions, get recommendations, and see natural language understanding in action.',
      icon: MessageSquare,
      type: 'interactive',
    },
    {
      id: 'analytics',
      title: 'Business Intelligence',
      description:
        'See how AI analyzes data, generates insights, and provides actionable recommendations for business decisions.',
      icon: Brain,
      type: 'video',
    },
    {
      id: 'automation',
      title: 'Workflow Automation',
      description:
        'Watch AI agents automate complex workflows, from document processing to task orchestration.',
      icon: Zap,
      type: 'video',
    },
    {
      id: 'scheduling',
      title: 'Smart Scheduling',
      description:
        'Experience intelligent calendar management and meeting coordination powered by AI.',
      icon: Calendar,
      type: 'video',
    },
  ];

  return (
    <div className="bg-white">
      {/* Stylish Hero Banner */}
      <section
        ref={heroRef}
        className="relative min-h-[55vh] flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-white/5 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
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
            <Play className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Live Demos</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Experience AI in Action
          </h1>
          <p className="text-xl md:text-2xl text-blue-50 mb-8 max-w-3xl mx-auto leading-relaxed">
            Try our interactive demos and see how Ayonix AI can transform your
            business
          </p>
        </motion.div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Featured Demo - Interactive Chatbot */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-600 to-blue-400 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-12 text-white flex flex-col justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold mb-4">
                  Try Our AI Chatbot
                </h2>
                <p className="text-xl text-blue-50 mb-6">
                  Start a conversation with Aya, our intelligent AI assistant.
                  Ask about products, solutions, or any questions about Ayonix AI.
                </p>
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 w-full md:w-auto"
                  onClick={() => setIsChatOpen(true)}
                >
                  <Play className="mr-2 w-5 h-5" />
                  Start Interactive Demo
                </Button>
              </div>

              <div className="relative min-h-[400px] bg-white/10 backdrop-blur-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full aspect-video">
                    <Image
                      src="https://cdn.abacus.ai/images/ce404c46-5795-461e-b846-6d83e470397c.png"
                      alt="AI Demo Interface"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Grid */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              More Demos Coming Soon
            </h2>
            <p className="text-xl text-gray-600">
              Explore our upcoming AI demonstrations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demos.slice(1).map((demo, index) => {
              const [ref, inView] = useInView({
                triggerOnce: true,
                threshold: 0.1,
              });

              return (
                <motion.div
                  key={demo.id}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mb-6">
                    <demo.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {demo.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{demo.description}</p>
                  <div className="flex items-center text-blue-600 font-medium">
                    <Video className="w-4 h-4 mr-2" />
                    <span className="text-sm">Video Demo Coming Soon</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Request Custom Demo */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-12 border border-blue-100 text-center"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Need a Custom Demo?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our team can create a personalized demonstration tailored to your
              specific use case and industry requirements.
            </p>
            <Link href="/inquiry">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 px-8"
              >
                Request Custom Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
