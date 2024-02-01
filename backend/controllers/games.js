import postgresDB from "../postgres.js";

class GamesController {

  
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

  async gamesBar(req, res) {
    const recentQuery = `
      SELECT * FROM games
      WHERE final IS TRUE
      ORDER BY game_number DESC
      LIMIT 6
    `
    const upcomingQuery = `
      SELECT * FROM games
      WHERE final IS FALSE
      ORDER BY game_number
      LIMIT 3
    `
    const recentGames = postgresDB.query(recentQuery);
    const upcomingGames = postgresDB.query(upcomingQuery);
    const [recentGamesRes, upcomingGamesRes] = await Promise.all([recentGames, upcomingGames])

    res.send({
      recentGames: recentGamesRes.rows,
      upcomingGames: upcomingGamesRes.rows
    })
  }
}

const gamesController = new GamesController;
export default gamesController;