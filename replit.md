# Visa Service Platform

## Overview

This is a full-stack web application for visa requirement checking and consultation services. It provides users with comprehensive visa information, requirements checking, and consultation booking functionality. The application uses a modern tech stack with React frontend, Express backend, and PostgreSQL database.

## System Architecture

### Full-Stack Architecture
- **Frontend**: React 18 with TypeScript, built with Vite
- **Backend**: Express.js with TypeScript running on Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing

### Development Environment
- **Runtime**: Node.js 20
- **Build Tool**: Vite for frontend, esbuild for backend
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Development Server**: Runs on port 5000
- **Deployment**: Replit autoscale deployment

## Key Components

### Database Schema
The application uses Drizzle ORM with the following main tables:
- **users**: User authentication and management
- **countries**: Country information with visa details
- **visa_requirements**: Specific visa requirements between countries
- **services**: Available visa services
- **consultations**: User consultation requests

### API Endpoints
- `GET /api/countries` - Retrieve all countries
- `GET /api/countries/:id` - Get country by ID
- `GET /api/countries/code/:code` - Get country by code
- `POST /api/consultations` - Create consultation request
- `GET /api/services` - Get available services

### Frontend Pages
- **Home**: Landing page with country cards, services, and consultation form
- **Country**: Detailed country information and visa requirements
- **Visa Checker**: Interactive visa requirement checking tool
- **404**: Not found page for invalid routes

### UI Components
- Comprehensive shadcn/ui component library
- Custom components for country cards, service cards, and visa checker
- Responsive design with mobile-first approach
- Form handling with React Hook Form and Zod validation

## Data Flow

### Client-Server Communication
1. Frontend makes API requests using TanStack Query
2. Express server handles requests and interacts with PostgreSQL
3. Drizzle ORM manages database operations
4. Responses are cached and managed by React Query

### State Management
- Server state managed by TanStack Query with caching
- Form state handled by React Hook Form
- UI state managed by React component state
- Toast notifications for user feedback

## External Dependencies

### Core Dependencies
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Database ORM
- **@neondatabase/serverless**: PostgreSQL database driver
- **wouter**: Lightweight routing
- **@hookform/resolvers**: Form validation
- **zod**: Schema validation

### UI Dependencies
- **@radix-ui**: Headless UI components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: CSS variant management
- **lucide-react**: Icon library

## Deployment Strategy

### Build Process
1. Frontend built with Vite to `dist/public`
2. Backend bundled with esbuild to `dist/index.js`
3. Static assets served from built frontend

### Production Configuration
- Environment variables for database connection
- Drizzle migrations in `./migrations` directory
- Build command: `npm run build`
- Start command: `npm run start`
- Development: `npm run dev`

### Database Management
- Drizzle Kit for schema management
- Push schema changes with `npm run db:push`
- Database URL required in environment variables

## Changelog

Changelog:
- June 17, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.