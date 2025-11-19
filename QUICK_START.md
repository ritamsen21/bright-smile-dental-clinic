# 🚀 Quick Start Commands

## First Time Setup

```bash
# 1. Start MongoDB
mongod

# 2. Setup Backend
cd backend
npm install
npm run seed:doctor
npm run build

# 3. Setup Frontend
cd ../frontend
npm install
```

## Daily Development

```bash
# Terminal 1: Start Backend
cd backend
npm run dev

# Terminal 2: Start Frontend
cd frontend
npm start
```

## Access Points

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:4000/api
- **Health Check**: http://localhost:4000/health

## Useful Commands

### Backend
```bash
npm run dev          # Development mode with hot reload
npm run build        # Compile TypeScript
npm start            # Production mode
npm run seed:doctor  # Reset doctor data
```

### Frontend
```bash
npm start            # Start dev server
npm run build        # Build for production
npm test             # Run tests
```

## Default Login

**Doctor Profile:**
- Name: Dr. Priya Menon
- Phone: +91 98450 12345
- Email: bright@smiledental.com

## Project Structure

```
backend/
  src/
    controllers/    # Business logic
    models/        # Database schemas
    routes/        # API endpoints
    
frontend/
  src/app/
    components/    # UI components
    services/      # API calls
    models/        # TypeScript types
```

## Environment Variables

**backend/.env:**
```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/bright-smile-dental
CORS_ORIGIN=http://localhost:4200
```

## Common Issues

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Run `mongod` |
| Port 4000 in use | Change PORT in .env |
| CORS error | Check backend CORS_ORIGIN |
| Frontend won't start | Run `npm install` in frontend |

## API Endpoints Quick Reference

```
GET    /api/doctors              # Get doctor profile
GET    /api/appointments         # List appointments
POST   /api/appointments         # Book appointment
GET    /api/patients             # List patients
POST   /api/patients             # Create patient
```

## Tech Stack

- **Frontend**: Angular 18, TypeScript, SCSS
- **Backend**: Express, TypeScript, MongoDB
- **Database**: MongoDB with Mongoose
