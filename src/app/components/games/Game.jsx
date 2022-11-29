import {useState} from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../db/db';

export default function Game(props) {

    const [game, setGame] = useState(props.options.game);
    const [mode, setMode] = useState('view');

    function updateGameStats(e) {
        e.preventDefault();
        let winner = game.homeRuns > game.visRuns ? game.home : game.visRuns > game.homeRuns ? game.visitor : null;
        let loser = game.homeRuns < game.visRuns ? game.home : game.visRuns < game.homeRuns ? game.visitor : null;
        let value = e.target.value != '' ? parseInt(e.target.value) : ''
        let final = winner !== null;
        setGame({...game, winTeam: winner, loseTeam: loser, [e.target.id]: value, final: final});
    }

    function updateGame() {
        console.log(game.id);
        updateDoc(doc(db, 'leagues/1/games', game.id.toString()), {
            ...game
        }).then(() => {
            setMode('view');
        })
    }

    if(mode === 'view') {

        return (
            <div key={game.id} className='gameSummary'>
                <div className='headers'>
                    <p className='gameNumber'>GAME {game.id}</p>
                    <p className='runs'>R</p>
                    <p className='hits'>H</p>
                    <p className='err'>E</p>
                </div>
                <div className={`${game.winTeam == game.visitor} visitor`}>
                    <p className='team visTeam'>{game.visitor.toUpperCase()}</p>
                    <p className='runs visRuns'>{game.visRuns}</p>
                    <p className='hits visHits'>{game.visHits}</p>
                    <p className='err visErrors'>{game.visErrors}</p>
                </div>
                <div className={`${game.winTeam == game.home} home`}>
                    <p className='team homeTeam'>{game.home.toUpperCase()}</p>
                    <p className='runs homeRuns'>{game.homeRuns}</p>
                    <p className='hits homeHits'>{game.homeHits}</p>
                    <p className='err homeErrors'>{game.homeErrors}</p>
                </div>
                <div id='editButton' className='button edit' onClick={() => {setMode('edit')}}><i className='fa-solid fa-pencil'></i> Edit</div>
            </div>
        )
    } 

    if(mode === 'edit') {
        return (
            <div key={game.id} className='gameSummary'>
                <div className='headers'>
                    <p className='gameNumber'>GAME {game.id}</p>
                    <p className='runs'>R</p>
                    <p className='hits'>H</p>
                    <p className='err'>E</p>
                </div>
                <div className={`${game.winTeam == game.visitor} visitor`}>
                    <p className='team visTeam'>{game.visitor.toUpperCase()}</p>
                    <input id='visRuns' className='runs visRuns' value={game.visRuns} onChange={(e) => updateGameStats(e)}/>
                    <input id='visHits' className='hits visHits' value={game.visHits} onChange={(e) => updateGameStats(e)}/>
                    <input id='visErrors' className='err visErrors'value={game.visErrors} onChange={(e) => updateGameStats(e)}/>
                </div>
                <div className={`${game.winTeam == game.home} home`}>
                    <p className='team homeTeam'>{game.home.toUpperCase()}</p>
                    <input id='homeRuns' className='runs homeRuns' value={game.homeRuns} onChange={(e) => updateGameStats(e)}/>
                    <input id='homeHits' className='hits homeHits'value={game.homeHits} onChange={(e) => updateGameStats(e)}/>
                    <input id='homeErrors' className='err homeErrors' value={game.homeErrors} onChange={(e) => updateGameStats(e)}/>
                </div>
                <div id='saveButton' className='button save' onClick={updateGame}><i className='fa-solid fa-floppy-disk'></i> Save</div>
            </div>
        )
    }
}