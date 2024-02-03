import ApplicationRecord from "./ApplicationRecord.js";
import postgresDB from "../postgres.js";
class Division extends ApplicationRecord {
  static table = 'divisions';

  static async standings(id) {
    const q = `
      SELECT * FROM standings WHERE division_id = $1
    `
    const data = await postgresDB.query(q, [id])
    return data.rows
  }
}

export default Division;