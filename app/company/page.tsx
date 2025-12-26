'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import {
  Target,
  Eye,
  Heart,
  Award,
  Globe,
  Users,
  Zap,
  Shield,
  Building2,
} from 'lucide-react';

export default function CompanyPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [missionRef, missionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [valuesRef, valuesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const values = [
    {
      icon: Zap,
      title: 'Innovation First',
      description:
        'We push the boundaries of AI technology to deliver cutting-edge solutions.',
    },
    {
      icon: Users,
      title: 'Customer Success',
      description:
        'Your success is our mission. We build partnerships, not just products.',
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description:
        'Enterprise-grade security and ethical AI practices are at our core.',
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description:
        'Creating AI solutions that make a positive difference worldwide.',
    },
  ];

  const stats = [
    { value: '500+', label: 'Enterprise Clients' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '50M+', label: 'AI Interactions Daily' },
    { value: '40+', label: 'Countries Served' },
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
          <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-white/5 rounded-full blur-2xl" />
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
            <span className="text-white font-medium">About Ayonix</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Building the Future of AI
          </h1>
          <p className="text-xl md:text-2xl text-blue-50 mb-8 max-w-3xl mx-auto leading-relaxed">
            At Ayonix AI, we're on a mission to make enterprise AI accessible,
            intelligent, and transformative
          </p>
        </motion.div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-muted">
                <Image
                  src="https://cdn.abacus.ai/images/ad9dcb19-54a2-4932-979a-6c194fd09655.png"
                  alt="Ayonix AI Team"
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
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                About Ayonix AI
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Founded by a team of AI researchers and enterprise technology
                veterans, Ayonix AI is dedicated to developing intelligent agents
                that transform how organizations operate.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                We believe AI should be accessible, trustworthy, and tailored to
                each industry's unique needs. Our platform combines cutting-edge
                machine learning with enterprise-grade security and compliance.
              </p>
              <p className="text-lg text-gray-600">
                Today, we serve hundreds of enterprises across healthcare,
                finance, government, and corporate sectors, powering millions of
                AI interactions daily.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        ref={missionRef}
        className="py-20 bg-gradient-to-b from-white to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl p-10 shadow-xl"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600">
                To empower every organization with intelligent AI agents that
                enhance productivity, improve decision-making, and create
                exceptional experiences for their customers and employees.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-3xl p-10 shadow-xl"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Our Vision
              </h2>
              <p className="text-lg text-gray-600">
                A world where AI seamlessly augments human capability, making
                every organization more efficient, innovative, and responsive to
                the needs of those they serve.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Built on Cutting-Edge Technology
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Our AI platform leverages the latest advances in machine learning,
                natural language processing, and neural networks to deliver
                intelligent, context-aware responses.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                With enterprise-grade security, robust compliance frameworks, and
                seamless integration capabilities, Ayonix AI is built for the
                modern enterprise.
              </p>
              <div className="space-y-3">
                {[
                  'Advanced Natural Language Processing',
                  'Multi-modal AI Understanding',
                  'Enterprise Security & Compliance',
                  'Scalable Cloud Architecture',
                  'Real-time Learning & Adaptation',
                ].map((tech) => (
                  <div key={tech} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span className="text-gray-700">{tech}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-muted">
                <Image
                  src="https://cdn.abacus.ai/images/802fa537-589e-459d-a563-16bc4168557d.jpg"
                  alt="AI Technology"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
