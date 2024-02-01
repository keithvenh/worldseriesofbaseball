import express from 'express';
import gamesController from '../controllers/games.js';

const router = express.Router()

router.get('/gamesBar', gamesController.gamesBar)

export default router;