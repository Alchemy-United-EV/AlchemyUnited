# Overview

This is a full-stack web application for Alchemy United, a premium EV charging solutions company. The project is built with React and Express.js, featuring a luxury one-page website with sophisticated typography, premium layout, and smooth scrolling navigation. The application is designed to showcase high-end EV charging technology with a focus on luxury automotive brand positioning and premium user experience.

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
- **Storage**: In-memory storage implementation with interface for easy database migration
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

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production database
- **Drizzle ORM**: Type-safe database access layer with automatic type generation

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