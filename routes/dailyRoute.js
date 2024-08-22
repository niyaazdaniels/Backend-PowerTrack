import express from 'express';
import {
    dailyController
} from '../controller/dailyController.js';

const router = express.Router();

router.get('/', dailyController);

export default router;