import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/environment';
import { connectToDatabase } from './db/mongoose';
import { doctorRouter } from './routes/doctor.routes';
import { patientRouter } from './routes/patient.routes';
import { appointmentRouter } from './routes/appointment.routes';
import authRouter from './routes/auth.routes';
import { errorHandler } from './middleware/error-handler';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/patients', patientRouter);
app.use('/api/appointments', appointmentRouter);
app.use(errorHandler);

const bootstrap = async () => {
  await connectToDatabase();
  app.listen(env.port, () => console.log(`🚀 API ready on http://localhost:${env.port}`));
};

bootstrap().catch((error) => {
  console.error('Failed to boot server', error);
  process.exit(1);
});
