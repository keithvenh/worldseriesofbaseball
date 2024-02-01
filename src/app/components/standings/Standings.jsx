import { useEffect, useState } from 'react';
import axios from 'axios';
import apiUrl from '../../helpers/apiUrl';

import Loading from '../Loading';
import StandingsHeader from './StandingsHeaders';
import StandingsRow from './StandingsRow';
import DivisionStandings from './DivisionStandings';

function updateStandings(data) {
    const standings = data.standings.map((team) => {
        return {
            ...team,
            pct: team.wins/ team.games_played,
            diff: team.rs - team.ra,
            away_wins: team.wins - team.home_wins,
            away_losses: team.wins - team.home_losses,
        }
    })
    data.teams.map(team => {
        const teamExists = standings.some(s => s.team_id === team.id);

        if (!teamExists) {
            standings.push({
                team_id: team.id,
                wins: 0,
                losses: 0,
                games_played: 0,
                pct: 0.000,
                diff: 0,
                away_wins: 0,
                away_losses: 0,
                home_wins: 0,
                home_losses: 0,
                rs: 0,
                ra: 0,
                season_id: 'wsob2024'
            })
        }
    })
    return standings;
}

export default function Standings({league, conferences, divisions, season, type='division', title}) {

    const [standings, setStandings] = useState(null);
    const [teams, setTeams] = useState(null);

    useEffect(() => {
        axios.get(apiUrl('/api/standings')).then(res => {
            const stands = updateStandings(res.data);
            setStandings(stands);
            setTeams(res.data.teams);
        })
    }, [])

    const filterArray = type === 'division' ? divisions : type === 'conference' ? conferences : [league]

    if(standings && teams) {

        return (
            <table className='standingsTable'>
                <thead>
                    <tr>
                        <th colSpan='10' className='standingsTableTitle'>{title}</th>
                    </tr>
                </thead>
                {filterArray.map(filt => {
                    const filtTeams = teams.filter(tm => tm[`${type}_id`] === filt)
                    const filtStandings = standings.filter(st => filtTeams.some(ft => ft.id === st.team_id))
                    return <DivisionStandings key={filtTeams[0][type]} standings={filtStandings} teams={filtTeams} label={filtTeams[0][type]} />
                })}
            </table>

        )
    }
    return (<Loading />)
}