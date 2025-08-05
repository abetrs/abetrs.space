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

## Implementation Priority

1. **Phase 1**: Implement basic layout structure matching Figma design
2. **Phase 2**: Add Bio section with profile image and about text
3. **Phase 3**: Build navigation functionality and smooth scrolling
4. **Phase 4**: Add remaining content sections
5. **Phase 5**: Enhance with animations and responsive design

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
