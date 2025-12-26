'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  Calendar,
  Tag,
  ArrowRight,
  Sparkles,
  Globe,
  Award,
  Beaker,
  TrendingUp,
  Linkedin,
  ExternalLink,
  Rocket,
  Users,
  Brain,
  Shield,
  X,
  ArrowLeft,
} from 'lucide-react';

interface NewsPost {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  sourceUrl: string | null;
  linkedinPostUrl?: string; // Direct link to the LinkedIn post
  publishedAt: string;
  source: 'linkedin' | 'ayonix' | 'company';
  fullContent?: string; // Full article content for embedded view
}

const categoryIcons: Record<string, any> = {
  'Product Launch': Rocket,
  'Partnership': Globe,
  'Recognition': Award,
  'Research': Beaker,
  'AI Technology': Brain,
  'Company News': Sparkles,
  'Security': Shield,
  'Team': Users,
};

const categoryColors: Record<string, string> = {
  'Product Launch': 'bg-blue-50 text-blue-700 border-blue-200',
  'Partnership': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Recognition': 'bg-purple-50 text-purple-700 border-purple-200',
  'Research': 'bg-amber-50 text-amber-700 border-amber-200',
  'AI Technology': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Company News': 'bg-teal-50 text-teal-700 border-teal-200',
  'Security': 'bg-red-50 text-red-700 border-red-200',
  'Team': 'bg-pink-50 text-pink-700 border-pink-200',
};

