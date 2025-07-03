import express, { Request, Response } from 'express';
const router = express.Router();
import { city, tour } from '../models/db';

/**
 * @openapi
 * /tour:
 *   get:
 *     summary: Get all tours
 *     description: Fetch tours based on city name if provided, otherwise fetch all tours.
 *     parameters:
 *       - in: query
 *         name: cityName
 *         schema:
 *           type: string
 *         description: Name of the city to filter tours by.
 *     responses:
 *       200:
 *         description: List of tours
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const {cityName} = req.query;
        let query: any = {};
        let tours = {};
        if (cityName) {
            query.cityName = capitalizeFirstLetter(cityName as string);
            const cityId = await city.findOne(query);
            tours = await tour.find({ city_id: cityId?.cityId });
        }
        else {
            tours = await tour.find({});
        }
        res.json(tours);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tours' });
    }
});

function capitalizeFirstLetter(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default router;