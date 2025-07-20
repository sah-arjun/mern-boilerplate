import { Router } from 'express';
import { registerUser, loginUser, getDashboard } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { registerSchema, loginSchema } from '../validations/auth';
import { protectedRoute } from '../middlewares/auth.middleware';

const authRouter = Router();

authRouter.post('/register', validate({ body: registerSchema }), registerUser);
authRouter.post('/login', validate({ body: loginSchema }), loginUser);
authRouter.get('/dashboard', protectedRoute, getDashboard)

export default authRouter;
