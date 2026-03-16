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
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
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
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('Account created successfully! Redirecting...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-12 px-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl">Join LearnFlow</CardTitle>
            <CardDescription>
              Start your learning journey today
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

              {/* Full Name */}
              <FieldGroup>
                <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-foreground/50" size={18} />
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </FieldGroup>

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
                <FieldLabel htmlFor="password">Password</FieldLabel>
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

              {/* Confirm Password */}
              <FieldGroup>
                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-foreground/50" size={18} />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-foreground/50 hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FieldGroup>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="mt-1 w-4 h-4 border border-border rounded cursor-pointer"
                />
                <label htmlFor="agreeToTerms" className="text-sm text-foreground/70">
                  I agree to the{' '}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Sign Up Button */}
              <Button 
                type="submit" 
                className="w-full mt-6" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-xs text-foreground/50">OR</span>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            {/* Social Sign Up */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                Continue with Google
              </Button>
              <Button variant="outline" className="w-full">
                Continue with GitHub
              </Button>
            </div>

            {/* Sign In Link */}
            <p className="text-center text-sm text-foreground/60 mt-6">
              Already have an account?{' '}
              <Link href="/signin" className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
