# 🧪 Complete Testing Guide for Sports League Organizer

## 📋 Quick Testing Checklist

### ✅ **Step 1: Backend Testing**

1. **Start the Django Backend:**
   ```bash
   cd backend
   python3 manage.py runserver 8000
   ```

2. **Run the Automated Test:**
   ```bash
   python3 test_complete_system.py
   ```

3. **Manual API Testing:**
   - Open browser: `http://localhost:8000/api/teams/`
   - Should see JSON data with teams
   - Try: `http://localhost:8000/api/leagues/`
   - Try: `http://localhost:8000/api/games/`
   - Try: `http://localhost:8000/api/community/posts/`

### ✅ **Step 2: Frontend Testing**

1. **Start the Frontend:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

2. **Open in Browser:**
   - Go to: `http://localhost:3000`

### ✅ **Step 3: Manual Feature Testing**

## 🔍 **Detailed Testing Scenarios**

### **A. Homepage Testing**
- [ ] Homepage loads without errors
- [ ] Navigation menu works
- [ ] Theme switcher works (light/dark mode)
- [ ] Responsive design on mobile/tablet

### **B. Authentication Testing**
- [ ] **Register Page** (`/register`)
  - [ ] Form validation works
  - [ ] Can create new account
  - [ ] Error messages display properly
  
- [ ] **Login Page** (`/login`)
  - [ ] Can login with: `admin@example.com` / `admin123`
  - [ ] Error handling for wrong credentials
  - [ ] Redirects to homepage after login
  
- [ ] **Authentication State**
  - [ ] Header shows user name when logged in
  - [ ] Logout button works
  - [ ] Protected pages require login

### **C. Teams Testing**
- [ ] **Teams List** (`/teams`)
  - [ ] Shows all teams from database
  - [ ] Team cards display correctly
  - [ ] "Create Team" button visible when logged in
  
- [ ] **Create Team** (`/teams/create`)
  - [ ] Form validation works
  - [ ] Can create new team (when logged in)
  - [ ] Redirects to team detail after creation
  
- [ ] **Team Detail** (`/teams/[id]`)
  - [ ] Shows team information
  - [ ] Displays team members
  - [ ] Shows team statistics

### **D. Leagues Testing**
- [ ] **Leagues List** (`/leagues`)
  - [ ] Shows all leagues from database
  - [ ] League cards display correctly
  - [ ] Status badges show correctly
  
- [ ] **Create League** (`/leagues/create`)
  - [ ] Form validation works
  - [ ] Date picker works
  - [ ] Can create new league (when logged in)
  
- [ ] **League Detail** (`/leagues/[id]`)
  - [ ] Shows league information
  - [ ] Displays standings
  - [ ] Shows participating teams

### **E. Community Testing**
- [ ] **Community Page** (`/community`)
  - [ ] Shows posts from database
  - [ ] Like button works (when logged in)
  - [ ] Teams tab shows all teams
  - [ ] Post interaction works

### **F. Analytics Testing**
- [ ] **Analytics Page** (`/analytics`)
  - [ ] Page loads without errors
  - [ ] Statistics display correctly
  - [ ] Charts/visualizations work

## 🐛 **Common Issues & Solutions**

### **Backend Issues:**
1. **"Connection refused"**
   - Solution: Make sure Django server is running on port 8000

2. **"401 Unauthorized"**
   - Solution: This is normal for protected endpoints without login

3. **"Module not found"**
   - Solution: Install requirements: `pip install -r requirements.txt`

### **Frontend Issues:**
1. **"npm command not found"**
   - Solution: Install Node.js and npm

2. **"Module not found"**
   - Solution: Run `npm install` to install dependencies

3. **"API connection failed"**
   - Solution: Check if backend is running and CORS is configured

## 🎯 **Expected Test Results**

### **Backend (Django API):**
- ✅ 6 Teams in database
- ✅ 3 Leagues in database  
- ✅ 5+ Games scheduled/completed
- ✅ 4+ Community posts
- ✅ User authentication working

### **Frontend (Next.js):**
- ✅ All pages load without errors
- ✅ Authentication flow works
- ✅ Data displays from backend
- ✅ Forms submit successfully
- ✅ Responsive design works

## 🚀 **Performance Testing**

### **Load Testing:**
1. Open multiple browser tabs
2. Navigate between pages quickly
3. Submit forms multiple times
4. Check for memory leaks

### **Mobile Testing:**
1. Test on mobile device or browser dev tools
2. Check touch interactions
3. Verify responsive layout
4. Test form inputs on mobile

## 📊 **Database Verification**

Check that data persists:
```bash
cd backend
python3 manage.py shell
```

```python
from teams.models import Team
from leagues.models import League
from community.models import Post

print(f"Teams: {Team.objects.count()}")
print(f"Leagues: {League.objects.count()}")
print(f"Posts: {Post.objects.count()}")
```

## 🎉 **Success Criteria**

Your system is working perfectly if:
- ✅ All automated tests pass
- ✅ You can register and login
- ✅ You can create teams and leagues
- ✅ Data persists between sessions
- ✅ All pages load without errors
- ✅ Mobile responsive design works
- ✅ API returns real data

## 🔧 **Troubleshooting Commands**

```bash
# Check Django server status
curl http://localhost:8000/api/teams/

# Check frontend build
npm run build

# Reset database (if needed)
cd backend
python3 manage.py flush
python3 setup_db.py

# Check logs
# Django logs appear in terminal
# Frontend logs appear in browser console (F12)
```
