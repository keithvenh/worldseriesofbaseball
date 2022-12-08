import { useState } from 'react';
import Navbar from '../navigation/Navbar';
import Dashboard from './Dashboard';
import Loading from '../Loading';
import { useEffect } from 'react';

export default function Team(props) {

    console.log(props.link);
    console.log(props.options.team);
    const [team, setTeam] = useState(null);
    const [view, setView] = useState(null)
    const navStyle = {
        color: 'black',
        backgroundColor: 'white',
        borderBottom: '1px solid black',
        justifyContent: 'space-around'
    }
    
    function teamView(link, options) {

        const views = {
            'dashboard': <Dashboard team={options.team} appView={props.appView} />,
            'schedule': null,
            'depthChart': null,
            'lineups': null,
            'stats': null,
            'roster': null
        }

        console.log(link);
        setView(views['dashboard'])
    }

    console.log(team);

    useEffect(() => {
        setTeam(props.options.team);
        teamView(props.link, props.options);
    }, [])

    if (view) {
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

    return (<Loading />)
}