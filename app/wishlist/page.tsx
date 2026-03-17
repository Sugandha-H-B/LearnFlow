'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Star, Users, Clock, Heart, Trash2 } from 'lucide-react';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      title: 'Web Development Fundamentals',
      instructor: 'Sarah Anderson',
      rating: 4.8,
      students: '125K',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
      category: 'Web Development',
      level: 'Beginner',
      duration: '40 hours'
    },
    {
      id: 5,
      title: 'Advanced React Patterns',
      instructor: 'Alex Turner',
      rating: 4.9,
      students: '89K',
      price: 64.99,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop',
      category: 'Web Development',
      level: 'Advanced',
      duration: '55 hours'
    },
    {
      id: 2,
      title: 'Data Science with Python',
      instructor: 'Prof. James Chen',
      rating: 4.9,
      students: '98K',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f70a504f0?w=400&h=250&fit=crop',
      category: 'Data Science',
      level: 'Intermediate',
      duration: '50 hours'
    }
  ]);

  const removeFromWishlist = (courseId: number) => {
    setWishlist(wishlist.filter(course => course.id !== courseId));
  };

  const totalPrice = wishlist.reduce((sum, course) => sum + course.price, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary via-secondary to-primary/80 text-primary-foreground py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <Heart size={32} className="fill-current" />
              <h1 className="text-4xl font-bold">My Wishlist</h1>
            </div>
            <p className="text-lg text-primary-foreground/90">
              {wishlist.length} course{wishlist.length !== 1 ? 's' : ''} saved for later
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {wishlist.length === 0 ? (
              <div className="text-center py-16">
                <Heart size={64} className="mx-auto text-muted-foreground/30 mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">Your wishlist is empty</h2>
                <p className="text-foreground/60 mb-8">
                  Start adding courses to your wishlist by clicking the heart icon on any course.
                </p>
                <Link href="/courses">
                  <Button size="lg">Browse Courses</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Courses Grid */}
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wishlist.map((course) => (
                      <Card
                        key={course.id}
                        className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50"
                      >
                        <Link href={`/course/${course.id}`}>
                          <div className="relative h-40 overflow-hidden bg-muted group cursor-pointer">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                              {course.category}
                            </span>
                          </div>
                        </Link>
                        <CardContent className="p-4 space-y-3">
                          <Link href={`/course/${course.id}`}>
                            <h3 className="font-bold text-foreground line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                              {course.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-foreground/70">{course.instructor}</p>
                          <div className="flex items-center justify-between text-xs text-foreground/60">
                            <span>{course.level}</span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {course.duration}
                            </span>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-border">
                            <span className="text-sm font-semibold text-primary flex items-center gap-1">
                              <Star size={16} className="fill-current" />
                              {course.rating}
                            </span>
                            <span className="text-xs text-foreground/60">({course.students})</span>
                          </div>
                          <p className="text-lg font-bold text-foreground">${course.price}</p>
                          <div className="flex gap-2 pt-2">
                            <Link href={`/course/${course.id}`} className="flex-1">
                              <Button className="w-full" size="sm">
                                View Course
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeFromWishlist(course.id)}
                              aria-label="Remove from wishlist"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Sidebar - Summary */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-24 overflow-hidden">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-4">Order Summary</h3>
                        <div className="space-y-3">
                          {wishlist.map((course) => (
                            <div
                              key={course.id}
                              className="flex justify-between text-sm text-foreground/70"
                            >
                              <span className="truncate">{course.title}</span>
                              <span className="font-semibold text-foreground whitespace-nowrap ml-2">
                                ${course.price}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-border pt-4 space-y-2">
                        <div className="flex justify-between text-foreground/70">
                          <span>Subtotal:</span>
                          <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-foreground/70">
                          <span>Tax:</span>
                          <span className="font-semibold">$0</span>
                        </div>
                      </div>

                      <div className="border-t border-border pt-4 flex justify-between text-lg">
                        <span className="font-bold text-foreground">Total:</span>
                        <span className="font-bold text-primary">${totalPrice.toFixed(2)}</span>
                      </div>

                      <Button className="w-full py-6 text-base">
                        Enroll in {wishlist.length} Course{wishlist.length !== 1 ? 's' : ''}
                      </Button>

                      <Button variant="outline" className="w-full">
                        Continue Shopping
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Additional Recommendations */}
        {wishlist.length > 0 && (
          <section className="bg-muted py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8">You Might Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    id: 3,
                    title: 'Mobile App Development',
                    instructor: 'Emma Rodriguez',
                    price: 54.99,
                    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop'
                  },
                  {
                    id: 4,
                    title: 'UI/UX Design Mastery',
                    instructor: 'Michael Zhang',
                    price: 44.99,
                    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop'
                  }
                ].map((course) => (
                  <Link key={course.id} href={`/course/${course.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                      <div className="h-32 overflow-hidden bg-muted">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4 space-y-3">
                        <h4 className="font-bold text-foreground line-clamp-2">
                          {course.title}
                        </h4>
                        <p className="text-sm text-foreground/70">{course.instructor}</p>
                        <p className="text-lg font-bold text-foreground">${course.price}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
