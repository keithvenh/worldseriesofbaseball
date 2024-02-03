require 'csv'
require 'pg'

def seed_teams(teamsCSV)

  puts "SEEDING TEAMS..."

  conn = PG.connect(process.env.REACT_APP_postgres_uri)

  CSV.foreach(teamsCSV, headers: true) do |team|
    conn.exec_params(
      "INSERT INTO teams 
      (id, name, nickname, city, country, logo_url, firestore_ref, division_id, conference_id, league_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", team.fields
    )
  end

  conn.close

end