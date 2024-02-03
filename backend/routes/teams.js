import express from 'express';
import TeamsController from '../controllers/teams.js';

const router = express.Router()

router.get('/', TeamsController.index)
router.get('/:id', TeamsController.show)
router.get('/:id/roster', TeamsController.roster)

export default router;