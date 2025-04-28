# Local Sports League Organizer

A comprehensive web application for managing local sports leagues, teams, schedules, and more.

![Sports League Organizer](https://placeholder.svg?height=300&width=600)

## Project Overview

The Local Sports League Organizer is a full-stack application built with Next.js (frontend) and Django/PostgreSQL (backend). It provides tools for sports league administrators, team managers, players, and fans to organize and participate in local sports leagues.

## Features

### Implemented Frontend Features

- ✅ Responsive design with mobile, tablet, and desktop layouts
- ✅ Light, Dark, Dim, and Lights Out theme options
- ✅ User authentication UI (login/registration)
- ✅ Team management interface
- ✅ League management interface
- ✅ Schedule viewing and management
- ✅ Analytics dashboard with visualizations
- ✅ AI-powered team insights
- ✅ Community and social features
- ✅ Mobile app integration page

### Backend Requirements (To Be Implemented)

- 🔲 User authentication and authorization
- 🔲 Team CRUD operations
- 🔲 League CRUD operations
- 🔲 Schedule generation and management
- 🔲 Player statistics tracking
- 🔲 Game results and scoring
- 🔲 Analytics data processing
- 🔲 Community features (posts, comments)
- 🔲 API endpoints for mobile app

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
- Maintain responsive design for all new components
- Support all theme modes (light, dark, dim, lights-out)
- Use Server Components where possible, Client Components when necessary

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

## License

[MIT License](LICENSE)

## Contributors

- Rashed - Software Engineer
- (Rashed) - Backend Developer
