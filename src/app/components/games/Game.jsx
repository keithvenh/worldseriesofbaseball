import {useState, useEffect } from 'react';
import { updateDoc, doc, getDoc, collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../../db/db.js';
import Scorecard from '../scorecard/Scorecard';
import Lineup from './Lineup';
import { useParams, Link } from "react-router-dom";

export default function Game(props) {

    const [game, setGame] = useState(props.game);
    const [mode, setMode] = useState('view');
    const [teams, setTeams] = useState(null);
    const [games, setGames] = useState(null);
    const [boxscore, setBoxscore] = useState({
        lineups: {
            visitor: null,
            home: null
        }
    });
    const visFlag = require('../../assets/images/' + game.visitor + '.webp')
    const homeFlag = require('../../assets/images/' + game.home + '.webp')
    const {id} = useParams();

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

    async function fetchGames() {

        let gamesRef = collection(db, "leagues/1/games")
        const q = query(gamesRef);
        const querySnapshot = await getDocs(q);
        let allGames = querySnapshot.docs.map((doc) => {
            return doc.data();
        })

        setGames(allGames);
    } 

    function getRecord(team, game = 1000) {
        const searchGames = games.filter(g => g.id <= game)
        let wins = searchGames.filter(g => g.winTeam === team).length
        let losses = searchGames.filter(g => g.loseTeam === team).length
        return `${wins}-${losses}`
    }

    async function fetchTeams() {
        let visTeam = await getDoc(doc(db, "leagues/1/teams", game.visitor));
        let homeTeam = await getDoc(doc(db, "leagues/1/teams", game.home));

        setTeams({visitor: visTeam.data(), home: homeTeam.data()});
    }

    function setLineup(team, lineup) {
        setBoxscore({
            ...boxscore,
            lineups: {
                ...boxscore.lineups,
                [team]: lineup
            }
        });
    }

    useEffect(() => {
        fetchTeams();
        fetchGames();
    },[])

    if(!games || !teams) {
        return <div>Loading...</div>
    }

    if(mode === 'view') {

        return (
            <div>

                <div key={game.id} className='gameSummaryFull'>
                    <div className='teamDisplay visTeamDisplay'>
                        <div className='teamFlag'>
                            <img src={visFlag} alt={`${teams.visitor.name} Logo`} />
                        </div>
                        <div>
                            <p className='teamName'>{teams.visitor.name}</p>
                            <p className='teamRecord'>{getRecord(game.visitor, game.id)}</p>
                        </div>
                        <p className='teamScore'>{game.visRuns}</p>
                    </div>
                    <table className='boxscore'>
                        <thead>
                            <tr className='headers'>
                                <th className='gameNumber'>GAME {game.id}</th>
                                <th className='inning inning1'>1</th>
                                <th className='inning inning2'>2</th>
                                <th className='inning inning3'>3</th>
                                <th className='inning inning4'>4</th>
                                <th className='inning inning5'>5</th>
                                <th className='inning inning6'>6</th>
                                <th className='inning inning7'>7</th>
                                <th className='inning inning8'>8</th>
                                <th className='inning inning9'>9</th>
                                <th className='runs'>R</th>
                                <th className='hits'>H</th>
                                <th className='err'>E</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={`${game.winTeam == game.visitor} visitor`}>
                                <td className='team visTeam'>{game.visitor.toUpperCase()}</td>
                                <td className='inning inning1'>-</td>
                                <td className='inning inning2'>-</td>
                                <td className='inning inning3'>-</td>
                                <td className='inning inning4'>-</td>
                                <td className='inning inning5'>-</td>
                                <td className='inning inning7'>-</td>
                                <td className='inning inning6'>-</td>
                                <td className='inning inning8'>-</td>
                                <td className='inning inning9'>-</td>
                                <td className='runs visRuns'>{game.visRuns}</td>
                                <td className='hits visHits'>{game.visHits}</td>
                                <td className='err visErrors'>{game.visErrors}</td>
                            </tr>
                            <tr className={`${game.winTeam == game.home} home`}>
                                <td className='team homeTeam'>{game.home.toUpperCase()}</td>
                                <td className='inning inning1'>-</td>
                                <td className='inning inning2'>-</td>
                                <td className='inning inning3'>-</td>
                                <td className='inning inning4'>-</td>
                                <td className='inning inning5'>-</td>
                                <td className='inning inning7'>-</td>
                                <td className='inning inning6'>-</td>
                                <td className='inning inning8'>-</td>
                                <td className='inning inning9'>-</td>
                                <td className='runs homeRuns'>{game.homeRuns}</td>
                                <td className='hits homeHits'>{game.homeHits}</td>
                                <td className='err homeErrors'>{game.homeErrors}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='teamDisplay homeTeamDisplay'>
                        <p className='teamScore'>{game.homeRuns}</p>
                        <div>
                            <p className='teamName'>{teams.home.name}</p>
                            <p className='teamRecord'>{getRecord(game.home, game.id)}</p>
                        </div>
                        <div className='teamFlag'>
                            <img src={homeFlag} alt={`${teams.home.name} Logo`} />
                        </div>
                    </div>
                </div>
                <Scorecard team={teams.visitor}/>
                <div id='editButton' className='button edit' onClick={() => {setMode('edit')}}><i className='fa-solid fa-pencil'></i> Edit</div>
            </div>
        )
    } 

    if(mode === 'edit') {
        return (
            <div>
                <div key={game.id} className='gameSummaryFull'>
                    <div className='teamDisplay visTeamDisplay'>
                        <div className='teamFlag'>
                            <img src={visFlag} alt={`${teams.visitor.name} Logo`} />
                        </div>
                        <div>
                            <p className='teamName'>{teams.visitor.name}</p>
                            <p className='teamRecord'>{getRecord(game.visitor, game.id)}</p>
                        </div>
                        <p className='teamScore'>{game.visRuns}</p>
                    </div>
                    <table className='boxscore'>
                        <thead>
                            <tr className='headers'>
                                <th className='gameNumber'>GAME {game.id}</th>
                                <th className='inning inning1'>1</th>
                                <th className='inning inning2'>2</th>
                                <th className='inning inning3'>3</th>
                                <th className='inning inning4'>4</th>
                                <th className='inning inning5'>5</th>
                                <th className='inning inning6'>6</th>
                                <th className='inning inning7'>7</th>
                                <th className='inning inning8'>8</th>
                                <th className='inning inning9'>9</th>
                                <th className='runs'>R</th>
                                <th className='hits'>H</th>
                                <th className='err'>E</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={`${game.winTeam == game.visitor} visitor`}>
                                <td className='team visTeam'>{game.visitor.toUpperCase()}</td>
                                <td className='inning inning1'>-</td>
                                <td className='inning inning2'>-</td>
                                <td className='inning inning3'>-</td>
                                <td className='inning inning4'>-</td>
                                <td className='inning inning5'>-</td>
                                <td className='inning inning7'>-</td>
                                <td className='inning inning6'>-</td>
                                <td className='inning inning8'>-</td>
                                <td className='inning inning9'>-</td>
                                <td className='runs visRuns'>{game.visRuns}</td>
                                <td className='hits visHits'>{game.visHits}</td>
                                <td className='err visErrors'>{game.visErrors}</td>
                            </tr>
                            <tr className={`${game.winTeam == game.home} home`}>
                                <td className='team homeTeam'>{game.home.toUpperCase()}</td>
                                <td className='inning inning1'>-</td>
                                <td className='inning inning2'>-</td>
                                <td className='inning inning3'>-</td>
                                <td className='inning inning4'>-</td>
                                <td className='inning inning5'>-</td>
                                <td className='inning inning7'>-</td>
                                <td className='inning inning6'>-</td>
                                <td className='inning inning8'>-</td>
                                <td className='inning inning9'>-</td>
                                <td className='runs homeRuns'>{game.homeRuns}</td>
                                <td className='hits homeHits'>{game.homeHits}</td>
                                <td className='err homeErrors'>{game.homeErrors}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='teamDisplay homeTeamDisplay'>
                        <p className='teamScore'>{game.homeRuns}</p>
                        <div>
                            <p className='teamName'>{teams.home.name}</p>
                            <p className='teamRecord'>{getRecord(game.home, game.id)}</p>
                        </div>
                        <div className='teamFlag'>
                            <img src={homeFlag} alt={`${teams.home.name} Logo`} />
                        </div>
                    </div>
                </div>

                <div className='liveScorecard'>
                    <div className='visitor'>
                        <p className='teamName'>{teams.visitor.name}</p>
                        <Lineup team={['visitor', teams.visitor]} lineup={boxscore.lineups.visitor} setLineup={setLineup} />
                    </div>
                    <div className='scoresheet'>

                    </div>
                    <div className='home'>
                        <p className='teamName'>{teams.home.name}</p>
                        <Lineup team={['home', teams.home]} lineup={boxscore.lineups.home} setLineup={setLineup} />
                    </div>
                </div>

                <div id='saveButton' className='button save' onClick={updateGame}><i className='fa-solid fa-floppy-disk'></i> Save</div>
            </div>
        )
    }
}