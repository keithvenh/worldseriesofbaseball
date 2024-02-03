import postgresDB from "../postgres.js";
import Team from '../models/team.js';
import Division from '../models/division.js';
import Conference from '../models/conference.js';

export default class TeamsController {

  
  static async index(req, res) {
  
    const teamsQuery = `
      SELECT teams.*, conferences.name AS conference_name, divisions.name AS division_name, standings.*
      FROM teams
      LEFT JOIN standings ON standings.team_id = teams.id AND standings.season_id = 'wsob2024'
      LEFT JOIN conferences ON teams.conference_id = conferences.id
      LEFT JOIN divisions ON teams.division_id = divisions.id
      ORDER BY teams.name
    `
    const teams = await postgresDB.query(teamsQuery)

    res.send(teams.rows);
  }

  static async show(req, res) {
    
    let [team, games] = await Promise.all([
        Team.find(req.params.id),
        Team.games(req.params.id)
      ]);

    team = team[0];

    const [division, divStandings, teamStandings] = await Promise.all([Division.find(team.division_id), Division.standings(team.division_id), Team.standings(req.params.id)]);

    const result = {
        ...team,
        games: games,
        standings: teamStandings[0],
        division: {
          ...division[0],
          standings: divStandings
        }
    }

    res.send(result)
  }

  static async roster(req, res) {
    const roster = await Team.players(req.params.id);

    res.send(roster);
  }
}