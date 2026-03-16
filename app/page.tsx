'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredCourses = [
    {
      id: 1,
      title: 'Web Development Fundamentals',
      instructor: 'Sarah Anderson',
      rating: 4.8,
      students: '125K',
      price: '$49.99',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
      category: 'Web Development'
    },
    {
      id: 2,
      title: 'Data Science with Python',
      instructor: 'Prof. James Chen',
      rating: 4.9,
      students: '98K',
      price: '$59.99',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f70a504f0?w=400&h=250&fit=crop',
      category: 'Data Science'
    },
    {
      id: 3,
      title: 'Mobile App Development',
      instructor: 'Emma Rodriguez',
      rating: 4.7,
      students: '156K',
      price: '$54.99',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      category: 'Mobile Dev'
    },
    {
      id: 4,
      title: 'UI/UX Design Mastery',
      instructor: 'Michael Zhang',
      rating: 4.6,
      students: '72K',
      price: '$44.99',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      category: 'Design'
    }
  ];

  const categories = [
    { name: 'Web Development', count: '1,234' },
    { name: 'Data Science', count: '892' },
    { name: 'Mobile Development', count: '756' },
    { name: 'UI/UX Design', count: '634' },
    { name: 'Business', count: '1,456' },
    { name: 'Photography', count: '523' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center gap-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
                  Learn Anything, Anytime
                </h1>
                <p className="text-xl text-foreground/70 max-w-2xl mx-auto text-pretty">
                  Master new skills with expert instructors. Explore thousands of courses and build your future with LearnFlow.
                </p>
              </div>

              <div className="w-full max-w-2xl flex gap-2">
                <Input
                  placeholder="Search for courses, skills, or instructors..."
                  className="text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Link href={`/courses?search=${searchQuery}`}>
                  <Button size="lg" className="whitespace-nowrap">
                    Search
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="text-foreground/60">Popular: Python, Web Dev, AI, Data Science</span>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 px-4 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-2">Browse by Category</h2>
              <p className="text-foreground/60">Find what interests you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Link key={category.name} href={`/courses?category=${category.name}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer bg-card hover:border-primary/50">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg text-foreground">{category.name}</h3>
                      <p className="text-sm text-foreground/60 mt-2">{category.count} courses</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-2">Featured Courses</h2>
              <p className="text-foreground/60">Start learning with our most popular courses</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCourses.map((course) => (
                <Link key={course.id} href={`/course/${course.id}`}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden hover:border-primary/50">
                    <div className="relative h-40 overflow-hidden bg-muted">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                        {course.category}
                      </span>
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <h3 className="font-bold text-foreground line-clamp-2 hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-foreground/70">{course.instructor}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-primary">{course.rating} ★</span>
                        <span className="text-xs text-foreground/60">({course.students})</span>
                      </div>
                      <p className="text-lg font-bold text-foreground pt-2">{course.price}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/courses">
                <Button size="lg" variant="outline">
                  View All Courses
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-primary/5 py-16 px-4 border-t border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <p className="text-4xl font-bold text-primary">50K+</p>
                <p className="text-foreground/70">Active Students</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-primary">5K+</p>
                <p className="text-foreground/70">Expert Instructors</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-primary">10K+</p>
                <p className="text-foreground/70">Courses Available</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-primary">4.8★</p>
                <p className="text-foreground/70">Average Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary via-secondary to-primary/80 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold text-primary-foreground">Ready to Start Learning?</h2>
            <p className="text-lg text-primary-foreground/90">
              Join thousands of students learning something new every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Sign Up for Free
                </Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
