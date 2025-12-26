'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Settings,
  Volume2,
  User,
  LogOut,
  Save,
  Play,
  ArrowLeft,
  Shield,
  Mic,
  Key,
  Newspaper,
  Plus,
  Edit,
  Trash2,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Sparkles,
  Bot,
  MessageSquare,
  X,
  Check,
  Eye,
  Calendar,
  Tag,
} from 'lucide-react';
import {
  getCurrentUser,
  logoutUser,
  isCurrentUserAdmin,
  User as UserType,
} from '@/lib/auth';
import {
  getTTSConfig,
  saveTTSConfig,
  TTSConfig,
  TTSProvider,
  GOOGLE_VOICES,
  ELEVENLABS_VOICES,
  speak,
  stopSpeaking,
} from '@/lib/tts-service';

// News article interface
interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  source: 'ayonix' | 'linkedin' | 'admin';
  date: string;
  author: string;
  aiGenerated: boolean;
  aiProvider?: string;
}

// AI Provider configuration
interface AIConfig {
  geminiApiKey: string;
  azureApiKey: string;
  azureEndpoint: string;
  chatgptApiKey: string;
  manusApiKey: string;
  defaultProvider: 'gemini' | 'azure' | 'chatgpt' | 'manus';
  newsWritingProvider: 'gemini' | 'azure' | 'chatgpt' | 'manus';
  chatbotProvider: 'gemini' | 'azure' | 'chatgpt' | 'manus';
}

// Get news from localStorage
const getStoredNews = (): NewsArticle[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('ayonix_news');
  return stored ? JSON.parse(stored) : [];
};

// Save news to localStorage
const saveStoredNews = (news: NewsArticle[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('ayonix_news', JSON.stringify(news));
};

// Get AI config from localStorage
const getAIConfig = (): AIConfig => {
  if (typeof window === 'undefined') return {
    geminiApiKey: '',
    azureApiKey: '',
    azureEndpoint: '',
    chatgptApiKey: '',
    manusApiKey: '',
    defaultProvider: 'gemini',
    newsWritingProvider: 'gemini',
    chatbotProvider: 'gemini',
  };
  const stored = localStorage.getItem('ayonix_ai_config');
  return stored ? JSON.parse(stored) : {
    geminiApiKey: '',
    azureApiKey: '',
    azureEndpoint: '',
    chatgptApiKey: '',
    manusApiKey: '',
    defaultProvider: 'gemini',
    newsWritingProvider: 'gemini',
    chatbotProvider: 'gemini',
  };
};

// Save AI config to localStorage
const saveAIConfig = (config: AIConfig) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('ayonix_ai_config', JSON.stringify(config));
};

// Categories for news
const NEWS_CATEGORIES = [
  'Product Launch',
  'Partnership',
  'Recognition',
  'Research',
  'Company News',
  'AI Technology',
  'Security',
  'Update',
];

