import { useEffect, useState } from 'react';
import axios from 'axios';
import apiUrl from '../../helpers/apiUrl';
import RecentGames from '../games/RecentGames';
import UpcomingGames from '../games/UpcomingGames';
import Standings from '../standings/Standings';
import GamesBar from '../games/GamesBar';

export default function Home() {

    return (
      <div className='Home'>

        <GamesBar />

        <section className='homeSection'>
          <div className='standings'>
            <Standings 
              league='wsob'
              conferences={['west']}
              divisions={['eur', 'nam', 'sam']}
              season='wsob2024'
              type='division'
              title='Western Conference Standings'
            />
          </div>

          <div className='leagueInfo'></div>
          
          <div className='standings'>
            <Standings 
              league='wsob'
              conferences={['east']}
              divisions={['afr', 'asi', 'oce']}
              season='wsob2024'
              type='division'
              title='Eastern Conference Standings'
            />
          </div>
        </section>

      </div>
    )
}