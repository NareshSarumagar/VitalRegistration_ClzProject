import { Router } from 'express';
import { login, getMe } from '../controllers/AdminAuthController';
import { protect } from '../middleware/adminauthMiddleware';

const router = Router();

router.post('/login', login);
router.get('/me', protect, getMe);

export default router;