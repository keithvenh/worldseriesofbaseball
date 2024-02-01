import express from 'express';
import cors from 'cors';

import seasons from './routes/seasons.js';
import standings from './routes/standings.js';
import games from './routes/games.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/seasons', seasons);
app.use('/api/standings', standings);
app.use('/api/games', games)

app.use('/api/*', (req,res)=> { 
  res.status(404).json({error: "not found"}) 
}) 
  
export default app