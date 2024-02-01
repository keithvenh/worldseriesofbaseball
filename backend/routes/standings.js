import express from 'express';
import standingsController from '../controllers/standings.js';

const router = express.Router()

router.get('/', standingsController.index)

export default router;