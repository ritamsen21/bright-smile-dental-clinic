# Frontend - Bright Smile Dental Clinic

Angular application for managing dental clinic appointments.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:4200`

## Available Scripts

- `npm start` - Start development server (`ng serve`)
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run watch` - Build in watch mode

## Features

### Pages

1. **Home** - Display doctor information, working hours, and contact details
2. **Book Appointment** - Form to schedule new appointments
3. **Appointments** - View all appointments (upcoming and past)

### Components

- `HomeComponent` - Landing page with doctor profile
- `BookAppointmentComponent` - Appointment booking form
- `AppointmentsComponent` - List and manage appointments

### Services

- `ApiService` - Handles all HTTP requests to the backend API

## Tech Stack

- Angular 18 (Standalone Components)
- TypeScript
- SCSS
- Reactive Forms
- HttpClient
- RxJS

## Environment Configuration

Edit `src/environments/environment.ts` to configure the API URL:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:4000/api'
};
```

## Development

This project uses:
- Standalone components (no NgModule)
- Reactive forms for user input
- HTTP interceptors for API calls
- SCSS for styling with gradient themes

## Build

```bash
npm run build
```

Build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── home/
│   │   ├── book-appointment/
│   │   └── appointments/
│   ├── models/
│   │   ├── doctor.model.ts
│   │   ├── patient.model.ts
│   │   └── appointment.model.ts
│   ├── services/
│   │   └── api.service.ts
│   ├── app.component.*
│   ├── app.config.ts
│   └── app.routes.ts
├── environments/
└── styles.scss
```

## Styling

The application uses a purple gradient theme with:
- Responsive design
- Modern card layouts
- Form validation styling
- Loading states and animations
