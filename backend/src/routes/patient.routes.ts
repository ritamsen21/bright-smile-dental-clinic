import { Router } from 'express';
import { asyncHandler } from '../middleware/async-handler';
import { createPatient, listPatients } from '../controllers/patient.controller';
import { authenticateDoctor } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticateDoctor, asyncHandler(listPatients));
router.post('/', asyncHandler(createPatient));

export const patientRouter = router;