// Default news data from LinkedIn posts and ayonix.abacusai.app
const defaultNewsData: NewsPost[] = [
  // From ayonix.abacusai.app/news
  {
    id: '1',
    title: 'Ayonix Launches Next-Gen AI Assistant',
    description: 'Introducing our latest AI model with improved accuracy and performance, setting new standards in enterprise AI solutions. The new assistant features advanced natural language processing and can handle complex multi-step tasks with unprecedented accuracy.',
    category: 'Product Launch',
    imageUrl: '/images/news-ai-assistant-launch.jpg',
    sourceUrl: 'https://ayonix.abacusai.app/news',
    publishedAt: '2024-03-15',
    source: 'ayonix',
    fullContent: `
      <h2>Ayonix Launches Next-Gen AI Assistant</h2>
      <p>We are thrilled to announce the launch of our next-generation AI Assistant, a groundbreaking advancement in enterprise AI technology.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li><strong>Advanced Natural Language Processing:</strong> Our new AI model understands context better than ever, enabling more natural and productive conversations.</li>
        <li><strong>Multi-step Task Handling:</strong> Complex workflows that previously required multiple interactions can now be completed in a single conversation.</li>
        <li><strong>Unprecedented Accuracy:</strong> Achieving 99.7% accuracy in task completion, setting new industry standards.</li>
        <li><strong>Enterprise-grade Security:</strong> Built with SOC 2 Type II compliance and end-to-end encryption.</li>
      </ul>
      
      <h3>What This Means for Your Business</h3>
      <p>The new AI Assistant can help your team:</p>
      <ul>
        <li>Reduce response times by up to 70%</li>
        <li>Handle 10x more customer inquiries simultaneously</li>
        <li>Automate complex document processing workflows</li>
        <li>Provide 24/7 intelligent support without human intervention</li>
      </ul>
      
      <p>Contact our sales team to schedule a demo and see how our Next-Gen AI Assistant can transform your business operations.</p>
    `,
  },
  {
    id: '2',
    title: 'Strategic Partnership with Global Tech Leader',
    description: 'Announcing strategic partnership to expand AI solutions worldwide, enhancing our global presence and technological capabilities. This collaboration will bring cutting-edge AI technology to enterprises across 50+ countries.',
    category: 'Partnership',
    imageUrl: '/images/news-partnership-announcement.jpg',
    sourceUrl: 'https://ayonix.abacusai.app/news',
    publishedAt: '2024-03-10',
    source: 'ayonix',
    fullContent: `
      <h2>Strategic Partnership with Global Tech Leader</h2>
      <p>Ayonix is proud to announce a strategic partnership that will significantly expand our global reach and technological capabilities.</p>
      
      <h3>Partnership Highlights</h3>
      <ul>
        <li><strong>Global Expansion:</strong> Our AI solutions will now be available in 50+ countries through our partner's extensive distribution network.</li>
        <li><strong>Technology Integration:</strong> Combining our AI expertise with our partner's infrastructure to deliver seamless enterprise solutions.</li>
        <li><strong>Joint R&D:</strong> Collaborative research initiatives to push the boundaries of AI technology.</li>
      </ul>
      
      <h3>Benefits for Our Customers</h3>
      <p>This partnership brings immediate benefits:</p>
      <ul>
        <li>Faster deployment times with local support</li>
        <li>Enhanced integration capabilities</li>
        <li>Access to combined expertise and resources</li>
        <li>Improved service level agreements</li>
      </ul>
      
      <p>We're excited about this new chapter and the opportunities it creates for our customers worldwide.</p>
    `,
  },
  {
    id: '3',
    title: 'Innovation Award 2024',
    description: 'Ayonix recognized for outstanding innovation in AI technology at the International Tech Awards 2024. Our face recognition and AI agent technologies were highlighted for their groundbreaking accuracy and enterprise-grade security.',
    category: 'Recognition',
    imageUrl: '/images/news-innovation-award-2024.jpg',
    sourceUrl: 'https://ayonix.abacusai.app/news',
    publishedAt: '2024-03-05',
    source: 'ayonix',
    fullContent: `
      <h2>Ayonix Wins Innovation Award 2024</h2>
      <p>We are honored to receive the Innovation Award at the International Tech Awards 2024, recognizing our contributions to AI technology.</p>
      
      <h3>Award Categories</h3>
      <ul>
        <li><strong>Best AI Innovation:</strong> For our ATLAS AI Agent Platform</li>
        <li><strong>Excellence in Security:</strong> For our face recognition technology</li>
        <li><strong>Enterprise Solution of the Year:</strong> For our comprehensive AI suite</li>
      </ul>
      
      <h3>What the Judges Said</h3>
      <blockquote>"Ayonix has demonstrated exceptional innovation in making AI accessible and secure for enterprises. Their face recognition technology sets new standards for accuracy while maintaining the highest security protocols."</blockquote>
      
      <p>This recognition motivates us to continue pushing the boundaries of what's possible with AI technology.</p>
    `,
  },
  {
    id: '4',
    title: 'New Research Breakthrough in Face Recognition',
    description: 'Our research team achieves breakthrough in facial recognition accuracy, pushing boundaries of AI technology. The new algorithm achieves 99.9% accuracy even in challenging lighting conditions and with partial face visibility.',
    category: 'Research',
    imageUrl: '/images/news-face-recognition-research.jpg',
    sourceUrl: 'https://ayonix.abacusai.app/news',
    publishedAt: '2024-02-28',
    source: 'ayonix',
    fullContent: `
      <h2>Research Breakthrough in Face Recognition</h2>
      <p>Our research team has achieved a significant breakthrough in facial recognition technology, setting new benchmarks for accuracy and reliability.</p>
      
      <h3>Technical Achievements</h3>
      <ul>
        <li><strong>99.9% Accuracy:</strong> Even in challenging conditions including low light, partial occlusion, and varying angles.</li>
        <li><strong>Anti-Spoofing:</strong> Advanced liveness detection to prevent photo and video-based attacks.</li>
        <li><strong>Speed:</strong> Recognition in under 100 milliseconds for real-time applications.</li>
        <li><strong>Scale:</strong> Capable of matching against databases of 10+ million faces.</li>
      </ul>
      
      <h3>Applications</h3>
      <p>This breakthrough enables new use cases:</p>
      <ul>
        <li>Enhanced security for high-security facilities</li>
        <li>Seamless access control in smart buildings</li>
        <li>Improved customer experience in retail</li>
        <li>Advanced surveillance for public safety</li>
      </ul>
      
      <p>Our research paper will be published in the upcoming AI Conference proceedings.</p>
    `,
  },
  // LinkedIn-style posts
  {
    id: '5',
    title: 'ATLAS AI Agent Platform Now Available for Enterprise',
    description: 'We are excited to announce that our ATLAS AI Agent Platform is now available for enterprise customers. Build, deploy, and scale intelligent AI agents that transform your business operations with unprecedented accuracy and control.',
    category: 'Product Launch',
    imageUrl: '/images/atlas-ai-platform.jpg',
    sourceUrl: 'https://au.linkedin.com/company/ayonixco',
    linkedinPostUrl: 'https://au.linkedin.com/company/ayonixco',
    publishedAt: '2024-12-20',
    source: 'linkedin',
    fullContent: `
      <h2>ATLAS AI Agent Platform Now Available for Enterprise</h2>
      <p>We are excited to announce that our ATLAS AI Agent Platform is now available for enterprise customers!</p>
      
      <h3>What is ATLAS AI Agent?</h3>
      <p>ATLAS is our flagship AI agent platform that enables businesses to build, deploy, and scale intelligent AI agents. These agents can:</p>
      <ul>
        <li>Automate complex business workflows</li>
        <li>Handle customer inquiries with human-like understanding</li>
        <li>Process documents and extract insights</li>
        <li>Integrate with your existing systems seamlessly</li>
      </ul>
      
      <h3>Key Features</h3>
      <ul>
        <li><strong>No-Code Builder:</strong> Create AI agents without programming knowledge</li>
        <li><strong>Enterprise Security:</strong> SOC 2 Type II certified with end-to-end encryption</li>
        <li><strong>Scalability:</strong> Handle millions of interactions per day</li>
        <li><strong>Analytics:</strong> Comprehensive dashboards and reporting</li>
      </ul>
      
      <p>Ready to transform your business? Contact us for a demo!</p>
      
      <p><em>Originally posted on LinkedIn</em></p>
    `,
  },
  {
    id: '6',
    title: 'Ayonix Expands to Melbourne, Australia',
    description: 'We are thrilled to announce the opening of our new Australia office in Melbourne! Located at 470 St Kilda Rd, our new office will serve as the hub for Asia-Pacific operations and customer support.',
    category: 'Company News',
    imageUrl: '/images/melbourne-office.jpg',
    sourceUrl: 'https://au.linkedin.com/company/ayonixco',
    linkedinPostUrl: 'https://au.linkedin.com/company/ayonixco',
    publishedAt: '2024-12-15',
    source: 'linkedin',
    fullContent: `
      <h2>Ayonix Expands to Melbourne, Australia</h2>
      <p>We are thrilled to announce the opening of our new Australia office in Melbourne!</p>
      
      <h3>Our New Location</h3>
      <p><strong>Address:</strong> 470 St Kilda Rd, Melbourne, VIC 3004 Australia</p>
      <p><strong>Phone:</strong> +61 431 901 973</p>
      
      <h3>Why Melbourne?</h3>
      <p>Melbourne's vibrant tech ecosystem and strategic location make it the perfect hub for our Asia-Pacific operations. The new office will:</p>
      <ul>
        <li>Provide local support for Australian and APAC customers</li>
        <li>Host training and demonstration facilities</li>
        <li>Serve as a regional R&D center</li>
        <li>Enable faster response times for local clients</li>
      </ul>
      
      <h3>Join Our Team</h3>
      <p>We're hiring! If you're passionate about AI and want to join a growing team, check out our careers page.</p>
      
      <p><em>Originally posted on LinkedIn</em></p>
    `,
  },
  {
    id: '7',
    title: 'Voice-Controlled AI Interface Revolution',
    description: 'Introducing hands-free enterprise AI! Our new voice-controlled interface allows users to interact with AI agents naturally, making complex workflows accessible to everyone. Experience the future of human-AI collaboration.',
    category: 'AI Technology',
    imageUrl: '/images/voice-ai-interface.jpg',
    sourceUrl: 'https://au.linkedin.com/company/ayonixco',
    linkedinPostUrl: 'https://au.linkedin.com/company/ayonixco',
    publishedAt: '2024-12-10',
    source: 'linkedin',
    fullContent: `
      <h2>Voice-Controlled AI Interface Revolution</h2>
      <p>Introducing hands-free enterprise AI! Our new voice-controlled interface is changing how businesses interact with AI.</p>
      
      <h3>Natural Voice Interaction</h3>
      <p>Our voice AI understands natural speech patterns, accents, and context. Simply speak to your AI agent like you would to a colleague.</p>
      
      <h3>Key Capabilities</h3>
      <ul>
        <li><strong>Wake Word Activation:</strong> "Hey Aya" activates the assistant instantly</li>
        <li><strong>Multi-language Support:</strong> Works in 20+ languages</li>
        <li><strong>Context Awareness:</strong> Remembers conversation history</li>
        <li><strong>Hands-free Navigation:</strong> Control entire applications by voice</li>
      </ul>
      
      <h3>Use Cases</h3>
      <ul>
        <li>Warehouse and factory floor operations</li>
        <li>Healthcare settings where hands-free is essential</li>
        <li>Accessibility for users with mobility challenges</li>
        <li>Busy professionals multitasking</li>
      </ul>
      
      <p>Experience the future of human-AI collaboration today!</p>
      
      <p><em>Originally posted on LinkedIn</em></p>
    `,
  },
  {
    id: '8',
    title: 'Enterprise Security Certification Achieved',
    description: 'Ayonix has achieved SOC 2 Type II certification, demonstrating our commitment to the highest standards of security and data protection. Our AI solutions are trusted by Fortune 500 companies worldwide.',
    category: 'Security',
    imageUrl: '/images/security-certification.jpg',
    sourceUrl: 'https://au.linkedin.com/company/ayonixco',
    linkedinPostUrl: 'https://au.linkedin.com/company/ayonixco',
    publishedAt: '2024-12-05',
    source: 'linkedin',
    fullContent: `
      <h2>Enterprise Security Certification Achieved</h2>
      <p>We are proud to announce that Ayonix has achieved SOC 2 Type II certification!</p>
      
      <h3>What This Means</h3>
      <p>SOC 2 Type II certification demonstrates that our security controls have been independently audited and verified over an extended period. This certification covers:</p>
      <ul>
        <li><strong>Security:</strong> Protection against unauthorized access</li>
        <li><strong>Availability:</strong> System uptime and reliability</li>
        <li><strong>Processing Integrity:</strong> Accurate and complete data processing</li>
        <li><strong>Confidentiality:</strong> Protection of sensitive information</li>
        <li><strong>Privacy:</strong> Proper handling of personal data</li>
      </ul>
      
      <h3>Our Security Commitment</h3>
      <ul>
        <li>End-to-end encryption for all data</li>
        <li>Regular penetration testing</li>
        <li>24/7 security monitoring</li>
        <li>Comprehensive audit logging</li>
      </ul>
      
      <p>Trust Ayonix for your enterprise AI needs.</p>
      
      <p><em>Originally posted on LinkedIn</em></p>
    `,
  },
  {
    id: '9',
    title: 'ATLAS Code-Agent: AI-Powered Development',
    description: 'Meet ATLAS Code-Agent - your AI coding companion that understands your codebase, writes production-ready code, and helps debug complex issues. Increase developer productivity by 10x with intelligent code assistance.',
    category: 'Product Launch',
    imageUrl: '/images/code-agent-launch.jpg',
    sourceUrl: 'https://au.linkedin.com/company/ayonixco',
    linkedinPostUrl: 'https://au.linkedin.com/company/ayonixco',
    publishedAt: '2024-11-28',
    source: 'linkedin',
    fullContent: `
      <h2>ATLAS Code-Agent: AI-Powered Development</h2>
      <p>Meet ATLAS Code-Agent - your AI coding companion that revolutionizes software development!</p>
      
      <h3>What Can Code-Agent Do?</h3>
      <ul>
        <li><strong>Code Generation:</strong> Write production-ready code from natural language descriptions</li>
        <li><strong>Code Review:</strong> Automatically review PRs and suggest improvements</li>
        <li><strong>Debugging:</strong> Identify and fix bugs with intelligent analysis</li>
        <li><strong>Documentation:</strong> Generate comprehensive documentation automatically</li>
        <li><strong>Refactoring:</strong> Improve code quality and maintainability</li>
      </ul>
      
      <h3>Supported Languages</h3>
      <p>Python, JavaScript, TypeScript, Java, C++, Go, Rust, and 20+ more languages.</p>
      
      <h3>Results</h3>
      <ul>
        <li>10x increase in developer productivity</li>
        <li>50% reduction in bug rates</li>
        <li>80% faster code reviews</li>
        <li>Consistent code quality across teams</li>
      </ul>
      
      <p>Try ATLAS Code-Agent today and transform your development workflow!</p>
      
      <p><em>Originally posted on LinkedIn</em></p>
    `,
  },
  {
    id: '10',
    title: 'Healthcare AI Partnership Announcement',
    description: 'Ayonix partners with leading healthcare providers to bring AI-powered diagnostics and patient care solutions. Our technology will help improve patient outcomes while reducing administrative burden on healthcare workers.',
    category: 'Partnership',
    imageUrl: '/images/healthcare-partnership.jpg',
    sourceUrl: 'https://au.linkedin.com/company/ayonixco',
    linkedinPostUrl: 'https://au.linkedin.com/company/ayonixco',
    publishedAt: '2024-11-20',
    source: 'linkedin',
    fullContent: `
      <h2>Healthcare AI Partnership Announcement</h2>
      <p>Ayonix is proud to announce partnerships with leading healthcare providers to bring AI-powered solutions to patient care!</p>
      
      <h3>Partnership Goals</h3>
      <ul>
        <li>Improve patient outcomes through AI-assisted diagnostics</li>
        <li>Reduce administrative burden on healthcare workers</li>
        <li>Streamline clinical workflows</li>
        <li>Enhance patient experience</li>
      </ul>
      
      <h3>AI Solutions for Healthcare</h3>
      <ul>
        <li><strong>Clinical Documentation:</strong> AI-powered transcription and note generation</li>
        <li><strong>Diagnostic Support:</strong> Image analysis and pattern recognition</li>
        <li><strong>Patient Communication:</strong> Intelligent chatbots for appointment scheduling and FAQs</li>
        <li><strong>Administrative Automation:</strong> Claims processing and billing assistance</li>
      </ul>
      
      <h3>HIPAA Compliance</h3>
      <p>All our healthcare solutions are fully HIPAA compliant with enterprise-grade security.</p>
      
      <p>Together, we're building a healthier future with AI.</p>
      
      <p><em>Originally posted on LinkedIn</em></p>
    `,
  },
];

