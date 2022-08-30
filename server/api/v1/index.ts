import { Router } from 'express';

import authRouter from './auth';
import userRouter from './user';
import artistRouter from './artist';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/artist', artistRouter);

export default router;
