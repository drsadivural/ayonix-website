'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, User, UserPlus, ArrowLeft, Shield, Crown } from 'lucide-react';
import { registerUser, getCurrentUser, hasAnyUsers } from '@/lib/auth';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [willBeAdmin, setWillBeAdmin] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const user = getCurrentUser();
    if (user) {
      router.replace(user.isAdmin ? '/admin' : '/');
    }
    
    // Check if this will be the first user (admin)
    setWillBeAdmin(!hasAnyUsers());
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      const result = registerUser(formData.email, formData.password, formData.name);

      if (!result.success) {
        setError(result.message);
        setIsLoading(false);
        return;
      }

      // Auto-login after registration
      const { loginUser } = await import('@/lib/auth');
      const loginResult = loginUser(formData.email, formData.password);

      if (loginResult.success) {
        // Redirect admin to admin panel, others to home
        if (loginResult.user?.isAdmin) {
          router.replace('/admin');
        } else {
          router.replace('/');
        }
      } else {
        router.replace('/login');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
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
              Create Account
            </h1>
            <p className="text-gray-600">Join Ayonix AI today</p>
          </div>

          {willBeAdmin && (
            <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-2 text-amber-700 font-medium mb-1">
                <Crown className="w-5 h-5" />
                You will be the Admin!
              </div>
              <p className="text-sm text-amber-600">
                As the first user to register, you'll have administrator privileges including access to voice configuration settings for the AI assistant.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2 text-ayonix-teal" />
                Full Name
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                placeholder="John Doe"
                className="w-full border-gray-300 focus:border-ayonix-teal"
              />
            </div>

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

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Lock className="w-4 h-4 mr-2 text-ayonix-teal" />
                Confirm Password
              </label>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
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
                'Creating account...'
              ) : (
                <>
                  {willBeAdmin ? <Shield className="mr-2 w-5 h-5" /> : <UserPlus className="mr-2 w-5 h-5" />}
                  {willBeAdmin ? 'Create Admin Account' : 'Create Account'}
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-ayonix-teal hover:text-ayonix-teal-dark font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
