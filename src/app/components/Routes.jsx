import { Routes, Route } from 'react-router-dom';

// === PRIMARY === //
import Home from './home/Home';
import Standings from './home/Standings';

// === GAMES === //
import Games from './games/Games';
import Game from './games/Game';

// === SEASONS === //

// === TEAMS === //

// === PLAYERS === //

// === 404 === //
import NotFound from './NotFound';

export default function CreateRoutes() {
  return (
    <Routes>
      {/* === PRIMARY ROUTES === */}
      <Route path="/" element={<Home />} />
      <Route path="/standings" element={<Standings />} />

      {/* === SEASON ROUTES === */}

      {/* === GAME ROUTES === */}
      <Route path="/games" element={<Games />} />
      <Route path="/games/:id/*" element={<Game />} />


      {/* === TEAM ROUTES === */}

      {/* === PLAYER ROUTES === */}

      {/* === 404 === */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}