'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, LogIn, ArrowLeft, Shield } from 'lucide-react';
import { loginUser, getCurrentUser, hasAnyUsers } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [noUsersYet, setNoUsersYet] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const user = getCurrentUser();
    if (user) {
      router.replace(user.isAdmin ? '/admin' : '/');
    }
    
    // Check if any users exist
    setNoUsersYet(!hasAnyUsers());
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = loginUser(formData.email, formData.password);

      if (!result.success) {
        setError(result.message);
      } else {
        // Redirect admin to admin panel, others to home
        if (result.user?.isAdmin) {
          router.replace('/admin');
        } else {
          router.replace('/');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ayonix-teal/5 via-white to-ayonix-teal/5 flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Link
          href="/"
          className="flex items-center text-ayonix-teal hover:text-ayonix-teal-dark mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-ayonix-teal to-ayonix-teal-light bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your Ayonix AI account</p>
          </div>

          {noUsersYet && (
            <div className="mb-6 p-4 bg-ayonix-teal/10 border border-ayonix-teal/20 rounded-lg">
              <div className="flex items-center gap-2 text-ayonix-teal font-medium mb-1">
                <Shield className="w-4 h-4" />
                First User = Admin
              </div>
              <p className="text-sm text-gray-600">
                No users registered yet. The first person to sign up will become the administrator with access to voice configuration settings.
              </p>
              <Link href="/signup" className="inline-block mt-2 text-ayonix-teal font-medium hover:underline">
                Create Admin Account →
              </Link>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 mr-2 text-ayonix-teal" />
                Email Address
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                placeholder="you@company.com"
                className="w-full border-gray-300 focus:border-ayonix-teal"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Lock className="w-4 h-4 mr-2 text-ayonix-teal" />
                Password
              </label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                placeholder="••••••••"
                className="w-full border-gray-300 focus:border-ayonix-teal"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-ayonix-teal hover:bg-ayonix-teal-dark text-white py-6 text-lg"
            >
              {isLoading ? (
                'Signing in...'
              ) : (
                <>
                  <LogIn className="mr-2 w-5 h-5" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="text-ayonix-teal hover:text-ayonix-teal-dark font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
