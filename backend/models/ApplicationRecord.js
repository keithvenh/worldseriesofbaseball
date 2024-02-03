import postgresDB from '../postgres.js';

export default class ApplicationRecord {

  static async find(id) {
    const q = `
      SELECT * FROM ${this.table} WHERE id = $1
    `
    const data = await postgresDB.query(q, [id])

    return data.rows;
  }
}