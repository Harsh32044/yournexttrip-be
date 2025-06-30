import express from 'express';
import cityRouter from './city';
import tourRouter from './tours';

const mainRouter = express.Router();

mainRouter.use('/city', cityRouter);
mainRouter.use('/tour', tourRouter);

export default mainRouter;