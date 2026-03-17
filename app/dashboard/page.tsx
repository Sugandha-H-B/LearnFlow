'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Clock, BookOpen, Award, TrendingUp, Settings, LogOut, Heart, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const [enrolledCourses] = useState([
    {
      id: 1,
      title: 'Web Development Fundamentals',
      instructor: 'Sarah Anderson',
      progress: 65,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
      hoursSpent: 26,
      totalHours: 40,
      nextLesson: 'CSS Grid Layout'
    },
    {
      id: 2,
      title: 'Mobile App Development',
      instructor: 'Emma Rodriguez',
      progress: 30,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      hoursSpent: 13,
      totalHours: 45,
      nextLesson: 'React Native Basics'
    },
    {
      id: 3,
      title: 'UI/UX Design Mastery',
      instructor: 'Michael Zhang',
      progress: 85,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      hoursSpent: 30,
      totalHours: 35,
      nextLesson: 'Prototyping & Testing'
    }
  ]);

  const [wishlistCourses] = useState([
    {
      id: 4,
      title: 'Data Science with Python',
      instructor: 'Prof. James Chen',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f70a504f0?w=400&h=250&fit=crop'
    },
    {
      id: 5,
      title: 'Advanced React Patterns',
      instructor: 'Alex Turner',
      price: 64.99,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop'
    }
  ]);

  const [completedCourses] = useState([
    {
      id: 6,
      title: 'Graphic Design Essentials',
      instructor: 'Lisa Chen',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      completedDate: 'March 10, 2024',
      certificateUrl: '#'
    }
  ]);

  const userStats = {
    totalHours: 69,
    coursesEnrolled: 3,
    coursesCompleted: 1,
    certificates: 1,
    streakDays: 12
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background border-b border-border py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold text-foreground">Welcome back, John!</h1>
                <p className="text-foreground/60 mt-2">Here's what you've been up to</p>
              </div>
              <div className="flex gap-2">
                <Link href="/settings">
                  <Button variant="outline" size="icon">
                    <Settings size={20} />
                  </Button>
                </Link>
                <Button variant="destructive" size="icon">
                  <LogOut size={20} />
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
              <Card className="border-border">
                <CardContent className="p-4">
                  <Clock className="text-primary mb-2" size={24} />
                  <p className="text-sm text-foreground/60">Learning Hours</p>
                  <p className="text-2xl font-bold text-foreground">{userStats.totalHours}h</p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-4">
                  <BookOpen className="text-primary mb-2" size={24} />
                  <p className="text-sm text-foreground/60">Enrolled</p>
                  <p className="text-2xl font-bold text-foreground">{userStats.coursesEnrolled}</p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-4">
                  <Award className="text-primary mb-2" size={24} />
                  <p className="text-sm text-foreground/60">Completed</p>
                  <p className="text-2xl font-bold text-foreground">{userStats.coursesCompleted}</p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-4">
                  <Award className="text-primary mb-2" size={24} />
                  <p className="text-sm text-foreground/60">Certificates</p>
                  <p className="text-2xl font-bold text-foreground">{userStats.certificates}</p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-4">
                  <TrendingUp className="text-primary mb-2" size={24} />
                  <p className="text-sm text-foreground/60">Streak</p>
                  <p className="text-2xl font-bold text-foreground">{userStats.streakDays} days</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="learning" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="learning">Continuing</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              </TabsList>

              {/* Continuing Learning */}
              <TabsContent value="learning" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Continue Learning</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {enrolledCourses.map((course) => (
                      <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-48 h-40 sm:h-auto overflow-hidden bg-muted flex-shrink-0">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="p-6 flex-1 space-y-4 flex flex-col justify-between">
                            <div>
                              <h3 className="font-bold text-lg text-foreground mb-1">{course.title}</h3>
                              <p className="text-sm text-foreground/60 mb-4">{course.instructor}</p>
                              
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between text-xs text-foreground/60 mb-2">
                                    <span>Progress</span>
                                    <span>{course.progress}%</span>
                                  </div>
                                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-primary to-secondary"
                                      style={{ width: `${course.progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <div className="text-xs text-foreground/60">
                                  {course.hoursSpent}h of {course.totalHours}h completed
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-border">
                              <p className="text-sm text-foreground/70">
                                <span className="font-semibold text-foreground">Next:</span> {course.nextLesson}
                              </p>
                              <Link href={`/course/${course.id}`}>
                                <Button className="w-full" size="sm">
                                  Continue Course
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Completed Courses */}
              <TabsContent value="completed" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Completed Courses</h2>
                  {completedCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {completedCourses.map((course) => (
                        <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="h-40 overflow-hidden bg-muted relative">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                              ✓ Completed
                            </div>
                          </div>
                          <CardContent className="p-4 space-y-4">
                            <div>
                              <h3 className="font-bold text-foreground mb-1">{course.title}</h3>
                              <p className="text-sm text-foreground/60">{course.instructor}</p>
                            </div>
                            <p className="text-xs text-foreground/60">Completed on {course.completedDate}</p>
                            <Link href={course.certificateUrl}>
                              <Button className="w-full" size="sm" variant="outline">
                                View Certificate
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Award className="mx-auto text-muted/50 mb-4" size={48} />
                      <p className="text-foreground/60 mb-4">No completed courses yet</p>
                      <Link href="/courses">
                        <Button>Browse Courses</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Wishlist */}
              <TabsContent value="wishlist" className="space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Wishlist</h2>
                      <p className="text-foreground/60 mt-1">{wishlistCourses.length} course{wishlistCourses.length !== 1 ? 's' : ''} saved</p>
                    </div>
                    <Link href="/wishlist">
                      <Button className="gap-2">
                        View Full Wishlist
                        <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </div>

                  {wishlistCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistCourses.map((course) => (
                        <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                          <Link href={`/course/${course.id}`}>
                            <div className="relative h-40 overflow-hidden bg-muted group cursor-pointer">
                              <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <Heart size={32} className="text-white fill-current" />
                              </div>
                            </div>
                          </Link>
                          <CardContent className="p-4 space-y-4">
                            <Link href={`/course/${course.id}`}>
                              <div className="cursor-pointer hover:opacity-80 transition-opacity">
                                <h3 className="font-bold text-foreground mb-1 line-clamp-2 hover:text-primary transition-colors">{course.title}</h3>
                                <p className="text-sm text-foreground/60">{course.instructor}</p>
                              </div>
                            </Link>
                            <div className="flex items-center justify-between pt-4 border-t border-border">
                              <p className="text-lg font-bold text-primary">${course.price}</p>
                              <Link href={`/course/${course.id}`}>
                                <Button size="sm">View Course</Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-muted/30 rounded-lg">
                      <Heart className="mx-auto text-muted-foreground/30 mb-4" size={48} />
                      <p className="text-foreground/60 mb-4">Your wishlist is empty</p>
                      <p className="text-sm text-foreground/50 mb-6">Add courses to your wishlist by clicking the heart icon on any course</p>
                      <Link href="/courses">
                        <Button>Explore Courses</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
