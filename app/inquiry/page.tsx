'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Send,
  Mail,
  Building2,
  User,
  MessageSquare,
  CheckCircle2,
  Linkedin,
  Youtube,
  Facebook,
  Twitter,
  MapPin,
  Phone,
  Clock,
  Globe,
} from 'lucide-react';
import { useState } from 'react';

const offices = [
  {
    name: 'Tokyo Office',
    country: 'Japan',
    address: 'Tokyo, Japan',
    phone: null,
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d207446.89784525498!2d139.5703047!3d35.6762065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b857628235d%3A0xcdd8aef709a2b520!2sTokyo%2C%20Japan!5e0!3m2!1sen!2sus!4v1703123456789!5m2!1sen!2sus',
    flag: '🇯🇵',
  },
  {
    name: 'Australia Office',
    country: 'Australia',
    address: '470 St Kilda Rd, Melbourne, VIC 3004 Australia',
    phone: '+61 431 901 973',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.4847!2d144.9815!3d-37.8456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad6682c8a1d6e5d%3A0x5045675218ce6e0!2s470%20St%20Kilda%20Rd%2C%20Melbourne%20VIC%203004%2C%20Australia!5e0!3m2!1sen!2sus!4v1703123456789!5m2!1sen!2sus',
    flag: '🇦🇺',
  },
];

export default function InquiryPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [selectedOffice, setSelectedOffice] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Use Web3Forms API for reliable email delivery
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'ad04c7d9-8721-4807-b789-6b3609fce585',
          to: 'infojp@ayonix.com',
          from_name: 'Ayonix Website Contact Form',
          subject: `New Inquiry from ${formData.name} - ${formData.company || 'No Company'}`,
          name: formData.name,
          email: formData.email,
          company: formData.company || 'Not provided',
          phone: formData.phone || 'Not provided',
          message: formData.message,
          // Honeypot for spam protection
          botcheck: '',
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', company: '', phone: '', message: '' });
      } else {
        setError('Failed to send message. Please try again or email us directly.');
      }
    } catch (err) {
      setError('Failed to send message. Please try again or email us directly at infojp@ayonix.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-white">
      {/* Stylish Hero Banner */}
      <section
        ref={heroRef}
        className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-ayonix-forest via-ayonix-teal to-ayonix-teal-light overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-white/5 rounded-full blur-2xl" />
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
            <MessageSquare className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Contact Sales</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-ayonix-mint mb-8 max-w-3xl mx-auto leading-relaxed">
            Let's discuss how Ayonix AI can transform your business
          </p>
        </motion.div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Contact Information
                </h2>
                <p className="text-gray-600">
                  Ready to transform your business with AI? Our team is here to help you get started.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-ayonix-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-ayonix-teal" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <a href="mailto:infojp@ayonix.com" className="text-ayonix-teal hover:underline">
                      infojp@ayonix.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-ayonix-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-ayonix-teal" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Response Time</h3>
                    <p className="text-gray-600">Within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-ayonix-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-ayonix-teal" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Global Presence</h3>
                    <p className="text-gray-600">Offices in Japan & Australia</p>
                  </div>
                </div>
              </div>

              {/* Office Locations */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-ayonix-teal" />
                  Our Offices
                </h3>
                <div className="space-y-4">
                  {offices.map((office, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${
                        selectedOffice === index
                          ? 'bg-ayonix-teal/10 border-2 border-ayonix-teal'
                          : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedOffice(index)}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{office.flag}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{office.name}</h4>
                          <p className="text-sm text-gray-600">{office.address}</p>
                          {office.phone && (
                            <p className="text-sm text-ayonix-teal mt-1 flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {office.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://au.linkedin.com/company/ayonixco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-ayonix-teal/10 rounded-full flex items-center justify-center hover:bg-ayonix-teal hover:text-white transition-all text-ayonix-teal"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://x.com/ayonixjp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-ayonix-teal/10 rounded-full flex items-center justify-center hover:bg-ayonix-teal hover:text-white transition-all text-ayonix-teal"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.youtube.com/@Ayonixcorporation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-ayonix-teal/10 rounded-full flex items-center justify-center hover:bg-ayonix-teal hover:text-white transition-all text-ayonix-teal"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.facebook.com/Ayonix/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-ayonix-teal/10 rounded-full flex items-center justify-center hover:bg-ayonix-teal hover:text-white transition-all text-ayonix-teal"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {isSuccess ? (
                <div className="bg-white rounded-3xl p-12 shadow-xl text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Message Sent!
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    className="bg-ayonix-teal hover:bg-ayonix-teal-dark text-white"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-8 shadow-xl">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-500 text-sm mb-6">
                    All inquiries are sent directly to our team
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Hidden honeypot field for spam protection */}
                    <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                    
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                            className="pl-10 h-12 border-gray-200 focus:border-ayonix-teal focus:ring-ayonix-teal"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@company.com"
                            required
                            className="pl-10 h-12 border-gray-200 focus:border-ayonix-teal focus:ring-ayonix-teal"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Your Company"
                            className="pl-10 h-12 border-gray-200 focus:border-ayonix-teal focus:ring-ayonix-teal"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 000-0000"
                            className="pl-10 h-12 border-gray-200 focus:border-ayonix-teal focus:ring-ayonix-teal"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your needs and how we can help..."
                        required
                        rows={5}
                        className="border-gray-200 focus:border-ayonix-teal focus:ring-ayonix-teal resize-none"
                      />
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                        {error}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-ayonix-teal hover:bg-ayonix-teal-dark text-white text-lg font-semibold rounded-xl transition-all"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          Send Message
                        </span>
                      )}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      By submitting this form, you agree that we may store and process your information to respond to your inquiry.
                    </p>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Our Locations
              </h2>
              <p className="text-gray-600">
                Visit us at our offices in Japan and Australia
              </p>
            </div>

            {/* Office Tabs */}
            <div className="flex justify-center gap-4 mb-8">
              {offices.map((office, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOffice(index)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                    selectedOffice === index
                      ? 'bg-ayonix-teal text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{office.flag}</span>
                  {office.name}
                </button>
              ))}
            </div>

            {/* Selected Office Info */}
            <div className="bg-ayonix-cream rounded-2xl p-6 mb-6">
              <div className="flex flex-wrap items-center justify-center gap-8 text-center">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{offices[selectedOffice].name}</h3>
                  <p className="text-gray-600">{offices[selectedOffice].address}</p>
                </div>
                {offices[selectedOffice].phone && (
                  <div className="flex items-center gap-2 text-ayonix-teal">
                    <Phone className="w-5 h-5" />
                    <a href={`tel:${offices[selectedOffice].phone}`} className="font-semibold hover:underline">
                      {offices[selectedOffice].phone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              <iframe
                src={offices[selectedOffice].mapUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${offices[selectedOffice].name} Location`}
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
