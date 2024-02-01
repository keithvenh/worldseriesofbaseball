import postgresDB from "../postgres.js";

class StandingsController {

  
  async index(req, res) {
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
}

const standingsController = new StandingsController;
export default standingsController;