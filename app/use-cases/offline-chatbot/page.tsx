'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Shield, Server, Lock, Zap, Globe } from 'lucide-react';

export default function OfflineChatbotPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="bg-white">
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ayonix-forest via-ayonix-teal to-ayonix-teal-light" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10 py-20">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }} className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-ayonix-teal/20 rounded-full border border-ayonix-teal/30 mb-6">
              <Bot className="w-4 h-4 text-ayonix-teal" />
              <span className="text-ayonix-teal text-sm font-medium">Use Case</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Offline Chatbot</h1>
            <p className="text-xl text-gray-700 mb-8">
              On-premise AI assistant solutions for secure, air-gapped environments. Deploy powerful AI assistants that run entirely on your infrastructure.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-ayonix-teal text-white hover:bg-ayonix-teal-dark rounded-full">
                <Link href="/inquiry">Get Started <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={heroInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }} className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
            <Image src="/images/atlas-ai-agent.jpg" alt="Offline Chatbot" fill className="object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Server, title: 'On-Premise Deployment', description: 'Runs entirely on your infrastructure' },
              { icon: Lock, title: 'Air-Gapped Security', description: 'No internet connection required' },
              { icon: Shield, title: 'Data Sovereignty', description: 'Your data never leaves your premises' },
              { icon: Zap, title: 'Zero Latency', description: 'Instant responses without network delays' },
              { icon: Globe, title: 'Multi-Language', description: 'Support for 50+ languages offline' },
              { icon: Bot, title: 'Custom Knowledge', description: 'Train on your proprietary data' },
            ].map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-ayonix-cream rounded-2xl p-8 hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-ayonix-teal rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-ayonix-forest text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: '100%', label: 'Data Privacy' },
              { value: '<50ms', label: 'Response Time' },
              { value: '99.99%', label: 'Uptime' },
              { value: '0', label: 'Cloud Dependencies' },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-5xl font-bold text-ayonix-mint mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Deploy AI Without Compromise</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-ayonix-teal hover:bg-ayonix-teal-dark text-white rounded-full px-8">
              <Link href="/inquiry">Contact Sales <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-ayonix-teal text-ayonix-teal hover:bg-ayonix-teal hover:text-white rounded-full px-8">
              <Link href="/use-cases">View All Use Cases</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
