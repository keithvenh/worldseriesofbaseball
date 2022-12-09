import { useState } from 'react';
import Navbar from '../navigation/Navbar';
import Dashboard from './Dashboard';
import Loading from '../Loading';
import { useEffect } from 'react';
import Roster from './roster/Roster';

export default function Team(props) {

    const [team, setTeam] = useState(null);
    const [view, setView] = useState(null);
    const [activeLink, setActiveLink] = useState(null);

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
            'roster': <Roster team={options.team} appView={props.appView} />
        }

        link = link.split('/')
        link = link[link.length - 1]
        setView(views[link])
        setActiveLink(link)
    }

    useEffect(() => {
        setTeam(props.options.team);
        teamView(props.link, props.options);
    }, [])

    if (view) {
        return (
            <div className='Team'>
                <Navbar 
                    title={team.name}
                    links={['dashboard', 'schedule', 'depthChart', 'lineups', 'stats', 'roster']}
                    handler={teamView}
                    style={navStyle}
                    options={props.options}
                    activeLink={activeLink}
                />
                {view}
            </div>
        )
    }

    return (<Loading />)
}