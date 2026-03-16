'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn] = useState(false);

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg">
            LF
          </div>
          <span className="font-bold text-xl text-foreground">LearnFlow</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/courses" className="text-foreground/70 hover:text-foreground transition-colors">
            Browse Courses
          </Link>
          <Link href="/categories" className="text-foreground/70 hover:text-foreground transition-colors">
            Categories
          </Link>
          {isLoggedIn && (
            <>
              <Link href="/dashboard" className="text-foreground/70 hover:text-foreground transition-colors">
                My Learning
              </Link>
              <Link href="/instructor" className="text-foreground/70 hover:text-foreground transition-colors">
                Teach
              </Link>
            </>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link href="/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button variant="destructive">Sign Out</Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="flex flex-col gap-2 p-4">
            <Link
              href="/courses"
              className="px-4 py-2 text-foreground/70 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              Browse Courses
            </Link>
            <Link
              href="/categories"
              className="px-4 py-2 text-foreground/70 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              Categories
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-foreground/70 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  My Learning
                </Link>
                <Link
                  href="/instructor"
                  className="px-4 py-2 text-foreground/70 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  Teach
                </Link>
              </>
            )}
            <div className="border-t border-border pt-4 mt-4 flex flex-col gap-2">
              {!isLoggedIn ? (
                <>
                  <Link href="/signin" className="w-full">
                    <Button variant="ghost" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup" className="w-full">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/dashboard" className="w-full">
                    <Button variant="ghost" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="destructive" className="w-full">
                    Sign Out
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