// AI Providers
const AI_PROVIDERS = [
  { id: 'gemini', name: 'Google Gemini', description: 'Google\'s advanced AI model' },
  { id: 'azure', name: 'Azure AI', description: 'Microsoft Azure OpenAI Service' },
  { id: 'chatgpt', name: 'ChatGPT', description: 'OpenAI GPT models' },
  { id: 'manus', name: 'Manus AI', description: 'Manus AI assistant' },
];

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'news' | 'voice' | 'ai' | 'users'>('news');
  
  // News state
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [newArticle, setNewArticle] = useState<Partial<NewsArticle>>({
    title: '',
    content: '',
    excerpt: '',
    category: 'Company News',
    source: 'admin',
    aiGenerated: false,
  });
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [showShareModal, setShowShareModal] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  // TTS Configuration state
  const [ttsConfig, setTtsConfig] = useState<TTSConfig>({
    provider: 'google',
    googleApiKey: '',
    elevenLabsApiKey: '',
    voiceId: '',
    pitch: 1.0,
    rate: 1.0,
  });
  const [isTesting, setIsTesting] = useState(false);
  
  // AI Configuration state
  const [aiConfig, setAiConfig] = useState<AIConfig>({
    geminiApiKey: '',
    azureApiKey: '',
    azureEndpoint: '',
    chatgptApiKey: '',
    manusApiKey: '',
    defaultProvider: 'gemini',
    newsWritingProvider: 'gemini',
    chatbotProvider: 'gemini',
  });
  
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    
    if (!currentUser.isAdmin) {
      router.push('/');
      return;
    }
    
    setUser(currentUser);
    setIsLoading(false);
    
    // Load configurations
    const config = getTTSConfig();
    setTtsConfig(config);
    
    const storedAIConfig = getAIConfig();
    setAiConfig(storedAIConfig);
    
    const storedNews = getStoredNews();
    setNews(storedNews);
  }, [router]);

  const handleLogout = () => {
    logoutUser();
    router.push('/');
  };

  const handleSaveConfig = () => {
    saveTTSConfig(ttsConfig);
    setSaveMessage('Voice configuration saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleSaveAIConfig = () => {
    saveAIConfig(aiConfig);
    setSaveMessage('AI configuration saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleTestVoice = async () => {
    setIsTesting(true);
    saveTTSConfig(ttsConfig);
    
    try {
      await speak(
        "Hi there! I'm Aya, your AI assistant. This is how I sound with the current voice settings!",
        () => {},
        () => setIsTesting(false)
      );
    } catch (error) {
      console.error('Test voice error:', error);
      setIsTesting(false);
    }
  };

  const handleStopTest = () => {
    stopSpeaking();
    setIsTesting(false);
  };

  const getVoicesForProvider = () => {
    switch (ttsConfig.provider) {
      case 'google':
        return GOOGLE_VOICES;
      case 'elevenlabs':
        return ELEVENLABS_VOICES;
      default:
        return [];
    }
  };

  // News management functions
  const handleAddNews = () => {
    setEditingNews(null);
    setNewArticle({
      title: '',
      content: '',
      excerpt: '',
      category: 'Company News',
      source: 'admin',
      aiGenerated: false,
    });
    setShowNewsModal(true);
  };

  const handleEditNews = (article: NewsArticle) => {
    setEditingNews(article);
    setNewArticle(article);
    setShowNewsModal(true);
  };

  const handleDeleteNews = (id: string) => {
    const updatedNews = news.filter(n => n.id !== id);
    setNews(updatedNews);
    saveStoredNews(updatedNews);
    setDeleteConfirm(null);
    setSaveMessage('News article deleted successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleSaveNews = () => {
    const article: NewsArticle = {
      id: editingNews?.id || `news_${Date.now()}`,
      title: newArticle.title || '',
      content: newArticle.content || '',
      excerpt: newArticle.excerpt || newArticle.content?.substring(0, 200) + '...' || '',
      category: newArticle.category || 'Company News',
      source: 'admin',
      date: editingNews?.date || new Date().toISOString().split('T')[0],
      author: user?.name || 'Admin',
      aiGenerated: newArticle.aiGenerated || false,
      aiProvider: newArticle.aiProvider,
    };

    let updatedNews: NewsArticle[];
    if (editingNews) {
      updatedNews = news.map(n => n.id === editingNews.id ? article : n);
    } else {
      updatedNews = [article, ...news];
    }

    setNews(updatedNews);
    saveStoredNews(updatedNews);
    setShowNewsModal(false);
    setSaveMessage(editingNews ? 'News article updated!' : 'News article added!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleGenerateWithAI = async () => {
    if (!newArticle.title) {
      alert('Please enter a title first');
      return;
    }

    setIsGeneratingAI(true);
    
    // Simulate AI generation (in production, this would call the actual AI API)
    const provider = aiConfig.newsWritingProvider;
    
    // Mock AI-generated content based on title
    setTimeout(() => {
      const generatedContent = `We are excited to announce ${newArticle.title}.\n\nThis represents a significant milestone in our journey to deliver cutting-edge AI solutions to enterprises worldwide. Our team has been working tirelessly to bring this innovation to market.\n\n**Key Highlights:**\n- Enhanced performance and reliability\n- Seamless integration with existing systems\n- Enterprise-grade security and compliance\n- 24/7 support and maintenance\n\nThis development underscores our commitment to pushing the boundaries of what's possible with AI technology. We believe this will transform how businesses operate and create value for their customers.\n\nStay tuned for more updates as we continue to innovate and lead the AI revolution.`;
      
      setNewArticle({
        ...newArticle,
        content: generatedContent,
        excerpt: generatedContent.substring(0, 200) + '...',
        aiGenerated: true,
        aiProvider: provider,
      });
      setIsGeneratingAI(false);
    }, 2000);
  };

  // Social sharing functions
  const shareToFacebook = (article: NewsArticle) => {
    const url = encodeURIComponent(`https://ayonix.com/news`);
    const text = encodeURIComponent(article.title);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank', 'width=600,height=400');
  };

  const shareToTwitter = (article: NewsArticle) => {
    const url = encodeURIComponent(`https://ayonix.com/news`);
    const text = encodeURIComponent(`${article.title} - Ayonix AI`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
  };

  const shareToLinkedIn = (article: NewsArticle) => {
    const url = encodeURIComponent(`https://ayonix.com/news`);
    const title = encodeURIComponent(article.title);
    const summary = encodeURIComponent(article.excerpt);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ayonix-teal"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-ayonix-teal">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Site</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-ayonix-teal" />
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <User className="w-5 h-5" />
                <span>{user?.name}</span>
                <span className="px-2 py-0.5 bg-ayonix-teal text-white text-xs rounded-full">Admin</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Success Message */}
      <AnimatePresence>
        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            {saveMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <nav className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 space-y-2">
              <button
                onClick={() => setActiveTab('news')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'news'
                    ? 'bg-ayonix-teal text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Newspaper className="w-5 h-5" />
                <span>News Management</span>
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'ai'
                    ? 'bg-ayonix-teal text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Bot className="w-5 h-5" />
                <span>AI Configuration</span>
              </button>
              <button
                onClick={() => setActiveTab('voice')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'voice'
                    ? 'bg-ayonix-teal text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Volume2 className="w-5 h-5" />
                <span>Voice Settings</span>
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'users'
                    ? 'bg-ayonix-teal text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <User className="w-5 h-5" />
                <span>User Management</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:col-span-4">
            {/* News Management Tab */}
            {activeTab === 'news' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-ayonix-teal/10 rounded-lg">
                        <Newspaper className="w-6 h-6 text-ayonix-teal" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">News Management</h2>
                        <p className="text-gray-500 dark:text-gray-400">Create, edit, and share news articles</p>
                      </div>
                    </div>
                    <Button onClick={handleAddNews} className="bg-ayonix-teal hover:bg-ayonix-teal-dark">
                      <Plus className="w-4 h-4 mr-2" />
                      Add News
                    </Button>
                  </div>
                </div>

                {/* News List */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                  {news.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No news articles yet</p>
                      <p className="text-sm mt-2">Click "Add News" to create your first article</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {news.map((article) => (
                        <div key={article.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-1 bg-ayonix-teal/10 text-ayonix-teal text-xs font-medium rounded">
                                  {article.category}
                                </span>
                                {article.aiGenerated && (
                                  <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs font-medium rounded flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    AI Generated ({article.aiProvider})
                                  </span>
                                )}
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {article.date}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                {article.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                                {article.excerpt}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowShareModal(article.id)}
                                className="text-blue-600 border-blue-200 hover:bg-blue-50"
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditNews(article)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setDeleteConfirm(article.id)}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Share Modal */}
                          {showShareModal === article.id && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Share to Social Media</span>
                                <button onClick={() => setShowShareModal(null)} className="text-gray-400 hover:text-gray-600">
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="flex gap-3">
                                <Button
                                  onClick={() => shareToFacebook(article)}
                                  className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white"
                                >
                                  <Facebook className="w-4 h-4 mr-2" />
                                  Facebook
                                </Button>
                                <Button
                                  onClick={() => shareToTwitter(article)}
                                  className="bg-black hover:bg-gray-800 text-white"
                                >
                                  <Twitter className="w-4 h-4 mr-2" />
                                  X (Twitter)
                                </Button>
                                <Button
                                  onClick={() => shareToLinkedIn(article)}
                                  className="bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white"
                                >
                                  <Linkedin className="w-4 h-4 mr-2" />
                                  LinkedIn
                                </Button>
                              </div>
                            </motion.div>
                          )}

                          {/* Delete Confirmation */}
                          {deleteConfirm === article.id && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg"
                            >
                              <p className="text-sm text-red-700 dark:text-red-400 mb-3">
                                Are you sure you want to delete this article? This action cannot be undone.
                              </p>
                              <div className="flex gap-3">
                                <Button
                                  onClick={() => handleDeleteNews(article.id)}
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                  Yes, Delete
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => setDeleteConfirm(null)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* AI Configuration Tab */}
            {activeTab === 'ai' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-ayonix-teal/10 rounded-lg">
                    <Bot className="w-6 h-6 text-ayonix-teal" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">AI Configuration</h2>
                    <p className="text-gray-500 dark:text-gray-400">Configure AI providers for news writing and chatbot</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* API Keys Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                      <Key className="w-5 h-5" />
                      API Keys
                    </h3>
                    <div className="grid gap-4">
                      {/* Gemini API Key */}
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Google Gemini API Key
                        </label>
                        <Input
                          type="password"
                          value={aiConfig.geminiApiKey}
                          onChange={(e) => setAiConfig({ ...aiConfig, geminiApiKey: e.target.value })}
                          placeholder="Enter your Gemini API key"
                          className="font-mono"
                        />
                        <p className="text-xs text-gray-500 mt-1">Get from Google AI Studio</p>
                      </div>

                      {/* Azure API Key */}
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Azure OpenAI API Key
                        </label>
                        <Input
                          type="password"
                          value={aiConfig.azureApiKey}
                          onChange={(e) => setAiConfig({ ...aiConfig, azureApiKey: e.target.value })}
                          placeholder="Enter your Azure OpenAI API key"
                          className="font-mono mb-2"
                        />
                        <Input
                          type="text"
                          value={aiConfig.azureEndpoint}
                          onChange={(e) => setAiConfig({ ...aiConfig, azureEndpoint: e.target.value })}
                          placeholder="Azure endpoint URL"
                          className="font-mono"
                        />
                        <p className="text-xs text-gray-500 mt-1">Get from Azure Portal</p>
                      </div>

                      {/* ChatGPT API Key */}
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          OpenAI ChatGPT API Key
                        </label>
                        <Input
                          type="password"
                          value={aiConfig.chatgptApiKey}
                          onChange={(e) => setAiConfig({ ...aiConfig, chatgptApiKey: e.target.value })}
                          placeholder="Enter your OpenAI API key"
                          className="font-mono"
                        />
                        <p className="text-xs text-gray-500 mt-1">Get from OpenAI Platform</p>
                      </div>

                      {/* Manus API Key */}
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Manus AI API Key
                        </label>
                        <Input
                          type="password"
                          value={aiConfig.manusApiKey}
                          onChange={(e) => setAiConfig({ ...aiConfig, manusApiKey: e.target.value })}
                          placeholder="Enter your Manus AI API key"
                          className="font-mono"
                        />
                        <p className="text-xs text-gray-500 mt-1">Get from Manus AI Dashboard</p>
                      </div>
                    </div>
                  </div>

                  {/* AI Usage Configuration */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      AI Usage Settings
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* News Writing AI */}
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <Newspaper className="w-5 h-5 text-ayonix-teal" />
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            News Writing AI
                          </label>
                        </div>
                        <select
                          value={aiConfig.newsWritingProvider}
                          onChange={(e) => setAiConfig({ ...aiConfig, newsWritingProvider: e.target.value as any })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                        >
                          {AI_PROVIDERS.map((provider) => (
                            <option key={provider.id} value={provider.id}>
                              {provider.name}
                            </option>
                          ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-2">
                          Used for "Write by AI" feature in news creation
                        </p>
                      </div>

                      {/* Chatbot AI */}
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <MessageSquare className="w-5 h-5 text-ayonix-teal" />
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Chatbot AI
                          </label>
                        </div>
                        <select
                          value={aiConfig.chatbotProvider}
                          onChange={(e) => setAiConfig({ ...aiConfig, chatbotProvider: e.target.value as any })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                        >
                          {AI_PROVIDERS.map((provider) => (
                            <option key={provider.id} value={provider.id}>
                              {provider.name}
                            </option>
                          ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-2">
                          Used for the website chatbot responses
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Default Provider */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                      Default AI Provider
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {AI_PROVIDERS.map((provider) => (
                        <button
                          key={provider.id}
                          onClick={() => setAiConfig({ ...aiConfig, defaultProvider: provider.id as any })}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            aiConfig.defaultProvider === provider.id
                              ? 'border-ayonix-teal bg-ayonix-teal/5'
                              : 'border-gray-200 dark:border-gray-600 hover:border-ayonix-teal/50'
                          }`}
                        >
                          <div className="font-medium text-gray-800 dark:text-white">
                            {provider.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {provider.description}
                          </div>
                          {aiConfig.defaultProvider === provider.id && (
                            <div className="mt-2 text-xs text-ayonix-teal font-medium">
                              ✓ Default
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button onClick={handleSaveAIConfig} className="bg-ayonix-teal hover:bg-ayonix-teal-dark">
                      <Save className="w-4 h-4 mr-2" />
                      Save AI Configuration
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Voice Settings Tab */}
            {activeTab === 'voice' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-ayonix-teal/10 rounded-lg">
                    <Mic className="w-6 h-6 text-ayonix-teal" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Voice Configuration</h2>
                    <p className="text-gray-500 dark:text-gray-400">Configure the AI assistant's voice settings</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* TTS Provider Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      TTS Provider
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {(['google', 'elevenlabs', 'browser'] as TTSProvider[]).map((provider) => (
                        <button
                          key={provider}
                          onClick={() => setTtsConfig({ ...ttsConfig, provider, voiceId: '' })}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            ttsConfig.provider === provider
                              ? 'border-ayonix-teal bg-ayonix-teal/5'
                              : 'border-gray-200 dark:border-gray-600 hover:border-ayonix-teal/50'
                          }`}
                        >
                          <div className="font-medium text-gray-800 dark:text-white capitalize">
                            {provider === 'google' ? 'Google Cloud TTS' : 
                             provider === 'elevenlabs' ? 'ElevenLabs' : 'Browser TTS'}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {provider === 'google' ? 'High quality, natural voices' :
                             provider === 'elevenlabs' ? 'Premium AI voices' : 'Free, basic quality'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* API Key Configuration */}
                  {ttsConfig.provider === 'google' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Key className="w-4 h-4 inline mr-2" />
                        Google Cloud API Key
                      </label>
                      <Input
                        type="password"
                        value={ttsConfig.googleApiKey || ''}
                        onChange={(e) => setTtsConfig({ ...ttsConfig, googleApiKey: e.target.value })}
                        placeholder="Enter your Google Cloud API key"
                        className="font-mono"
                      />
                    </div>
                  )}

                  {ttsConfig.provider === 'elevenlabs' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Key className="w-4 h-4 inline mr-2" />
                        ElevenLabs API Key
                      </label>
                      <Input
                        type="password"
                        value={ttsConfig.elevenLabsApiKey || ''}
                        onChange={(e) => setTtsConfig({ ...ttsConfig, elevenLabsApiKey: e.target.value })}
                        placeholder="Enter your ElevenLabs API key"
                        className="font-mono"
                      />
                    </div>
                  )}

                  {/* Voice Selection */}
                  {ttsConfig.provider !== 'browser' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Voice
                      </label>
                      <select
                        value={ttsConfig.voiceId || ''}
                        onChange={(e) => setTtsConfig({ ...ttsConfig, voiceId: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      >
                        <option value="">Select a voice</option>
                        {getVoicesForProvider().map((voice) => (
                          <option key={voice.id} value={voice.id}>
                            {voice.name} ({voice.gender})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Voice Parameters */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Pitch: {ttsConfig.pitch?.toFixed(2)}
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.05"
                        value={ttsConfig.pitch || 1}
                        onChange={(e) => setTtsConfig({ ...ttsConfig, pitch: parseFloat(e.target.value) })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ayonix-teal"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Lower</span>
                        <span>Higher</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Speed: {ttsConfig.rate?.toFixed(2)}x
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.05"
                        value={ttsConfig.rate || 1}
                        onChange={(e) => setTtsConfig({ ...ttsConfig, rate: parseFloat(e.target.value) })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ayonix-teal"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Slower</span>
                        <span>Faster</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      onClick={handleTestVoice}
                      disabled={isTesting}
                      variant="outline"
                      className="flex-1"
                    >
                      {isTesting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-ayonix-teal border-t-transparent mr-2" />
                          Playing...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Test Voice
                        </>
                      )}
                    </Button>
                    
                    {isTesting && (
                      <Button onClick={handleStopTest} variant="destructive">
                        Stop
                      </Button>
                    )}
                    
                    <Button onClick={handleSaveConfig} className="flex-1 bg-ayonix-teal hover:bg-ayonix-teal-dark">
                      <Save className="w-4 h-4 mr-2" />
                      Save Configuration
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-ayonix-teal/10 rounded-lg">
                    <User className="w-6 h-6 text-ayonix-teal" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">User Management</h2>
                    <p className="text-gray-500 dark:text-gray-400">Manage registered users</p>
                  </div>
                </div>

                <div className="text-center py-12 text-gray-500">
                  <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>User management features coming soon</p>
                  <p className="text-sm mt-2">Currently, the first registered user is automatically assigned as admin</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* News Modal */}
      <AnimatePresence>
        {showNewsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {editingNews ? 'Edit News Article' : 'Add News Article'}
                  </h3>
                  <button
                    onClick={() => setShowNewsModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title *
                  </label>
                  <Input
                    value={newArticle.title || ''}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    placeholder="Enter article title"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={newArticle.category || 'Company News'}
                    onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  >
                    {NEWS_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* AI Writing Button */}
                <div className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-purple-800 dark:text-purple-300">Write with AI</p>
                    <p className="text-xs text-purple-600 dark:text-purple-400">
                      Using {AI_PROVIDERS.find(p => p.id === aiConfig.newsWritingProvider)?.name || 'Gemini'}
                    </p>
                  </div>
                  <Button
                    onClick={handleGenerateWithAI}
                    disabled={isGeneratingAI || !newArticle.title}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {isGeneratingAI ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content *
                  </label>
                  <textarea
                    value={newArticle.content || ''}
                    onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                    placeholder="Enter article content (supports markdown)"
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Excerpt (optional)
                  </label>
                  <textarea
                    value={newArticle.excerpt || ''}
                    onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                    placeholder="Short summary (auto-generated if left empty)"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none"
                  />
                </div>

                {/* AI Generated Badge */}
                {newArticle.aiGenerated && (
                  <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
                    <Sparkles className="w-4 h-4" />
                    This content was generated by {newArticle.aiProvider}
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-4">
                <Button variant="outline" onClick={() => setShowNewsModal(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveNews}
                  disabled={!newArticle.title || !newArticle.content}
                  className="bg-ayonix-teal hover:bg-ayonix-teal-dark"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingNews ? 'Update Article' : 'Publish Article'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
