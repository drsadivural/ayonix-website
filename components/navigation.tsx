'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut, User, ChevronDown, FileText, Users, MessageSquare, Bot, Code2, Scan, Menu, X, Brain, Box, Glasses, Video, Cpu, Building2, Newspaper, Briefcase, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const useCasesItems = [
  { name: 'Company RAG', path: '/use-cases/company-rag', icon: FileText, description: 'Intelligent document retrieval and analysis' },
  { name: 'Employment Training', path: '/use-cases/employment-training', icon: Users, description: 'AI-powered training and onboarding' },
  { name: 'Automated Posts', path: '/use-cases/automated-posts', icon: MessageSquare, description: 'Smart content generation and scheduling' },
  { name: 'Offline Chatbot', path: '/use-cases/offline-chatbot', icon: Bot, description: 'On-premise AI assistant solutions' },
  { name: 'Code Assistant', path: '/use-cases/code-assistant', icon: Code2, description: 'AI-powered development tools' },
  { name: 'Face Recognition', path: '/use-cases/face-recognition', icon: Scan, description: 'Advanced biometric identification' },
];

const productsItems = [
  { name: 'ATLAS AI Agent', path: '/products/atlas-ai-agent', icon: Brain, description: 'Enterprise AI agent platform' },
  { name: 'ATLAS Code-Agent', path: '/products/atlas-code-agent', icon: Code2, description: 'AI-powered coding assistant' },
  { name: 'ATLAS Smartglass', path: '/products/atlas-smartglass', icon: Glasses, description: 'AR-enabled smart glasses' },
  { name: 'Video Analytics', path: '/products/video-analytics', icon: Video, description: 'Intelligent video processing' },
  { name: 'ATLAS BOX', path: '/products/atlas-box', icon: Box, description: 'Edge AI computing device' },
];

const companyItems = [
  { name: 'About Us', path: '/company', icon: Building2, description: 'Learn about Ayonix' },
  { name: 'News', path: '/news', icon: Newspaper, description: 'Latest updates and announcements' },
  { name: 'Careers', path: '/company#careers', icon: Briefcase, description: 'Join our team' },
  { name: 'Contact', path: '/inquiry', icon: Mail, description: 'Get in touch with us' },
];

const navItems = [
  { name: 'Products', path: '/products', hasDropdown: true, dropdownType: 'products' },
  { name: 'Use Cases', path: '/use-cases', hasDropdown: true, dropdownType: 'usecases' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'Company', path: '/company', hasDropdown: true, dropdownType: 'company' },
  { name: 'News', path: '/news' },
  { name: 'Demos', path: '/demos' },
];

