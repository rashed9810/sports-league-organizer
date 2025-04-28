# Sports League Organizer Backend

This directory contains the Django backend for the Sports League Organizer application.

## Structure

The backend is organized into several Django apps:

- `api`: Core API configuration and routing
- `users`: User authentication and management
- `teams`: Team management
- `leagues`: League management
- `games`: Game and schedule management
- `analytics`: Data processing for analytics
- `community`: Social features like posts and comments

## Setup

1. Create a virtual environment:
   \`\`\`bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

3. Set up environment variables:
   Create a `.env` file with:
   \`\`\`
   DEBUG=True
   SECRET_KEY=your-secret-key
   DATABASE_URL=postgres://user:password@localhost:5432/sports_league
   ALLOWED_HOSTS=localhost,127.0.0.1
   CORS_ALLOWED_ORIGINS=http://localhost:3000
   \`\`\`

4. Run migrations:
   \`\`\`bash
   python manage.py migrate
   \`\`\`

5. Create a superuser:
   \`\`\`bash
   python manage.py createsuperuser
   \`\`\`

6. Run the development server:
   \`\`\`bash
   python manage.py runserver
   \`\`\`

## API Documentation

API documentation is available at:
- Swagger UI: [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/)
- ReDoc: [http://localhost:8000/api/redoc/](http://localhost:8000/api/redoc/)

## Testing

Run tests with:
\`\`\`bash
python manage.py test
\`\`\`

## Database Schema

The database schema includes the following main models:

- User
- Team
- Player
- League
- Season
- Game
- Venue
- Statistic
- Post
- Comment

Detailed schema documentation will be added as the backend is developed.
