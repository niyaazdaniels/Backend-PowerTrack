import express from 'express';
import inverterRoute from './routes/inverterRoute.js';
import realtimeRoute from './routes/realtimeRoute.js';
import dailyRoute from './routes/dailyRoute.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());

app.use('/inverter', inverterRoute);
app.use('/realtime', realtimeRoute);
app.use('/daily', dailyRoute);

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.status(200).send('API Server is Running');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
