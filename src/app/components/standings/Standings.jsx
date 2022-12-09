import { useEffect, useState } from 'react';

import fetchTeams from '../../helpers/application/fetchTeams';
import fetchGames from '../../helpers/application/fetchGames';
import calculateStandings from '../../helpers/standings/calculateStandings';
import updateRecords from '../../helpers/application/updateRecords';

import Loading from '../Loading';
import StandingsHeader from './StandingsHeaders';
import StandingsRow from './StandingsRow';


export default function Standings(props) {

    const [standings, setStandings] = useState(null)

    useEffect(() => {
        fetchTeams(props.divisions).then((fetchedTeams) => {
            fetchGames(fetchedTeams).then((fetchedGames) => {
                let finalStandings = calculateStandings(fetchedTeams, fetchedGames);
                updateRecords(finalStandings);
                setStandings(finalStandings);
            }
            )
        }
        );
    },[])

    if(standings) {

        return (
            <table className='standingsTable'>

                <StandingsHeader title={props.title} />
    
                <tbody>

                    {standings.map((team) => <StandingsRow key={team.id} team={team} appView={props.appView} currentTeam={props.team}/>)}
    
                </tbody>

            </table>
        )
    }

    return (
        <Loading />
    )
}