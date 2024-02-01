import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDocs } from 'firebase/firestore';
import { seasonsRef } from '../../../../db/db';

export default function Seasons() {
  const [seasons, setSeasons] = useState(null);

  useEffect(() => {
    getDocs(seasonsRef).then(seasons => {
      const seasonsArray = []
      seasons.docs.forEach(s => {
        seasonsArray.push(s.data())
      })
      setSeasons(seasonsArray)
      console.log(seasonsArray);
    }, [])

  })

  if(seasons) {

    return (

      <div className='seasons'>
        
        {seasons.map(season => (
          <Link key={season.year} to={`/admin/seasons/${season.id}`}>
            {season.year}
          </Link>
        ))}

        <Link to="/admin/seasons/new">Create Season</Link>

      </div>

    )

  }
}