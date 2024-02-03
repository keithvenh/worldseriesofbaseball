import express from 'express';
import StandingsController from '../controllers/standings.js';

const router = express.Router()

router.get('/', StandingsController.index);
router.get('/division/:id', StandingsController.division);

export default router;