import { Router } from 'express';
import { asyncHandler } from '../middleware/async-handler';
import { getDoctorProfile, upsertDoctorProfile, updateDoctorScheduling } from '../controllers/doctor.controller';

const router = Router();

router.get('/', asyncHandler(getDoctorProfile));
router.post('/', asyncHandler(upsertDoctorProfile));
router.patch('/schedule', asyncHandler(updateDoctorScheduling));

export const doctorRouter = router;
