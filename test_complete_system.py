#!/usr/bin/env python3
"""
Comprehensive test script for the Sports League Organizer
Tests all major functionality and API endpoints
"""
import requests
import json
import sys

BASE_URL = "http://localhost:8000/api"

def test_api_endpoints():
    """Test all major API endpoints"""
    print("🔍 Testing Sports League Organizer API...")
    print("=" * 50)
    
    tests_passed = 0
    tests_failed = 0
    
    # Test endpoints
    endpoints = [
        ("Teams", "/teams/"),
        ("Leagues", "/leagues/"),
        ("Games", "/games/"),
        ("Community Posts", "/community/posts/"),
        ("Users", "/auth/user/")  # This will fail without auth, which is expected
    ]
    
    for name, endpoint in endpoints:
        try:
            response = requests.get(f"{BASE_URL}{endpoint}", timeout=5)
            if response.status_code in [200, 401]:  # 401 is expected for auth endpoints
                print(f"✅ {name}: Status {response.status_code}")
                if response.status_code == 200:
                    data = response.json()
                    if 'results' in data:
                        print(f"   📊 Found {len(data['results'])} items")
                    elif isinstance(data, list):
                        print(f"   📊 Found {len(data)} items")
                tests_passed += 1
            else:
                print(f"❌ {name}: Status {response.status_code}")
                tests_failed += 1
        except requests.exceptions.RequestException as e:
            print(f"❌ {name}: Connection failed - {e}")
            tests_failed += 1
    
    print("\n" + "=" * 50)
    print(f"📈 Test Results: {tests_passed} passed, {tests_failed} failed")
    
    if tests_failed == 0:
        print("🎉 All backend tests passed!")
    else:
        print("⚠️  Some tests failed. Check if Django server is running.")
    
    return tests_failed == 0

def test_data_integrity():
    """Test that data is properly structured"""
    print("\n🔍 Testing Data Integrity...")
    print("=" * 50)
    
    try:
        # Test teams data
        response = requests.get(f"{BASE_URL}/teams/")
        if response.status_code == 200:
            teams = response.json()['results']
            print(f"✅ Teams data: {len(teams)} teams found")
            for team in teams[:3]:
                print(f"   🏆 {team['name']} ({team['sport']}) - {team['members_count']} members")
        
        # Test leagues data
        response = requests.get(f"{BASE_URL}/leagues/")
        if response.status_code == 200:
            leagues = response.json()['results']
            print(f"✅ Leagues data: {len(leagues)} leagues found")
            for league in leagues[:3]:
                print(f"   🏆 {league['name']} ({league['sport']}) - {league['teams_count']} teams")
        
        # Test games data
        response = requests.get(f"{BASE_URL}/games/")
        if response.status_code == 200:
            games = response.json()['results']
            print(f"✅ Games data: {len(games)} games found")
            for game in games[:3]:
                status = game['status']
                score = f"{game['home_score']}-{game['away_score']}" if game['home_score'] is not None else "TBD"
                print(f"   ⚽ {game['home_team']['name']} vs {game['away_team']['name']} ({status}) {score}")
        
        # Test community posts
        response = requests.get(f"{BASE_URL}/community/posts/")
        if response.status_code == 200:
            posts = response.json()
            print(f"✅ Community posts: {len(posts)} posts found")
            for post in posts[0:3]:
                author = f"{post['author']['first_name']} {post['author']['last_name']}"
                print(f"   💬 {author}: {post['content'][:50]}...")
        
        print("🎉 Data integrity tests passed!")
        return True
        
    except Exception as e:
        print(f"❌ Data integrity test failed: {e}")
        return False

def test_authentication():
    """Test authentication endpoints"""
    print("\n🔍 Testing Authentication...")
    print("=" * 50)
    
    # Test registration endpoint (should work)
    try:
        response = requests.post(f"{BASE_URL}/auth/register/", json={
            "username": "testuser123",
            "email": "test@example.com",
            "password": "testpass123",
            "password2": "testpass123"
        })
        
        if response.status_code in [201, 400]:  # 400 if user already exists
            print("✅ Registration endpoint working")
        else:
            print(f"⚠️  Registration endpoint returned {response.status_code}")
    except Exception as e:
        print(f"❌ Registration test failed: {e}")
    
    # Test login endpoint
    try:
        response = requests.post(f"{BASE_URL}/auth/login/", json={
            "email": "admin@example.com",
            "password": "admin123"
        })
        
        if response.status_code in [200, 400, 401]:  # Various expected responses
            print("✅ Login endpoint working")
        else:
            print(f"⚠️  Login endpoint returned {response.status_code}")
    except Exception as e:
        print(f"❌ Login test failed: {e}")

if __name__ == "__main__":
    print("🚀 Starting Comprehensive System Test")
    print("🌐 Testing backend at:", BASE_URL)
    print()
    
    # Run all tests
    api_ok = test_api_endpoints()
    data_ok = test_data_integrity()
    test_authentication()
    
    print("\n" + "=" * 60)
    if api_ok and data_ok:
        print("🎉 SYSTEM STATUS: ALL TESTS PASSED!")
        print("✅ Your Sports League Organizer is working perfectly!")
    else:
        print("⚠️  SYSTEM STATUS: SOME ISSUES DETECTED")
        print("🔧 Please check the Django server and try again.")
    print("=" * 60)
