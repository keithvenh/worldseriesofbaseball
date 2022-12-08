
export default function gamesBack(teams) {
    let leader = teams[0];
    let teamsWithGamesBack = teams.map(team => {
        let winDif = leader.wins - team.wins;
        let lossDif = team.losses - leader.losses;
        let gb = (winDif + lossDif)/2
        if(gb === 0 || team.winPct === 0){ gb = '-' }
        return {
            ...team,
            gb: gb
        }
    })

    return teamsWithGamesBack;
}