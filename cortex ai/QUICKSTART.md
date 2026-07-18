# Quick Start Guide - Cortex AI


## Prerequisites
- Node.js 18+ installed
- Docker Desktop installed and running
- MongoDB (runs in Docker)

---

## ⚡ Start Development Environment (3 Steps)

### Step 1: Start Backend Server
Open a **NEW terminal** and run:
```bash
cd Backend
npm start
```
✅ You should see: `Server running on port 3000`

### Step 2: Start Frontend Dev Server
Open **ANOTHER terminal** and run:
```bash
cd Frontend
npm run dev
```
✅ You should see: `VITE v... ready in ... ms`  
✅ Frontend opens at: http://localhost:5173

### Step 3: Use Deployment Manager
1. Navigate to **Deployment** tab (🐳 icon)
2. Click **🔄 Refresh** button
3. If backend is running, you should see "✅ Connected"
4. Click **🔨 Build Images** to build Docker containers
5. Click **⬆️ Run** to start services with docker-compose

---

## 📁 Terminal Setup (Recommended)

Open 3 terminals side by side:

**Terminal 1 - Backend:**
```bash
cd c:\Users\rajpu\Desktop\cohort-2.0-main\Cortex AI
\Backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd c:\Users\rajpu\Desktop\cohort-2.0-main\Cortex AI
\Frontend
npm run dev
```

**Terminal 3 - Optional (for manual docker commands):**
```bash
cd c:\Users\rajpu\Desktop\cohort-2.0-main\Cortex AI

docker-compose ps
```

---

## 🐳 Docker Workflow

### Option 1: Using Deployment Manager (Easiest)
1. Backend running ✅
2. Frontend running ✅
3. Docker Desktop running ✅
4. Go to Deployment tab → Click **Build Images** → Click **Run**
5. Access services at:
   - Frontend: http://localhost:80
   - Backend API: http://localhost:3000
   - MongoDB: localhost:27017

### Option 2: Manual Docker Commands
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View running services
docker-compose ps

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

---

## 🔗 Service Endpoints

| Service | Dev URL | Docker URL | Port |
|---------|---------|-----------|------|
| Frontend | http://localhost:5173 | http://localhost:80 | 5173/80 |
| Backend API | http://localhost:3000 | http://localhost:3000 | 3000 |
| MongoDB | localhost:27017 | localhost:27017 | 27017 |

---

## ✅ Verify Everything is Running

### Check Backend
```bash
curl http://localhost:3000/
# Should return: {"message":"Server is running"}
```

### Check Frontend  
Visit: http://localhost:5173

### Check Deployment Manager
- Go to Deployment tab
- Should show: **✅ Connected**
- Should display containers and images

---

## ❌ Troubleshooting

### "Backend server not running on port 3000"
- [ ] Start backend: `cd Backend && npm start`
- [ ] Wait 5 seconds for server to start
- [ ] Click **🔄 Refresh** in Deployment Manager

### "Cannot connect to backend"
- [ ] Check backend terminal - is it running?
- [ ] Check for MongoDB connection errors
- [ ] Verify no other app using port 3000

### Frontend not loading
- [ ] Start frontend: `cd Frontend && npm run dev`
- [ ] Check frontend terminal for build errors
- [ ] Clear browser cache

### Docker build fails
- [ ] Docker Desktop must be running
- [ ] Check disk space
- [ ] Run: `docker-compose config` to validate file

### Port already in use
- Backend (3000): `netstat -ano | findstr :3000`
- Frontend (5173): `netstat -ano | findstr :5173`
- MongoDB (27017): `netstat -ano | findstr :27017`

---

## 📝 Project Structure

```
Cortex AI
/
├── Backend/
│   ├── src/
│   ├── package.json
│   ├── server.js
│   └── Dockerfile
├── Frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
├── .env.docker
└── k8s/
```

---

## 🎯 Next Steps

1. ✅ Start Backend: `cd Backend && npm start`
2. ✅ Start Frontend: `cd Frontend && npm run dev`
3. ✅ Open: http://localhost:5173
4. ✅ Go to Deployment tab
5. ✅ Click Build & Run buttons
6. ✅ Monitor containers in Deployment Manager

**You're ready to deploy! 🚀**
