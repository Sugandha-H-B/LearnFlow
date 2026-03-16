'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Validation
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      setIsLoading(false);
      return;
    }

    if (!formData.password) {
      setError('Password is required');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('Signed in successfully! Redirecting...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err) {
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-12 px-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your LearnFlow account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Alert */}
              {error && (
                <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Success Alert */}
              {success && (
                <div className="bg-primary/10 border border-primary/30 text-primary px-4 py-3 rounded-lg text-sm">
                  {success}
                </div>
              )}

              {/* Email */}
              <FieldGroup>
                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-foreground/50" size={18} />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </FieldGroup>

              {/* Password */}
              <FieldGroup>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link 
                    href="/forgot-password" 
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-foreground/50" size={18} />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-foreground/50 hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FieldGroup>

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-4 h-4 border border-border rounded cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-sm text-foreground/70">
                  Remember me
                </label>
              </div>

              {/* Sign In Button */}
              <Button 
                type="submit" 
                className="w-full mt-6" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-xs text-foreground/50">OR</span>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            {/* Social Sign In */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                Continue with Google
              </Button>
              <Button variant="outline" className="w-full">
                Continue with GitHub
              </Button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-foreground/60 mt-6">
              Don't have an account?{' '}
              <Link href="/signup" className="text-primary font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
