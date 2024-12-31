import { Router } from 'express';
import { validate } from '../middleware/validate';
import { registerSchema, loginSchema } from '../schemas/userSchema';
import * as authController from '../controllers/authController';

const router = Router();

router.post(
  '/register', 
  validate(registerSchema), 
  authController.register
);

router.post(
  '/login', 
  validate(loginSchema), 
  authController.login
);

export default router;