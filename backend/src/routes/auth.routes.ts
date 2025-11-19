import { Router } from 'express';
import { doctorLogin, verifyToken } from '../controllers/auth.controller';

const router = Router();

router.post('/login', doctorLogin);
router.get('/verify', verifyToken);

export default router;
