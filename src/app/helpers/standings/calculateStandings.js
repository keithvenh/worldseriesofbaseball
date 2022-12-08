import calculateRecords from '../application/calculateRecords';
import headToHead from '../standings/headToHead';
import gamesBack from '../standings/gamesBack';

export default function calculateStandings(teams, games) {
    console.log(teams);
    console.log(games);
    teams = calculateRecords(teams, games);
    console.log(teams);

    let standings = teams.sort((a,b) => {
        if(b.winPct == a.winPct) {
            return headToHead(a, b, games);
        }
        return b.winPct - a.winPct;
    })

    standings = gamesBack(teams);

    return standings;
}