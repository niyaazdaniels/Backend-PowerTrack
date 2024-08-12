import express from 'express';
import { realtimeController } from '../controller/realtimeController.js';

const router = express.Router();

router.get('/', realtimeController);

export default router;
