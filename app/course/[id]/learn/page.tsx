'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, BookOpen, Download, Share2, Menu, X } from 'lucide-react';

export default function CourseLearnPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [progress, setProgress] = useState(25);
  const [currentSection, setCurrentSection] = useState(0);
  const [completedLectures, setCompletedLectures] = useState<number[]>([0, 1, 2]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock course data
  const course = {
    id: id,
    title: 'Web Development Fundamentals',
    instructor: 'Sarah Anderson',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
    duration: '40 hours',
    progress: 25,
    curriculum: [
      {
        section: 'Introduction to Web Development',
        lectures: [
          { id: 0, title: 'Welcome to the Course', duration: '5 min', completed: true },
          { id: 1, title: 'What is Web Development?', duration: '12 min', completed: true },
          { id: 2, title: 'Client vs Server Architecture', duration: '15 min', completed: true },
          { id: 3, title: 'Setting Up Your Development Environment', duration: '20 min', completed: false }
        ]
      },
      {
        section: 'HTML Fundamentals',
        lectures: [
          { id: 4, title: 'HTML Structure and Syntax', duration: '18 min', completed: false },
          { id: 5, title: 'HTML Elements and Tags', duration: '22 min', completed: false },
          { id: 6, title: 'Forms and Input Elements', duration: '25 min', completed: false }
        ]
      },
      {
        section: 'CSS & Styling',
        lectures: [
          { id: 7, title: 'Introduction to CSS', duration: '15 min', completed: false },
          { id: 8, title: 'Selectors and Properties', duration: '20 min', completed: false },
          { id: 9, title: 'Flexbox Layout', duration: '30 min', completed: false },
          { id: 10, title: 'Grid Layout', duration: '28 min', completed: false }
        ]
      }
    ]
  };

  const handleLectureComplete = (lectureId: number) => {
    if (!completedLectures.includes(lectureId)) {
      setCompletedLectures([...completedLectures, lectureId]);
      setProgress(Math.min(progress + 5, 100));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-80' : 'w-0'
          } bg-muted border-r border-border overflow-y-auto transition-all duration-300 flex flex-col`}
        >
          {sidebarOpen && (
            <div className="flex flex-col h-full">
              {/* Course Header in Sidebar */}
              <div className="p-6 border-b border-border">
                <h2 className="font-bold text-lg text-foreground mb-2">{course.title}</h2>
                <p className="text-sm text-foreground/60 mb-4">By {course.instructor}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-foreground/70">Progress</span>
                    <span className="text-primary">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </div>

              {/* Curriculum */}
              <div className="flex-1 overflow-y-auto p-4">
                {course.curriculum.map((section, sectionIdx) => (
                  <div key={sectionIdx} className="mb-6">
                    <h3 className="font-semibold text-sm text-foreground mb-3">
                      {section.section}
                    </h3>
                    <div className="space-y-1">
                      {section.lectures.map((lecture) => (
                        <button
                          key={lecture.id}
                          onClick={() => {
                            setCurrentSection(sectionIdx);
                            handleLectureComplete(lecture.id);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                            completedLectures.includes(lecture.id)
                              ? 'bg-primary/10 text-primary'
                              : 'text-foreground/70 hover:bg-muted-foreground/10'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <CheckCircle
                              size={16}
                              className={`mt-0.5 flex-shrink-0 ${
                                completedLectures.includes(lecture.id)
                                  ? 'text-primary fill-current'
                                  : 'text-foreground/30'
                              }`}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="line-clamp-2 font-medium">{lecture.title}</p>
                              <p className="text-xs text-foreground/50">{lecture.duration}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-border space-y-2">
                <Button variant="outline" className="w-full gap-2">
                  <Download size={16} />
                  Download Materials
                </Button>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto flex flex-col">
          {/* Top Bar */}
          <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between z-40">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Course Content</h1>
                <p className="text-sm text-foreground/60">{course.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" gap="2">
                <Share2 size={16} />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/course/${id}`)}
              >
                Back to Course
              </Button>
            </div>
          </div>

          {/* Video Section */}
          <div className="flex-1 px-6 py-8 max-w-5xl mx-auto w-full">
            <div className="space-y-8">
              {/* Video Player */}
              <div className="bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">▶️</div>
                  <p className="text-xl font-semibold">Video Player</p>
                  <p className="text-sm text-white/70 mt-2">
                    Lecture: {course.curriculum[currentSection]?.lectures[0]?.title || 'Course Content'}
                  </p>
                </div>
              </div>

              {/* Lecture Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    {course.curriculum[currentSection]?.lectures[0]?.title || 'Course Lecture'}
                  </h2>
                  <div className="flex items-center gap-6 text-foreground/70">
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span className="text-sm">{course.curriculum[currentSection]?.lectures[0]?.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} />
                      <span className="text-sm">Section: {course.curriculum[currentSection]?.section}</span>
                    </div>
                  </div>
                </div>

                {/* Lecture Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>About This Lecture</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-foreground/80">
                      In this lecture, you'll learn the fundamentals and core concepts needed to get started with this topic. Pay close attention to the examples and try to implement them yourself.
                    </p>
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Topics Covered:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-foreground/70">
                          <CheckCircle size={16} className="text-primary" />
                          Core concepts and terminology
                        </li>
                        <li className="flex items-center gap-2 text-foreground/70">
                          <CheckCircle size={16} className="text-primary" />
                          Practical examples and demonstrations
                        </li>
                        <li className="flex items-center gap-2 text-foreground/70">
                          <CheckCircle size={16} className="text-primary" />
                          Best practices and common pitfalls
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Lecture Resources */}
                <Card>
                  <CardHeader>
                    <CardTitle>Resources & Downloads</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full gap-2" >
                      <Download size={16} />
                      Lecture Slides (PDF)
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <Download size={16} />
                      Code Examples (ZIP)
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <Download size={16} />
                      Transcription (TXT)
                    </Button>
                  </CardContent>
                </Card>

                {/* Mark as Complete */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <h4 className="font-semibold text-foreground mb-3">Lecture Completion</h4>
                  <p className="text-sm text-foreground/70 mb-4">
                    Mark this lecture as complete to track your progress through the course.
                  </p>
                  <Button
                    className="w-full"
                    onClick={() => {
                      handleLectureComplete(course.curriculum[currentSection]?.lectures[0]?.id);
                    }}
                    disabled={completedLectures.includes(
                      course.curriculum[currentSection]?.lectures[0]?.id
                    )}
                  >
                    {completedLectures.includes(
                      course.curriculum[currentSection]?.lectures[0]?.id
                    )
                      ? '✓ Lecture Completed'
                      : 'Mark as Complete'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
