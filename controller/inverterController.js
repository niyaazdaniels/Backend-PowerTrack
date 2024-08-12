import { getInverterData } from '../models/inverter.js';

export const inverterController = async (req, res) => {
    try {
        const data = await getInverterData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send('Error retrieving inverter data');
    }
};
