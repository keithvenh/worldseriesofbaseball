import ApplicationRecord from "./ApplicationRecord.js";
import postgresDB from "../postgres.js";

class Team extends ApplicationRecord {
  static table = 'teams';

  static async standings(teamId) {
    const q = `
      SELECT * FROM standings WHERE team_id = $1
    `
    const data = await postgresDB.query(q, [teamId])
    return data.rows
  }

  static async games(teamId) {
    const q = `
      SELECT * FROM games 
      WHERE home = $1 OR visitor = $1
      ORDER BY game_number
    `
    const data = await postgresDB.query(q, [teamId]);
    return data.rows;
  }

  static async players(teamId) {
    const q = `
      SELECT * FROM players WHERE team_id = $1 ORDER BY last_name
    `
    const data = await postgresDB.query(q, [teamId]);
    return data.rows;
  }

}

export default Team;