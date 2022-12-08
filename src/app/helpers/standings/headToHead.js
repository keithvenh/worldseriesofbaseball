
export default function headToHead(teamA, teamB, games) {
    const hToHGames = games.filter(g => {
        let hasTeamA = (g.visitor === teamA.id || g.home === teamA.id);
        let hasTeamB = (g.visitor === teamB.id || g.home === teamB.id);
        return (hasTeamA && hasTeamB)
    })
    let teamAWins = hToHGames.filter(g => g.winTeam === teamA.id).length;
    let teamBWins = hToHGames.filter(g => g.winTeam === teamB.id).length;
    return teamBWins - teamAWins;
}