import { useState, useEffect} from 'react';
import { useParams, Link, Routes, Route } from 'react-router-dom';
import { teamColors } from './teamStyles';

import axios from 'axios';
import apiUrl from '../../helpers/apiUrl';

import { fetchTeam } from '../../../db/fetchTeams';

import Loading from '../Loading';
import Schedule from './Schedule';
import Roster from './roster/Roster';

export default function Team() {
    const [team, setTeam] = useState(null);
    const { id } = useParams();
    const teamImage = require(`../../assets/images/${id}.webp`)

    function calcRank(standings, teamId) {
        let rank = 0
        const sortedStandings = standings.sort((a, b) => {
            a.pct = a.wins/a.games_played;
            b.pct = b.wins/b.games_played;
            if(a.pct > b.pct) {
              return -1;
            }
            if(a.pct < b.pct) {
              return 1;
            }
            return 0;
          })
          console.log(sortedStandings)
        let place = 1
        sortedStandings.forEach(stand => {
            if(stand.team_id == teamId) {
                rank = place
            } 
            place += 1
        })
        return rank;
    }

    function readifyRank(rank) {
        switch(rank) {
            case 1:
            case 21:
            case 31:
                return rank + "st";
            case 2:
            case 22:
            case 32:
                return rank + "nd";
            case 3:
            case 23:
            case 33:
                return rank + "rd";
            default:
                return rank + "th";
        }
    }

    useEffect(() => {
        axios.get(apiUrl(`/api/teams/${id}`)).then(res => {
            setTeam(res.data);
        })
    }, [])

    if(team) {
        console.log(team);
        return (
            <section className='team'>
                <div className='teamHeader'>
                    <div className='teamInfo'>
                        <h1 className='teamName'>{team.name}</h1>
                        <p className='rank'>{readifyRank(calcRank(team.division.standings, id))} {team.division.name}</p>
                        <p className='record'>{team.standings.wins} - {team.standings.losses}</p>
                    </div>
                    <div className='teamFlag' style={{'backgroundColor': `${teamColors[team.id].primary}`, 'borderColor': `${teamColors[team.id].secondary}`}}>
                        <p className='teamNameBackground' style={{'color': `rgba(0,0,0,0.1)`}}>{team.name}</p>
                        <p className='teamNameBackground'>{team.name}</p>
                        <img src={teamImage} alt={`${team.country} Flag`} style={{'borderColor': `#${'fafafa'}`}}/>
                    </div>
                </div>
                <div className='teamNavbar'>
                    <Link to={`/teams/${team.id}/schedule`}>Schedule</Link>
                    <Link to={`/teams/${team.id}/roster`}>Roster</Link>
                    <Link to={`/teams/${team.id}/team-stats`}>Team Stats</Link>
                    <Link to={`/teams/${team.id}/player-stats`}>Player Stats</Link>
                </div>
                <div className='teamSection'>
                    <Roster teamId={id} />
                    <Routes>
                        <Route path="schedule" element={<Schedule />} />
                        <Route path="roster" element={<Schedule />} />
                        <Route path="team-stats" element={<Schedule />} />
                        <Route path="player-stats" element={<Schedule />} />
                    </Routes>
                </div>
            </section>
        )
    }
    return (<Loading />)
}