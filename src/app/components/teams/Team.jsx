import { useState } from 'react';
import Navbar from '../navigation/Navbar';
import Dashboard from './Dashboard';

export default function Team(props) {

    console.log(props.options)
    const [view, setView] = useState(<Dashboard />)
    const team = props.options.team;
    const navStyle = {
        color: 'black',
        backgroundColor: 'white',
        borderBottom: '1px solid black',
        justifyContent: 'space-around'
    }
    
    function teamView(link) {

        const views = {
            'dashboard': <Dashboard />,
            'schedule': null,
            'depthChart': null,
            'lineups': null,
            'stats': null,
            'roster': null
        }
    }

    return (
        <div className='Team'>
            <Navbar 
                title={team.name}
                links={['schedule', 'depthChart', 'lineups', 'stats', 'roster']}
                handler={teamView}
                style={navStyle}
            />
            {view}
        </div>
    )
}