import postgresDB from "../postgres.js";

class StandingsController {

  
  static async index(req, res) {
    const standingsQuery = `
      SELECT * FROM standings
      WHERE season_id = 'wsob2024'
    `
  
    const teamsQuery = `
      SELECT teams.*, 
        conferences.nickname AS conference,
        divisions.nickname AS division 
      FROM teams 
      JOIN conferences ON teams.conference_id = conferences.id 
      JOIN divisions ON teams.division_id = divisions.id
    `
    const standings = postgresDB.query(standingsQuery)
    const teams = postgresDB.query(teamsQuery)

    const [standingsRes, teamsRes] = await Promise.all([standings, teams]);
    res.send(
      {standings: standingsRes.rows,
        teams: teamsRes.rows}
    );
  }

  static async division(req, res) {
    const divisionId = req.params.id;
    console.log(divisionId);
    const teamsQuery = `
      SELECT id FROM teams WHERE division_id = $1
    `

    const teams = await postgresDB.query(teamsQuery, [divisionId])
    const teamIds = teams.rows.map(team => team.id)
    console.log(teamIds);

    
    const query = `
      SELECT *
      FROM standings
      WHERE team_id IN (${teamIds.map((team, index) => `$${index + 1}`).join(', ')})
    `

    const divisionStandings = await postgresDB.query(query, teamIds)

    res.send(divisionStandings.rows)
  }
}

export default StandingsController;