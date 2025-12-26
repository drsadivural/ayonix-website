'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Linkedin, Youtube, Twitter, Facebook } from 'lucide-react';

const footerLinks = {
  products: [
    { name: 'ATLAS AI Agent', href: '/products/atlas-ai-agent' },
    { name: 'ATLAS Code-Agent', href: '/products/atlas-code-agent' },
    { name: 'ATLAS Smartglass', href: '/products/atlas-smartglass' },
    { name: 'Video Analytics', href: '/products/video-analytics' },
    { name: 'ATLAS BOX', href: '/products/atlas-box' },
  ],
  useCases: [
    { name: 'Company RAG', href: '/use-cases/company-rag' },
    { name: 'Employment Training', href: '/use-cases/employment-training' },
    { name: 'Automated Posts', href: '/use-cases/automated-posts' },
    { name: 'Offline Chatbot', href: '/use-cases/offline-chatbot' },
    { name: 'Code Assistant', href: '/use-cases/code-assistant' },
    { name: 'Face Recognition', href: '/use-cases/face-recognition' },
  ],
  company: [
    { name: 'About Us', href: '/company' },
    { name: 'News', href: '/news' },
    { name: 'Careers', href: '/company#careers' },
    { name: 'Contact', href: '/inquiry' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Demos', href: '/demos' },
    { name: 'Blog', href: '/news' },
    { name: 'Support', href: '/inquiry' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-ayonix-forest text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-bold text-white">
                AYONIX AI
              </span>
            </Link>
            <p className="text-ayonix-mint/80 mb-6 max-w-sm">
              Empowering businesses with intelligent AI agents and solutions for Healthcare, Corporate, Finance, and Government sectors.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:infojp@ayonix.com"
                className="flex items-center gap-2 text-ayonix-mint hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                infojp@ayonix.com
              </a>
              <div className="flex items-center gap-2 text-ayonix-mint/80">
                <MapPin className="w-4 h-4" />
                Tokyo, Japan
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ayonix-mint/70 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="font-semibold text-white mb-4">Use Cases</h3>
            <ul className="space-y-2">
              {footerLinks.useCases.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ayonix-mint/70 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ayonix-mint/70 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ayonix-mint/70 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ayonix-teal/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-ayonix-mint/60">
              © {new Date().getFullYear()} Ayonix AI. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-ayonix-mint/60 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-ayonix-mint/60 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-ayonix-mint/60 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://au.linkedin.com/company/ayonixco"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-ayonix-teal/20 rounded-full flex items-center justify-center hover:bg-ayonix-teal transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/ayonixjp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-ayonix-teal/20 rounded-full flex items-center justify-center hover:bg-ayonix-teal transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@Ayonixcorporation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-ayonix-teal/20 rounded-full flex items-center justify-center hover:bg-ayonix-teal transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/Ayonix/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-ayonix-teal/20 rounded-full flex items-center justify-center hover:bg-ayonix-teal transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
