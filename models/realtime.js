import pool from '../config/config.js';

export const getRealtimeData = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM realtime');
        return rows;
    } catch (error) {
        console.error('Error retrieving real-time data:', error);
        throw error;
    }
};
