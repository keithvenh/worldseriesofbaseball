import { useEffect, useState } from 'react';
import { getDocs, collection, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../../db/db.js';
import Loading from '../Loading';
import {getStandings} from '../../../db/standings'

import DivisionStandings from '../standings/DivisionStandings'

export default function Standings (props) {

    const [standings, setStandings] = useState(null);

    useEffect(() => {
        getStandings().then(s => setStandings(s));
    })

    if(standings) {
        return (
            <div className='Standings'>
                <DivisionStandings 
                    league={standings}
                    conference='eastern'
                    division='afr'
                />
                <DivisionStandings 
                    league={standings}
                    conference='eastern'
                    division='asi'
                />
                <DivisionStandings 
                    league={standings}
                    conference='eastern'
                    division='oce'
                />
                <DivisionStandings 
                    league={standings}
                    conference='western'
                    division='eur'
                />
                <DivisionStandings 
                    league={standings}
                    conference='western'
                    division='nam'
                />
                <DivisionStandings 
                    league={standings}
                    conference='western'
                    division='sam'
                />

            </div>
        )
    }
}