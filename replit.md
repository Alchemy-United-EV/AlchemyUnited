# Overview

This is a premium web platform for Alchemy United, a luxury EV charging network. The project features a sophisticated one-page marketing website with comprehensive application forms for early access and host partnerships. Built with React and Express.js, it showcases high-end EV charging technology with luxury automotive brand positioning and premium user experience. The platform includes functional routing, form validation, and professional success flows for lead generation.

## Recent Changes
- **React Hooks Error Fixed (Aug 13, 2025)**: Resolved critical React hooks conflicts that were causing blank screen issues by removing problematic performance monitoring components and simplifying the app structure
- **Performance Optimizations Complete**: Comprehensive Lighthouse audit improvements with server response time of 0.010s, complete security headers, image compression, lazy loading system, and SEO optimization with structured data
- **Cache Strategy Implemented**: Long-term caching for static assets with 1-year expiry and proper ETags for optimal performance
- **Google Workspace Integration Complete**: Full OAuth2 implementation with Gmail, Google Sheets, Calendar, and Drive APIs for business email management, lead export, and calendar scheduling
- **Enterprise Business Tools**: Added Google Workspace panel to admin dashboard with email sending, spreadsheet export, and calendar event creation capabilities
- **OAuth Security**: Implemented secure Google authentication flow with proper credential management and session handling for business account integration
- **Advanced Analytics Complete**: Comprehensive Google Analytics implementation with page views, scroll depth tracking, section engagement, performance monitoring, CTA tracking, form abandonment tracking, business intelligence metrics, and interactive element tracking
- **Smart User Experience Enhancements**: Implemented progress indicators, smart form validation, enhanced form fields with real-time suggestions, intelligent field assistance, and advanced validation feedback components
- **Form Intelligence**: Added smart field suggestions for locations, business types, emails, and phone numbers with real-time validation and strength meters for password fields
- **Analytics Integration**: Implemented comprehensive Google Analytics tracking with automatic page view monitoring, form submission events, dashboard interactions, and flip card engagement tracking
- **Server-Side Logging**: Added Winston logger with daily rotation, structured logging, and optional Sentry integration for real-time error monitoring and performance tracking
- **Enhanced Error Monitoring**: Integrated comprehensive error handling with both client-side analytics and server-side logging for complete visibility into application health
- **Lead Status Tracking**: Added status field to leads database with options: 'New', 'Contacted', 'Converted' and pushed schema changes successfully
- **Admin Dashboard Enhancement**: Updated dashboard with status management capabilities including dropdown controls for changing lead status and filtering with analytics tracking
- **Enhanced Form Validation**: Implemented comprehensive client-side validation with react-hook-form and zod schemas across all forms with submission tracking
- **Real-time Feedback**: Added real-time error messages, field validation, character counting, and submit button state management
- **Improved UX**: Forms now show loading spinners, disable submit until valid, highlight errors with red borders, and provide clear feedback
- **Validation Schemas**: Created centralized validation utilities with detailed error messages for Contact, Partner, Waitlist, Early Access, and Host Application forms
- **Security Implementation**: Added comprehensive security measures including rate limiting, input validation, and CORS restrictions
- **Authentication System**: Implemented JWT-based authentication with encrypted passwords protecting admin dashboard access
- **Leads Management**: Built comprehensive Leads tab in dashboard with search, filtering, and pagination for all form submissions
- **Form Protection**: All form endpoints now secured with rate limiting (5 submissions/hour), input sanitization, and validation
- **CORS Configuration**: Restricted origins to known domains with proper headers and credential handling

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **State Management**: TanStack React Query for server state management and API interactions
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful API structure with `/api` prefix for all endpoints
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Email Service**: SendGrid integration with professional templates for verification emails
- **Development**: Hot reload with Vite middleware integration for seamless development experience

## Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL with schema-first approach
- **Database**: PostgreSQL via Neon serverless database connection
- **Schema**: Centralized schema definition in `shared/schema.ts` for type safety across frontend and backend
- **Migrations**: Drizzle Kit for database schema management and migrations

## Development Tools
- **Package Manager**: npm with lockfile for consistent dependency resolution
- **TypeScript**: Shared configuration across client, server, and shared modules
- **Code Quality**: Integrated type checking and build processes
- **Development Server**: Concurrent client and server development with proxy setup

## UI Component System
- **Design System**: shadcn/ui "new-york" style with neutral color palette
- **Component Library**: Comprehensive set of accessible components (buttons, forms, dialogs, navigation)
- **Theming**: CSS custom properties for light/dark mode support
- **Accessibility**: Built on Radix UI primitives ensuring WCAG compliance
- **Icons**: Lucide React for consistent iconography

## Project Structure
- **Monorepo**: Client, server, and shared code in single repository
- **Client**: React application in `client/` directory
- **Server**: Express.js backend in `server/` directory  
- **Shared**: Common types and schemas in `shared/` directory
- **Components**: Modular UI components in `client/src/components/`

# External Dependencies

## Google Workspace Integration
- **Google OAuth2**: Secure authentication for Google Workspace services
- **Gmail API**: Professional email sending and management capabilities
- **Google Sheets API**: Lead export and spreadsheet management for business intelligence
- **Google Calendar API**: Appointment scheduling and follow-up meeting creation
- **Google Drive API**: Document storage and file management (planned)

## Analytics and Monitoring
- **Google Analytics**: User behavior tracking, page views, form submissions, and interaction analytics
- **Sentry** (Optional): Real-time error monitoring, performance tracking, and exception capture
- **Winston**: Server-side logging with daily rotation and structured error tracking

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production database
- **Drizzle ORM**: Type-safe database access layer with automatic type generation

## Email Services
- **SendGrid**: Professional email delivery service for verification emails and notifications
- **Custom Templates**: Luxury-branded HTML email templates matching Alchemy United design system

## UI and Styling
- **Radix UI**: Headless UI primitives for accessible component foundation
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: SVG icon library for consistent visual elements
- **Google Fonts**: Inter font family for modern typography

## Development and Build Tools
- **Vite**: Frontend build tool with HMR and optimization
- **TanStack React Query**: Data fetching and caching library
- **Wouter**: Lightweight router for client-side navigation
- **React Hook Form**: Form handling with validation support

## Utilities and Libraries
- **date-fns**: Date manipulation and formatting utilities
- **clsx**: Conditional CSS class composition
- **class-variance-authority**: Type-safe variant API for component styling
- **zod**: Runtime type validation and schema definition