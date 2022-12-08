
export default function calculateRecords(teams, games) {
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