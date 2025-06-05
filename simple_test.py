import requests

try:
    response = requests.get("http://localhost:8000/api/teams/")
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Found {len(data['results'])} teams")
        for team in data['results']:
            print(f"- {team['name']} ({team['sport']})")
except Exception as e:
    print(f"Error: {e}")