export default function NewsPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [filter, setFilter] = useState<'all' | 'linkedin' | 'ayonix'>('all');
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);
  const [newsData, setNewsData] = useState<NewsPost[]>(defaultNewsData);

  // Load admin-created news from localStorage
  useEffect(() => {
    const loadAdminNews = () => {
      try {
        const stored = localStorage.getItem('ayonix_news');
        if (stored) {
          const adminNews = JSON.parse(stored);
          // Convert admin news format to NewsPost format
          const formattedAdminNews: NewsPost[] = adminNews.map((news: any) => ({
            id: news.id,
            title: news.title,
            description: news.content.substring(0, 200) + (news.content.length > 200 ? '...' : ''),
            category: news.category,
            imageUrl: news.imageUrl || '/images/news-default.jpg',
            sourceUrl: null,
            publishedAt: news.createdAt,
            source: 'company' as const,
            fullContent: `<h2>${news.title}</h2><p>${news.content.replace(/\\n/g, '</p><p>')}</p>${news.aiGenerated ? '<p><em>Written with AI assistance</em></p>' : ''}`,
          }));
          // Combine admin news with default news, admin news first
          setNewsData([...formattedAdminNews, ...defaultNewsData]);
        }
      } catch (error) {
        console.error('Error loading admin news:', error);
      }
    };

    loadAdminNews();
    // Listen for storage changes (when admin adds new news)
    window.addEventListener('storage', loadAdminNews);
    return () => window.removeEventListener('storage', loadAdminNews);
  }, []);

  const filteredNews = filter === 'all' 
    ? newsData 
    : newsData.filter(post => post.source === filter);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const openPost = (post: NewsPost) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden';
  };

  const closePost = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Embedded Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
              <button
                onClick={closePost}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to News</span>
              </button>
              <div className="flex items-center gap-3">
                {selectedPost.source === 'linkedin' && selectedPost.linkedinPostUrl && (
                  <a
                    href={selectedPost.linkedinPostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-full text-sm font-medium hover:bg-[#006097] transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>View on LinkedIn</span>
                  </a>
                )}
                <button
                  onClick={closePost}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Hero Image */}
              <div className="relative aspect-[21/9] bg-gradient-to-br from-ayonix-teal to-ayonix-mint">
                <div className="absolute inset-0 flex items-center justify-center">
                  {(() => {
                    const IconComponent = categoryIcons[selectedPost.category] || Tag;
                    return <IconComponent className="w-24 h-24 text-white/40" />;
                  })()}
                </div>
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  {(() => {
                    const IconComponent = categoryIcons[selectedPost.category] || Tag;
                    const colorClass = categoryColors[selectedPost.category] || 'bg-gray-50 text-gray-700 border-gray-200';
                    return (
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm bg-white/90 ${colorClass}`}>
                        <IconComponent className="w-4 h-4" />
                        <span>{selectedPost.category}</span>
                      </div>
                    );
                  })()}
                </div>
                {/* Source Badge */}
                <div className="absolute top-4 right-4">
                  {selectedPost.source === 'linkedin' ? (
                    <div className="flex items-center gap-1 px-3 py-2 bg-[#0077B5] text-white rounded-full text-xs font-medium">
                      <Linkedin className="w-3 h-3" />
                      <span>LinkedIn</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 px-3 py-2 bg-ayonix-teal text-white rounded-full text-xs font-medium">
                      <Sparkles className="w-3 h-3" />
                      <span>Ayonix</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Article Content */}
              <div className="p-8">
                {/* Date */}
                <div className="flex items-center gap-2 text-gray-500 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(selectedPost.publishedAt)}</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {selectedPost.title}
                </h1>

                {/* Full Content */}
                {selectedPost.fullContent ? (
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-blockquote:border-ayonix-teal prose-blockquote:text-gray-600"
                    dangerouslySetInnerHTML={{ __html: selectedPost.fullContent }}
                  />
                ) : (
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {selectedPost.description}
                  </p>
                )}

                {/* Footer */}
                <div className="mt-8 pt-8 border-t">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-gray-500">
                      {selectedPost.source === 'linkedin' ? (
                        <span>Originally shared on LinkedIn</span>
                      ) : (
                        <span>Source: Ayonix News</span>
                      )}
                    </div>
                    {selectedPost.sourceUrl && (
                      <a
                        href={selectedPost.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-ayonix-teal hover:text-ayonix-teal-dark transition-colors font-medium"
                      >
                        <span>View Original Source</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Stylish Hero Banner */}
      <section
        ref={heroRef}
        className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-ayonix-teal via-ayonix-teal-dark to-ayonix-mint"
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-ayonix-mint/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
        </div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
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
            <TrendingUp className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Latest Updates</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Ayonix News
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Discover our latest innovations, partnerships, and achievements shaping the future of AI
          </p>
        </motion.div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-ayonix-teal text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All News
            </button>
            <button
              onClick={() => setFilter('linkedin')}
              className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                filter === 'linkedin'
                  ? 'bg-[#0077B5] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn Posts
            </button>
            <button
              onClick={() => setFilter('ayonix')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                filter === 'ayonix'
                  ? 'bg-ayonix-teal text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Ayonix Updates
            </button>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredNews.map((post, index) => {
              const IconComponent = categoryIcons[post.category] || Tag;
              const colorClass = categoryColors[post.category] || 'bg-gray-50 text-gray-700 border-gray-200';

              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-ayonix-teal hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onClick={() => openPost(post)}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-ayonix-teal to-ayonix-mint">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <IconComponent className="w-20 h-20 text-white/40" />
                    </div>
                    {/* Category Badge Overlay */}
                    <div className="absolute top-4 left-4">
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm bg-white/90 ${colorClass}`}>
                        <IconComponent className="w-4 h-4" />
                        <span>{post.category}</span>
                      </div>
                    </div>
                    {/* Source Badge */}
                    <div className="absolute top-4 right-4">
                      {post.source === 'linkedin' ? (
                        <div className="flex items-center gap-1 px-3 py-2 bg-[#0077B5] text-white rounded-full text-xs font-medium">
                          <Linkedin className="w-3 h-3" />
                          <span>LinkedIn</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 px-3 py-2 bg-ayonix-teal text-white rounded-full text-xs font-medium">
                          <Sparkles className="w-3 h-3" />
                          <span>Ayonix</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Date */}
                    <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-ayonix-teal transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                      {post.description}
                    </p>

                    {/* Read More Link */}
                    <div className="inline-flex items-center gap-2 text-ayonix-teal hover:text-ayonix-teal-dark transition-colors font-semibold group-hover:gap-3 transition-all">
                      <span>Read Full Story</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-ayonix-mint/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Stay Connected
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Follow us on LinkedIn for real-time updates and industry insights
            </p>
            <a
              href="https://au.linkedin.com/company/ayonixco"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0077B5] hover:bg-[#006097] text-white rounded-full font-semibold transition-colors shadow-lg hover:shadow-xl"
            >
              <Linkedin className="w-5 h-5" />
              <span>Follow on LinkedIn</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