export function Navigation() {
  const pathname = usePathname();
  const { data: session, status } = useSession() || {};
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutside = Object.values(dropdownRefs.current).every(
        ref => ref && !ref.contains(event.target as Node)
      );
      if (isOutside) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (dropdownType: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenDropdown(dropdownType);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const getDropdownItems = (dropdownType: string) => {
    switch (dropdownType) {
      case 'products':
        return productsItems;
      case 'usecases':
        return useCasesItems;
      case 'company':
        return companyItems;
      default:
        return [];
    }
  };

  const getDropdownLink = (dropdownType: string) => {
    switch (dropdownType) {
      case 'products':
        return '/products';
      case 'usecases':
        return '/use-cases';
      case 'company':
        return '/company';
      default:
        return '/';
    }
  };

  const getDropdownLinkText = (dropdownType: string) => {
    switch (dropdownType) {
      case 'products':
        return 'View all products';
      case 'usecases':
        return 'View all use cases';
      case 'company':
        return 'About Ayonix';
      default:
        return 'View all';
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-ayonix-mint/30 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold gradient-text-teal">
              AYONIX AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              item.hasDropdown ? (
                <div
                  key={item.path}
                  ref={(el) => { dropdownRefs.current[item.dropdownType!] = el; }}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.dropdownType!)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Button
                    variant="ghost"
                    className={`${
                      pathname.startsWith(item.path)
                        ? 'bg-ayonix-teal text-white hover:bg-ayonix-teal-dark'
                        : 'text-gray-700 hover:bg-ayonix-cream hover:text-ayonix-teal'
                    } flex items-center gap-1`}
                  >
                    {item.name}
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.dropdownType ? 'rotate-180' : ''}`} />
                  </Button>

                  <AnimatePresence>
                    {openDropdown === item.dropdownType && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                        onMouseEnter={() => handleMouseEnter(item.dropdownType!)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="p-2">
                          {getDropdownItems(item.dropdownType!).map((dropdownItem) => (
                            <Link
                              key={dropdownItem.path}
                              href={dropdownItem.path}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-ayonix-cream transition-colors group"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <div className="w-10 h-10 bg-ayonix-teal/10 rounded-lg flex items-center justify-center group-hover:bg-ayonix-teal transition-colors">
                                <dropdownItem.icon className="w-5 h-5 text-ayonix-teal group-hover:text-white transition-colors" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900 group-hover:text-ayonix-teal transition-colors">
                                  {dropdownItem.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {dropdownItem.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="bg-ayonix-cream p-3 border-t border-gray-100">
                          <Link
                            href={getDropdownLink(item.dropdownType!)}
                            className="text-sm font-semibold text-ayonix-teal hover:text-ayonix-teal-dark flex items-center gap-1"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {getDropdownLinkText(item.dropdownType!)}
                            <ChevronDown className="w-4 h-4 -rotate-90" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={pathname === item.path ? 'default' : 'ghost'}
                    className={`${
                      pathname === item.path
                        ? 'bg-ayonix-teal text-white hover:bg-ayonix-teal-dark'
                        : 'text-gray-700 hover:bg-ayonix-cream hover:text-ayonix-teal'
                    }`}
                  >
                    {item.name}
                  </Button>
                </Link>
              )
            ))}
          </div>

          {/* Right Side - Auth & CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            {status === 'authenticated' && session?.user ? (
              <>
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <User className="w-4 h-4" />
                  <span>{session.user?.name ?? session.user?.email}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="border-ayonix-teal text-ayonix-teal hover:bg-ayonix-cream"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-ayonix-teal hover:bg-ayonix-cream"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/inquiry">
                  <Button
                    size="sm"
                    className="bg-ayonix-teal text-white hover:bg-ayonix-teal-dark rounded-full px-6"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-100"
            >
              <div className="py-4 space-y-2">
                {/* Products Section */}
                <div className="space-y-2">
                  <Link
                    href="/products"
                    className="block px-4 py-2 text-gray-700 hover:bg-ayonix-cream rounded-lg font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Products
                  </Link>
                  <div className="pl-4 space-y-1">
                    {productsItems.map((product) => (
                      <Link
                        key={product.path}
                        href={product.path}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-ayonix-cream rounded-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <product.icon className="w-4 h-4 text-ayonix-teal" />
                        {product.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Use Cases Section */}
                <div className="space-y-2">
                  <Link
                    href="/use-cases"
                    className="block px-4 py-2 text-gray-700 hover:bg-ayonix-cream rounded-lg font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Use Cases
                  </Link>
                  <div className="pl-4 space-y-1">
                    {useCasesItems.map((useCase) => (
                      <Link
                        key={useCase.path}
                        href={useCase.path}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-ayonix-cream rounded-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <useCase.icon className="w-4 h-4 text-ayonix-teal" />
                        {useCase.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Solutions */}
                <Link
                  href="/solutions"
                  className={`block px-4 py-2 rounded-lg ${
                    pathname === '/solutions'
                      ? 'bg-ayonix-teal text-white'
                      : 'text-gray-700 hover:bg-ayonix-cream'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Solutions
                </Link>

                {/* Company Section */}
                <div className="space-y-2">
                  <Link
                    href="/company"
                    className="block px-4 py-2 text-gray-700 hover:bg-ayonix-cream rounded-lg font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Company
                  </Link>
                  <div className="pl-4 space-y-1">
                    {companyItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-ayonix-cream rounded-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className="w-4 h-4 text-ayonix-teal" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* News */}
                <Link
                  href="/news"
                  className={`block px-4 py-2 rounded-lg ${
                    pathname === '/news'
                      ? 'bg-ayonix-teal text-white'
                      : 'text-gray-700 hover:bg-ayonix-cream'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  News
                </Link>

                {/* Demos */}
                <Link
                  href="/demos"
                  className={`block px-4 py-2 rounded-lg ${
                    pathname === '/demos'
                      ? 'bg-ayonix-teal text-white'
                      : 'text-gray-700 hover:bg-ayonix-cream'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Demos
                </Link>

                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-ayonix-teal hover:bg-ayonix-cream rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/inquiry"
                    className="block px-4 py-2 bg-ayonix-teal text-white rounded-lg text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
