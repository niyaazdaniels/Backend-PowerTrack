import express from 'express';
import { inverterController } from '../controller/inverterController.js';

const router = express.Router();

router.get('/', inverterController);

export default router;
