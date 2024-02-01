require 'csv'
require 'pg'

def seed_games(gamesCSV, seasonId)

  puts "SEEDING GAMES..."

  conn = PG.connect("postgres://nhppuxta:gV757NwEvUfBrO7zkGnuNDvZUmtpUUpc@otto.db.elephantsql.com/nhppuxta")

  CSV.foreach(gamesCSV, headers: true) do |game|
    final = game['winTeam'] != nil
    firestore_ref = "seasons/#{seasonId}/games/#{game['id']}"
    conn.exec_params(
      "INSERT INTO games 
      (season_id, game_number, visitor, home, visitor_runs, visitor_hits, visitor_errors, home_runs, home_hits, home_errors, winner, loser, final, firestore_ref)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)", 
      [seasonId, game['id'], game['visitor'], game['home'], game['visRuns'], game['visHits'], game['visErrors'], game['homeRuns'], game['homeHits'], game['homeErrors'], game['winTeam'], game['loseTeam'], final, firestore_ref]
    )
  end

  conn.close

end