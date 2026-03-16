'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-foreground/5 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg">
                LF
              </div>
              <span className="font-bold text-lg text-foreground">LearnFlow</span>
            </div>
            <p className="text-foreground/60 text-sm">
              Empower yourself with knowledge. Learn anything, anytime.
            </p>
          </div>

          {/* For Learners */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">For Learners</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
                  My Learning
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* For Instructors */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">For Instructors</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/instructor" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
                  Teach on LearnFlow
                </Link>
              </li>
              <li>
                <Link href="/create-course" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
                  Create a Course
                </Link>
              </li>
              <li>
                <Link href="/instructor-dashboard" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
                  Instructor Dashboard
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground/60 text-sm">
            © 2024 LearnFlow. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-foreground/60 hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-foreground/60 hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-foreground/60 hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
