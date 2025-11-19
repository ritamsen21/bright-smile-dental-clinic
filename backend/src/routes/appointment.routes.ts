import { Router } from 'express';
import { asyncHandler } from '../middleware/async-handler';
import { bookAppointment, listAppointments } from '../controllers/appointment.controller';

const router = Router();

router.get('/', asyncHandler(listAppointments));
router.post('/', asyncHandler(bookAppointment));

export const appointmentRouter = router;
