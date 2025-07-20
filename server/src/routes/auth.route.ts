import { Router, Request, Response } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { registerSchema, loginSchema } from '../validations/auth';
import { protect } from '../middlewares/auth.middleware';
import User from '../models/User';

const authRouter = Router();

authRouter.post('/register', validate({ body: registerSchema }), registerUser);
authRouter.post('/login', validate({ body: loginSchema }), loginUser);

authRouter.get('/dashboard', protect, async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Authenticated user retrieved successfully',
      user,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

export default authRouter;
