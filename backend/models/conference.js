import ApplicationRecord from "./ApplicationRecord.js";
import postgresDB from "../postgres.js";

class Conference extends ApplicationRecord {
  static table = 'conferences';

  static async standings(id) {
    const q = `
      SELECT * FROM standings WHERE conference_id = $1
    `
    const data = await postgresDB.query(q, [id])
    return data.rows
  }
}

export default Conference;