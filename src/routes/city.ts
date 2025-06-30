import express, { Request, Response } from 'express';
const router = express.Router();
import { city, tour } from '../models/db';

/**
 * @openapi
 * /city:
 *   get:
 *     summary: Get all cities
 *     responses:
 *       200:
 *         description: List of cities
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const cities = await city.find({});
        res.json(cities);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch cities' });
    }
});

/**
 * @openapi
 * /city/summary:
 *   get:
 *     summary: Get all cities and their respective tour counts
 *     responses:
 *       200:
 *         description: count of cities, and List of cities with tour counts
 */
router.get('/summary', async (req: Request, res: Response) => {
    try {
        const cities = await city.find({});
        const summary = await Promise.all(
            cities.map(async (c: any) => {
                const tourCount = await tour.countDocuments({ city_id: c.cityId });
                return {
                    city_id: c.cityId,
                    cityName: c.cityName,
                    tourCount
                };
            })
        );
        res.json({
            totalCities: cities.length,
            cities: summary
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch summary' });
    }
});

export default router;