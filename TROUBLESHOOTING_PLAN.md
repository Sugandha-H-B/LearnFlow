# LearnFlow - Comprehensive Troubleshooting & Implementation Plan

## Issues Identified

### 1. 404 Error: Categories Page Missing
**Problem**: Header links to `/categories` but no page exists
**Solution**: Create `/app/categories/page.tsx` to show categorized course listings
**Expected URL**: `https://learnflow.com/categories`

### 2. Categories Filtering Not Working
**Problem**: Categories section exists in courses page but filtering doesn't update URL or persist
**Solution**: Update filtering to use URL search params for persistence
**Implementation**:
- Use `useSearchParams` and `useRouter` from 'next/navigation'
- Update URL when category selected: `?category=Web+Development`
- Persist filters across page refreshes

### 3. Enroll Button Navigation Issue
**Problem**: After clicking "Enroll", going to course page returns 404
**Root Cause**: Route `/course/[id]/learn` doesn't exist
**Solution**: 
- Create `/app/course/[id]/learn/page.tsx` for course content
- Enroll button should route to `/course/{courseId}/learn`
- Payment gateway shows only for paid courses (price > 0)
- Free courses skip payment and go directly to course

### 4. Wishlist Location & Functionality
**Status**: Partially implemented
**Current State**:
- Wishlist exists in `/app/courses/page.tsx` (line 20)
- Heart icon appears on hover in course cards
- Local state only (not persisted)
**Enhancement Needed**:
- Add wishlist to dashboard page
- Create `/app/wishlist/page.tsx` page
- Show dedicated wishlist section with saved courses
- Persist wishlist (localStorage for now, backend later)

## URL Structure & Routes

```
├── / (Homepage)
├── /courses (Course Browse - with filters)
├── /categories (Category Browse - NEW)
├── /course/[id] (Course Detail)
├── /course/[id]/learn (Course Content - NEW)
├── /dashboard (Student Dashboard)
├── /wishlist (Wishlist Page - NEW)
├── /signin (Sign In)
└── /signup (Sign Up)
```

## Component State Management

### Courses Page State
```javascript
- searchQuery: string
- selectedCategory: string (from URL params)
- priceRange: 'all' | 'free' | 'paid' | 'under50' | 'over50'
- sortBy: 'popular' | 'rating' | 'price' | 'newest'
- wishlist: number[] (course IDs)
```

### Course Detail Page State
```javascript
- isEnrolled: boolean
- isFavorited: boolean (wishlist)
- showPayment: boolean (visible only for price > 0)
```

### Payment Flow Logic
```
IF course.price === 0 (FREE):
  → Show "Enroll for Free" button
  → On click: Set enrolled → Navigate to /course/[id]/learn
  
IF course.price > 0 (PAID):
  → Show "Enroll for $X.XX" button
  → On click: Show payment gateway
  → On payment complete: Set enrolled → Navigate to /course/[id]/learn
```

## Implementation Checklist

### Phase 1: Fix Navigation Routes
- [ ] Create `/app/categories/page.tsx`
- [ ] Create `/app/course/[id]/learn/page.tsx` (course content viewer)
- [ ] Create `/app/wishlist/page.tsx`
- [ ] Update Header navigation links to working routes

### Phase 2: Fix Category Filtering
- [ ] Update courses page to use URL params
- [ ] Implement category click handlers to update URL
- [ ] Filter courses based on URL params
- [ ] Show active filter chips/buttons

### Phase 3: Fix Enrollment & Payment
- [ ] Ensure course detail page has price info
- [ ] Implement conditional payment display (price > 0)
- [ ] Update button logic: free → direct enroll, paid → payment
- [ ] Fix navigation to `/course/[id]/learn` after enrollment

### Phase 4: Implement Wishlist
- [ ] Persist wishlist to localStorage
- [ ] Add wishlist summary to dashboard
- [ ] Create dedicated wishlist page
- [ ] Show wishlist count in header
- [ ] Sync wishlist state across pages using context or localStorage

### Phase 5: Error Handling
- [ ] Add 404 page for invalid course IDs
- [ ] Add error boundary for course detail
- [ ] Validate course exists before showing
- [ ] Handle missing course gracefully

## Testing Checklist

```
Navigation Tests:
- [ ] /courses → displays all courses
- [ ] /courses?category=Web+Development → filters by category
- [ ] /courses?sort=rating → sorts by rating
- [ ] /categories → shows category grid
- [ ] Click category → navigates to /courses?category=X

Enrollment Tests:
- [ ] Free course: Enroll → goes to /course/[id]/learn
- [ ] Paid course: Enroll → shows payment → payment → goes to /course/[id]/learn
- [ ] Course detail page loads correctly for any valid ID

Wishlist Tests:
- [ ] Heart icon toggles on/off in course cards
- [ ] Wishlist persists on page refresh
- [ ] /wishlist page shows all favorited courses
- [ ] Can remove from wishlist
- [ ] Dashboard shows wishlist count
```

## Data Flow Diagram

```
Homepage
   ↓
Courses Page (with filters)
   ├→ Category Filter → URL update → Filter courses
   ├→ Price Filter → URL update → Filter courses
   ├→ Sort Filter → URL update → Sort courses
   ├→ Course Card Click → Course Detail Page
   └→ Heart Icon → Add to Wishlist

Categories Page
   ├→ Category Grid
   └→ Category Click → /courses?category=X

Course Detail Page
   ├→ Price === 0
   │  └→ Enroll Button → /course/[id]/learn
   ├→ Price > 0
   │  └→ Enroll Button
   │     ├→ Show Payment Gateway
   │     └→ Complete Payment → /course/[id]/learn
   └→ Heart Icon → Add to Wishlist

Course Learn Page
   └→ Course Content Display
   
Dashboard
   ├→ Active Courses (with progress)
   ├→ Completed Courses
   └→ Wishlist Summary → /wishlist

Wishlist Page
   └→ All Favorited Courses
```

## File Locations Summary

**Existing Files to Modify**:
- `/vercel/share/v0-project/app/courses/page.tsx` - Add URL params filtering
- `/vercel/share/v0-project/components/Header.tsx` - Update navigation links
- `/vercel/share/v0-project/app/course/[id]/page.tsx` - Verify pricing logic

**New Files to Create**:
- `/vercel/share/v0-project/app/categories/page.tsx` - Categories listing
- `/vercel/share/v0-project/app/course/[id]/learn/page.tsx` - Course content
- `/vercel/share/v0-project/app/wishlist/page.tsx` - Wishlist display

**Priority Order**:
1. Create `/app/categories/page.tsx` (fixes 404)
2. Create `/app/course/[id]/learn/page.tsx` (fixes enrollment navigation)
3. Update Header links
4. Fix courses page filtering
5. Create `/app/wishlist/page.tsx`
