'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, Filter, X, Heart } from 'lucide-react';

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam ? decodeURIComponent(categoryParam) : '');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const courses = [
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
    },
    {
      id: 3,
      title: 'Mobile App Development',
      instructor: 'Emma Rodriguez',
      rating: 4.7,
      students: '156K',
      price: 54.99,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      category: 'Mobile Dev',
      level: 'Intermediate',
      duration: '45 hours'
    },
    {
      id: 4,
      title: 'UI/UX Design Mastery',
      instructor: 'Michael Zhang',
      rating: 4.6,
      students: '72K',
      price: 44.99,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      category: 'Design',
      level: 'Beginner',
      duration: '35 hours'
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
      id: 6,
      title: 'Machine Learning Basics',
      instructor: 'Dr. Priya Sharma',
      rating: 4.7,
      students: '134K',
      price: 69.99,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
      category: 'Data Science',
      level: 'Intermediate',
      duration: '60 hours'
    },
    {
      id: 7,
      title: 'Graphic Design Essentials',
      instructor: 'Lisa Chen',
      rating: 4.5,
      students: '45K',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      category: 'Design',
      level: 'Beginner',
      duration: '30 hours'
    },
    {
      id: 8,
      title: 'iOS App Development',
      instructor: 'Mark Johnson',
      rating: 4.8,
      students: '92K',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      category: 'Mobile Dev',
      level: 'Intermediate',
      duration: '48 hours'
    }
  ];

  const categories = ['Web Development', 'Data Science', 'Mobile Dev', 'Design', 'Business'];

  const toggleWishlist = (courseId: number) => {
    setWishlist(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  // Filter courses
  let filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort courses
  if (sortBy === 'popular') {
    filteredCourses.sort((a, b) => parseFloat(b.students.replace('K', '')) - parseFloat(a.students.replace('K', '')));
  } else if (sortBy === 'rating') {
    filteredCourses.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'price-low') {
    filteredCourses.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredCourses.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    filteredCourses.reverse();
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Search Bar */}
        <section className="bg-primary/5 border-b border-border py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-2 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-foreground/50" size={20} />
                <Input
                  placeholder="Search courses, topics, instructors..."
                  className="pl-10 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter size={20} />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </div>

            {/* Filters - Mobile Collapsible */}
            {showFilters && (
              <div className="md:hidden space-y-4 mb-6 p-4 bg-card rounded-lg border border-border">
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        !selectedCategory
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      All
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedCategory === cat
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Sort By</h3>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
            )}

            {/* Filters - Desktop */}
            <div className="hidden md:flex gap-4 items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    !selectedCategory
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="ml-auto flex items-center gap-3">
                <span className="text-sm text-foreground/60">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {selectedCategory ? `${selectedCategory} Courses` : 'All Courses'}
                </h1>
                <p className="text-foreground/60 mt-2">{filteredCourses.length} courses found</p>
              </div>
              {selectedCategory && (
                <Button
                  variant="outline"
                  onClick={() => setSelectedCategory('')}
                  className="gap-2"
                >
                  <X size={18} />
                  Clear Filter
                </Button>
              )}
            </div>

            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="relative group">
                    <Link href={`/course/${course.id}`}>
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
                          <div className="flex items-center justify-between text-xs text-foreground/60">
                            <span>{course.level}</span>
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-border">
                            <span className="text-sm font-semibold text-primary">{course.rating} ★</span>
                            <span className="text-xs text-foreground/60">({course.students})</span>
                          </div>
                          <p className="text-lg font-bold text-foreground">${course.price}</p>
                        </CardContent>
                      </Card>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(course.id);
                      }}
                      className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                      aria-label={wishlist.includes(course.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart
                        size={20}
                        className={wishlist.includes(course.id) ? 'fill-destructive text-destructive' : 'text-foreground/60'}
                      />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-foreground/60 text-lg mb-4">No courses found</p>
                <Button onClick={() => setSearchQuery('')} variant="outline">
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
