import { getDailyData } from '../models/daily.js';

export const dailyController = async (req, res) => {
    try {
        const data = await getDailyData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send('Error retrieving daily data');
    }
};
