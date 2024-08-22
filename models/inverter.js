import pool from '../config/config.js';

export const getInverterData = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM inverter_data');
        return rows;
    } catch (error) {
        console.error('Error retrieving inverter data:', error);
        throw error;
    }
};