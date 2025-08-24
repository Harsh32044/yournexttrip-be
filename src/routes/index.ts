import express from 'express';
import cityRouter from './city';
import tourRouter from './tours';
import userRouter from './user';
import blogRouter from './blogs';

const mainRouter = express.Router();

mainRouter.use('/city', cityRouter);
mainRouter.use('/tour', tourRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/blog', blogRouter);

export default mainRouter;