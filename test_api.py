#!/usr/bin/env python3
"""
Test script to verify the Django backend API is working
"""
import requests
import json

BASE_URL = "http://localhost:8000/api"

def test_api():
    print("Testing Sports League Organizer API...")
    
    # Test teams endpoint
    try:
        response = requests.get(f"{BASE_URL}/teams/")
        print(f"Teams endpoint status: {response.status_code}")
        if response.status_code == 200:
            teams = response.json()
            print(f"Found {len(teams)} teams")
            for team in teams[0:3]:  # Show first 3 teams
                print(f"  - {team['name']} ({team['sport']}) - {team['members_count']} members")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Error testing teams endpoint: {e}")
    
    # Test leagues endpoint
    try:
        response = requests.get(f"{BASE_URL}/leagues/")
        print(f"Leagues endpoint status: {response.status_code}")
        if response.status_code == 200:
            leagues = response.json()
            print(f"Found {len(leagues)} leagues")
            for league in leagues[0:3]:  # Show first 3 leagues
                print(f"  - {league['name']} ({league['sport']}) - {league['teams_count']} teams")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Error testing leagues endpoint: {e}")
    
    # Test games endpoint
    try:
        response = requests.get(f"{BASE_URL}/games/")
        print(f"Games endpoint status: {response.status_code}")
        if response.status_code == 200:
            games = response.json()
            print(f"Found {len(games)} games")
            for game in games[0:3]:  # Show first 3 games
                print(f"  - {game['home_team']['name']} vs {game['away_team']['name']} ({game['status']})")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Error testing games endpoint: {e}")
    
    # Test community posts endpoint
    try:
        response = requests.get(f"{BASE_URL}/community/posts/")
        print(f"Community posts endpoint status: {response.status_code}")
        if response.status_code == 200:
            posts = response.json()
            print(f"Found {len(posts)} posts")
            for post in posts[0:3]:  # Show first 3 posts
                print(f"  - {post['author']['username']}: {post['content'][:50]}...")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Error testing community posts endpoint: {e}")

if __name__ == "__main__":
    test_api()
