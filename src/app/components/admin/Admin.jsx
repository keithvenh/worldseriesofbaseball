import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Seasons from './seasons/Seasons';
import EditSeason from './seasons/EditSeason';
import NewSeason from './seasons/NewSeason';

import Teams from './teams/Teams';
import Players from './players/Players';
import Games from './games/Games';

import Password from './Password';

export default function Admin() {

  const [verified, setVerified] = useState(false);

  if(!verified) {
    return <Password verify={setVerified}/>
  }

  return (
    <div className='admin'>
      <Routes>
        {/* ===== SEASONS ROUTES ===== */}
        <Route path='seasons' element={<Seasons />} />
        <Route path='seasons/:id' element={<EditSeason />} />
        <Route path='seasons/new' element={<NewSeason />} />

        <Route path='teams' element={<Teams />} />
        <Route path='players' element={<Players />} />
        <Route path='games' element={<Games />} />
      </Routes>
    </div>
  )
}