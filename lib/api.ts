const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Types
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile?: {
    avatar?: string;
    bio?: string;
    phone?: string;
    address?: string;
    date_of_birth?: string;
    roles: string[];
  };
}

export interface Team {
  id: number;
  name: string;
  sport: string;
  logo?: string;
  created_at: string;
  updated_at: string;
  members_count: number;
  coach?: User;
  members?: TeamMember[];
}

export interface TeamMember {
  id: number;
  user: User;
  role: string;
  jersey_number?: number;
  position?: string;
  joined_date: string;
}

export interface League {
  id: number;
  name: string;
  sport: string;
  season: string;
  start_date: string;
  end_date: string;
  status: string;
  teams_count: number;
  games_count: number;
  completed_games_count: number;
  organizer: User;
  teams?: Team[];
  standings?: Standing[];
}

export interface Standing {
  team_id: number;
  team_name: string;
  wins: number;
  losses: number;
  draws: number;
  points_for: number;
  points_against: number;
  games_played: number;
  points: number;
  point_differential: number;
}

export interface Game {
  id: number;
  league: League;
  home_team: Team;
  away_team: Team;
  venue?: Venue;
  date: string;
  time: string;
  status: string;
  home_score?: number;
  away_score?: number;
  created_at: string;
  updated_at: string;
}

export interface Venue {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  capacity?: number;
}

export interface Post {
  id: number;
  author: User;
  content: string;
  team?: Team;
  created_at: string;
  updated_at: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
}

export interface Comment {
  id: number;
  author: User;
  content: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  parent?: number;
}

// API Client class
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    // Get token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('access_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired, clear it
        this.clearToken();
        throw new Error('Authentication required');
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Authentication
  async login(email: string, password: string): Promise<{ access: string; refresh: string; user: User }> {
    const response = await this.request<{ access: string; refresh: string }>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    this.setToken(response.access);
    if (typeof window !== 'undefined') {
      localStorage.setItem('refresh_token', response.refresh);
    }
    
    const user = await this.getCurrentUser();
    return { ...response, user };
  }

  async register(userData: {
    username: string;
    email: string;
    password: string;
    password2: string;
    first_name?: string;
    last_name?: string;
  }): Promise<User> {
    return this.request<User>('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/auth/user/');
  }

  // Teams
  async getTeams(): Promise<Team[]> {
    return this.request<Team[]>('/teams/');
  }

  async getTeam(id: number): Promise<Team> {
    return this.request<Team>(`/teams/${id}/`);
  }

  async createTeam(teamData: { name: string; sport: string }): Promise<Team> {
    return this.request<Team>('/teams/', {
      method: 'POST',
      body: JSON.stringify(teamData),
    });
  }

  async updateTeam(id: number, teamData: Partial<Team>): Promise<Team> {
    return this.request<Team>(`/teams/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(teamData),
    });
  }

  async deleteTeam(id: number): Promise<void> {
    await this.request(`/teams/${id}/`, { method: 'DELETE' });
  }

  // Leagues
  async getLeagues(): Promise<League[]> {
    return this.request<League[]>('/leagues/');
  }

  async getLeague(id: number): Promise<League> {
    return this.request<League>(`/leagues/${id}/`);
  }

  async createLeague(leagueData: {
    name: string;
    sport: string;
    season: string;
    start_date: string;
    end_date: string;
  }): Promise<League> {
    return this.request<League>('/leagues/', {
      method: 'POST',
      body: JSON.stringify(leagueData),
    });
  }

  async updateLeague(id: number, leagueData: Partial<League>): Promise<League> {
    return this.request<League>(`/leagues/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(leagueData),
    });
  }

  async deleteLeague(id: number): Promise<void> {
    await this.request(`/leagues/${id}/`, { method: 'DELETE' });
  }

  async getLeagueStandings(id: number): Promise<Standing[]> {
    return this.request<Standing[]>(`/leagues/${id}/standings/`);
  }

  // Games
  async getGames(): Promise<Game[]> {
    return this.request<Game[]>('/games/');
  }

  async getGame(id: number): Promise<Game> {
    return this.request<Game>(`/games/${id}/`);
  }

  async updateGameScore(id: number, homeScore: number, awayScore: number): Promise<Game> {
    return this.request<Game>(`/games/${id}/update_score/`, {
      method: 'POST',
      body: JSON.stringify({ home_score: homeScore, away_score: awayScore }),
    });
  }

  // Community
  async getPosts(): Promise<Post[]> {
    return this.request<Post[]>('/community/posts/');
  }

  async createPost(content: string, teamId?: number): Promise<Post> {
    return this.request<Post>('/community/posts/', {
      method: 'POST',
      body: JSON.stringify({ content, team_id: teamId }),
    });
  }

  async likePost(id: number): Promise<{ detail: string }> {
    return this.request<{ detail: string }>(`/community/posts/${id}/like/`, {
      method: 'POST',
    });
  }
}

// Create and export the API client instance
export const apiClient = new ApiClient(API_BASE_URL);
