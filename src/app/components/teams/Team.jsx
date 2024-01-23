import { useState, useEffect} from 'react';
import { useParams, Link, Routes, Route } from 'react-router-dom';

import { fetchTeam } from '../../../db/fetchTeams';

import Loading from '../Loading';
import Schedule from './Schedule';

export default function Team() {
    const [initializing, setInitializing] = useState(true);
    const [team, setTeam] = useState(null);
    const { id } = useParams();
    const teamImage = require(`../../assets/images/${id}.webp`)

    useEffect(() => {
        fetchTeam(id).then(team => {
            setTeam(team);
            setInitializing(false);
        });
    }, [])

    if(initializing) {
        return (<Loading />)
    }
    return (
        <section className='team'>
            <div className='teamHeader'>
                <div className='teamInfo'>
                    <h1 className='teamName'>{team.name}</h1>
                    <p className='rank'>#st {team.division}</p>
                    <p className='record'>{team.wins} - {team.losses}</p>
                </div>
                <div className='teamFlag' style={{'backgroundColor': `#${team.colors.primary}`, 'borderColor': `#${team.colors.secondary}`}}>
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