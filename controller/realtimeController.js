import { getRealtimeData } from '../models/realtime.js';

export const realtimeController = async (req, res) => {
    try {
        const data = await getRealtimeData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send('Error retrieving real-time data');
    }
};
