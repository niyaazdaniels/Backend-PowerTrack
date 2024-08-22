import pool from '../config/config.js';

export const getDailyData = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM daily');
        return rows;
    } catch (error) {
        console.error('Error retrieving daily data:', error);
        throw error;
    }
};