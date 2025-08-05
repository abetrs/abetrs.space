# Instructions for GitHub Copilot: Building Abhayprad Jha's Personal Portfolio Website

This file provides detailed guidance for generating code in this SvelteKit project. Use it to prompt Copilot for components, pages, layouts, and styles. The goal is to build a minimalist, responsive single-page portfolio website showcasing my background as a Computer Science student at William & Mary, internships, projects, and hobbies. The design is based on a specific Figma mockup featuring a clean layout with left sidebar navigation, centered content area with circular profile image, and right sidebar with social links.

## Project Overview

- **Site Type**: Single-page application (SPA) with smooth scrolling between sections. Uses SvelteKit routing with a main layout and single page structure.
- **Theme**: Ultra-minimalist black and white design with clean typography. Black text (#000000) on white background (#ffffff), with subtle hover states and transitions.
- **Design System**: Based on Figma design showing specific layout with:
  - Left sidebar: Navigation menu (Bio, Internships, Projects, College, Hobbies, Blog) with arrow indicators
  - Center content: Large circular profile photo with "About Me" section below
  - Right sidebar: Social links (Blog/Substack, LinkedIn, GitHub, Resume) with icons
  - Top header: Name in italic narrow font with barcode-style element
- **Responsiveness**: Mobile-first design using Tailwind's responsive utilities
- **Accessibility**: Include ARIA labels, alt text for images, keyboard navigation, and semantic HTML
- **SEO**: Add meta tags, titles, and descriptions in the layout
- **Interactivity**: Svelte for animations/transitions, smooth scrolling navigation
- **Hosting**: GitHub Pages deployment (abetrs.github.io)

## Tech Stack

- **Framework**: SvelteKit 5.0 with adapter-auto for GitHub Pages deployment
- **Styling**: Tailwind CSS 4.0 with plugins:
  - `@tailwindcss/typography` for prose styling (blog previews, descriptions)
  - `@tailwindcss/forms` for contact form inputs
- **Current Dependencies**:
  - SvelteKit 2.22.0 with Svelte 5.0 (latest)
  - Tailwind CSS 4.0 with Vite integration
  - ESLint + Prettier for code formatting
  - Vite 7.0.4 as build tool
- **State Management**: Svelte 5 runes and stores for reactive state
- **Icons**: Use heroicons or simple SVG icons (avoid heavy icon libraries)
- **Animations**: Svelte's built-in transitions and GSAP for complex animations if needed

## Current Project Structure

The project is set up as a standard SvelteKit application:

- `src/routes/+layout.svelte`: Currently minimal layout importing app.css and favicon
- `src/routes/+page.svelte`: Basic welcome page (needs to be replaced with portfolio content)
- `src/app.css`: Tailwind imports with forms and typography plugins
- `src/lib/`: Component library directory (currently has favicon.svg)
- `static/`: Static assets directory
- Modern tooling: ESLint, Prettier, Vite, SvelteKit sync

## Design Guidelines

- **Colors**: Strict black (#000000) and white (#ffffff) only, as shown in Figma design
- **Typography**:
  - Headers: Arial Narrow (italic for name, regular for navigation)
  - Body text: Arial or system fonts
  - Specific font styling from Figma: Name in italic narrow style, navigation in medium weight
- **Layout Structure** (from Figma design):
  - Fixed top header: Name (left) + barcode element (right)
  - Left sidebar: Vertical navigation menu with arrows (Bio, Internships, Projects, College, Hobbies, Blog)
  - Center content area: Large circular profile image + about text below
  - Right sidebar: Social links with icons (Blog, LinkedIn, GitHub, Resume)
  - Full-width layout on desktop, stack vertically on mobile
- **Interactive Elements**:
  - Navigation arrows in left sidebar
  - Hover states for clickable elements
  - Smooth scrolling between sections
  - Social link buttons with icons

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
