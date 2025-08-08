---
applyTo: '**'
---
# Instructions for GitHub Copilot: Building Abhayprad Jha's Personal Portfolio Website

This file provides detailed guidance for generating code in this SvelteKit project. Use it to prompt Copilot for components, pages, layouts, and styles. The goal is to build a minimalist, responsive multi-page portfolio website showcasing my background as a Computer Science student at William & Mary, internships, projects, and hobbies.

## Project Overview

- **Site Type**: Multi-page application with SvelteKit routing and shared layout components
- **Theme**: Ultra-minimalist black and white design with clean typography. Black text (#000000) on white background (#ffffff), with subtle hover states and transitions
- **Responsiveness**: Mobile-first design using Tailwind's responsive utilities with collapsible sidebar
- **Accessibility**: Include ARIA labels, alt text for images, keyboard navigation, and semantic HTML
- **SEO**: Add meta tags, titles, and descriptions in the layout
- **Interactivity**: Svelte 5 for animations/transitions, smooth scrolling navigation
- **Hosting**: GitHub Pages deployment (abetrs.github.io)

## Tech Stack

- **Framework**: SvelteKit 2.22.0 with Svelte 5.0 and adapter-auto for GitHub Pages deployment
- **Styling**: Tailwind CSS 4.0 with Vite integration and plugins:
  - `@tailwindcss/typography` for prose styling (blog previews, descriptions)
  - `@tailwindcss/forms` for contact form inputs
- **State Management**: Svelte 5 runes ($state, $derived, $effect) and stores for reactive state
- **Icons**: Use heroicons or simple SVG icons (avoid heavy icon libraries)
- **Animations**: Svelte's built-in transitions and custom animation components

## CRITICAL: Svelte 5 Runes Development Patterns

### ⚠️ Common Pitfalls and Solutions

Based on recent debugging, follow these patterns to avoid component rendering issues:

#### 1. $derived Usage - Function vs Direct Value

```javascript
// ❌ AVOID: Function wrapper in $derived can cause reactivity issues
let sortedData = $derived(() => {
	return [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
});

// ✅ PREFERRED: Direct expression in $derived
let sortedData = $derived([...items].sort((a, b) => new Date(b.date) - new Date(a.date)));

// ✅ ALTERNATIVE: Regular function for complex logic
function getSortedData(items) {
	return [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
}
// Use in template: {#each getSortedData(items) as item}
```

#### 2. Intersection Observer and Conditional Rendering

```javascript
// ❌ AVOID: Starting with false and conditional rendering
let isVisible = $state(false);

// Template with conditional that prevents initial rendering
{#if isVisible}
    <div>Content that won't show until intersection</div>
{:else}
    <div class="h-[600px] w-full"></div> <!-- Placeholder causes layout issues -->
{/if}

// ✅ CORRECT: Start visible, use observer for animations only
let isVisible = $state(true); // Start as visible

$effect(() => {
    if (containerRef && typeof window !== 'undefined') {
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
            },
            { threshold: 0.2 } // Increased threshold for better detection
        );
        observer.observe(containerRef);
        return () => observer.disconnect();
    }
});

// Template renders immediately
<div bind:this={containerRef} class="w-full">
    <div>Content shows immediately</div>
</div>
```

#### 3. Complex Derived Values - Use Functions Instead

```javascript
// ❌ PROBLEMATIC: Nested derived values with complex dependencies
let categories = $derived(() => {
	const cats = new Set(skills.map((skill) => skill.category));
	return ['all', ...Array.from(cats)];
});

let filteredSkills = $derived(() => {
	if (selectedCategory === 'all') return skills;
	return skills.filter((skill) => skill.category === selectedCategory);
});

let skillsByLevel = $derived(() => {
	const grouped = {};
	filteredSkills.forEach((skill) => {
		if (!grouped[skill.level]) grouped[skill.level] = [];
		grouped[skill.level].push(skill);
	});
	return grouped;
});

// ✅ SOLUTION: Mix simple derived with functions for complex logic
let categories = $derived(['all', ...Array.from(new Set(skills.map((skill) => skill.category)))]);

let filteredSkills = $derived(
	selectedCategory === 'all'
		? skills
		: skills.filter((skill) => skill.category === selectedCategory)
);

// For complex grouping, use a function
function getSkillsByLevel(skills) {
	const grouped = {};
	if (skills && Array.isArray(skills)) {
		for (const skill of skills) {
			if (skill && skill.level) {
				if (!grouped[skill.level]) {
					grouped[skill.level] = [];
				}
				grouped[skill.level].push(skill);
			}
		}
	}
	return grouped;
}

// Use in template: {#each Object.entries(getSkillsByLevel(filteredSkills)) as [level, levelSkills]}
```

#### 4. Event Handling and Interactive Components

```svelte
// ❌ AVOID: Using deprecated on: syntax
<span on:click={handleClick} on:keydown={handleKeydown}>

// ✅ CORRECT: Use Svelte 5 event attributes
<span
    onclick={handleClick}
    onkeydown={(e) => e.key === 'Enter' || e.key === ' ' ? handleClick() : null}
>

// ✅ ACCESSIBILITY: Interactive non-button elements need proper ARIA
<span
    class="cursor-pointer"
    role="button"
    tabindex="0"
    onclick={complete}
    onkeydown={(e) => e.key === 'Enter' || e.key === ' ' ? complete() : null}
>
    Clickable text content
</span>

// ✅ PREVENT DUPLICATE ACTIONS: Use state flags
let isComplete = $state(false);

function complete() {
    if (!isComplete) {
        isComplete = true;
        // Perform action only once
        performAction();
    }
}
```

**Event Handling Best Practices**:

- Use Svelte 5 event attributes (`onclick`, `onkeydown`) instead of `on:` directives
- Always provide keyboard accessibility for clickable elements
- Use proper ARIA roles for non-semantic interactive elements
- Implement state flags to prevent duplicate actions
- Clean up timeouts and intervals when interrupting animations

## Working Components (Current Implementation)

### ✅ TimelineComponent.svelte - Professional Experience Timeline

**Purpose**: Displays internship experience with interactive expandable details

**Data Structure Required**:

```javascript
let experiences = $state([
	{
		company: 'Company Name',
		position: 'Job Title',
		startDate: '2024-06-01', // YYYY-MM-DD format
		endDate: '2024-08-15',
		current: false,
		description: 'Brief job description...',
		skills: ['React', 'Node.js', 'AWS'], // Array of skill strings
		achievements: ['Achievement 1', 'Achievement 2'], // Optional array
		projects: ['Project 1', 'Project 2'] // Optional array
	}
]);
```

**Usage Pattern**:

```svelte
<TimelineComponent {experiences} title="Professional Experience" />
```

**Key Features**:

- Chronological sorting by start date (newest first)
- Expandable cards with achievements and projects
- Duration calculation and formatting
- Hover effects and accessibility
- Skills tags display

**Critical Implementation Notes**:

- Uses direct `$derived` for sorting: `$derived([...experiences].sort(...))`
- Always renders content (no conditional rendering)
- IntersectionObserver used only for animations, not content visibility

### ✅ SkillsCloud.svelte - Animated Technical Skills Display

**Purpose**: Interactive skills showcase with category filtering and level grouping

**Data Structure Required**:

```javascript
let technicalSkills = $state([
	{
		name: 'React',
		level: 'expert', // 'expert', 'advanced', 'intermediate', 'beginner'
		category: 'frontend', // 'frontend', 'backend', 'cloud', 'tools'
		years: 3 // Optional: experience years
	}
]);
```

**Usage Pattern**:

```svelte
<SkillsCloud skills={technicalSkills} title="Technical Skills" animated={true} />
```

**Key Features**:

- Category filtering with buttons (All, Frontend, Backend, Cloud, Tools)
- Skill level grouping with color coding:
  - Expert: Green (`bg-green-100 text-green-800`)
  - Advanced: Blue (`bg-blue-100 text-blue-800`)
  - Intermediate: Yellow (`bg-yellow-100 text-yellow-800`)
  - Beginner: Gray (`bg-gray-100 text-gray-800`)
- Hover effects showing years of experience
- Skills summary with counts
- Responsive sizing based on skill level

**Critical Implementation Notes**:

- Uses function `getSkillsByLevel()` instead of `$derived` for complex grouping
- Category filtering uses simple `$derived` expression
- No conditional rendering - always shows content
- Hover state management with `$state(null)` for hoveredSkill

### ✅ RightBar.svelte - Social Links Sidebar

**Purpose**: Fixed sidebar displaying external social/professional links with responsive behavior

**Data Structure Required**:

```javascript
const socialLinks = [
	{
		name: 'Blog',
		url: 'https://abetheunicorn.substack.com',
		iconType: 'substack'
	},
	{
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/in/abhayprad-jha-b12390223/',
		iconType: 'linkedin'
	},
	{
		name: 'GitHub',
		url: 'https://github.com/abetrs',
		iconType: 'github'
	},
	{
		name: 'Resume',
		url: resumePdf, // Imported asset
		iconType: 'resume'
	}
];
```

**Usage Pattern**:

```svelte
<RightBar />
```

**Key Features**:

- Fixed positioning on right side (`right-0 z-40`)
- Responsive mobile collapse with toggle button
- Custom SVG icons for each platform (Substack, LinkedIn, GitHub, Resume)
- External link handling with `window.open()` and proper security attributes
- Auto-collapse on mobile after link click
- Matches LeftBar styling with Roboto Mono typography
- Hover effects with color transitions
- Glass backdrop blur effect on mobile

**Critical Implementation Notes**:

- Uses imported resume PDF asset with proper Vite handling
- All links open in new tabs with `noopener,noreferrer` for security
- Mobile responsive pattern matches LeftBar implementation
- SVG icons defined in `getIcon()` function for maintainability
- No shadow styling for clean integration with layout
- Toggle button uses social/share icon instead of generic hamburger

### ✅ TypewriterText.svelte - Interactive Text Animation Component

**Purpose**: Animated typewriter effect with click-to-complete functionality for enhanced user experience

**Props Structure**:

```javascript
let {
	text = '', // Text to animate
	speed = 100, // Typing speed in milliseconds
	delay = 0, // Initial delay before starting
	cursor = true, // Show blinking cursor
	loop = false, // Loop animation (rarely used)
	onComplete = null, // Callback when animation completes
	onClickComplete = null // Callback when user clicks to complete
} = $props();
```

**Usage Pattern**:

```svelte
<TypewriterText text={aboutText} speed={25} delay={200} cursor={true} />
```

**Key Features**:

- **Click-to-complete**: Users can click anywhere on the text to instantly complete the animation
- **Keyboard accessibility**: Enter and Space keys also trigger completion
- **Prevent duplicate completion**: Once complete, additional clicks have no effect
- **Smooth timeout management**: Properly clears pending timeouts when completing early
- **Cursor animation**: Blinking cursor with configurable visibility
- **Svelte 5 compatibility**: Uses runes and modern event syntax

**Critical Implementation Notes**:

- Component is clickable with proper accessibility (`role="button"`, `tabindex="0"`)
- Uses Svelte 5 event syntax (`onclick` instead of `on:click`)
- State management with `$state()` for all reactive values
- Cursor blinking handled in separate `$effect()` with cleanup
- Font styling inherits from parent (maintains typography consistency)
- Prevents multiple completions with `isComplete` state check

**UX Enhancement**:

This component solves the common UX issue where users want to skip animation and read full content immediately. The click-to-complete feature provides:

- Faster content consumption for returning visitors
- Better accessibility for users who prefer static text
- Maintained visual appeal for first-time visitors who enjoy the animation

**Accessibility Features**:

- Keyboard navigation support (Enter/Space keys)
- Proper ARIA role assignment
- Focus management with tabindex
- Inherits parent font styling for consistency

### Layout Components

#### TopBar.svelte

- Sticky header with name and barcode element
- Height: 100px, positioned at `top-0 z-50`
- Typography: Roboto Condensed + Libre Barcode 128

#### LeftBar.svelte

- Responsive collapsible navigation
- Mobile auto-collapse with backdrop blur
- Active page highlighting
- Roboto Mono typography

#### RightBar.svelte

- Social links sidebar (Blog/Substack, LinkedIn, GitHub, Resume)
- Responsive collapsible with mobile auto-collapse
- SVG icons for each platform (Substack, LinkedIn, GitHub, Resume/Document)
- Opens external links in new tabs with proper noopener/noreferrer
- Matches LeftBar styling with Roboto Mono typography
- No shadow styling for clean integration

#### ThemeToggle.svelte

- Theme switching functionality
- Positioned top-right corner
- SSR-safe theme management

## Current Page Structure

### File Organization

```
src/routes/
├── +layout.svelte (ALL shared components and centralized layout)
├── +page.svelte (Bio: profile image + about section)
├── internships/+page.svelte (✅ Timeline + Skills components)
├── projects/+page.svelte (project showcase cards)
├── college/+page.svelte (William & Mary details)
├── hobbies/+page.svelte (creative pursuits gallery)
└── blog/+page.svelte (Substack integration)

src/lib/components/
├── TimelineComponent.svelte (✅ Working internship timeline)
├── SkillsCloud.svelte (✅ Working skills display)
├── TopBar.svelte (✅ Sticky header)
├── LeftBar.svelte (✅ Responsive navigation)
├── RightBar.svelte (✅ Social links sidebar)
├── ThemeToggle.svelte (✅ Theme switching)
├── GalleryComponent.svelte (reusable gallery with filtering)
├── BlogPost.svelte (blog post preview cards)
├── ProjectCard.svelte (project showcase cards)
├── ContactForm.svelte (contact form)
└── TypewriterText.svelte (✅ Working interactive typewriter with click-to-complete)
```

### ✅ Internships Page Implementation

**Complete and working** - serves as the reference implementation for other pages:

```svelte
<script>
    import TimelineComponent from '$lib/components/TimelineComponent.svelte';
    import SkillsCloud from '$lib/components/SkillsCloud.svelte';

    // Experience data using Svelte 5 runes
    let experiences = $state([...]);
    let technicalSkills = $state([...]);
</script>

<!-- Content Area - No layout components, just content -->
<div class="w-full max-w-[900px] space-y-12">
	<div class="text-center">
		<h1 class="font-condensed mb-8 text-[48px] font-bold tracking-[-2px] text-black">
			Internships
		</h1>
		<p class="font-condensed mb-12 text-[24px] leading-relaxed text-black">
			Professional journey description...
		</p>
	</div>

	<TimelineComponent {experiences} title="Professional Experience" />

	<div class="mt-16">
		<SkillsCloud skills={technicalSkills} title="Technical Skills" animated={true} />
	</div>
</div>
```

## Development Guidelines

### Page Creation Pattern

1. **Individual pages contain ONLY their unique content**
2. **No layout components in page files** (TopBar, LeftBar, RightBar, ThemeToggle)
3. **Import only content-specific components** from `$lib/components/`
4. **Use centralized layout from +layout.svelte**

### Svelte 5 Best Practices

1. **Start components as visible**: `let isVisible = $state(true)`
2. **Use simple $derived for straightforward transformations**
3. **Use functions for complex data grouping instead of nested $derived**
4. **Always include browser checks for DOM APIs**
5. **Avoid conditional rendering that blocks initial content display**

### Component Creation Checklist

- [ ] Browser API usage wrapped in `typeof window !== 'undefined'` checks
- [ ] State initialized to show content immediately (`$state(true)`)
- [ ] Complex data transformations use functions, not $derived
- [ ] IntersectionObserver used for animations only, not content visibility
- [ ] Typography follows established font system (Roboto Condensed/Mono)
- [ ] Responsive design with mobile-first approach
- [ ] Accessibility features (ARIA labels, keyboard navigation)

### Debugging Approach

When components don't render content:

1. **Check initial state values** - ensure visibility starts as `true`
2. **Verify $derived expressions** - use simple expressions, not complex functions
3. **Test data flow** - add temporary debug output to verify props/data
4. **Check conditional rendering** - avoid `{#if}` blocks that prevent initial display
5. **Use browser dev tools** - inspect for empty arrays/objects in derived values

### Typography System

- **Headings**: Roboto Condensed with tracking adjustments
- **Body text**: System font stack or Roboto Condensed for consistency
- **Technical elements**: Roboto Mono for labels, buttons, code-like text
- **Import in component styles**: Load fonts per-component for better control

### Color and Layout Standards

- **Background**: `bg-gray-50` site-wide
- **Text**: `text-black` for primary content
- **Hover states**: Subtle gray transitions
- **Spacing**: Generous whitespace with consistent gap/margin patterns
- **Max width**: `max-w-[900px]` for content areas
- **Z-index hierarchy**: TopBar (50) > LeftBar (40) > Content (default)

## Content Implementation Priorities

### ✅ Completed

- [x] Timeline component with professional experience data
- [x] Skills cloud with technical skills categorization
- [x] Responsive navigation and layout system
- [x] SSR-safe browser API handling
- [x] Svelte 5 runes implementation patterns

### 🔄 Next Steps

- [ ] Projects page with ProjectCard components
- [ ] College page with academic timeline
- [ ] Hobbies page with GalleryComponent
- [ ] Blog page with Substack integration
- [ ] Contact form implementation
- [ ] Performance optimization and deployment

## How to Prompt Copilot (Updated)

### For New Components

```
"Create a [component name] following the working TimelineComponent pattern with:
- State starting as visible ($state(true))
- Simple $derived expressions
- Functions for complex data grouping
- No conditional rendering blocking initial display"
```

### For Page Implementation

```
"Build [page name] following the internships page pattern:
- Import only content-specific components
- No layout components (TopBar/LeftBar already in +layout)
- Content wrapper with max-w-[900px]
- Roboto Condensed typography"
```

### For Data Structures

```
"Design data structure for [component] following the established patterns in TimelineComponent and SkillsCloud with proper typing and required/optional fields"
```

This updated documentation reflects all learnings from debugging the timeline and skills components, providing a reliable foundation for future development.

## SSR-Safe Development Patterns (CRITICAL)

Since this project uses SvelteKit with SSR, follow these patterns to avoid 500 errors:

### Browser API Usage

Always check for browser environment before using browser-only APIs:

```javascript
// In onMount lifecycle
import { onMount } from 'svelte';

onMount(() => {
    if (typeof window !== 'undefined') {
        // Browser-only code here
        const observer = new IntersectionObserver(...);
        window.addEventListener('scroll', handleScroll);
    }
});
```

### Effect Usage in Svelte 5

Use `$effect` only within component context, never at module level:

```javascript
// ❌ WRONG - Module level effect
$effect(() => {
	// This will cause SSR errors
});

// ✅ CORRECT - Component level effect
let someState = $state(false);

$effect(() => {
	if (typeof window !== 'undefined') {
		// Browser-specific reactive code
	}
});
```

### Theme Store Pattern (Current Implementation)

The theme store uses component-level initialization to avoid SSR issues:

```javascript
// theme.svelte.js pattern
let theme = $state('light');

export function initializeTheme() {
	if (typeof window !== 'undefined') {
		// Initialize theme from localStorage/system preferences
	}
}

export function applyTheme(newTheme) {
	theme = newTheme;
	if (typeof window !== 'undefined') {
		document.documentElement.setAttribute('data-theme', theme);
	}
}
```

## Component Architecture and Design System

### Layout Component Hierarchy (Z-Index Management)

Current z-index layering (IMPORTANT for visual hierarchy):

- TopBar: `z-50` (highest priority)
- LeftBar: `z-40` (behind TopBar)
- RightBar: `z-40` (same level as LeftBar)
- Mobile toggle buttons: `z-[60]` (above everything for accessibility)
- Modal overlays: `z-50` (same level as TopBar)

### Responsive Navigation Pattern

LeftBar component uses this mobile-responsive pattern:

```svelte
<script>
	let isCollapsed = $state(false);
	let isMobile = $state(false);

	$effect(() => {
		if (typeof window !== 'undefined') {
			isMobile = window.innerWidth < 1024; // lg breakpoint
			if (isMobile && !isCollapsed) {
				isCollapsed = true; // Auto-collapse on mobile
			}
		}
	});

	onMount(() => {
		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		return () => window.removeEventListener('resize', checkScreenSize);
	});
</script>

<!-- Mobile toggle button -->
<button class="toggle-button">...</button>

<!-- Desktop sidebar -->
<nav class="sidebar-nav">
	<!-- Navigation content -->
</nav>

<!-- Mobile backdrop -->
{#if isMobile && !isCollapsed}
	<div class="backdrop-blur-sm" transition:fade>...</div>
{/if}
```

### Color Palette

Stick to the minimalist black and white theme:

- **Background**: White (#ffffff)
- **Text**: Black (#000000)
- **Accents**: Light gray for subtle elements (#f5f5f5, #e5e5e5)
- **Hover States**: Subtle gray transitions
- **Focus States**: Black outlines for accessibility

### Typography System

Current font implementation uses Google Fonts with fallbacks:

- **Condensed headings**: 'Roboto Condensed' for titles and headers
- **Monospace**: 'Roboto Mono' for technical elements and UI labels
- **Default**: System sans-serif stack for body text

Font imports are handled in component `<style>` blocks:

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

.font-condensed {
	font-family: 'Roboto Condensed', 'Arial Narrow', Arial, sans-serif;
}

.font-mono {
	font-family: 'Roboto Mono', 'Courier New', monospace;
}
```

## Current Component Usage Patterns

### Page Component Template (Follow This Pattern)

Individual page components should contain ONLY their unique content:

```svelte
<script>
	// Minimal script when no props needed
</script>

<div class="mx-auto max-w-6xl p-6">
	<!-- Content -->
</div>

<style>
	/* External font imports */
	@import url('https://fonts.googleapis.com/css2?family=Font+Name&display=swap');

	/* Custom CSS classes for reusability */
	.custom-class {
		font-family: 'Font Name', fallback, sans-serif;
	}
</style>
```

### Gallery Component Pattern

GalleryComponent.svelte provides a reusable pattern for content with filtering:

```svelte
<script>
	// Svelte 5 props destructuring
	let { items = [], title = 'Gallery', columns = 2, showModal = true } = $props();

	// Reactive state
	let filter = $state('all');
	let selectedItem = $state(null);

	// Derived values
	let filteredItems = $derived(() => {
		if (filter === 'all') return items;
		return items.filter((item) => item.category === filter);
	});
</script>
```

### Animation and Transition Guidelines

Use Svelte's built-in transitions with consistent timing:

```svelte
import { scale, fly, fade } from 'svelte/transition';
import { quintOut } from 'svelte/easing';

<!-- Standard transition timing -->
<div transition:fly={{ y: 50, duration: 600, easing: quintOut }}>
<div transition:scale={{ delay: index * 100, duration: 500, easing: quintOut }}>
<div transition:fade={{ duration: 300 }}>
```

## Content Guidelines

### About/Bio Section (Home Page)

- Circular profile image with proper aspect ratio
- Brief introduction highlighting CS background at William & Mary
- Key interests: technology, problem-solving, innovation
- IntersectionObserver for scroll-based animations

### Internships Section

- TimelineComponent for chronological progression
- SkillsCloud for animated technical skills display
- Company names, roles, dates with hover interactions

### Projects Section

- ProjectCard components with consistent styling
- GitHub/live demo links with proper external link handling
- Technology tags with filtering capabilities

### Hobbies Section

- GalleryComponent with category filtering
- Modal support for detailed views
- Responsive grid layouts (1-4 columns)

### Blog Section

- BlogPost preview components
- External link handling for Substack/blog platforms
- SEO-friendly meta descriptions

### College Section

- Academic achievements and coursework
- Timeline format for major milestones
- Integration with overall site navigation

## Current Implementation Status

### Completed Features

- ✅ Centralized layout system with shared components
- ✅ SSR-safe browser API usage patterns
- ✅ Responsive navigation with mobile collapse
- ✅ Theme store with proper Svelte 5 patterns
- ✅ Z-index layering for visual hierarchy
- ✅ Tailwind CSS 4.0 integration with Vite
- ✅ Component-level font imports and styling

### Known Issues Fixed

- ✅ 500 SSR errors resolved with proper browser checks
- ✅ Svelte 5 effect usage patterns corrected
- ✅ Layout code duplication eliminated
- ✅ Z-index conflicts resolved (TopBar > LeftBar)
- ✅ Tailwind CSS parsing issues with certain imports

### Development Priorities

1. Complete layout refactoring for remaining pages (internships, projects)
2. ✅ TypewriterText component with click-to-complete functionality (complete)
3. Add content and data for all sections
4. Implement contact form functionality
5. Optimize performance and accessibility
6. Test deployment to GitHub Pages

## Development Notes

- Always use absolute file paths when calling tools
- Test SSR compatibility by checking browser environment
- Use Svelte 5 runes ($state, $derived, $effect) consistently
- Maintain z-index hierarchy: TopBar (50) > LeftBar (40)
- Keep layout components in +layout.svelte, content in individual pages
- Import fonts at component level, not globally
- Use TypeScript where beneficial for component props

Remember: The goal is a clean, professional portfolio with proper SSR support, responsive design, and maintainable code architecture. Every component should follow established patterns and serve a clear purpose in the overall site structure.

## Figma Design Implementation Notes

The Figma design shows a specific layout that should be implemented:

1. **Header Bar**: White background, contains "Abhayprad Jha" in italic narrow font (left) and barcode-style text element (right)
2. **Left Navigation**: Vertical list of sections with right-pointing arrows
3. **Main Content**: Centered with circular profile photo and about text
4. **Right Sidebar**: Icon + label combinations for social links
5. **Typography Hierarchy**: Name is largest, navigation is medium, body text is smaller
6. **Spacing**: Clean, generous whitespace throughout

## Site Structure

- **Root Layout (`src/routes/+layout.svelte`)**: Currently minimal, needs header with name/barcode, navigation sidebar, and social sidebar
- **Main Page (`src/routes/+page.svelte`)**: Replace default content with portfolio sections based on Figma design
- **Components Directory (`src/lib/components/`)**: Create reusable components for navigation, profile section, social links
- **Assets**: Store images in `static/` directory, use placeholder images initially

### Content Sections (Based on Figma Navigation)

1. **Bio Section** (Currently shown in Figma):
   - Large circular profile photo (centered)
   - "About Me" heading and paragraph text
   - Professional photo placeholder
   - Bio text about CS student, internships, and goals

2. **Internships Section**:
   - Timeline or card layout for work experience
   - Deloitte (2024), Black Pearl Global Investments (2023), TCS (2022)
   - Focus on tech consulting, data analysis, full-stack development

3. **Projects Section**:
   - Grid of project cards with descriptions and links
   - Playlist Exchange, Hackathon projects, TransactionsApp, The Space Race
   - Include tech stack and demo links

4. **College Section**:
   - William & Mary details (degree, coursework)
   - Campus involvement: Cricket Club, The Flat Hat newspaper, International Mini Mart
   - Academic achievements and extracurricular activities

5. **Hobbies Section**:
   - Music: Spotify/SoundCloud links, playlist embeds
   - Photography: Gallery with trip collections
   - Film: Horizontal scroll with video embeds/links
   - 3D Modeling: Portfolio gallery
   - Blog: Links to Substack posts

6. **Blog Section**:
   - Integration with Substack
   - Preview of recent posts
   - Link to full blog

### Navigation Structure

- Left sidebar navigation (from Figma): Bio, Internships, Projects, College, Hobbies, Blog
- Right sidebar social links: Blog (Substack), LinkedIn, GitHub, Resume
- Smooth scrolling between sections
- Mobile: Convert sidebars to collapsible menu or footer layout

## Current Implementation Status

### Completed Components

#### TopBar Component (`src/lib/components/TopBar.svelte`)

- **Reusable header component** for consistent navigation across pages
- **Positioning**: Sticky top positioning (`sticky top-0 z-50`) for persistent header
- **Layout**:
  - Left side: "Abhayprad Jha" in Arial Narrow italics with -6% letter spacing
  - Right side: Barcode-style text using Libre Barcode 128 font
  - Height: 100px (optimized from initial 202px for better proportion)
  - Background: Matches page background (`bg-gray-50`) for seamless integration
- **Typography Implementation**:
  - Primary font: Roboto Condensed as Arial Narrow fallback
  - Barcode font: Libre Barcode 128 from Google Fonts
  - Font size: 68px for name, 52px for barcode element

#### Home Page Layout (`src/routes/+page.svelte`)

- **Complete Bio section implementation** matching Figma design
- **Profile Image**: Flattened oval placeholder (501px × 300px) for better visual proportion
- **Content Structure**:
  - TopBar component integration
  - Centered layout with proper spacing
  - "About Me" section with condensed typography
  - Responsive design with Tailwind utilities
- **Typography**: Consistent font implementation with proper letter spacing and tracking

### Technical Implementation Details

#### Font Management

- **Google Fonts Integration**: Roboto Condensed and Libre Barcode 128
- **Fallback Strategy**: Arial Narrow → Roboto Condensed → Arial → sans-serif
- **Custom CSS Classes**: `.font-condensed` and `.font-barcode` for consistent application
- **Letter Spacing**: -6% for name text to match design specifications

#### Layout Architecture

- **Sticky Header**: Properly implemented without wrapper containers that break positioning
- **Component Reusability**: TopBar designed for use across multiple pages
- **Background Consistency**: Unified gray-50 background throughout application
- **Responsive Design**: Mobile-first approach with Tailwind responsive utilities

#### Development Patterns Established

- **Component Structure**: Reusable components in `src/lib/components/`
- **Import Pattern**: Consistent component imports using `$lib/` alias
- **Styling Approach**: Tailwind-first with custom CSS only for fonts and specific effects
- **No External Dependencies**: Font loading handled via Google Fonts CDN
- **Responsive Navigation**: Mobile-first collapsible sidebar with smooth transitions
- **State Management**: Svelte stores for page routing, reactive state for screen size detection
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML structure

### Advanced Implementation Patterns

#### Responsive Component Logic

```javascript
// Screen size detection with reactive updates
let isMobile = false;

function checkScreenSize() {
	if (typeof window !== 'undefined') {
		isMobile = window.innerWidth < 1024; // lg breakpoint
		if (isMobile && !isCollapsed) {
			isCollapsed = true; // Auto-collapse on mobile
		}
	}
}

onMount(() => {
	checkScreenSize();
	window.addEventListener('resize', checkScreenSize);
	return () => window.removeEventListener('resize', checkScreenSize);
});
```

#### Mobile-First Navigation Pattern

```svelte
<!-- Conditional rendering based on screen size -->
{#if isCollapsed || isMobile}
	<button class="toggle-button">...</button>
{/if}

<!-- Responsive sidebar with smooth transitions -->
<nav class="sidebar {isCollapsed ? '-translate-x-full' : 'translate-x-0'}">
	<!-- Navigation content -->
</nav>

<!-- Mobile-only glass backdrop effect -->
{#if !isCollapsed && isMobile}
	<div class="backdrop-blur-sm" transition:fade>...</div>
{/if}
```

#### Font System Implementation

- **Primary Navigation**: Roboto Mono for technical, modern appearance
- **Headers & Body**: Roboto Condensed for clean, condensed layout
- **Barcode Element**: Libre Barcode 128 for unique design accent
- **Fallback Strategy**: Comprehensive fallbacks for cross-platform compatibility

### Known Design Decisions

1. **Height Optimization**: TopBar reduced from 202px to 100px for better screen real estate usage
2. **Shadow Approach**: Subtle shadows can be added (`shadow-sm`) but currently clean design preferred
3. **Image Placeholder**: Oval shape (501px × 300px) provides flatter, more elegant proportion than circular
4. **Sticky Behavior**: TopBar sticks properly when not wrapped in padding containers
5. **Font Loading**: External font loading via CSS imports in component styles
6. **Mobile Breakpoint**: 1024px (lg) chosen as mobile/desktop breakpoint for optimal sidebar behavior
7. **Navigation Typography**: Roboto Mono selected for technical, monospace aesthetic in sidebar
8. **Glass Effect Scope**: Backdrop blur limited to mobile only for performance and UX optimization
9. **Z-Index Layering**: Systematic layering (toggle: z-60, sidebar: z-50, backdrop: z-20, content: default)
10. **Transition Timing**: 300ms duration across all animations for consistent, smooth experience
11. **Auto-Collapse Logic**: Sidebar automatically collapses on mobile after navigation for better UX
12. **Responsive Margins**: Different left margins for Bio page (150px) vs other pages (200px) for design balance

## Implementation Priority

### ✅ Phase 1: Completed

- [x] Basic layout structure implementation
- [x] TopBar component with sticky positioning
- [x] Bio section with profile placeholder and about text
- [x] Typography system with proper font fallbacks
- [x] Responsive design foundation

### ✅ Phase 2: Navigation & Routing (Completed)

- [x] LeftBar component with collapsible navigation
- [x] SvelteKit routing implementation for all sections
- [x] Responsive mobile navigation with glass backdrop effect
- [x] Complete page structure for all portfolio sections
- [x] Smooth transitions and mobile-first responsive design

#### LeftBar Component (`src/lib/components/LeftBar.svelte`)

- **Responsive Collapsible Navigation**: Automatically collapses on screens < 1024px (lg breakpoint)
- **Navigation Items**: Bio, Internships, Projects, College, Hobbies, Blog with proper routing
- **Interactive Features**:
  - Active page highlighting with `bg-gray-200 bg-opacity-40`
  - Hover effects with subtle gray background (`hover:bg-gray-100`)
  - Right arrow (›) indicators matching Figma design
  - Hamburger menu toggle button for mobile
- **Typography**: Roboto Mono font for modern, technical appearance
- **Mobile UX Enhancements**:
  - Glass backdrop effect with `backdrop-blur-sm bg-white/10` (mobile only)
  - Smooth fade transitions using Svelte's `transition:fade`
  - Auto-collapse after navigation on mobile
  - Close button inside sidebar when expanded
- **Positioning**: Fixed at `left-0 top-[100px]` with `z-50` layering
- **Animations**: 300ms slide transition with `transition-transform duration-300 ease-in-out`

#### Complete Route Structure

- **`/` (Bio)**: Main landing page with profile and about section
- **`/internships`**: Timeline-style layout showcasing work experience
- **`/projects`**: Grid layout for portfolio projects
- **`/college`**: William & Mary details with campus involvement
- **`/hobbies`**: Grid showcasing creative pursuits
- **`/blog`**: Substack integration with recent post previews

#### Responsive Layout Implementation

- **Desktop**: Sidebar visible by default, content with `lg:ml-[200px]` margin
- **Mobile**: Sidebar collapsed by default, full-width content with toggle button
- **Bio Page**: Special `lg:ml-[150px]` for slight left offset as designed
- **Real-time Responsiveness**: Window resize listener updates mobile state dynamically

### � Phase 3: Content Integration

- [ ] Add internship timeline/cards
- [ ] Build project portfolio grid
- [ ] Create college section with activities
- [ ] Implement hobbies gallery sections
- [ ] Integrate Substack blog preview

### 🎨 Phase 4: Enhancements

- [ ] Add animations and transitions
- [ ] Implement contact form
- [ ] Optimize for GitHub Pages deployment
- [ ] Add SEO meta tags and structured data

## Development Guidelines Based on Implementation

### Component Creation Patterns

```svelte
<!-- Component Template Pattern -->
<script>
	// Minimal script when no props needed
</script>

<!-- Clean HTML structure with Tailwind -->
<div class="sticky top-0 z-50 h-[100px] w-full bg-gray-50">
	<!-- Content -->
</div>

<style>
	/* External font imports */
	@import url('https://fonts.googleapis.com/css2?family=Font+Name&display=swap');

	/* Custom CSS classes for reusability */
	.custom-class {
		font-family: 'Font Name', fallback, sans-serif;
	}
</style>
```

### Sticky Positioning Best Practices

- **Avoid wrapper containers** with padding around sticky elements
- **Use proper z-index** (z-50 for headers) to ensure layering
- **Match background colors** to parent containers for seamless integration
- **Test scrolling behavior** with sufficient content height

### Typography System Implementation

- **Load fonts in component styles** rather than global CSS when component-specific
- **Use CSS custom properties** for consistent letter spacing across elements
- **Implement fallback fonts** for better loading performance and accessibility
- **Size elements with px values** for precise control matching design specs

### Component Layout Patterns

- **Component-first approach**: Break UI into reusable components from the start
- **Consistent import patterns**: Use `$lib/` aliases for clean imports
- **Background consistency**: Ensure all components use unified color scheme
- **Mobile-first responsive**: Start with mobile layout and enhance for desktop

## How to Prompt Copilot (Updated)

### For Components

```text
"Create a reusable [component name] component following the established pattern with sticky positioning and consistent typography"
```

### For Typography

```text
"Implement typography using the established font system with Roboto Condensed fallback and proper letter spacing"
```

### For Layout

```text
"Build [section name] following the TopBar component pattern with proper Tailwind classes and responsive design"
```

### For Styling

```text
"Add styling that matches the current gray-50 background with consistent spacing and the established design system"
```

## Additional Features

- **Animations**: Fade-in on scroll, hover effects on navigation and social links
- **Contact Integration**: Add contact form or direct email links
- **Performance**: Lazy-load images, optimize for GitHub Pages
- **SEO**: Add proper meta tags, Open Graph data, structured data
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## How to Prompt Copilot

- For layout: "Create the main layout structure based on the Figma design with left navigation sidebar, center content, and right social sidebar"
- For components: "Generate a Svelte component for the circular profile section with image and about text"
- For navigation: "Implement smooth scrolling navigation between portfolio sections"
- For styling: "Style the navigation sidebar to match the Figma design with arrows and clean typography"
- For sections: "Create the [specific section] content area with responsive design"

## Development Notes

- Use Svelte 5 runes ($state, $derived, $effect) for reactive functionality
- Leverage Tailwind 4.0 features and new plugin system
- Ensure GitHub Pages compatibility with adapter-auto
- Follow semantic HTML structure for better SEO and accessibility
- Test responsive design across devices during development

Start by implementing the basic layout structure that matches the Figma design!

---

## Summary of Key Learnings (August 2025)

**Critical Svelte 5 Patterns for Component Rendering:**

1. **Always start components visible**: `let isVisible = $state(true)` prevents blank screens
2. **Use simple $derived expressions**: Complex callback functions can break reactivity
3. **Use regular functions for complex data grouping**: More reliable than nested $derived
4. **Never block initial rendering with conditional logic**: IntersectionObserver for animations only
5. **Browser APIs must be wrapped**: `typeof window !== 'undefined'` checks essential

**Working Component Examples:**

- ✅ `TimelineComponent.svelte` - Professional experience timeline
- ✅ `SkillsCloud.svelte` - Technical skills with filtering
- ✅ `TypewriterText.svelte` - Interactive text animation with click-to-complete and session management
- ✅ `ScrollToNextIndicator.svelte` - Bidirectional scroll-based page navigation system
- ✅ Layout system with `TopBar`, `LeftBar`, `RightBar`, `ThemeToggle`

### ✅ ScrollToNextIndicator.svelte - Smooth Page Navigation System

**Purpose**: Provides intuitive scroll-based navigation between pages with visual feedback and click shortcuts

**Navigation Store Structure** (`navigation.svelte.js`):

```javascript
// Navigation items in sequential order
export const navItems = [
	{ name: 'Bio', path: '/' },
	{ name: 'Internships', path: '/internships' },
	{ name: 'Projects', path: '/projects' },
	{ name: 'College', path: '/college' },
	{ name: 'Hobbies', path: '/hobbies' },
	{ name: 'Blog', path: '/blog' }
];

// Reactive state using Svelte 5 runes
let scrollTransitionActive = $state(false);
let scrollDelta = $state(0);
let scrollDuration = $state(0);
```

**useScrollToNext.js Composable Pattern**:

```javascript
export function useScrollToNext() {
	// Bidirectional state management
	let isAtBottom = false;
	let isAtTop = false;
	let accumulatedScroll = 0;
	let accumulatedScrollUp = 0;

	// Tunable behavior constants
	const TRANSITION_THRESHOLD = 150; // pixels of wheel movement
	const REQUIRED_SCROLL_DURATION = 500; // milliseconds at boundary
	const TRANSITION_DURATION = 400; // animation duration

	function handleScroll() {
		// Accurate boundary detection using document dimensions
		const { scrollTop } = document.documentElement;
		const windowHeight = window.innerHeight;
		const documentHeight = document.documentElement.scrollHeight;

		const isComponentAtBottom = scrollTop + windowHeight >= documentHeight - 10;
		const isComponentAtTop = scrollTop <= 10;
		// Boundary state management with proper resets
	}

	function handleWheel(event) {
		// Critical: Use wheel events at boundaries where scroll is impossible
		if (isAtBottom && event.deltaY > 0) {
			accumulatedScroll += Math.abs(event.deltaY);
			// Trigger next page after threshold + duration
		}
		if (isAtTop && event.deltaY < 0) {
			accumulatedScrollUp += Math.abs(event.deltaY);
			// Trigger previous page after threshold + duration
		}
	}

	// Dual event listener initialization
	function initScrollListener() {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleScroll, { passive: true });
			window.addEventListener('wheel', handleWheel, { passive: true });
		}
	}
}
```

**Page Implementation Pattern**:

```svelte
<script>
	import { useScrollToNext } from '$lib/composables/useScrollToNext.js';
	import ScrollToNextIndicator from '$lib/components/ScrollToNextIndicator.svelte';
	import { getNextPagePath } from '$lib/stores/navigation.svelte.js';

	// Initialize scroll system
	const scrollToNext = useScrollToNext();
	let pageContainer = $state(null);

	// Reactive page name mapping
	let nextPagePath = $derived($page.url ? getNextPagePath($page.url.pathname) : null);
	let nextPageName = $derived(() => {
		if (nextPagePath === '/internships') return 'Internships';
		if (nextPagePath === '/projects') return 'Projects';
		// ... other mappings
		return 'Next Page';
	});

	onMount(() => {
		scrollToNext.initScrollListener();
		return () => scrollToNext.destroyScrollListener();
	});

	$effect(() => {
		if (pageContainer) {
			scrollToNext.containerRef.value = pageContainer;
		}
	});
</script>

<!-- Content with scroll detection -->
<div bind:this={pageContainer} class="mt-16 space-y-8">
	<!-- Main page content -->
	<div class="h-64"></div>
	<!-- Spacer to enable scrolling -->
</div>

<!-- Interactive navigation indicator -->
{#if nextPagePath}
	<ScrollToNextIndicator nextPageName={nextPageName()} />
{/if}
```

**Key Features**:

- **Bidirectional navigation**: Scroll down at bottom → next page, scroll up at top → previous page
- **Dual interaction modes**: Continue scrolling OR click indicator for instant navigation
- **Visual progress feedback**: Circular progress indicator with accumulation display
- **Full accessibility**: Keyboard support (Enter/Space), ARIA roles, focus management
- **Smart boundary detection**: Uses wheel events when actual scrolling is impossible
- **Smooth page transitions**: Custom opacity animations with SvelteKit navigation

**Critical Implementation Notes**:

- **Wheel vs Scroll Events**: At page boundaries, browsers prevent scroll movement, so wheel events detect continued scroll intention
- **Document Height Calculation**: Accurate boundary detection using `(scrollTop + windowHeight) >= (documentHeight - 10)`
- **State Management**: Proper cleanup and reset when transitioning between boundaries
- **Performance Optimization**: Debounced events, passive listeners, efficient state updates

### ✅ Enhanced TypewriterText.svelte - Session-Aware Animation

**Purpose**: Smart typewriter animation that shows on new browser sessions but skips on same-session revisits

**Session Storage Pattern**:

```svelte
<script>
	let startTypewriter = $state(false);
	let typewriterCompleted = $state(false);

	onMount(() => {
		// Check for session-based completion
		const typewriterShown = browser && sessionStorage.getItem('typewriter-completed');

		if (typewriterShown) {
			// Already shown this session - instant display
			typewriterCompleted = true;
			startTypewriter = false;
		} else {
			// New session - trigger animation
			setTimeout(() => {
				startTypewriter = true;
			}, 500);
		}
	});

	function handleTypewriterComplete() {
		typewriterCompleted = true;
		if (browser) {
			sessionStorage.setItem('typewriter-completed', 'true');
		}
	}
</script>

<!-- Smart state-based rendering -->
<div class="text-[24px] leading-relaxed text-black">
	{#if startTypewriter}
		<TypewriterText text={aboutText} onComplete={handleTypewriterComplete} />
	{:else if typewriterCompleted}
		<p>{aboutText}</p>
	{:else}
		<p class="opacity-0">{aboutText}</p>
	{/if}
</div>
```

**Storage Strategy Comparison**:

- **sessionStorage**: Clears on browser close → animation triggers each new visit
- **localStorage**: Persists indefinitely → animation shows only once ever
- **User Experience**: sessionStorage balances engagement with performance

**Interaction Features**:

- **Click-to-complete**: Users can click text to instantly finish animation
- **Session memory**: Skips animation when navigating within same session
- **Accessibility**: Full keyboard support and proper focus management
- **State transitions**: Handles all rendering states smoothly

**Data Patterns:**

- Timeline: `{company, position, startDate, endDate, description, skills, achievements, projects}`
- Skills: `{name, level, category, years}` with levels: expert/advanced/intermediate/beginner
- Navigation: `{name, path}` with ordered array for bidirectional scroll navigation

This documentation is current as of August 2025 and reflects all debugging lessons learned.

## Advanced Features Implemented (Latest Updates)

### Scroll-Based Page Navigation System

**Core Innovation**: Implemented bidirectional scroll navigation using wheel events at page boundaries where traditional scroll detection fails.

**Technical Achievement**:

- Solved the fundamental problem of detecting "scroll intention" when already at scroll limits
- Created smooth page transitions that feel native and intuitive
- Balanced sensitivity (150px + 500ms) for responsive but not accidental triggers

**User Experience Enhancement**:

- Natural navigation flow: scroll down → next page, scroll up → previous page
- Visual feedback with progress indicators and next page previews
- Dual interaction: continue scrolling OR click for instant navigation
- Accessible with keyboard support and proper ARIA implementation

### Session-Aware Typewriter Animation

**Smart Behavior**: Animation triggers on new browser sessions but skips on same-session revisits, providing optimal balance between engagement and performance.

**Implementation Highlight**: Using `sessionStorage` instead of `localStorage` ensures the typewriter effect remains engaging for returning visitors while avoiding repetition within the same browsing session.

### Event Handling Evolution

**Key Learning**: At page boundaries (top/bottom), scroll events stop firing but wheel events continue, making wheel event detection essential for boundary-based interactions.

**Pattern Established**: Always implement both scroll and wheel listeners for comprehensive scroll-based functionality:

- `scroll` events for position tracking and boundary detection
- `wheel` events for continued interaction at scroll limits

This represents significant advancement in modern web navigation patterns and demonstrates sophisticated understanding of browser scroll behavior.
