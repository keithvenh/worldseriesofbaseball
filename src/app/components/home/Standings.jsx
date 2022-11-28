import { useEffect, useState } from 'react';
import { getDocs, collection, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../../db/db'

export default function Standings (props) {

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
            return b.winPct - a.winPct
        });
        return divTeamsSorted;
    }
    function filterTeams(division) {
        let filteredTeams = teams.filter(t => t.division.id === division);
        console.log(filteredTeams)
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

    useEffect(() => {
        fetchGames();
        fetchTeams();
    },[])

    if(teams && games) {
        return (
            <div className='Standings'>
                <div className='nam division'>
                    <p className='divisionTitle'>Africa</p>
                    <div className='teamStandings headings'>
                        <p className='teamName'>Team</p>
                        <p className='teamWins'>W</p>
                        <p className='teamLosses'>L</p>
                        <p className='teamWinPct'>wPct</p>
                    </div>
                    {getStandings('afr').map(t => {
                        return(
                            <div key={t.id} className='teamStandings'>
                                <p className='teamName'>{t.name}</p>
                                <p className='teamWins'>{t.wins}</p>
                                <p className='teamLosses'>{t.losses}</p>
                                <p className='teamWinPct'>{t.winPct.toFixed(3)}</p>
                            </div>
                        )
                    })}
                </div>
                <div className='nam division'>
                    <p className='divisionTitle'>Asia</p>
                    <div className='teamStandings headings'>
                        <p className='teamName'>Team</p>
                        <p className='teamWins'>W</p>
                        <p className='teamLosses'>L</p>
                        <p className='teamWinPct'>wPct</p>
                    </div>
                    {getStandings('asi').map(t => {
                        return(
                            <div key={t.id} className='teamStandings'>
                                <p className='teamName'>{t.name}</p>
                                <p className='teamWins'>{t.wins}</p>
                                <p className='teamLosses'>{t.losses}</p>
                                <p className='teamWinPct'>{t.winPct.toFixed(3)}</p>
                            </div>
                        )
                    })}
                </div>
                <div className='nam division'>
                    <p className='divisionTitle'>Europe</p>
                    <div className='teamStandings headings'>
                        <p className='teamName'>Team</p>
                        <p className='teamWins'>W</p>
                        <p className='teamLosses'>L</p>
                        <p className='teamWinPct'>wPct</p>
                    </div>
                    {getStandings('eur').map(t => {
                        return(
                            <div key={t.id} className='teamStandings'>
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
                            <div key={t.id} className='teamStandings'>
                                <p className='teamName'>{t.name}</p>
                                <p className='teamWins'>{t.wins}</p>
                                <p className='teamLosses'>{t.losses}</p>
                                <p className='teamWinPct'>{t.winPct.toFixed(3)}</p>
                            </div>
                        )
                    })}
                </div>
                <div className='nam division'>
                    <p className='divisionTitle'>Oceania</p>
                    <div className='teamStandings headings'>
                        <p className='teamName'>Team</p>
                        <p className='teamWins'>W</p>
                        <p className='teamLosses'>L</p>
                        <p className='teamWinPct'>wPct</p>
                    </div>
                    {getStandings('oce').map(t => {
                        return(
                            <div key={t.id} className='teamStandings'>
                                <p className='teamName'>{t.name}</p>
                                <p className='teamWins'>{t.wins}</p>
                                <p className='teamLosses'>{t.losses}</p>
                                <p className='teamWinPct'>{t.winPct.toFixed(3)}</p>
                            </div>
                        )
                    })}
                </div>
                <div className='nam division'>
                    <p className='divisionTitle'>South America</p>
                    <div className='teamStandings headings'>
                        <p className='teamName'>Team</p>
                        <p className='teamWins'>W</p>
                        <p className='teamLosses'>L</p>
                        <p className='teamWinPct'>wPct</p>
                    </div>
                    {getStandings('sam').map(t => {
                        return(
                            <div key={t.id} className='teamStandings'>
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
            <p>Loading...</p>
        </div>
    )
}