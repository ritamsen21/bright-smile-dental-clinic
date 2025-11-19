# Bright Smile Dental Clinic

A full-stack dental clinic appointment management system built with **Angular** (frontend) and **Express + MongoDB** (backend).

## 🏥 Project Overview

This application allows patients to:
- View doctor information and working hours
- Book appointments with the dentist
- View their appointment history

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js**
- **TypeScript**
- **MongoDB** with **Mongoose**
- **Zod** for validation
- **dotenv** for environment configuration

### Frontend
- **Angular 18** (standalone components)
- **TypeScript**
- **SCSS** for styling
- **Reactive Forms**
- **HttpClient** for API communication

## 📁 Project Structure

```
Bright Smile Dental Clinic/
├── backend/
│   ├── src/
│   │   ├── config/           # Environment configuration
│   │   ├── controllers/      # Request handlers
│   │   ├── db/               # Database connection
│   │   ├── middleware/       # Error handling & async wrapper
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API endpoints
│   │   ├── scripts/          # Database seed scripts
│   │   └── server.ts         # Entry point
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── components/   # Angular components
    │   │   ├── models/       # TypeScript interfaces
    │   │   ├── services/     # API service
    │   │   └── ...
    │   └── environments/     # Environment configs
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **MongoDB** (v5 or higher) - Running locally or have a connection string
- **npm** or **yarn**

### Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Bright Smile Dental Clinic"
```

#### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file (already exists, but verify these settings)
# The .env file should contain:
# PORT=4000
# MONGODB_URI=mongodb://127.0.0.1:27017/bright-smile-dental
# CORS_ORIGIN=http://localhost:4200

# Seed the database with doctor information
npm run seed:doctor

# Build TypeScript
npm run build
```

#### 3. Frontend Setup

```bash
cd frontend
npm install
```

### Running the Application

#### Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On Windows (if installed as service, it should auto-start)
# Or start manually:
mongod
```

#### Start Backend Server

```bash
cd backend
npm run dev
```

The backend API will be available at `http://localhost:4000`

#### Start Frontend Application

```bash
cd frontend
npm start
```

The frontend will be available at `http://localhost:4200`

## 📋 API Endpoints

### Doctor Routes

| Method | Endpoint             | Description                  |
|--------|----------------------|------------------------------|
| GET    | `/api/doctors`       | Get doctor profile           |
| POST   | `/api/doctors`       | Create/update doctor profile |
| PATCH  | `/api/doctors/schedule` | Update schedule and fees  |

### Patient Routes

| Method | Endpoint          | Description           |
|--------|-------------------|-----------------------|
| GET    | `/api/patients`   | List all patients     |
| POST   | `/api/patients`   | Create a new patient  |

### Appointment Routes

| Method | Endpoint              | Description                 |
|--------|-----------------------|-----------------------------|
| GET    | `/api/appointments`   | List all appointments       |
| POST   | `/api/appointments`   | Book a new appointment      |

## 🎨 Features

### Home Page
- Displays doctor information
- Shows qualifications, specializations, and experience
- Lists working hours
- Shows contact information
- Button to book appointments

### Book Appointment Page
- Form to enter patient details (name, email, phone)
- Date and time picker for appointment scheduling
- Optional notes field
- Validation for all required fields
- Success confirmation after booking

### Appointments Page
- Lists all appointments
- Separates upcoming and past appointments
- Shows appointment status (scheduled, completed, cancelled)
- Displays patient and doctor information
- Shows appointment date, time, and fees

## 🔧 Development Commands

### Backend

```bash
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm start            # Run production build
npm run seed:doctor  # Seed database with doctor data
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Frontend

```bash
npm start            # Start development server (ng serve)
npm run build        # Build for production
npm test             # Run unit tests
npm run watch        # Build in watch mode
```

## 🗄️ Database Schema

### Doctor
```typescript
{
  name: string
  qualification: string
  specializations: string[]
  bio: string
  experienceYears: number
  visitFee: number
  workingHours: Array<{
    day: string
    start: string
    end: string
  }>
  contact: {
    phone: string
    email: string
    address: string
  }
}
```

### Patient
```typescript
{
  fullName: string
  email: string
  phone: string
  birthDate?: Date
  notes?: string
  lastVisit?: Date
  preferredDoctor?: ObjectId
}
```

### Appointment
```typescript
{
  patient: ObjectId (ref: Patient)
  doctor: ObjectId (ref: Doctor)
  scheduledFor: Date
  status: 'scheduled' | 'completed' | 'cancelled'
  visitFee: number
  notes?: string
}
```

## 🌐 Environment Variables

### Backend (.env)

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/bright-smile-dental
CORS_ORIGIN=http://localhost:4200
```

### Frontend (environment.ts)

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:4000/api'
};
```

## 🧪 Testing

The application includes:
- Backend validation with Zod schemas
- Angular form validation
- Error handling middleware
- API error responses

## 🔐 Security Features

- Helmet.js for securing HTTP headers
- CORS configuration
- Input validation with Zod
- Environment variable protection

## 📝 License

MIT

## 👨‍⚕️ Default Doctor Profile

The application comes with a pre-seeded doctor profile:

- **Name**: Dr. Priya Menon
- **Qualification**: BDS, MDS (Endodontics)
- **Specializations**: Root Canal Therapy, Cosmetic Dentistry
- **Experience**: 12+ years
- **Consultation Fee**: ₹1200

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ for better dental care management
