import express, { Request, Response } from 'express';
import { ZodSchema } from 'zod';

const router = express.Router();

router.use(express.json());


router.post('/signup', async (req: Request, res: Response) => {
    const {name, email, phone} = req.body;
})
export default router;