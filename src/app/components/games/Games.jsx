import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { firestoreDB } from '../../../db/db.js';

import Game from './Game';
import Loading from '../Loading';

export default function Games(props) {

    const [games, setGames] = useState(null);
    const [view, setView] = useState(null);
    const [link, setLink] = useState(null);

    function gamesView(link, options) {

        let views = {
            'game': <Game appView={props.appView} gamesView={gamesView} game={options.game} />,
            'list': null
        }

        let pageLink = link.split('/')[1]
        if(!pageLink) {
            gamesView('list');
        } else {
            setView(views[pageLink])
            setLink(link)
        }
    }

    async function fetchGames() {

        let gamesRef = collection(firestoreDB, "leagues/1/games")
        const q = query(gamesRef, orderBy("id", "asc"));
        const querySnapshot = await getDocs(q);
        let orderedGames = querySnapshot.docs.map((doc) => {
            return doc.data();
        })

        setGames(orderedGames);
    } 
    
    function getRecord(team, game = 1000) {
        const searchGames = games.filter(g => g.id <= game)
        let wins = searchGames.filter(g => g.winTeam === team).length
        let losses = searchGames.filter(g => g.loseTeam === team).length
        return `${wins}-${losses}`
    }

    useEffect(() => {
        gamesView(props.link, {game: props.options.game})
        fetchGames();
    },[])

    if(link) {
        return (
            <div className='Games'>
                {view}
            </div>
        )
    }

    return (<Loading />)
}