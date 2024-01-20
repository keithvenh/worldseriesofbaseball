import { useState, useEffect} from 'react';
import { fetchTeams } from '../../../db/fetchTeams';
import TeamCard from './TeamCard';
import Loading from '../Loading';

export default function Teams() {
    const [initializing, setInitializing] = useState(true);
    const [teams, setTeams] = useState(null);

    useEffect(() => {
        fetchTeams().then(teams => {
            console.log(teams);
            setTeams(teams);
            setInitializing(false);
        });
    }, [])

    if(initializing) {
        return (<Loading />)
    }
    return (
        <section className='teams'>
            <div className='teamCards'>
                {teams.map(team => <TeamCard team={team} key={team.id}/>)}
            </div>
        </section>
    )
}