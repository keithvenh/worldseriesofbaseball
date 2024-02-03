require 'csv'
require 'pg'

def seed_players(playersCSV)

  puts "SEEDING PLAYERS..."

  conn = PG.connect("postgres://nhppuxta:jIXFAVT4fSUbvR1ASHZVPafHFs0TanA3@otto.db.elephantsql.com/nhppuxta")

  CSV.foreach(playersCSV, headers: true) do |player|
    firestore_ref = "players/#{player['altId']}"
    conn.exec_params(
      "INSERT INTO players 
      (altid,first_name,last_name,team_id, primary_pos, bats, firestore_ref)
      VALUES ($1, $2, $3, $4, $5, $6, $7)", 
      [player['altId'], player['firstName'], player['lastName'], player['team_id'], player['primary_pos'], player['bats'], firestore_ref]
    )
  end

  conn.close

end