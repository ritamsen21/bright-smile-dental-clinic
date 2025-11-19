# Backend - Bright Smile Dental Clinic API

REST API for managing dental clinic appointments, doctors, and patients.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables (see .env file)

# Seed doctor data
npm run seed:doctor

# Start development server
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript
- `npm start` - Run production build
- `npm run seed:doctor` - Seed database with default doctor profile
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## API Documentation

### Base URL
`http://localhost:4000/api`

### Endpoints

#### Doctor
- `GET /doctors` - Get doctor profile
- `POST /doctors` - Create/update doctor profile
- `PATCH /doctors/schedule` - Update schedule and fees

#### Patients
- `GET /patients` - List all patients
- `POST /patients` - Create new patient

#### Appointments
- `GET /appointments` - List all appointments
- `POST /appointments` - Book new appointment

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/bright-smile-dental
CORS_ORIGIN=http://localhost:4200
```

## Database

Make sure MongoDB is running before starting the server.

### Seed Data

Run the seed script to add the default doctor profile:

```bash
npm run seed:doctor
```

## Tech Stack

- Express.js
- TypeScript
- MongoDB + Mongoose
- Zod (validation)
- Helmet (security)
- CORS
- Morgan (logging)
