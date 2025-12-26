'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Code2,
  MessageSquare,
  Workflow,
  Shield,
  Globe,
  Building,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface Product {
  product_name: string;
  description: string;
  key_features: string[];
  use_cases: string[];
  industries_served: string[];
  capabilities: string;
}

// Map product names to their corresponding image filenames
const productImageMap: Record<string, string> = {
  'ATLAS AI Agent': '/images/atlas-ai-agent.jpg',
  'ATLAS Code-Agent': '/images/atlas-code-agent.jpg',
  'ATLAS Smartglass Agent': '/images/atlas-smartglass.jpg',
  'AI Video Analytics': '/images/video-analytics-dashboard.jpg',
  'ATLAS BOX': '/images/atlas-box-device.jpg',
};

// Map product names to their demo URLs
const productDemoUrlMap: Record<string, string> = {
  'ATLAS AI Agent': 'https://atlas.ayonix.com',
  'ATLAS Code-Agent': 'https://agentcoder.ayonix.com',
  'AI Video Analytics': 'https://va.ayonix.com',
  'ATLAS Smartglass Agent': '/demos',
  'ATLAS BOX': '/demos',
};

// Map product names to their detail page URLs
const productDetailUrlMap: Record<string, string> = {
  'ATLAS AI Agent': '/products/atlas-ai-agent',
  'ATLAS Code-Agent': '/products/atlas-code-agent',
  'ATLAS Smartglass Agent': '/products/atlas-smartglass',
  'AI Video Analytics': '/products/video-analytics',
  'ATLAS BOX': '/products/atlas-box',
};

function ProductCard({ product, productIndex }: { product: Product; productIndex: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const productIcons = [Workflow, Code2, Sparkles, Shield, Building];
  const Icon = productIcons[productIndex] ?? Sparkles;
  const productImage = productImageMap[product.product_name] || '/images/ai-workflow.jpg';
  const demoUrl = productDemoUrlMap[product.product_name] || '/demos';
  const detailUrl = productDetailUrlMap[product.product_name];
  const isEvenIndex = productIndex % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-3xl shadow-xl overflow-hidden"
    >
      <div className={`grid lg:grid-cols-2 gap-0 ${!isEvenIndex ? 'lg:grid-flow-dense' : ''}`}>
        {/* Product Image Section */}
        <div className={`relative h-96 lg:h-auto ${!isEvenIndex ? 'lg:col-start-2' : ''}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-400/10" />
          <Image
            src={productImage}
            alt={product.product_name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Product Info Section */}
        <div className={`p-8 lg:p-12 flex flex-col justify-center ${!isEvenIndex ? 'lg:col-start-1' : ''}`}>
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mb-6">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            {product.product_name}
          </h2>
          <p className="text-base lg:text-lg text-gray-600 mb-6">
            {product.description}
          </p>

          <div className="mb-6">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mr-2" />
              Key Features
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {product.key_features?.slice(0, 6).map((feature) => (
                <div
                  key={feature}
                  className="flex items-start space-x-2"
                >
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm lg:text-base text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                <Building className="w-4 h-4 text-blue-600 mr-2" />
                Industries Served
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.industries_served?.slice(0, 4).map((industry) => (
                  <span
                    key={industry}
                    className="px-2 py-1 bg-blue-50 rounded-full text-xs text-gray-700"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              {detailUrl && (
                <Link href={detailUrl}>
                  <Button variant="outline" className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              )}
              <Link 
                href={demoUrl}
                target={demoUrl.startsWith('http') ? '_blank' : '_self'}
                rel={demoUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                  Try Demo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Details Section */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 lg:p-12 border-t border-blue-200">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Code2 className="w-5 h-5 text-blue-600 mr-2" />
              Use Cases
            </h3>
            <div className="space-y-2">
              {product.use_cases?.map((useCase) => (
                <div
                  key={useCase}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">
                    {useCase}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Shield className="w-5 h-5 text-blue-600 mr-2" />
              Capabilities
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.capabilities}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    fetch('/data/products_data.json')
      .then((res) => res.json())
      .then((data) => setProducts(data ?? []))
      .catch((err) => console.error('Failed to load products:', err));
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section with Stylish Background */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a1628 0%, #1e3a8a 50%, #0284c7 100%)',
        }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          {/* Geometric Shapes */}
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -40, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.25, 1],
              x: [0, 60, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />

        {/* Diagonal Lines Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.1) 10px,
              rgba(255,255,255,0.1) 20px
            )`,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={heroInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6"
          >
            <span className="text-blue-100 text-sm font-medium tracking-wider uppercase">
              ✨ Next-Generation AI Solutions
            </span>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
            ATLAS AI Product Suite
          </h1>
          <p className="text-xl text-blue-50 mb-8 drop-shadow-lg max-w-3xl mx-auto leading-relaxed">
            Advanced AI agents, smart glasses, video analytics, and edge computing solutions
            that revolutionize how businesses operate and innovate
          </p>
          
          {/* Floating Icons */}
          <div className="flex justify-center gap-8 mt-10">
            {[Sparkles, Shield, Globe, Workflow].map((Icon, index) => (
              <motion.div
                key={index}
                initial={{ y: 0 }}
                animate={{ y: [-10, 10, -10] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20"
              >
                <Icon className="w-6 h-6 text-white" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Wave Decoration */}
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

      {/* Products Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {products.map((product, productIndex) => (
              <ProductCard
                key={product.product_name}
                product={product}
                productIndex={productIndex}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-50 mb-8">
              Discover how our AI products can transform your business operations
            </p>
            <Link href="/inquiry">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8"
              >
                Contact Sales
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
