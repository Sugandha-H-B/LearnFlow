'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Star, Users, Clock, Award, BookOpen, CheckCircle, Heart } from 'lucide-react';

'use client';

export default function CourseDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const course = {
    id: id,
    title: 'Web Development Fundamentals',
    instructor: 'Sarah Anderson',
    instructorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 4.8,
    students: '125K',
    reviews: 28543,
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
    category: 'Web Development',
    level: 'Beginner',
    duration: '40 hours',
    language: 'English',
    description: 'Master the fundamentals of web development. Learn HTML, CSS, JavaScript, and modern frameworks to build responsive, interactive websites.',
    highlights: [
      'Comprehensive curriculum covering all basics',
      'Learn by building real projects',
      'Lifetime access to course materials',
      'Certificate of completion',
      'One-on-one mentor support',
      'Community forum access'
    ],
    curriculum: [
      {
        section: 'Introduction to Web Development',
        lectures: 12,
        duration: '4 hours',
        topics: ['What is Web Development', 'Client vs Server', 'Basic Setup']
      },
      {
        section: 'HTML Fundamentals',
        lectures: 25,
        duration: '8 hours',
        topics: ['HTML Structure', 'Forms', 'Semantic HTML', 'Accessibility']
      },
      {
        section: 'CSS & Styling',
        lectures: 30,
        duration: '10 hours',
        topics: ['CSS Basics', 'Flexbox', 'Grid', 'Responsive Design', 'Animations']
      },
      {
        section: 'JavaScript Basics',
        lectures: 28,
        duration: '12 hours',
        topics: ['Variables & Types', 'Functions', 'DOM Manipulation', 'Events']
      },
      {
        section: 'Building Projects',
        lectures: 15,
        duration: '6 hours',
        topics: ['Portfolio Website', 'E-commerce Page', 'Capstone Project']
      }
    ],
    requirements: [
      'A computer with internet connection',
      'Text editor (VS Code recommended)',
      'Basic computer literacy',
      'Passion to learn'
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-12 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                  {course.category}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                  {course.title}
                </h1>
                <p className="text-xl text-foreground/70">{course.description}</p>
              </div>

              {/* Instructor Info */}
              <div className="flex items-center gap-4 py-4 border-t border-b border-border">
                <img
                  src={course.instructorImage}
                  alt={course.instructor}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm text-foreground/60">Instructor</p>
                  <h3 className="text-lg font-semibold text-foreground">{course.instructor}</h3>
                  <div className="flex gap-4 text-sm text-foreground/60 mt-1">
                    <span>4.8 instructor rating</span>
                    <span>125K+ students</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card rounded-lg p-4 border border-border">
                  <Star className="text-primary mb-2" size={24} />
                  <p className="text-sm text-foreground/60">Rating</p>
                  <p className="text-2xl font-bold text-foreground">{course.rating}</p>
                  <p className="text-xs text-foreground/60">({course.reviews.toLocaleString()})</p>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <Users className="text-primary mb-2" size={24} />
                  <p className="text-sm text-foreground/60">Students</p>
                  <p className="text-2xl font-bold text-foreground">{course.students}</p>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <Clock className="text-primary mb-2" size={24} />
                  <p className="text-sm text-foreground/60">Duration</p>
                  <p className="text-2xl font-bold text-foreground">{course.duration}</p>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <Award className="text-primary mb-2" size={24} />
                  <p className="text-sm text-foreground/60">Level</p>
                  <p className="text-2xl font-bold text-foreground">{course.level}</p>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <p className="text-4xl font-bold text-foreground">${course.price}</p>
                    <p className="text-sm text-foreground/60">One-time payment</p>
                  </div>

                  <Button 
                    className="w-full py-6 text-base"
                    onClick={() => setIsEnrolled(!isEnrolled)}
                  >
                    {isEnrolled ? 'Go to Course' : 'Enroll Now'}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => setIsFavorited(!isFavorited)}
                  >
                    <Heart 
                      size={20} 
                      className={isFavorited ? 'fill-current text-destructive' : ''}
                    />
                    {isFavorited ? 'Favorited' : 'Add to Wishlist'}
                  </Button>

                  <div className="pt-4 space-y-2 border-t border-border text-sm text-foreground/70">
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} className="text-primary" />
                      <span>110+ lectures</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-primary" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-primary" />
                      <span>Certificate included</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Course Highlights */}
        <section className="py-12 px-4 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">What you'll get</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                  <span className="text-foreground">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Course Curriculum</h2>
            <div className="space-y-4">
              {course.curriculum.map((section, idx) => (
                <Card key={idx} className="cursor-pointer hover:border-primary/50 transition-colors">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>Section {idx + 1}: {section.section}</span>
                      <span className="text-sm font-normal text-foreground/60">
                        {section.lectures} lectures • {section.duration}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <ul className="space-y-2">
                      {section.topics.map((topic, topicIdx) => (
                        <li key={topicIdx} className="flex items-center gap-2 text-foreground/70">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.requirements.map((req, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                  <CheckCircle className="text-primary/60 flex-shrink-0 mt-1" size={20} />
                  <span className="text-foreground/80">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-12 px-4 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Student Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((review) => (
                <Card key={review} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-foreground">John Doe</h4>
                        <p className="text-sm text-foreground/60">Verified Student</p>
                      </div>
                      <span className="text-sm font-semibold text-primary">4.8 ★</span>
                    </div>
                    <p className="text-foreground/70">
                      &quot;Amazing course! The instructor explains complex concepts in a very simple way. Highly recommended for beginners.&quot;
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary via-secondary to-primary/80 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold text-primary-foreground">Ready to learn?</h2>
            <p className="text-lg text-primary-foreground/90">
              Join {course.students} students taking this course.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setIsEnrolled(!isEnrolled)}
            >
              {isEnrolled ? 'View Course' : `Enroll for $${course.price}`}
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
