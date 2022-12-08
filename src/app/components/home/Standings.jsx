import { useEffect, useState } from 'react';
import { getDocs, collection, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../../db/db';
import Loading from '../Loading';

export default function Standings (props) {

    const team = props.team;
    const type = props.type;
    const division = props.division;

    const [games, setGames] = useState(null);
    const [teams, setTeams] = useState(null);
    const [upcomingGames, setUpcomingGames] = useState(null);
    const [initializing, setInitializing] = useState(true);

    async function fetchGames() {

        let gamesRef = collection(db, "leagues/1/games")
        const q = query(gamesRef, orderBy("id", "desc"));
        const querySnapshot = await getDocs(q);
        let orderedGames = querySnapshot.docs.map((doc) => {
            return doc.data();
        })
        
        const completedGames = orderedGames.filter(game => game.final)
        setGames(completedGames);
    } 

    async function fetchTeams() {
        let teamsRef = collection(db, "leagues/1/teams")
        const q = query(teamsRef);
        const querySnapshot = await getDocs(q);
        let allTeams = querySnapshot.docs.map((doc) => {
            return doc.data();
        })

        setTeams(allTeams);
        
    }

    function getStandings(division) {
        let divTeams = filterTeams(division);
        let divTeamsRecords = getRecords(divTeams);
        let divTeamsSorted = divTeamsRecords.sort((a,b) => {
            if(b.winPct == a.winPct) {
                return getHeadToHead(a, b);
            }
            return b.winPct - a.winPct;
        });
        return divTeamsSorted;
    }
    function filterTeams(division) {
        let filteredTeams = teams.filter(t => t.division.id === division);
        return filteredTeams;
    }

    function getRecords(teams) {
        let teamsRecords = teams.map(t => {
            const wins = games.filter(g => g.winTeam === t.id).length;
            const losses = games.filter(g => g.loseTeam === t.id).length;
            const winPct = wins + losses !== 0 ? (wins/(wins+losses)) : 0;
            return {
                ...t,
                wins: wins,
                losses: losses,
                winPct: winPct
            }
        })

        return teamsRecords
    }

    function getHeadToHead(teamA, teamB) {
        const hToHGames = games.filter(g => {
            let hasTeamA = (g.visitor === teamA.id || g.home === teamA.id);
            let hasTeamB = (g.visitor === teamB.id || g.home === teamB.id);
            return (hasTeamA && hasTeamB)
        })
        let teamAWins = hToHGames.filter(g => g.winTeam === teamA.id).length;
        let teamBWins = hToHGames.filter(g => g.winTeam === teamB.id).length;
        return teamBWins - teamAWins;
    }

    useEffect(() => {
        fetchGames();
        fetchTeams();
    },[])

    if(teams && games) {
        return (
            <div className='Standings'>
                <div className='afr division'>
                    <p className='divisionTitle'>Africa</p>
                    <div className='teamStandings headings'>
                        <p className='teamName'>Team</p>
                        <p className='teamWins'>W</p>
                        <p className='teamLosses'>L</p>
                        <p className='teamWinPct'>wPct</p>
                    </div>
                    {getStandings('afr').map(t => {
                        return(
                            <div key={t.id} className='teamStandings' onClick={() => props.appView('team', {team: t})}>
                                <p className='teamName'>{t.name}</p>
                                <p className='teamWins'>{t.wins}</p>
                                <p className='teamLosses'>{t.losses}</p>
                                <p className='teamWinPct'>{t.winPct.toFixed(3)}</p>
                            </div>
                        )
                    })}
                </div>
                <div className='asi division'>
                    <p className='divisionTitle'>Asia</p>
                    <div className='teamStandings headings'>
                        <p className='teamName'>Team</p>
                        <p className='teamWins'>W</p>
                        <p className='teamLosses'>L</p>
                        <p className='teamWinPct'>wPct</p>
                    </div>
                    {getStandings('asi').map(t => {
                        return(
                            <div key={t.id} className='teamStandings' onClick={() => props.appView('team', {team: t})}>
                                <p className='teamName'>{t.name}</p>
                                <p className='teamWins'>{t.wins}</p>
                                <p className='teamLosses'>{t.losses}</p>
                                <p className='teamWinPct'>{t.winPct.toFixed(3)}</p>
                            </div>
                        )
                    })}
                </div>
                <div className='eur division'>
                    <p className='divisionTitle'>Europe</p>
                    <div className='teamStandings headings'>
                        <p className='teamName'>Team</p>
                        <p className='teamWins'>W</p>
                        <p className='teamLosses'>L</p>
                        <p className='teamWinPct'>wPct</p>
                    </div>
                    {getStandings('eur').map(t => {
                        return(
                            <div key={t.id} className='teamStandings' onClick={() => props.appView('team', {team: t})}>
                                <p className='teamName'>{t.name}</p>
                                <p className='teamWins'>{t.wins}</p>
                                <p className='teamLosses'>{t.losses}</p>
                                <p className='teamWinPct'>{t.winPct.toFixed(3)}</p>
                            </div>
                        )
                    })}
                </div>
                <div className='nam division'>
                    <p className='divisionTitle'>North America</p>
                    <div className='teamStandings headings'>
                        <p className='teamName'>Team</p>
                        <p className='teamWins'>W</p>
                        <p className='teamLosses'>L</p>
                        <p className='teamWinPct'>wPct</p>
                    </div>
                    {getStandings('nam').map(t => {
                        return(
                            <div key={t.id} className='teamStandings' onClick={() => props.appView('team', {team: t})}>
                                <p className='teamName'>{t.name}</p>
                                <p className='teamWins'>{t.wins}</p>
                                <p className='teamLosses'>{t.losses}</p>
                                <p className='teamWinPct'>{t.winPct.toFixed(3)}</p>
                            </div>
                        )
                    })}
                </div>
                <div className='oce division'>
                    <p className='divisionTitle'>Oceania</p>
                    <div className='teamStandings headings'>
                        <p className='teamName'>Team</p>
                        <p className='teamWins'>W</p>
                        <p className='teamLosses'>L</p>
                        <p className='teamWinPct'>wPct</p>
                    </div>
                    {getStandings('oce').map(t => {
                        return(
                            <div key={t.id} className='teamStandings' onClick={() => props.appView('team', {team: t})}>
                                <p className='teamName'>{t.name}</p>
                                <p className='teamWins'>{t.wins}</p>
                                <p className='teamLosses'>{t.losses}</p>
                                <p className='teamWinPct'>{t.winPct.toFixed(3)}</p>
                            </div>
                        )
                    })}
                </div>
                <div className='sam division'>
                    <p className='divisionTitle'>South America</p>
                    <div className='teamStandings headings'>
                        <p className='teamName'>Team</p>
                        <p className='teamWins'>W</p>
                        <p className='teamLosses'>L</p>
                        <p className='teamWinPct'>wPct</p>
                    </div>
                    {getStandings('sam').map(t => {
                        return(
                            <div key={t.id} className='teamStandings' onClick={() => props.appView('team', {team: t})}>
                                <p className='teamName'>{t.name}</p>
                                <p className='teamWins'>{t.wins}</p>
                                <p className='teamLosses'>{t.losses}</p>
                                <p className='teamWinPct'>{t.winPct.toFixed(3)}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div className='Standings'>
            <Loading />
        </div>
    )
}