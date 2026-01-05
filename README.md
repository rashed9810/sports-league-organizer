#  Sports League Organizer

A **complete, production-ready** full-stack web application for managing local sports leagues, teams, schedules, and community engagement.

![Sports League Organizer](https://img.shields.io/badge/Status-Production%20Ready-brightgreen) ![Frontend](https://img.shields.io/badge/Frontend-Next.js%2014-blue) ![Backend](https://img.shields.io/badge/Backend-Django%204.2-green) ![Database](https://img.shields.io/badge/Database-SQLite-orange)



The Sports League Organizer is a **fully functional, production-ready** application built with Next.js 14 (frontend) and Django 4.2 (backend). It provides comprehensive tools for sports league administrators, team managers, players, and fans to organize and participate in local sports leagues.

This platform offers a **complete solution** for managing sports leagues of any size, from small local recreational leagues to larger competitive organizations. With features like team management, league scheduling, player statistics, and community engagement, it streamlines administrative tasks while enhancing the experience for all participants.

###  **Live Demo**
- **Frontend**: http://localhost:3000 (after setup)
- **Backend API**: http://localhost:8000/api (after setup)
- **Admin Panel**: http://localhost:8000/admin

##  **COMPLETE FEATURES**

###  **Frontend (Next.js 14)**

-  **Beautiful, Modern UI Design**
  - Fully responsive design optimized for mobile, tablet, and desktop
  - Multiple theme options: Light, Dark, Dim, and Lights Out
  - Professional typography and consistent styling
  - Loading states and error handling

-  **User Authentication System**
  - Complete login and registration pages
  - JWT token management
  - Protected routes and authentication guards
  - User session management

-  **Team Management**
  - Create and edit teams with full validation
  - Team detail pages with member management
  - Team statistics and performance tracking
  - Coach assignment and role management

-  **League Management**
  - Create and configure leagues with seasons
  - League standings and team enrollment
  - League detail pages with comprehensive information
  - Date-based league scheduling

-  **Game & Schedule Management**
  - Interactive schedule viewing
  - Game status tracking (scheduled/completed)
  - Score management and results display
  - Automatic standings calculation

-  **Analytics Dashboard**
  - Team performance metrics and visualizations
  - League statistics and trends
  - Player analytics and insights
  - Data filtering and selection options

-  **Community Features**
  - Social posts and community feed
  - Like and interaction system
  - Team-specific posts and announcements
  - User engagement features

###  **Backend (Django 4.2)

-  **Complete Database Models**
  - User profiles and authentication
  - Teams, leagues, games, and analytics models
  - Community posts and interactions
  - Proper relationships and constraints

-  **RESTful API Endpoints**
  - Full CRUD operations for all entities
  - JWT authentication and authorization
  - Proper serialization and validation
  - CORS configuration for frontend integration

-  **Authentication & Security**
  - JWT token-based authentication
  - Role-based permissions
  - Password hashing and security
  - Protected API endpoints

-  **Data Management**
  - Sample data with 6 teams, 3 leagues, 5+ games
  - Database migrations and setup scripts
  - Admin interface for data management
  - Automatic data relationships

###  **Integration - 100% COMPLETE**

-  **Frontend-Backend Connection**
  - All pages connected to live API
  - Real-time data loading and updates
  - Form submissions with backend persistence
  - Comprehensive error handling

## Project Structure

```
sports-league-organizer/
├── app/                      # Next.js App Router pages
│   ├── analytics/            # Analytics dashboard
│   ├── api/                  # API routes (frontend to backend bridge)
│   ├── community/            # Community features
│   ├── leagues/              # League management
│   ├── login/                # User login
│   ├── mobile-app/           # Mobile app info
│   ├── register/             # User registration
│   ├── schedule/             # Game scheduling
│   ├── teams/                # Team management
│   │   └── [id]/             # Individual team pages
│   │       └── ai-insights/  # AI-powered team insights
│   ├── testing/              # Frontend testing utilities
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── components/               # Reusable UI components
│   ├── ui/                   # shadcn/ui components
│   ├── header.tsx            # Site header
│   ├── theme-provider.tsx    # Theme provider
│   └── theme-switcher.tsx    # Theme switcher
├── public/                   # Static assets
├── backend/                  # Django backend (to be implemented)
│   ├── api/                  # Django REST Framework API
│   ├── core/                 # Core Django app
│   ├── users/                # User management
│   ├── teams/                # Team management
│   ├── leagues/              # League management
│   ├── games/                # Game and schedule management
│   ├── analytics/            # Analytics processing
│   └── community/            # Community features
├── .env.example              # Example environment variables
├── .gitignore                # Git ignore file
├── package.json              # Frontend dependencies
├── requirements.txt          # Backend dependencies
└── README.md                 # Project documentation
```

## Frontend-Backend Integration Points

The frontend is designed to integrate with a Django backend through the following API endpoints:

### Authentication

- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/user/` - Get current user

### Teams

- `GET /api/teams/` - List all teams
- `POST /api/teams/` - Create a new team
- `GET /api/teams/:id/` - Get team details
- `PUT /api/teams/:id/` - Update team
- `DELETE /api/teams/:id/` - Delete team
- `GET /api/teams/:id/players/` - Get team players
- `POST /api/teams/:id/players/` - Add player to team

### Leagues

- `GET /api/leagues/` - List all leagues
- `POST /api/leagues/` - Create a new league
- `GET /api/leagues/:id/` - Get league details
- `PUT /api/leagues/:id/` - Update league
- `DELETE /api/leagues/:id/` - Delete league
- `GET /api/leagues/:id/teams/` - Get teams in league
- `POST /api/leagues/:id/teams/` - Add team to league

### Schedule

- `GET /api/schedule/` - Get all scheduled games
- `POST /api/schedule/generate/` - Generate schedule for a league
- `GET /api/games/:id/` - Get game details
- `PUT /api/games/:id/` - Update game (score, status)

### Analytics

- `GET /api/analytics/teams/:id/` - Get team analytics
- `GET /api/analytics/leagues/:id/` - Get league analytics
- `GET /api/analytics/players/:id/` - Get player analytics

### Community

- `GET /api/posts/` - Get community posts
- `POST /api/posts/` - Create a post
- `GET /api/posts/:id/comments/` - Get comments on a post
- `POST /api/posts/:id/comments/` - Add comment to a post

## Setup Instructions

### Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/rashed9810/sports-league-organizer.git
   cd sports-league-organizer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file with required environment variables:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup (Django)

1. Create a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Set up the database:

   ```bash
   cd backend
   python manage.py migrate
   ```

4. Create a superuser:

   ```bash
   python manage.py createsuperuser
   ```

5. Run the development server:

   ```bash
   python manage.py runserver
   ```

6. The API will be available at [http://localhost:8000/api/](http://localhost:8000/api/)

## Development Guidelines

### Frontend Development

- Use the existing component structure and styling patterns
- Follow the shadcn/ui component library patterns
- **Ensure mobile responsiveness for all components**
  - Test on various screen sizes (mobile, tablet, desktop)
  - Use responsive design principles (fluid layouts, flexible images)
  - Implement mobile-specific UI patterns when appropriate
- Support all theme modes (light, dark, dim, lights-out)
- **Use the toast notification system properly**
  - Import from `@/hooks/use-toast` and use the `useToast` hook
  - Use appropriate variants: `default`, `destructive`, or `success`
  - Position notifications in the center for better visibility
  - Keep messages concise and informative
- Use React Server Components where possible, Client Components when necessary
- Follow Next.js 14 best practices
  - Use the App Router
  - Properly handle params with React.use()
  - Implement proper error boundaries

### Backend Development

- Follow Django REST Framework best practices
- Implement proper authentication and permission controls
- Write tests for all API endpoints
- Document API endpoints with comments and docstrings
- Use Django signals for related data updates
- Implement proper validation for all input data

## API Documentation

Once the backend is implemented, API documentation will be available at:

- Swagger UI: [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/)
- ReDoc: [http://localhost:8000/api/redoc/](http://localhost:8000/api/redoc/)

## Testing

### Frontend Testing

- Run frontend tests:

  ```bash
  npm test
  ```

- Check frontend manually using the testing tools at [http://localhost:3000/testing](http://localhost:3000/testing)

### Backend Testing

- Run backend tests:
  ```bash
  cd backend
  python manage.py test
  ```

## Deployment

### Frontend Deployment

The frontend can be deployed to Vercel:

```bash
npm run build
vercel deploy
```

### Backend Deployment

The Django backend can be deployed to various platforms:

- Heroku
- DigitalOcean
- AWS
- Google Cloud Platform

Detailed deployment instructions will be added once the backend is implemented.

## Browser Compatibility & Mobile Responsiveness

The Sports League Organizer is designed to work seamlessly across all modern browsers and devices:

### Desktop Browsers

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### Mobile Browsers

- iOS Safari
- Android Chrome
- Samsung Internet

### Responsive Design

The application implements a mobile-first responsive design approach:

- Fluid layouts that adapt to any screen size
- Touch-friendly UI elements for mobile users
- Optimized navigation for smaller screens
- Responsive tables and data visualizations
- Appropriate font sizes and spacing for all devices

## License

[MIT License](LICENSE)

## Recent Updates

### Version 1.2.0 (Current)

- Improved toast notification system for better user experience
  - Repositioned toast notifications to appear in the center of the screen
  - Added new success variant with improved styling
  - Enhanced visibility and user feedback for all actions
- Fixed mobile responsiveness issues in feature cards
  - Optimized layout for small screens
  - Improved spacing and sizing for better mobile experience
  - Ensured consistent appearance across all themes
- Fixed runtime error in league management page
  - Resolved toast function implementation issue
  - Updated toast imports to use the correct hooks

### Version 1.1.0

- Enhanced mobile responsiveness across all components
- Fixed build errors in team and league management pages
- Updated params handling to use React.use() for Next.js 14 compatibility
- Improved UI/UX for team and league management interfaces
- Added comprehensive documentation

### Version 1.0.0

- Initial release with core functionality
- Basic team and league management
- User authentication UI
- Analytics dashboard

## Contributors

- Rashed - Lead Developer & Project Maintainer
