# Finni Dashboard

A modern, AI-powered healthcare patient management dashboard built with Next.js 15, TypeScript, and cutting-edge technologies.

![Finni Dashboard](https://img.shields.io/badge/Next.js-15.4.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.44.3-orange?style=for-the-badge)

## ✨ Features

### 🏥 **Patient Management**
- **Comprehensive Patient Profiles**: Complete patient information including demographics, medical history, and emergency contacts
- **Advanced Filtering & Search**: Filter patients by age, location, medical conditions, allergies, and status
- **Patient Status Tracking**: Monitor patients through their journey (Inquiry → Onboarding → Active → Churned)
- **Medical Records**: Track medical conditions, allergies, and recent activity
- **Emergency Contact Management**: Store and manage emergency contact information

### 🤖 **AI-Powered Assistant**
- **Natural Language Queries**: Ask questions about patients in plain English
- **Intelligent Search**: Find patients based on complex criteria using AI
- **Smart Recommendations**: Get insights and suggestions for patient care
- **Context-Aware Responses**: AI understands medical terminology and patient data

### 📊 **Analytics & Insights**
- **Interactive Dashboard**: Real-time metrics and patient statistics
- **Geographic Visualization**: Global patient distribution with interactive globe
- **Activity Tracking**: Monitor recent patient activities and procedures
- **Performance Metrics**: Track key healthcare KPIs

### 🎨 **Modern UI/UX**
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Accessible Interface**: WCAG compliant design with keyboard navigation
- **Smooth Animations**: Polished micro-interactions and transitions

### 🔧 **Developer Experience**
- **TypeScript**: Full type safety across the application
- **Modern Stack**: Built with Next.js 15, React 19, and latest technologies
- **Database Integration**: PostgreSQL with Drizzle ORM for type-safe queries
- **Code Quality**: ESLint, Biome, and comprehensive linting rules

## 🚀 Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### **Backend & Database**
- **Drizzle ORM** - Type-safe database queries
- **PostgreSQL** - Robust relational database
- **Neon Database** - Serverless PostgreSQL hosting

### **AI & Analytics**
- **Vercel AI SDK** - AI integration framework
- **OpenAI** - Advanced language model integration
- **Recharts** - Data visualization library
- **D3.js** - Custom data visualizations

### **Development Tools**
- **Biome** - Fast code formatting and linting
- **ESLint** - Code quality and consistency
- **SWR** - Data fetching and caching
- **React Hook Form** - Form state management
- **Zod** - Schema validation

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- PostgreSQL database (or Neon account)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/finni-dashboard.git
   cd finni-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your `.env.local`:
   ```env
   DATABASE_URL="your-postgresql-connection-string"
   OPENAI_API_KEY="your-openai-api-key"
   ```

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The application uses a PostgreSQL database with the following main tables:

### Patients Table
```sql
CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  middleName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  dateOfBirth DATE NOT NULL,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  zip VARCHAR(20) NOT NULL,
  status patient_status,
  conditions TEXT[],
  allergies TEXT[],
  emergencyContact JSONB NOT NULL,
  recentActivity JSONB NOT NULL DEFAULT '[]',
  createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);
```

## 🎯 Usage

### Patient Management
1. **View Patients**: Navigate to the Patients page to see all patients
2. **Add Patient**: Use the "Add Patient" button to create new patient records
3. **Filter & Search**: Use advanced filters to find specific patients
4. **View Details**: Click on any patient to see their complete profile

### AI Assistant
1. **Ask Questions**: Use natural language to query patient data
   - "Show me all diabetic patients in New York"
   - "Who are my patients under 45 years old?"
   - "What are John Smith's allergies?"

2. **Get Insights**: The AI provides intelligent responses and recommendations

### Dashboard Analytics
- **Overview**: View key metrics and patient statistics
- **Geographic Data**: Explore patient distribution globally
- **Recent Activity**: Monitor latest patient interactions

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── ai/                # AI chat interface
│   ├── patients/          # Patient management pages
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── dashboard/        # Dashboard-specific components
├── db/                   # Database configuration
│   └── schema.ts         # Drizzle schema definitions
├── lib/                  # Utility functions
├── types.ts              # TypeScript type definitions
└── utils/                # Helper utilities
```

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Biome
npm run db:generate  # Generate database migrations
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
```

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency rules
- **Biome**: Fast formatting and linting
- **Prettier**: Code formatting (via Biome)

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch
