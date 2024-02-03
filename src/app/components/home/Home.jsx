import {useState, useEffect} from 'react';
import {firestoreDB} from '../../../db/db';
import {getDocs, collection, query, orderBy, limit} from 'firebase/firestore';
import { Link } from 'react-router-dom';

import Standings from '../standings/Standings';
import GamesBar from '../games/GamesBar';

export default function Home() {

    const [headlines, setHeadlines] = useState([]);

    async function fetchHeadlines() {
      const headlinesRef = collection(firestoreDB, 'headlines')
      const q = query(headlinesRef, orderBy('game_id', 'desc'), limit(5))
      const headlinesSnapshot = await getDocs(q)
      const headlines = []
      headlinesSnapshot.forEach(doc => {
        headlines.push({
          id: doc.id,
          ...doc.data()
        });
      })
      setHeadlines(headlines);
    }
    
    useEffect(() => {
      fetchHeadlines();
    }, [])
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

          <div className='leagueInfo'>
            <div className='headlines'>
              <h2>Latest News</h2>
              {headlines.map(hl => (
                <Link to={`/games/${hl.game_id}`}  key={hl.id}>
                  <p className='headline'>&bull; {hl.headline}</p>
                </Link>
              ))}

            </div>
          </div>
          
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