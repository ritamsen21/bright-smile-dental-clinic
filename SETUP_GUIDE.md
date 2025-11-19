# Bright Smile Dental Clinic - Complete Setup Guide

## 🎯 Project Overview

A full-stack dental clinic management system for booking and managing appointments.

**Tech Stack:**
- **Frontend**: Angular 18 (TypeScript, SCSS)
- **Backend**: Express.js (TypeScript, MongoDB)

---

## 📋 Prerequisites

Install these before starting:

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
3. **Git** (optional) - [Download](https://git-scm.com/)

---

## 🚀 Installation Steps

### Step 1: Verify Prerequisites

Open a terminal and run:

```bash
node --version    # Should show v18.x or higher
npm --version     # Should show 9.x or higher
mongod --version  # Should show MongoDB version
```

### Step 2: Start MongoDB

**Windows:**
```bash
# If installed as service, it should auto-start
# Or start manually:
mongod
```

**Mac/Linux:**
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 4: Configure Backend Environment

The `.env` file should already exist in the `backend` directory with:

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/bright-smile-dental
CORS_ORIGIN=http://localhost:4200
```

If using a different MongoDB connection (e.g., MongoDB Atlas), update `MONGODB_URI`.

### Step 5: Seed Database

```bash
# Still in backend directory
npm run seed:doctor
```

This creates the default doctor profile in the database.

### Step 6: Build Backend

```bash
npm run build
```

### Step 7: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## ▶️ Running the Application

### Option 1: Development Mode (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend running at: http://localhost:4000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
✅ Frontend running at: http://localhost:4200

### Option 2: Production Mode

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Then serve the dist folder with a web server
```

---

## 🧪 Testing the Application

1. **Open Browser**: Navigate to http://localhost:4200

2. **Home Page**: You should see:
   - Doctor profile (Dr. Priya Menon)
   - Working hours
   - Contact information
   - "Book Appointment" button

3. **Book an Appointment**:
   - Click "Book Appointment"
   - Fill in patient details:
     - Full Name: John Doe
     - Email: john@example.com
     - Phone: +91 98765 43210
     - Date/Time: Select a future date
   - Click "Book Appointment"
   - Should see success message

4. **View Appointments**:
   - Navigate to "Appointments" page
   - See your booked appointment listed

---

## 📡 API Testing (Optional)

Test the API directly using curl or Postman:

### Get Doctor Profile
```bash
curl http://localhost:4000/api/doctors
```

### List Appointments
```bash
curl http://localhost:4000/api/appointments
```

### Book Appointment
```bash
curl -X POST http://localhost:4000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "patient": {
      "fullName": "Jane Smith",
      "email": "jane@example.com",
      "phone": "+91 99999 88888"
    },
    "doctorId": "<DOCTOR_ID_FROM_GET_REQUEST>",
    "scheduledFor": "2025-11-20T10:00:00.000Z"
  }'
```

---

## 🛠️ Common Issues & Solutions

### Issue: MongoDB Connection Error

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
1. Make sure MongoDB is running: `mongod`
2. Verify connection string in `.env`
3. Check MongoDB is listening on port 27017

### Issue: Port Already in Use

**Error:** `Port 4000 is already in use`

**Solution:**
1. Stop the other process using the port
2. Or change `PORT` in `.env` to a different number

### Issue: CORS Error in Browser

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
1. Verify backend is running on port 4000
2. Check `CORS_ORIGIN` in backend `.env` is set to `http://localhost:4200`
3. Restart the backend server

### Issue: Frontend Won't Start

**Error:** Various npm errors

**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

---

## 📁 Project Structure

```
Bright Smile Dental Clinic/
│
├── backend/                  # Express.js API
│   ├── src/
│   │   ├── config/          # Environment config
│   │   ├── controllers/     # Request handlers
│   │   ├── db/              # Database connection
│   │   ├── middleware/      # Error handling
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API routes
│   │   ├── scripts/         # Seed scripts
│   │   └── server.ts        # Entry point
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                 # Angular App
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/  # UI Components
│   │   │   ├── models/      # TypeScript interfaces
│   │   │   ├── services/    # API service
│   │   │   └── ...
│   │   └── environments/    # Environment configs
│   ├── package.json
│   └── angular.json
│
└── README.md                # Main documentation
```

---

## 🎨 Features

### Implemented Features

✅ Doctor profile display  
✅ Appointment booking  
✅ Appointment listing  
✅ Patient management  
✅ Form validation  
✅ Responsive design  
✅ Error handling  
✅ Loading states  

### Potential Enhancements

- User authentication
- Email notifications
- Appointment cancellation
- Multiple doctors support
- Payment integration
- Appointment reminders
- Admin dashboard

---

## 📚 Additional Resources

### Backend Development

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [TypeScript Docs](https://www.typescriptlang.org/)

### Frontend Development

- [Angular Docs](https://angular.dev/)
- [Angular Router](https://angular.dev/guide/routing)
- [Reactive Forms](https://angular.dev/guide/forms/reactive-forms)

---

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use environment variables for sensitive data
- Implement authentication for production
- Enable HTTPS in production
- Use MongoDB connection with authentication
- Add rate limiting for APIs

---

## 📞 Support

For issues or questions:
1. Check this guide
2. Review error messages carefully
3. Check MongoDB and Node.js are running
4. Verify all dependencies are installed

---

## 🎉 Success!

If everything is working:
- ✅ Backend API running on port 4000
- ✅ Frontend app running on port 4200
- ✅ MongoDB connected
- ✅ Doctor profile seeded
- ✅ Can book appointments
- ✅ Can view appointments

**You're ready to go! 🚀**

---

Built with ❤️ for better dental care management
