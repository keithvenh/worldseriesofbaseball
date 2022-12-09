import { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../../db/db';

import Loading from '../Loading';
import Navbar from '../navigation/Navbar';
import Team from './Team';

export default function Teams (props) {

    const [teams, setTeams] = useState(null);
    const [teamLinks, setTeamLinks] = useState(null);
    const [view, setView] = useState(null);
    const [link, setLink] = useState(null);

    function teamView(link, options) {

        const views = {
            list: {teamLinks},
            team: <Team teamView={teamView} appView={props.appView} link={link} options={options} />
        }

        let pageLink = link.split('/')[1]
        if(!pageLink) {
            teamView('list');
        } else {
            setView(views[pageLink])
            setLink(link)
        }

    }

    async function fetchTeams() {
        let teamsRef = collection(db, "leagues/1/teams")
        const q = query(teamsRef);
        const querySnapshot = await getDocs(q);
        let allTeams = querySnapshot.docs.map((doc) => {
            return doc.data();
        })

        let sortedTeams = allTeams.sort((a,b) => a.name.localeCompare(b.name))
        let allTeamLinks = sortedTeams.map((t) => {
            let flag = require('../../assets/images/' + t.id + '.webp')
            return(
                <div key={t.id} className='teamLink' onClick={() => teamView('team', {team: t})}>
                    <img src={flag} alt={t.name + " Flag"} />
                    <p className='teamName'>{t.name}</p>
                </div>
            )
        })

        setTeams(allTeams);
        setTeamLinks(allTeamLinks);
    }

    useEffect(() => {
        teamView(props.link, {team: props.options.team})
        fetchTeams();
    }, [])

    if(link) {
        return (
            <div className='Teams'>
                {view}
            </div>
        )
    }

    return(<Loading />)
}