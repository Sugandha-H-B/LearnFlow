'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';

export default function CategoriesPage() {
  const categories = [
    {
      id: 'web-development',
      name: 'Web Development',
      description: 'Learn HTML, CSS, JavaScript, React, Vue, and more.',
      courseCount: 245,
      icon: '🌐',
      color: 'from-blue-500 to-cyan-500',
      featured: ['React Fundamentals', 'Next.js Mastery', 'Full Stack Development']
    },
    {
      id: 'data-science',
      name: 'Data Science',
      description: 'Master Python, SQL, machine learning, and data analysis.',
      courseCount: 189,
      icon: '📊',
      color: 'from-purple-500 to-pink-500',
      featured: ['Python Basics', 'ML Algorithms', 'Data Visualization']
    },
    {
      id: 'mobile-dev',
      name: 'Mobile Development',
      description: 'Build iOS and Android apps with Swift, Kotlin, and Flutter.',
      courseCount: 156,
      icon: '📱',
      color: 'from-green-500 to-emerald-500',
      featured: ['React Native', 'Flutter Apps', 'Native Development']
    },
    {
      id: 'design',
      name: 'Design',
      description: 'UI/UX Design, Graphic Design, and Creative Tools.',
      courseCount: 203,
      icon: '🎨',
      color: 'from-orange-500 to-red-500',
      featured: ['Figma Mastery', 'Web Design', 'Brand Design']
    },
    {
      id: 'business',
      name: 'Business & Entrepreneurship',
      description: 'Digital marketing, finance, and business strategy courses.',
      courseCount: 178,
      icon: '💼',
      color: 'from-yellow-500 to-orange-500',
      featured: ['Digital Marketing', 'Business Strategy', 'Leadership']
    },
    {
      id: 'personal-development',
      name: 'Personal Development',
      description: 'Productivity, communication, and personal growth skills.',
      courseCount: 267,
      icon: '🚀',
      color: 'from-indigo-500 to-purple-500',
      featured: ['Public Speaking', 'Time Management', 'Goal Setting']
    }
  ];

  const stats = [
    { label: 'Total Courses', value: '1,238' },
    { label: 'Active Students', value: '2.5M+' },
    { label: 'Expert Instructors', value: '589' },
    { label: 'Course Completion Rate', value: '92%' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary via-secondary to-primary/80 text-primary-foreground py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold mb-4">Explore Categories</h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl">
              Discover thousands of courses across different fields of study. Find what interests you and start learning today.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-muted py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-foreground/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-foreground">All Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/courses?category=${encodeURIComponent(category.name)}`}
                  className="group"
                >
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-primary/50">
                    <div className={`h-32 bg-gradient-to-br ${category.color} flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          {category.name}
                        </h3>
                        <p className="text-sm text-foreground/70 line-clamp-2">
                          {category.description}
                        </p>
                      </div>

                      <div className="border-t border-border pt-4 space-y-3">
                        <p className="text-sm font-semibold text-primary">
                          {category.courseCount} Courses Available
                        </p>
                        <div className="space-y-1">
                          <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">
                            Featured Courses
                          </p>
                          {category.featured.map((course, idx) => (
                            <p
                              key={idx}
                              className="text-xs text-foreground/70 line-clamp-1"
                            >
                              • {course}
                            </p>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full gap-2 mt-4">
                        Browse {category.courseCount} Courses
                        <ArrowRight size={16} />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold">Can't find what you're looking for?</h2>
            <p className="text-lg text-primary-foreground/90">
              Browse all our courses and use advanced filters to find exactly what you need.
            </p>
            <Link href="/courses">
              <Button size="lg" variant="secondary">
                View All Courses
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
